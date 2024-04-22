package org.apache.cordova.stepper;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import org.apache.cordova.BuildConfig;
import org.apache.cordova.stepper.util.API23Wrapper;
import org.apache.cordova.stepper.util.API26Wrapper;
import org.apache.cordova.stepper.util.Util;
import org.apache.cordova.stepper.util.Config;
import org.apache.cordova.stepper.util.Entry;

import java.text.NumberFormat;
import java.util.Locale;
import java.util.TimeZone;
import java.util.List;

/**
 * Background service which keeps the step-sensor listener alive to always get
 * the number of steps since boot.
 * <p/>
 * This service won't be needed any more if there is a way to read the
 * step-value without waiting for a sensor event
 */
public class SensorListener extends Service implements SensorEventListener {

	public final static int NOTIFICATION_ID = 1;
	private final static long MICROSECONDS_IN_ONE_MINUTE = 60000000;
	private final static long SAVE_OFFSET_TIME_MS = 300000;
	private final static int SAVE_OFFSET_STEPS = 30;

	private static TimeZone timeZone = TimeZone.getDefault();

	private static int todaySavedSteps;
	public static long currentIndex;
	public static long lastSavedIndex = -1l;
	private static long lastSaveTime;

	private static int notificationIconId = 0;
	
	private final BroadcastReceiver shutdownReceiver = new ShutdownReceiver();
	  
	@Override
	public void onAccuracyChanged(final Sensor sensor, int accuracy) {
		Log.d("STEPPER", "SensorListener.onAccuracyChanged " + accuracy);
	}

	@Override
	public void onSensorChanged(final SensorEvent event) {
		Log.v("STEPPER", "SensorListener.onSensorChanged " + event.values[0]);
		currentIndex = (long) event.values[0];	
		if (!Util.isSameDay(System.currentTimeMillis(), lastSaveTime, timeZone)) {
			todaySavedSteps = 0;
			try {
			  StepperPlugin.updateUI(todaySteps());
			  showNotification();
			} finally {
				saveCurrentIndex(getApplicationContext());
			}
		} else if (currentIndex > lastSavedIndex + SAVE_OFFSET_STEPS
				|| (currentIndex > 0 && System.currentTimeMillis() > lastSaveTime + SAVE_OFFSET_TIME_MS)) {
			try {
			  StepperPlugin.updateUI(todaySteps());
			  showNotification();
			} finally {
				saveCurrentIndex(getApplicationContext());
			}
		} else {
			StepperPlugin.updateUI(todaySteps());
			showNotification();
		}
	}

	private int todaySteps() {
		int steps = todaySavedSteps;
		int diff = (int) (currentIndex - lastSavedIndex);
		if (lastSavedIndex != -1l && diff > 0 && diff < 10000) {
		  steps += diff;
		}
		return steps;
	}

	private void registerBroadcastReceiver() {
		IntentFilter filter = new IntentFilter();
		filter.addAction(Intent.ACTION_SHUTDOWN);
		registerReceiver(shutdownReceiver, filter);
	}

	public static void saveCurrentIndex(Context context) {
		long currentTime = System.currentTimeMillis();
		if (!Util.isSameDay(currentTime, lastSaveTime, timeZone)) {
			todaySavedSteps = 0;
		}
		Log.i("STEPPER", "SensorListener.saveCurrentIndex lastSavedIndex=" + lastSavedIndex + ", lastSaveTime="
				+ lastSaveTime + ", currentIndex=" + currentIndex + ", currentTime=" + currentTime);
		if (lastSaveTime > currentTime) {
			Log.e("STEPPER", "lastSaveTime > currentTime : " + lastSaveTime + " > " + currentTime);
			return;
		}
		Database db = Database.getInstance(context);
		if (currentTime - lastSaveTime >= 3 * 24 * 3600 * 1000) {
			Log.i("STEPPER", "Last save was long time ago");
			db.createNewEntry(currentTime, currentIndex);
		} else if (currentIndex < lastSavedIndex || (currentIndex - lastSavedIndex > 1000
				&& (currentIndex - lastSavedIndex) * 60000 / (currentTime - lastSaveTime) >= 500)) {
			// index jump detected
			Log.i("STEPPER", "Index jump detected");
			db.createNewEntry(currentTime, currentIndex);
		} else {
			db.updateLatestEntry(currentTime, currentIndex);
			if (!Util.isSameHour(currentTime, lastSaveTime, timeZone)) {
				db.createNewEntry(currentTime, currentIndex);
			}
			todaySavedSteps += currentIndex - lastSavedIndex;
		}
		db.close();
		lastSavedIndex = currentIndex;
		lastSaveTime = currentTime;
	}

	private void showNotification() {
		if (getSharedPreferences("pedometer", Context.MODE_PRIVATE).getBoolean("notification", true)) {
			if (Build.VERSION.SDK_INT >= 26) {
				startForeground(NOTIFICATION_ID, getNotification());
			} else {
				((NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE)).notify(NOTIFICATION_ID,
						getNotification());
			}
		}
	}

	@Override
	public IBinder onBind(final Intent intent) {
		return null;
	}

	@Override
	public int onStartCommand(final Intent intent, int flags, int startId) {
		Log.i("STEPPER", "SensorListener.onStartCommand");

		SharedPreferences prefs = getSharedPreferences("pedometer", Context.MODE_PRIVATE);
		String timeZoneString = prefs.getString(Config.TIMEZONE, null);
		if (timeZoneString != null)
			this.timeZone = TimeZone.getTimeZone(timeZoneString);

		reRegisterSensor();
		registerBroadcastReceiver();
		showNotification();
		
		// Load history from db
		Database db = Database.getInstance(getApplicationContext());
		todaySavedSteps = db.getSteps(Util.getToday(timeZone), System.currentTimeMillis());
		List<Entry> lastEntry = db.getLastEntries(1);
		db.close();
		if (!lastEntry.isEmpty()) {
			currentIndex = lastSavedIndex = lastEntry.get(0).endIndex;
			lastSaveTime = lastEntry.get(0).endTimestamp;
		}
		Log.d("STEPPER", "Loaded history from db todaySavedSteps=" + todaySavedSteps + ", lastSaveTime=" + lastSaveTime
				+ ", lastSavedIndex=" + lastSavedIndex);

		// restart service every fifteen minutes to save the current step count
		long nextUpdate = Math.min(Util.getNextHour(timeZone), System.currentTimeMillis() + AlarmManager.INTERVAL_FIFTEEN_MINUTES);
		scheduleStart(nextUpdate, 2);

		return START_STICKY;
	}

	private void scheduleStart(long timestamp, int taskId) {
		AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
		PendingIntent pi = PendingIntent.getService(this, taskId, new Intent(this, SensorListener.class),
				PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
		if (Build.VERSION.SDK_INT >= 23) {
			API23Wrapper.setAlarmWhileIdle(am, AlarmManager.RTC, timestamp, pi);
		} else {
			am.set(AlarmManager.RTC, timestamp, pi);
		}
	}

	@Override
	public void onCreate() {
		Log.i("STEPPER", "SensorListener.onCreate");
		super.onCreate();
	}

	private int getNotificationIconId() {
		int drawableId = getResources().getIdentifier("ic_footsteps_silhouette_variant", "drawable",
				getApplicationInfo().packageName);
		if (drawableId == 0) {
			drawableId = getApplicationInfo().icon;
		}
		return drawableId;
	}

	@Override
	public void onTaskRemoved(final Intent rootIntent) {
		Log.i("STEPPER", "SensorListener.onTaskRemoved");
		// Restart service in 2000 ms
		try {
		  scheduleStart(System.currentTimeMillis() + 2000, 3);
		} catch(Exception e) {
			Log.e("STEPPER", "scheduleStart FAILED");
		}
		saveCurrentIndex(getApplicationContext());
		super.onTaskRemoved(rootIntent);
	}

	@Override
	public void onDestroy() {
		Log.i("STEPPER", "SensorListener.onDestroy");
		saveCurrentIndex(getApplicationContext());
		super.onDestroy();
		try {
			SensorManager sm = (SensorManager) getSystemService(SENSOR_SERVICE);
			sm.unregisterListener(this);
			unregisterReceiver(shutdownReceiver);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Notification getNotification() {
		SharedPreferences prefs = getSharedPreferences("pedometer", Context.MODE_PRIVATE);
		int goal = prefs.getInt(Config.GOAL_PREF_INT, Config.DEFAULT_GOAL);
		Notification.Builder notificationBuilder = Build.VERSION.SDK_INT >= 26
				? API26Wrapper.getNotificationBuilder(getApplicationContext())
				: new Notification.Builder(getApplicationContext());
		if (todaySteps() > 0) {
			notificationBuilder.setProgress(goal, todaySteps(), false).setContentText(todaySteps() >= Math.max(goal, 1)
					? String.format(prefs.getString(Config.PEDOMETER_GOAL_REACHED_FORMAT_TEXT, "%s steps today"),
							NumberFormat.getInstance(Locale.getDefault()).format(todaySteps()),
							NumberFormat.getInstance(Locale.getDefault()).format(goal))
					: String.format(prefs.getString(Config.PEDOMETER_STEPS_TO_GO_FORMAT_TEXT, "%s steps to go"),
							NumberFormat.getInstance(Locale.getDefault()).format(goal - todaySteps()),
							NumberFormat.getInstance(Locale.getDefault()).format(todaySteps()),
							NumberFormat.getInstance(Locale.getDefault()).format(goal)));
		} else { // still no step value?
			notificationBuilder.setContentText(prefs.getString(Config.PEDOMETER_YOUR_PROGRESS_FORMAT_TEXT,
					"Your progress will be shown here soon"));
		}

		PackageManager packageManager = getPackageManager();
		Intent launchIntent = packageManager.getLaunchIntentForPackage(getPackageName());

		PendingIntent contentIntent = PendingIntent.getActivity(this, 0, launchIntent,
				PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

		if (notificationIconId == 0) {
			notificationIconId = getNotificationIconId();
		}

		notificationBuilder.setPriority(Notification.PRIORITY_DEFAULT).setShowWhen(false)
				.setContentTitle(prefs.getString(Config.PEDOMETER_IS_COUNTING_TEXT, "Pedometer is counting"))
				.setContentIntent(contentIntent).setSmallIcon(notificationIconId).setOngoing(true);
		return notificationBuilder.build();
	}

	private void reRegisterSensor() {
		SensorManager sm = (SensorManager) getSystemService(SENSOR_SERVICE);
		try {
			sm.unregisterListener(this);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (BuildConfig.DEBUG) {
			if (sm.getSensorList(Sensor.TYPE_STEP_COUNTER).size() < 1)
				return; // emulator
		}

		// enable batching with delay of max 2 min
		sm.registerListener(this, sm.getDefaultSensor(Sensor.TYPE_STEP_COUNTER), SensorManager.SENSOR_DELAY_GAME,
				(int) (2 * MICROSECONDS_IN_ONE_MINUTE));
	}
}
