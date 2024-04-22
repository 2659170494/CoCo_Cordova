package name.ratson.cordova.calltrap;

import android.content.Context;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class CallTrap extends CordovaPlugin {

    CallStateListener listener;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        prepareListener();

        listener.setCallbackContext(callbackContext);

        return true;
    }

    private void prepareListener() {
        if (listener == null) {
            listener = new CallStateListener();
            TelephonyManager TelephonyMgr = (TelephonyManager) cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
            TelephonyMgr.listen(listener, PhoneStateListener.LISTEN_CALL_STATE);
        }
    }
}

class CallStateListener extends PhoneStateListener {

    private CallbackContext callbackContext;

    public void setCallbackContext(CallbackContext callbackContext) {
        this.callbackContext = callbackContext;
    }

    public void onCallStateChanged(int state, String incomingNumber) {
        super.onCallStateChanged(state, incomingNumber);

        if (callbackContext == null) return;

        String msg = "";

        switch (state) {
            case TelephonyManager.CALL_STATE_IDLE:
                msg = "IDLE";
                break;

            case TelephonyManager.CALL_STATE_OFFHOOK:
                msg = "OFFHOOK";
                break;

            case TelephonyManager.CALL_STATE_RINGING:
                msg = "RINGING";
                break;
        }

        JSONObject jsonObj = new JSONObject();

        try {
            jsonObj.put("state", msg);
            jsonObj.put("number", incomingNumber);
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }


        PluginResult result = new PluginResult(PluginResult.Status.OK, jsonObj);
        result.setKeepCallback(true);

        callbackContext.sendPluginResult(result);
    }
}
