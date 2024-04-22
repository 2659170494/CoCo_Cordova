'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATE = undefined;
exports.onCall = onCall;

var _exec = require('cordova/exec');

var _exec2 = _interopRequireDefault(_exec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATE = exports.STATE = {
  RINGING: 'RINGING',
  OFFHOOK: 'OFFHOOK',
  IDLE: 'IDLE'
};

function defaultErrorCallback() {
  console.log("WARNING: CallTrap errorCallback not implemented");
}

function onCall(successCallback, errorCallback) {
  errorCallback = errorCallback || defaultErrorCallback;
  (0, _exec2.default)(successCallback, errorCallback, 'CallTrap', 'onCall', []);
}