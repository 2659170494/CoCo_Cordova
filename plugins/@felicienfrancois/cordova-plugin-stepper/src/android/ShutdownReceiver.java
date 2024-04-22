package org.apache.cordova.stepper;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.content.SharedPreferences;

public class ShutdownReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(final Context context, final Intent intent) {
        SharedPreferences prefs = context.getSharedPreferences("pedometer", Context.MODE_PRIVATE);
        Log.i("STEPPER", "ShutdownReceiver.onReceive enabled:" + prefs.getBoolean("enabled", false));

        if (prefs.getBoolean("enabled", false)) {
          SensorListener.saveCurrentIndex(context);
        }
    }

}