# Cordova Plugin Viewport
[![npm](https://img.shields.io/npm/v/cordova-plugin-viewport.svg?style=flat-square)](https://www.npmjs.com/package/cordova-plugin-viewport)
[![npm](https://img.shields.io/npm/dm/cordova-plugin-viewport.svg?style=flat-square)](https://www.npmjs.com/package/cordova-plugin-viewport)
[![license](https://img.shields.io/github/license/cakuki/cordova-plugin-viewport.svg?style=flat-square)](LICENSE)

Sets Cordova app's web view to use wide (zoomed out) and device width sized viewport.

## How it works?

This plugin adds only an `after_prepare` hook to change your app's main activity file. Cordova's prepare command is called before every build and run unless it's explicitly turned off.

As this overrides your main activity file, you cannot use this plugin with manually managed (android specific development way) android projects. But you can copy the logic from plugin into your files of course.
