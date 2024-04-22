package org.apache.cordova.stepper;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Pair;
import android.util.Log;

import org.apache.cordova.BuildConfig;
import org.apache.cordova.stepper.util.Util;
import org.apache.cordova.stepper.util.Entry;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class Database extends SQLiteOpenHelper {

	private final static String DB_NAME = "steps";
	private final static int DB_VERSION = 4;

	private static Database instance;
	private static final AtomicInteger openCounter = new AtomicInteger();

	private Database(final Context context) {
		super(context, DB_NAME, null, DB_VERSION);
	}

	public static synchronized Database getInstance(final Context c) {
		if (instance == null) {
			instance = new Database(c.getApplicationContext());
			instance.clearOldEntries();
		}
		openCounter.incrementAndGet();
		return instance;
	}

	@Override
	public void close() {
		if (openCounter.decrementAndGet() == 0) {
			super.close();
		}
	}

	@Override
	public void onCreate(final SQLiteDatabase db) {
		Log.e("STEPPER", "Database.onCreate");
		db.execSQL("CREATE TABLE " + DB_NAME
				+ " (startTimestamp INTEGER, startIndex INTEGER, endTimestamp INTEGER, endIndex INTEGER)");
		db.execSQL("CREATE UNIQUE INDEX idx_startTimestamp ON " + DB_NAME + " (startTimestamp);");
		db.execSQL("CREATE INDEX idx_endTimestamp ON " + DB_NAME + " (endTimestamp);");
	}

	@Override
	public void onUpgrade(final SQLiteDatabase db, int oldVersion, int newVersion) {
		Log.i("STEPPER", "Database.onUpgrade " + oldVersion + " => " + newVersion);
		if (oldVersion <= 1) {
			// drop PRIMARY KEY constraint
			db.execSQL("CREATE TABLE " + DB_NAME + "2 (date INTEGER, steps INTEGER)");
			db.execSQL("INSERT INTO " + DB_NAME + "2 (date, steps) SELECT date, steps FROM " + DB_NAME);
			db.execSQL("DROP TABLE " + DB_NAME);
			db.execSQL("ALTER TABLE " + DB_NAME + "2 RENAME TO " + DB_NAME + "");
		}
		if (oldVersion <= 2) {
			db.execSQL("CREATE TABLE " + DB_NAME
					+ "2 (startTimestamp INTEGER, startIndex INTEGER, endTimestamp INTEGER, endIndex INTEGER)");
			db.execSQL("INSERT INTO " + DB_NAME
					+ "2 (startTimestamp, startIndex, endTimestamp, endIndex) SELECT date, 0, date + (24*3600 - 1)*1000, steps FROM "
					+ DB_NAME + " WHERE date <> -1");
			Cursor c = db.query(DB_NAME, new String[] { "steps" }, "date = ?", new String[] { "-1" }, null, null, null);
			c.moveToFirst();
			if (c.getCount() > 0) {
				int currentIndex = c.getInt(0);
				db.execSQL("UPDATE " + DB_NAME + "2 SET startIndex = -endIndex , endIndex = " + currentIndex + " WHERE endIndex < 0");
			} else {
				db.execSQL("UPDATE " + DB_NAME + "2 SET startIndex = -endIndex , endIndex = -endIndex WHERE endIndex < 0");
			}
			c.close();
			long currentTime = System.currentTimeMillis();
			db.execSQL("UPDATE " + DB_NAME + "2 SET endTimestamp = " + currentTime + " WHERE endTimestamp > "
					+ currentTime);
			db.execSQL("DELETE FROM " + DB_NAME + "2 WHERE endTimestamp < startTimestamp");
			db.execSQL("DROP TABLE " + DB_NAME);
			db.execSQL("ALTER TABLE " + DB_NAME + "2 RENAME TO " + DB_NAME + "");
		}
		if (oldVersion <= 3) {
			db.execSQL("CREATE UNIQUE INDEX idx_startTimestamp ON " + DB_NAME + " (startTimestamp);");
			db.execSQL("CREATE INDEX idx_endTimestamp ON " + DB_NAME + " (endTimestamp);");
		}
		Log.i("STEPPER", "Database upgrade complete");
	}

	/**
	 * Gets the last num entries in descending order of date (newest first)
	 *
	 * @param num the number of entries to get
	 * @return a list of long,integer pair - the first being the date, the second
	 *         the number of steps
	 */
	public List<Entry> getLastEntries(int num) {
		Cursor c = getReadableDatabase().query(DB_NAME,
				new String[] { "startTimestamp", "startIndex", "endTimestamp", "endIndex" }, "startTimestamp < " + System.currentTimeMillis(), null, null, null,
				"startTimestamp DESC", String.valueOf(num));
		int max = c.getCount();
		List<Entry> result = new ArrayList<Entry>(max);
		if (c.moveToFirst()) {
			do {
				result.add(new Entry(c));
			} while (c.moveToNext());
		}
		c.close();
		return result;
	}

	public void clearOldEntries() {
		Log.i("STEPPER", "Database.clearOldEntries");
		long limit = System.currentTimeMillis() - 7 * 24 * 3600 * 1000;
		getWritableDatabase().execSQL("DELETE FROM " + DB_NAME + " WHERE endTimestamp < " + limit);
	}

	public void updateLatestEntry(long currentTime, long currentIndex) {
		List<Entry> lastEntry = getLastEntries(1);
		if (lastEntry.size() == 0) {
			Log.e("STEPPER", "Database.updateLatestEntry : no entry found");
			return;
		}
		ContentValues values = new ContentValues();
		values.put("endTimestamp", currentTime);
		values.put("endIndex", currentIndex);

		getWritableDatabase().update(DB_NAME, values, "startTimestamp = " + lastEntry.get(0).startTimestamp, null);
	}

	public void createNewEntry(long currentTime, long currentIndex) {
		ContentValues values = new ContentValues();
		values.put("startTimestamp", currentTime);
		values.put("startIndex", currentIndex);
		values.put("endTimestamp", currentTime);
		values.put("endIndex", currentIndex);
		getWritableDatabase().insert(DB_NAME, null, values);
	}

	/**
	 * Get the number of steps taken between 'start' and 'end' date
	 *
	 * @param start start date in ms since 1970
	 * @param end   end date in ms since 1970
	 * @return the number of steps from 'start' to 'end'
	 */
	public int getSteps(final long start, final long end) {
		Cursor c = getReadableDatabase().query(DB_NAME, new String[] { "SUM(endIndex - startIndex)" },
				"startTimestamp >= ? AND startTimestamp < ?",
				new String[] { String.valueOf(start), String.valueOf(end) }, null, null, null);
		int result = 0;
		if (c.getCount() > 0) {
			c.moveToFirst();
			result = c.getInt(0);
		}
		c.close();
		return result;
	}

	public void clear() {
		getWritableDatabase().execSQL("delete from " + DB_NAME + "");
	}
}
