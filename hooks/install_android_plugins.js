const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');
/**Context {
  hook: 'after_plugin_add',
  opts: {
    searchpath: undefined,
    noregistry: undefined,
    nohooks: undefined,
    cli_variables: {},
    link: false,
    save: true,
    save_exact: false,
    shrinkwrap: false,
    force: false,
    production: true,
    options: [],
    plugins: [ 'cordova-plugin-qrscanner' ],
    cordova: { plugins: [Array], platforms: [Array], version: '12.0.1' },
    projectRoot: '/workspaces/CoCo_Cordova'
  },
  cmdLine: '/usr/local/share/nvm/versions/node/v20.15.1/bin/node /home/codespace/nvm/current/bin/cordova plugin add cordova-plugin-qrscanner',
  scriptLocation: '/workspaces/CoCo_Cordova/hooks/install_plugins.js'
} */

function cordova_plugin_qrscanner(module_version,ctx){
    if (module_version.split(".")[0] !== "9"){
        needchange_path = "src/android/QRScanner.java"
        needchange_ori = "import android.support.v4.app.ActivityCompat;"
        needchange_new = "import androidx.core.app.ActivityCompat;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-qrscanner',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-qrscanner',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/qrscanner.gradle"
        needchange_ori = "compile 'com.journeyapps:zxing-android-embedded:3.3.0'"
        needchange_new = "implementation 'com.journeyapps:zxing-android-embedded:3.3.0'"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-qrscanner',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-qrscanner',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        module_java = module_java.replace("compile 'com.android.support:appcompat-v7:23.1.0'","implementation 'com.android.support:appcompat-v7:23.1.0'")
        platform_java = platform_java.replace("compile 'com.android.support:appcompat-v7:23.1.0'","implementation 'com.android.support:appcompat-v7:23.1.0'")
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
    }else{
        needchange_path = "src/android/QRScanner.java"
        needchange_ori = "import androidx.core.app.ActivityCompat;"
        needchange_new = "import android.support.v4.app.ActivityCompat;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-qrscanner',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-qrscanner',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/qrscanner.gradle"
        needchange_ori = "implementation 'com.journeyapps:zxing-android-embedded:3.3.0'"
        needchange_new = "compile 'com.journeyapps:zxing-android-embedded:3.3.0'"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-qrscanner',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-qrscanner',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        module_java = module_java.replace("compile 'com.android.support:appcompat-v7:23.1.0'","implementation 'com.android.support:appcompat-v7:23.1.0'")
        platform_java = platform_java.replace("compile 'com.android.support:appcompat-v7:23.1.0'","implementation 'com.android.support:appcompat-v7:23.1.0'")
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
    }
}

function cordova_plugin_camera(module_version,ctx){
    if (module_version.split(".")[0] !== "9"){
        needchange_path = "src/android/CordovaUri.java"
        needchange_ori = "android.support.v4.content.FileProvider"
        needchange_new = "androidx.core.content.FileProvider"
        var platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-camera',needchange_path);
        var apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-camera',needchange_path);
        var module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        var platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/CameraLauncher.java"
        needchange_ori = "android.support.v4.content.FileProvider"
        needchange_new = "androidx.core.content.FileProvider"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-camera',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-camera',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/FileProvider.java"
        needchange_ori = "android.support.v4.content.FileProvider"
        needchange_new = "androidx.core.content.FileProvider"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-camera',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-camera',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
    }else{
        needchange_path = "src/android/CordovaUri.java"
        needchange_new = "android.support.v4.content.FileProvider"
        needchange_ori = "androidx.core.content.FileProvider"
        var platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-camera',needchange_path);
        var apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-camera',needchange_path);
        var module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        var platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/CameraLauncher.java"
        needchange_new = "android.support.v4.content.FileProvider"
        needchange_ori = "androidx.core.content.FileProvider"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-camera',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-camera',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
        
        needchange_path = "src/android/FileProvider.java"
        needchange_new = "android.support.v4.content.FileProvider"
        needchange_ori = "androidx.core.content.FileProvider"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-camera',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-camera',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
    }
}

function felicienfrancois_cordova_plugin_stepper(module_version,ctx){
    if (module_version.split(".")[0] !== "9"){
        needchange_path = "src/android/AppUpdatedReceiver.java"
        needchange_ori = "import org.apache.cordova.BuildConfig;"
        needchange_new = "//import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/BootReceiver.java"
        needchange_ori = "import org.apache.cordova.BuildConfig;"
        needchange_new = "//import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/SensorListener.java"
        needchange_ori = "import org.apache.cordova.BuildConfig;"
        needchange_new = "//import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
        
        needchange_path = "src/android/SensorListener.java"
        needchange_ori = `if (BuildConfig.DEBUG) {
			if (sm.getSensorList(Sensor.TYPE_STEP_COUNTER).size() < 1)
				return; // emulator
		}`
        needchange_new = `/**if(BuildConfig.DEBUG){if (sm.getSensorList(Sensor.TYPE_STEP_COUNTER).size() < 1){return; // emulator}}*/`
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/Database.java"
        needchange_ori = "import org.apache.cordova.BuildConfig;"
        needchange_new = "//import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
    }else{
        needchange_path = "src/android/AppUpdatedReceiver.java"
        needchange_ori = "//import org.apache.cordova.BuildConfig;"
        needchange_new = "import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/BootReceiver.java"
        needchange_ori = "//import org.apache.cordova.BuildConfig;"
        needchange_new = "import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/SensorListener.java"
        needchange_ori = "//import org.apache.cordova.BuildConfig;"
        needchange_new = "import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
        
        needchange_path = "src/android/SensorListener.java"
        needchange_ori = `/**if(BuildConfig.DEBUG){if (sm.getSensorList(Sensor.TYPE_STEP_COUNTER).size() < 1){return; // emulator}}*/`
        needchange_new = `if (BuildConfig.DEBUG) {
			if (sm.getSensorList(Sensor.TYPE_STEP_COUNTER).size() < 1)
				return; // emulator
		}`
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/Database.java"
        needchange_ori = "//import org.apache.cordova.BuildConfig;"
        needchange_new = "import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/@felicienfrancois/cordova-plugin-stepper',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
    }
}

module.exports = function(ctx) {
    try{
        const ctx_plugins = ctx.opts.plugins
        const cordova_android_version_path = path.join(ctx.opts.projectRoot,'node_modules/cordova-android/package.json');
        let version_json = fs.readFileSync(cordova_android_version_path, {encoding: 'utf-8'});
        var jsonParsed = JSON.parse(version_json);
        var module_version = String(jsonParsed["version"].toString());
        // const platformRoot = path.join(ctx.opts.projectRoot, 'plugins');
        // const apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules');
        if (ctx_plugins.indexOf('cordova-plugin-qrscanner') !== -1){
            cordova_plugin_qrscanner(module_version,ctx)
        }
        if (ctx_plugins.indexOf('cordova-plugin-qrscanner') !== -1) ctx_plugins.push('cordova-plugin-camera');
        console.log(ctx_plugins)
        if (ctx_plugins.indexOf('cordova-plugin-camera') !== -1){
            cordova_plugin_camera(module_version,ctx)
        }
        if (ctx_plugins.indexOf('@felicienfrancois/cordova-plugin-stepper') !== -1){
            felicienfrancois_cordova_plugin_stepper(module_version,ctx)
        }
    }catch(err){
        console.log(err);
        throw err;
    }
};

