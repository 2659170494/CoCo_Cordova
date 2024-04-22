import exec from 'cordova/exec'

export const STATE = {
  RINGING: 'RINGING',
  OFFHOOK: 'OFFHOOK',
  IDLE: 'IDLE',
}

function defaultErrorCallback() {
  console.log("WARNING: CallTrap errorCallback not implemented")
}

export function onCall(successCallback, errorCallback) {
  errorCallback = errorCallback || defaultErrorCallback
  exec(successCallback, errorCallback, 'CallTrap', 'onCall', [])
}
