package org.apache.cordova.stepper.util;

import java.util.Calendar;
import java.util.TimeZone;

public abstract class Util {
	
    /**
     * @return milliseconds since 1.1.1970 for today 0:00:00 local timezone
     */
    public static long getToday(TimeZone timeZone) {
        Calendar c = Calendar.getInstance(timeZone);
        c.setTimeInMillis(System.currentTimeMillis());
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        return c.getTimeInMillis();
    }
    
    public static boolean isSameDay(long date1, long date2, TimeZone timeZone) {
        Calendar c1 = Calendar.getInstance(timeZone);
        c1.setTimeInMillis(date1);
        Calendar c2 = Calendar.getInstance(timeZone);
        c2.setTimeInMillis(date2);
        return c1.get(Calendar.DAY_OF_YEAR) == c2.get(Calendar.DAY_OF_YEAR) && c1.get(Calendar.YEAR) == c2.get(Calendar.YEAR);
    }
    
    public static boolean isSameHour(long date1, long date2, TimeZone timeZone) {
        Calendar c1 = Calendar.getInstance(timeZone);
        c1.setTimeInMillis(date1);
        Calendar c2 = Calendar.getInstance(timeZone);
        c2.setTimeInMillis(date2);
        return c1.get(Calendar.HOUR_OF_DAY) == c2.get(Calendar.HOUR_OF_DAY) && c1.get(Calendar.DAY_OF_YEAR) == c2.get(Calendar.DAY_OF_YEAR) && c1.get(Calendar.YEAR) == c2.get(Calendar.YEAR);
    }

    /**
     * @return milliseconds since 1.1.1970 for tomorrow 0:00:01 local timezone
     */
    public static long getNextHour(TimeZone timeZone) {
        Calendar c = Calendar.getInstance(timeZone);
        c.setTimeInMillis(System.currentTimeMillis());
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 1);
        c.set(Calendar.MILLISECOND, 0);
        c.add(Calendar.HOUR_OF_DAY, 1);
        return c.getTimeInMillis();
    }
}
