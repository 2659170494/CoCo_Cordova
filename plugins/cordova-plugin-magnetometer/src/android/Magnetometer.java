/**
*   Magnetometer.java
*
*   A Java Class for the Cordova Magnetometer Plugin
*
*   @by Steven de Salas (desalasworks.com | github/sdesalas)
*   @licence MIT
*
*   @see https://github.com/sdesalas/cordova-plugin-magnetometer
*   @see https://github.com/apache/cordova-plugin-device-orientation
*   @see http://www.techrepublic.com/article/pro-tip-create-your-own-magnetic-compass-using-androids-internal-sensors/
*   
*/

package org.apache.cordova.magnetometer;

import java.util.List;
import java.util.ArrayList;
import java.lang.Math;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.content.Context;

import android.os.Handler;
import android.os.Looper;


public class Magnetometer extends CordovaPlugin implements SensorEventListener  {

    public static int STOPPED = 0;
    public static int STARTING = 1;
    public static int RUNNING = 2;
    public static int ERROR_FAILED_TO_START = 3;

    public long TIMEOUT = 30000;        // Timeout in msec to shut off listener

    int status;                         // status of listener
    float x;                            // magnetometer x value
    float y;                            // magnetometer y value
    float z;                            // magnetometer z value
    float magnitude;                    // magnetometer calculated magnitude
    long timeStamp;                     // time of most recent value
    long lastAccessTime;                // time the value was last retrieved

    private SensorManager sensorManager;// Sensor manager
    Sensor mSensor;                     // Magnetic sensor returned by sensor manager

    private CallbackContext callbackContext;
    List<CallbackContext> watchContexts;

    public Magnetometer() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.timeStamp = 0;
        this.watchContexts = new ArrayList<CallbackContext>();
        this.setStatus(Magnetometer.STOPPED);
    }

    public void onDestroy() {
        this.stop();
    }

    public void onReset() {
        this.stop();
    }

    //--------------------------------------------------------------------------
    // Cordova Plugin Methods
    //--------------------------------------------------------------------------

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.sensorManager = (SensorManager) cordova.getActivity().getSystemService(Context.SENSOR_SERVICE);
    }

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("start")) {
            this.start();
        }
        else if (action.equals("stop")) {
            this.stop();
        }
        else if (action.equals("getStatus")) {
            int i = this.getStatus();
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, i));
        }
        else if (action.equals("getReading")) {
            // If not running, then this is an async call, so don't worry about waiting
            if (this.status != Magnetometer.RUNNING) {
                int r = this.start();
                if (r == Magnetometer.ERROR_FAILED_TO_START) {
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.IO_EXCEPTION, Magnetometer.ERROR_FAILED_TO_START));
                    return false;
                }
                // Set a timeout callback on the main thread.
                Handler handler = new Handler(Looper.getMainLooper());
                handler.postDelayed(new Runnable() {
                    public void run() {
                        Magnetometer.this.timeout();
                    }
                }, 2000);
            }
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, getReading()));
        } else {
            // Unsupported action
            return false;
        }
        return true;
    }

    //--------------------------------------------------------------------------
    // Local Methods
    //--------------------------------------------------------------------------

    /**
     * Start listening for compass sensor.
     *
     * @return          status of listener
     */
    public int start() {

        // If already starting or running, then just return
        if ((this.status == Magnetometer.RUNNING) || (this.status == Magnetometer.STARTING)) {
            return this.status;
        }

        // Get magnetic field sensor from sensor manager
        @SuppressWarnings("deprecation")
        List<Sensor> list = this.sensorManager.getSensorList(Sensor.TYPE_MAGNETIC_FIELD);

        // If found, then register as listener
        if (list != null && list.size() > 0) {
            this.mSensor = list.get(0);
            this.sensorManager.registerListener(this, this.mSensor, SensorManager.SENSOR_DELAY_NORMAL);
            this.lastAccessTime = System.currentTimeMillis();
            this.setStatus(Magnetometer.STARTING);
        }

        // If error, then set status to error
        else {
            this.setStatus(Magnetometer.ERROR_FAILED_TO_START);
        }

        return this.status;
    }

    /**
     * Stop listening to compass sensor.
     */
    public void stop() {
        if (this.status != Magnetometer.STOPPED) {
            this.sensorManager.unregisterListener(this);
        }
        this.setStatus(Magnetometer.STOPPED);
    }

    /**
     * Called after a delay to time out if the listener has not attached fast enough.
     */
    private void timeout() {
        if (this.status == Magnetometer.STARTING) {
            this.setStatus(Magnetometer.ERROR_FAILED_TO_START);
            if (this.callbackContext != null) {
                this.callbackContext.error("Magnetometer listener failed to start.");
            }
        }
    }


    //--------------------------------------------------------------------------
    // SensorEventListener Interface
    //--------------------------------------------------------------------------

    /**
     * Sensor listener event.
     *
     * @param event
     */
    public void onSensorChanged(SensorEvent event) {

        // Save reading
        this.timeStamp = System.currentTimeMillis();
        this.x = event.values[0];
        this.y = event.values[1];
        this.z = event.values[2];

        // If heading hasn't been read for TIMEOUT time, then turn off compass sensor to save power
        if ((this.timeStamp - this.lastAccessTime) > this.TIMEOUT) {
            this.stop();
        }
    }

    /**
     * Required by SensorEventListener
     * @param sensor
     * @param accuracy
     */
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // DO NOTHING
    }

    // ------------------------------------------------
    // JavaScript Interaction
    // ------------------------------------------------

    /**
     * Get status of magnetic sensor.
     *
     * @return          status
     */
    public int getStatus() {
        return this.status;
    }

    /**
     * Set the status and send it to JavaScript.
     * @param status
     */
    private void setStatus(int status) {
        this.status = status;
    }

    /**
     * Create the Reading JSON object to be returned to JavaScript
     *
     * @return a magnetic sensor reading
     */
    private JSONObject getReading() throws JSONException {
        JSONObject obj = new JSONObject();

        obj.put("x", this.x);
        obj.put("y", this.y);
        obj.put("z", this.z);

        double x2 = Float.valueOf(this.x * this.x).doubleValue();
        double y2 = Float.valueOf(this.y * this.y).doubleValue();
        double z2 = Float.valueOf(this.z * this.z).doubleValue();

        obj.put("magnitude", Math.sqrt(x2 + y2 + z2));

        return obj;
    }
}
