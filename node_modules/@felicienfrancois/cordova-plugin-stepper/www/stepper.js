var exec = require("cordova/exec");

var Stepper = function () {
    this.name = "Stepper";
};

// IOS & Android - Documented
Stepper.prototype.isStepCountingAvailable = function (onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "isStepCountingAvailable", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// IOS & Android - Documented
Stepper.prototype.requestPermission = function (onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        if(!/^android|amazon/i.test(device.platform)) {
          return resolve(true);
        }
        exec(resolve, reject, "Stepper", "requestPermission", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// IOS & Android - Documented
Stepper.prototype.disableBatteryOptimizations = function (onSuccess, onError) {
    let promise = new Promise(function(resolve) {
        if(!/^android|amazon/i.test(device.platform)) {
          return resolve(false);
        }
        exec(resolve, () => resolve(false), "Stepper", "disableBatteryOptimizations", []);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// IOS & Android - Documented
Stepper.prototype.startStepperUpdates = function(options, onSuccess, onError, extra) {
    let opts = extra || {};
    if (typeof(options) === "object") {
        opts = options;
    }
    const now = new Date();
    const hms = now.toLocaleString("en-UK", {timeZone: options.timeZone || undefined}).split(", ")[1].split(":");
    const endOfDay = new Date(now.getTime() - hms[0]*3600000 - hms[1]*60000 - hms[2]*1000 + 24*3600000);
    exec((result) => {
    	if (result && result.startDate && new Date() >= endOfDay) {
    		this.stopStepperUpdates(
    			false,
        	    this.startStepperUpdates.bind(this, options, onSuccess, onError, extra),
        	    this.startStepperUpdates.bind(this, options, onSuccess, onError, extra)
            );
    		return;
    	}
        return onSuccess(result);
    }, onError, "Stepper", "startStepperUpdates", [opts]);
};

// IOS & Android - Documented
Stepper.prototype.stopStepperUpdates = function (clearDatabase, onSuccess, onError) {
	if (typeof(clearDatabase) !== "boolean") {
		onError = onSuccess;
		onSuccess = clearDatabase;
		clearDatabase = false;
	}
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "stopStepperUpdates", [clearDatabase]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// IOS & Android - Documented
Stepper.prototype.destroy = function (onSuccess, onError) {
    return this.stopStepperUpdates(true, onSuccess, onError);
};

// IOS & Android - Documented
Stepper.prototype.getSteps = function (date, onSuccess, onError) {
	const startDate = new Date(date || new Date());
	startDate.setHours(0,0,0,0);
	const endDate = new Date(date || new Date());
	endDate.setHours(23,59,59,999);
    return this.getStepsByPeriod(startDate, endDate, onSuccess, onError);
};

// IOS & Android - Documented
Stepper.prototype.getStepsByPeriod = function (start, end, onSuccess, onError) {
    const startDate = start instanceof Date ? start : new Date(start);
    const endDate = end instanceof Date ? end : new Date(end);
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "getStepsByPeriod", [startDate.toISOString(), endDate.toISOString()]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// Android - Behave wierd - Documented
Stepper.prototype.getLastEntries = function (num, onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "getLastEntries", [num]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// Android - Documented
Stepper.prototype.setNotificationLocalizedStrings = function (keyValueObj, onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "setNotificationLocalizedStrings", [keyValueObj]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

// Android - Documented
Stepper.prototype.setGoal = function (num, onSuccess, onError) {
    let promise = new Promise(function(resolve, reject) {
        exec(resolve, reject, "Stepper", "setGoal", [num]);
    });
    if (onSuccess) promise = promise.then(onSuccess);
    if (onError) promise = promise.catch(onError);
    return promise;
};

module.exports = new Stepper();