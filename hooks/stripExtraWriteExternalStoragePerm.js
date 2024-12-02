const FS = require('fs');
const Path = require('path');


module.exports = function(ctx) {
  try{
  /**FS.access('platforms/android/app/src/main/res/xml/network_security_config.xml', FS.constants.F_OK, (err) => {
    if(err){
    console.log("network_security_config not Exist")
    FS.writeFileSync('platforms/android/app/src/main/res/xml/network_security_config.xml', '<?xml version="1.0" encoding="utf-8"?>\n<network-security-config />\n	<base-config cleartextTrafficPermitted="true" />\n</network-security-config>',(error)=>{if(error){console.log(error);};console.log("OK");});
    return;
    };
    console.log("network_security_config Exist")
    let path1 = Path.resolve('platforms/android/app/src/main/res/xml/network_security_config.xml');

    let manifest1 = FS.readFileSync(path1, {
      encoding: 'utf-8'
    });

    manifest1 = manifest1.replace(/^(\s)+<hello \/>$/gm, '<?xml version="1.0" encoding="utf-8"?>');
    FS.writeFileSync(path1, manifest1,(error)=>{if(error){console.log(error);};console.log("OK");});
  });
  **/
  // console.log(ctx);
  let path = Path.resolve('platforms/android/app/src/main/AndroidManifest.xml');

  let manifest = FS.readFileSync(path, {
      encoding: 'utf-8'
  });

  const cordova_android_version_path = Path.join(ctx.opts.projectRoot,'node_modules/cordova-android/package.json');
  let version_json = FS.readFileSync(cordova_android_version_path, {encoding: 'utf-8'});
  var jsonParsed = JSON.parse(version_json);
  var module_version = String(jsonParsed["version"].toString());
  
  /** 
   * If you really need androidx in cordova9,please try cordova-plugin-androidx
   * more infomation,check the notepad.txt
  */ 
  let gradle_path = Path.resolve('platforms/android/project.properties');

  let gradle = FS.readFileSync(gradle_path, {
      encoding: 'utf-8'
  });

  if (module_version.split(".")[0] == "9") gradle = gradle.replace('cordova.system.library.5=androidx.legacy:legacy-support-v4:1.0.0','#cordova.system.library.5=androidx.legacy:legacy-support-v4:1.0.0');
  if (module_version.split(".")[0] !== "9") gradle = gradle.replace('#cordova.system.library.5=androidx.legacy:legacy-support-v4:1.0.0','cordova.system.library.5=androidx.legacy:legacy-support-v4:1.0.0');
  FS.writeFileSync(gradle_path, gradle);

  // Strips ALL occurrences of <uses-permission android:name="androoid.permission.WRITE_EXTERNAL_STORAGE" />
  // If you have several conflicts (of different maxSDKVersion, or in different formats) then the regex
  // may need to be adjusted, or repeated for each format.
  //manifest = manifest.replace(/^(\s)+<uses-permission android:name="android.permission.INTERNET" \/>$/gm, '');
  //manifest = manifest.replace(/^(\s)+<receiver android:exported="true" android:name="org.apache.cordova.stepper.AppUpdatedReceiver">$/gm, '');
  //manifest = manifest.replace(/^(\s)+<receiver android:exported="true" android:name="org.apache.cordova.stepper.BootReceiver">$/gm, '');
  //manifest = manifest.replace(/^(\s)+<receiver android:name="org.apache.cordova.stepper.AppUpdatedReceiver">$/gm, '        <receiver android:exported="true" android:name="org.apache.cordova.stepper.AppUpdatedReceiver">');
  //manifest = manifest.replace(/^(\s)+<receiver android:name="org.apache.cordova.stepper.BootReceiver">$/gm, '        <receiver android:exported="true" android:name="org.apache.cordova.stepper.BootReceiver">');
  // manifest = manifest.replace(/^(\s)+<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" \/>$/gm, '')
  manifest = manifest.replace(/^(\s)+<application android:usesCleartextTraffic="true"$/gm, '');
  manifest = manifest.replace(/^(\s)+<application android:hardwareAccelerated="true"$/gm, '<application android:usesCleartextTraffic="true" android:hardwareAccelerated="true"');
  if (module_version.split(".")[0] == "9") manifest = manifest.replace(/^(\s)+android:theme="@style\/Theme.App.SplashScreen"$/gm, '');
  if (module_version.split(".")[0] == "9") manifest = manifest.replace('android:theme="@style/Theme.App.SplashScreen"','');
  FS.writeFileSync(path, manifest);
  return "Fix Android Manifest Hook Scucess";
}catch(err){
  console.log(err);
  throw err;
}
}