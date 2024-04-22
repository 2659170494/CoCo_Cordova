package org.apache.cordova.stepper.util;

import android.database.Cursor;

public class Entry {

	public long startTimestamp;
	public long startIndex;
	public long endTimestamp;
	public long endIndex;
	
	public Entry(Cursor c) {
		this.startTimestamp = c.getLong(0);
		this.startIndex = c.getLong(1);
		this.endTimestamp = c.getLong(2);
		this.endIndex = c.getLong(3);
	}
}
