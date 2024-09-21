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
/**Context {
  hook: 'after_platform_add',
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
    platforms: [ 'android@9' ],
    projectRoot: '/workspaces/CoCo_Cordova',
    cordova: { platforms: [Array], plugins: [Array], version: '12.0.1' }
  },
  cmdLine: '/usr/local/share/nvm/versions/node/v20.15.1/bin/node /home/codespace/nvm/current/bin/cordova platform add android@9',
  scriptLocation: '/workspaces/CoCo_Cordova/hooks/install_android_plugins.js'
}
 */

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
        needchange_new = "//import org.apache.cordova.BuildConfig/;/"
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
        needchange_new = "//import org.apache.cordova.BuildConfig/;/"
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
        needchange_new = "//import org.apache.cordova.BuildConfig/;/"
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
        needchange_new = "//import org.apache.cordova.BuildConfig/;/"
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
        needchange_ori = "//import org.apache.cordova.BuildConfig/;/"
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
        needchange_ori = "//import org.apache.cordova.BuildConfig/;/"
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
        needchange_ori = "//import org.apache.cordova.BuildConfig/;/"
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
        needchange_ori = "//import org.apache.cordova.BuildConfig/;/"
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

function cordova_plugin_local_notification(module_version,ctx){
    if (module_version.split(".")[0] !== "9"){
        needchange_path = "src/android/build/localnotification.gradle"
        needchange_ori = 'compile "me.leolin:ShortcutBadger:${appShortcutBadgerVersion}@aar"'
        needchange_new = 'implementation "me.leolin:ShortcutBadger:${appShortcutBadgerVersion}@aar"'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/Notification.java"
        needchange_ori = 'import android.support.v4.util.ArraySet;'
        needchange_new = 'import androidx.collection.ArraySet;'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/Notification.java"
        needchange_ori = 'import android.support.v4.util.Pair;'
        needchange_new = 'import androidx.core.util.Pair;'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/Manager.java"
        needchange_ori = 'import static android.support.v4.app.'
        needchange_new = 'import static androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/Manager.java"
        needchange_ori = 'import android.support.v4.app.'
        needchange_new = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        for (var i=0; i<2; i++){
            needchange_path = "src/android/notification/Builder.java"
            needchange_ori = 'import android.support.v4.app.'
            needchange_new = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }

        needchange_path = "src/android/notification/Builder.java"
        needchange_ori = 'import android.support.v4.media.app.'
        needchange_new = 'import androidx.media.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/ClickReceiver.java"
        needchange_ori = 'import android.support.v4.app.'
        needchange_new = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/util/AssetProvider.java"
        needchange_ori = 'import android.support.v4.content.'
        needchange_new = 'import androidx.core.content.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/action/Action.java"
        needchange_ori = 'import android.support.v4.app.'
        needchange_new = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        for (var i=0; i<4; i++){
            needchange_path = "src/android/notification/Notification.java"
            needchange_ori = 'import android.support.v4.app.'
            needchange_new = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }

        for (var i=0; i<3; i++){
            needchange_path = "src/android/notification/Options.java"
            needchange_ori = 'import android.support.v4.app.'
            needchange_new = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }

        for (var i=0; i<7; i++){
            needchange_path = "src/android/notification/Options.java"
            needchange_ori = 'import static android.support.v4.app.'
            needchange_new = 'import static androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }

        for (var i=0; i<2; i++){
            needchange_path = "src/android/notification/Notification.java"
            needchange_ori = 'import static android.support.v4.app.'
            needchange_new = 'import static androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }
    }else{
        needchange_path = "src/android/notification/Notification.java"
        needchange_ori = 'implementation "me.leolin:ShortcutBadger:${appShortcutBadgerVersion}@aar"'
        needchange_new = 'compile "me.leolin:ShortcutBadger:${appShortcutBadgerVersion}@aar"'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/Notification.java"
        needchange_new = 'import android.support.v4.util.ArraySet;'
        needchange_ori = 'import androidx.collection.ArraySet;'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/Notification.java"
        needchange_new = 'import android.support.v4.util.Pair;'
        needchange_ori = 'import androidx.core.util.Pair;'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/Manager.java"
        needchange_new = 'import static android.support.v4.app.'
        needchange_ori = 'import static androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/Manager.java"
        needchange_new = 'import android.support.v4.app.'
        needchange_ori = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        for (var i=0; i<2; i++){
            needchange_path = "src/android/notification/Builder.java"
            needchange_new = 'import android.support.v4.app.'
            needchange_ori = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }

        needchange_path = "src/android/notification/Builder.java"
        needchange_new = 'import android.support.v4.media.app.'
        needchange_ori = 'import androidx.media.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/ClickReceiver.java"
        needchange_new = 'import android.support.v4.app.'
        needchange_ori = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/util/AssetProvider.java"
        needchange_new = 'import android.support.v4.content.'
        needchange_ori = 'import androidx.core.content.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        needchange_path = "src/android/notification/action/Action.java"
        needchange_new = 'import android.support.v4.app.'
        needchange_ori = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);

        for (var i=0; i<4; i++){
            needchange_path = "src/android/notification/Notification.java"
            needchange_new = 'import android.support.v4.app.'
            needchange_ori = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }

        for (var i=0; i<3; i++){
            needchange_path = "src/android/notification/Options.java"
            needchange_new = 'import android.support.v4.app.'
            needchange_ori = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }

        for (var i=0; i<7; i++){
            needchange_path = "src/android/notification/Options.java"
            needchange_new = 'import static android.support.v4.app.'
            needchange_ori = 'import static androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }

        for (var i=0; i<2; i++){
            needchange_path = "src/android/notification/Notification.java"
            needchange_new = 'import static android.support.v4.app.'
            needchange_ori = 'import static androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-local-notification',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-local-notification',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);
        }
    }
}

function cordova_plugin_whitelist(module_version,ctx){
    try{
        test1 = fs.readFileSync(path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist/src/android/WhitelistPlugin.java'), { encoding: 'utf-8' }); 
        test2 = fs.readFileSync(path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist/src/android/WhitelistPlugin.java'), { encoding: 'utf-8' }); 
    }catch(err){
        console.log('cordova_plugin_whitelist Hook is Crash');
        return err;
    }
    console.log('Finded cordova_plugin_whitelist,Starting Hook');
    try{
        if (module_version.split(".")[0] !== "9"){
            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_ori = 'import org.apache.cordova.Whitelist;'
            needchange_new = 'import org.apache.cordova.AllowList;'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            for (var i=0; i<3; i++){
                needchange_path = "src/android/WhitelistPlugin.java"
                needchange_ori = 'private Whitelist'
                needchange_new = 'private AllowList'
                platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
                apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
                module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
                platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
                module_java = module_java.replace(needchange_ori,needchange_new)
                platform_java = platform_java.replace(needchange_ori,needchange_new)
                fs.writeFileSync(platformRoot, module_java);
                fs.writeFileSync(apkFileLocation, platform_java);
            }

            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_ori = 'public WhitelistPlugin(Whitelist allowedNavigations, Whitelist allowedIntents, Whitelist allowedRequests) {'
            needchange_new = 'public WhitelistPlugin(AllowList allowedNavigations, AllowList allowedIntents, AllowList allowedRequests) {'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            for (var i=0; i<3; i++){
                needchange_path = "src/android/WhitelistPlugin.java"
                needchange_ori = 'public Whitelist '
                needchange_new = 'public AllowList '
                platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
                apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
                module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
                platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
                module_java = module_java.replace(needchange_ori,needchange_new)
                platform_java = platform_java.replace(needchange_ori,needchange_new)
                fs.writeFileSync(platformRoot, module_java);
                fs.writeFileSync(apkFileLocation, platform_java);
            }

            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_ori = 'public void setAllowedNavigations(Whitelist allowedNavigations) {'
            needchange_new = 'public void setAllowedNavigations(AllowList allowedNavigations) {'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_ori = 'public void setAllowedIntents(Whitelist allowedIntents) {'
            needchange_new = 'public void setAllowedIntents(AllowList allowedIntents) {'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_ori = 'public void setAllowedRequests(Whitelist allowedRequests) {'
            needchange_new = 'public void setAllowedRequests(AllowList allowedRequests) {'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            for (var i=0; i<8; i++){
                needchange_path = "src/android/WhitelistPlugin.java"
                needchange_ori = 'new Whitelist()'
                needchange_new = 'new AllowList()'
                platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
                apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
                module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
                platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
                module_java = module_java.replace(needchange_ori,needchange_new)
                platform_java = platform_java.replace(needchange_ori,needchange_new)
                fs.writeFileSync(platformRoot, module_java);
                fs.writeFileSync(apkFileLocation, platform_java);
            }
        }else{
            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_new = 'import org.apache.cordova.Whitelist;'
            needchange_ori = 'import org.apache.cordova.AllowList;'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            for (var i=0; i<3; i++){
                needchange_path = "src/android/WhitelistPlugin.java"
                needchange_new = 'private Whitelist'
                needchange_ori = 'private AllowList'
                platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
                apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
                module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
                platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
                module_java = module_java.replace(needchange_ori,needchange_new)
                platform_java = platform_java.replace(needchange_ori,needchange_new)
                fs.writeFileSync(platformRoot, module_java);
                fs.writeFileSync(apkFileLocation, platform_java);
            }

            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_new = 'public WhitelistPlugin(Whitelist allowedNavigations, Whitelist allowedIntents, Whitelist allowedRequests) {'
            needchange_ori = 'public WhitelistPlugin(AllowList allowedNavigations, AllowList allowedIntents, AllowList allowedRequests) {'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            for (var i=0; i<3; i++){
                needchange_path = "src/android/WhitelistPlugin.java"
                needchange_new = 'public Whitelist '
                needchange_ori = 'public AllowList '
                platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
                apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
                module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
                platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
                module_java = module_java.replace(needchange_ori,needchange_new)
                platform_java = platform_java.replace(needchange_ori,needchange_new)
                fs.writeFileSync(platformRoot, module_java);
                fs.writeFileSync(apkFileLocation, platform_java);
            }

            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_new = 'public void setAllowedNavigations(Whitelist allowedNavigations) {'
            needchange_ori = 'public void setAllowedNavigations(AllowList allowedNavigations) {'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_new = 'public void setAllowedIntents(Whitelist allowedIntents) {'
            needchange_ori = 'public void setAllowedIntents(AllowList allowedIntents) {'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            needchange_path = "src/android/WhitelistPlugin.java"
            needchange_new = 'public void setAllowedRequests(Whitelist allowedRequests) {'
            needchange_ori = 'public void setAllowedRequests(AllowList allowedRequests) {'
            platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
            apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            platform_java = platform_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
            fs.writeFileSync(apkFileLocation, platform_java);

            for (var i=0; i<8; i++){
                needchange_path = "src/android/WhitelistPlugin.java"
                needchange_new = 'new Whitelist()'
                needchange_ori = 'new AllowList()'
                platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-whitelist',needchange_path);
                apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-whitelist',needchange_path);
                module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
                platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
                module_java = module_java.replace(needchange_ori,needchange_new)
                platform_java = platform_java.replace(needchange_ori,needchange_new)
                fs.writeFileSync(platformRoot, module_java);
                fs.writeFileSync(apkFileLocation, platform_java);
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

function cordova_plugin_x_socialsharing(module_version,ctx){
    try{
        test1 = fs.readFileSync(path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-x-socialsharing/src/android/nl/xservices/plugins/FileProvider.java'), { encoding: 'utf-8' }); 
        test2 = fs.readFileSync(path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-x-socialsharing/src/android/nl/xservices/plugins/FileProvider.java'), { encoding: 'utf-8' });  
    }catch(err){
        console.log('cordova-plugin-x-socialsharing Hook is Crash');
        return err;
    }
    console.log('Finded cordova-plugin-x-socialsharing,Starting Hook');
    if (module_version.split(".")[0] == "9"){
        needchange_path = "src/android/nl/xservices/plugins/FileProvider.java"
        needchange_ori = 'androidx.core.content.FileProvider'
        needchange_new = 'android.support.v4.content.FileProvider'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-x-socialsharing',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-x-socialsharing',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
    }else{
        needchange_path = "src/android/nl/xservices/plugins/FileProvider.java"
        needchange_ori = 'android.support.v4.content.FileProvider'
        needchange_new = 'androidx.core.content.FileProvider'
        platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-x-socialsharing',needchange_path);
        apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-x-socialsharing',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        platform_java = platform_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        fs.writeFileSync(apkFileLocation, platform_java);
    }
}

module.exports = function(ctx) {
    console.log(ctx);
    cp_support = true;
    try{
        if(ctx.hook =="after_platform_add"){
            var ctx_plugins = ['cordova-plugin-qrscanner','cordova-plugin-camera','@felicienfrancois/cordova-plugin-stepper'];
            if(cp_support){
                ctx_plugins.push('cordova-plugin-local-notification','cordova-plugin-whitelist','cordova-plugin-x-socialsharing');
            }
        }else{
            var ctx_plugins = ctx.opts.plugins;
        }
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
        // console.log(ctx_plugins)
        if (ctx_plugins.indexOf('cordova-plugin-camera') !== -1){
            cordova_plugin_camera(module_version,ctx)
        }
        if (ctx_plugins.indexOf('@felicienfrancois/cordova-plugin-stepper') !== -1){
            felicienfrancois_cordova_plugin_stepper(module_version,ctx)
        }
        if (ctx_plugins.indexOf('cordova-plugin-local-notification') !== -1){
            cordova_plugin_local_notification(module_version,ctx)
        }
        if (ctx_plugins.indexOf('cordova-plugin-whitelist') !== -1){
            cordova_plugin_whitelist(module_version,ctx)
        }
        if (ctx_plugins.indexOf('cordova-plugin-x-socialsharing') !== -1){
            cordova_plugin_x_socialsharing(module_version,ctx)
        }
    }catch(err){
        console.log(err);
        throw err;
    }
};

