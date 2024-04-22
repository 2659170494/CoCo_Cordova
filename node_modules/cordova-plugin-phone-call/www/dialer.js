var exec = require('cordova/exec');
var platformId = require('cordova/platform').id;

module.exports = {

    /**
     * Call the native dialer
     *
     * @param {String, Function}      The phone number to call, The callback error function
     */
    dial: function(phnum, successCallback, errorCallback, bypassAppChooser) {
        if (phnum == null) errorCallback("empty");
        if (platformId == 'ios' || platformId == 'android') {
            exec(
                successCallback, 
                errorCallback, 
                "PhoneDialer", 
                "dial", 
                [phnum, bypassAppChooser]
            );
        } else {
            document.location.href = "tel:" + phnum;
            if (successCallback) successCallback();
        }
    },
    call: function(phnum, successCallback, errorCallback, speakerOn, bypassAppChooser) {
        if (phnum == null) errorCallback("empty");
        if (platformId == 'ios' || platformId == 'android') {
            exec(
                successCallback, 
                errorCallback, 
                "PhoneDialer", 
                "call", 
                [phnum, bypassAppChooser, speakerOn]
            );
        } else {
            document.location.href = "tel:" + phnum;
            if (successCallback) successCallback();
        }
    }
};