Cordova PhoneCall Trap
=======================

It is a Apache Cordova plugin to simplify handling phone call status and events in Android devices.


## Install

```
cordova plugin add cordova-plugin-calltrap --save
```


## Quick Example

```js
CallTrap.onCall((state) => {
  console.log(`CHANGE STATE: ${state}`)

  switch (state) {
    case CallTrap.STATE.RINGING:
      console.log('Phone is ringing')
      break
    case CallTrap.STATE.OFFHOOK:
      console.log('Phone is off-hook')
      break
    case CallTrap.STATE.IDLE:
      console.log('Phone is idle')
      break
  }
})
```


## Supported platforms

- Android 2.3.3 or higher


## References

We have tried PhoneListener but it is only compatible with PhoneGap 1.6 and does not work with new Apache Cordova versions. Also, its deployment isn't as easy as an Apache Cordova plugin should be. We are thankful for their work, though.

https://github.com/devgeeks/PhoneListener

http://stackoverflow.com/questions/28337385/cordova-long-running-location-service
http://www.codeproject.com/Articles/548416/Detecting-incoming-and-outgoing-phone-calls-on-And
https://github.com/renanoliveira/cordova-phone-call-trap

## License

Cordova PhoneCall Trap is released under the [MIT License](http://www.opensource.org/licenses/MIT).
