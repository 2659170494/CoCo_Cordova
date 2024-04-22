package org.apache.cordova.stepper.util;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.os.Build;

@TargetApi(Build.VERSION_CODES.M)
public class API23Wrapper {

    public static void requestPermission(final Activity a, final String[] permissions) {
        a.requestPermissions(permissions, 42);
    }

    public static void setAlarmWhileIdle(AlarmManager am, int type, long time,
                                         PendingIntent intent) {
        am.setAndAllowWhileIdle(type, time, intent);
    }

}
