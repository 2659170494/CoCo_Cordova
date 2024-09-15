const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');

function qrscan(module_version,ctx){
    if (module_version.split(".")[0] !== "9"){
        needchange_path = "platforms/android/cordova-plugin-qrscanner/hellocordova-qrscanner.gradle"
        needchange_ori1 = "compile 'com.journeyapps:zxing-android-embedded:3.3.0'"
        needchange_new1 = "implementation 'com.journeyapps:zxing-android-embedded:3.3.0'"
        needchange_ori2 = "compile 'com.android.support:appcompat-v7:23.1.0'"
        needchange_new2 = "implementation 'com.android.support:appcompat-v7:23.1.0'"
        platformRoot = path.join(ctx.opts.projectRoot, needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori1,needchange_new1)
        platform_java = module_java.replace(needchange_ori2,needchange_new2)
        fs.writeFileSync(platformRoot, platform_java);
        
        needchange_path = "platforms/android/app/src/main/java/com/bitpay/cordova/qrscanner/QRScanner.java"
        needchange_ori1 = "import android.support.v4.app.ActivityCompat;"
        needchange_new1 = "import androidx.core.app.ActivityCompat;"
        platformRoot = path.join(ctx.opts.projectRoot, needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori1,needchange_new1)
        fs.writeFileSync(platformRoot, module_java);
    }else{
        needchange_path = "platforms/android/cordova-plugin-qrscanner/hellocordova-qrscanner.gradle"
        needchange_ori1 = "implementation 'com.journeyapps:zxing-android-embedded:3.3.0'"
        needchange_new1 = "compile 'com.journeyapps:zxing-android-embedded:3.3.0'"
        needchange_ori2 = "implementation 'com.android.support:appcompat-v7:23.1.0'"
        needchange_new2 = "compile 'com.android.support:appcompat-v7:23.1.0'"
        platformRoot = path.join(ctx.opts.projectRoot, needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori1,needchange_new1)
        platform_java = module_java.replace(needchange_ori2,needchange_new2)
        fs.writeFileSync(platformRoot, platform_java);
        
        needchange_path = "platforms/android/app/src/main/java/com/bitpay/cordova/qrscanner/QRScanner.java"
        needchange_ori1 = "import androidx.core.app.ActivityCompat;"
        needchange_new1 = "import android.support.v4.app.ActivityCompat;"
        platformRoot = path.join(ctx.opts.projectRoot, needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori1,needchange_new1)
        fs.writeFileSync(platformRoot, module_java);
    }
}

function camera(module_version,ctx){
    if (module_version.split(".")[0] !== "9"){
        needchange_path = "src/main/java/org/apache/cordova/camera/CordovaUri.java"
        needchange_ori = "android.support.v4.content.FileProvider"
        needchange_new = "androidx.core.content.FileProvider"
        var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        var module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/camera/CameraLauncher.java"
        needchange_ori = "android.support.v4.content.FileProvider"
        needchange_new = "androidx.core.content.FileProvider"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/camera/FileProvider.java"
        needchange_ori = "android.support.v4.content.FileProvider"
        needchange_new = "androidx.core.content.FileProvider"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
    }else{
        needchange_path = "src/main/java/org/apache/cordova/camera/CordovaUri.java"
        needchange_ori = "androidx.core.content.FileProvider"
        needchange_new = "android.support.v4.content.FileProvider"
        var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        var module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/camera/CameraLauncher.java"
        needchange_ori = "androidx.core.content.FileProvider"
        needchange_new = "android.support.v4.content.FileProvider"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/camera/FileProvider.java"
        needchange_ori = "androidx.core.content.FileProvider"
        needchange_new = "android.support.v4.content.FileProvider"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
    }
}

function step(module_version,ctx){
    if (module_version.split(".")[0] !== "9"){
        needchange_path = "src/main/java/org/apache/cordova/stepper/AppUpdatedReceiver.java"
        needchange_ori = "import org.apache.cordova.BuildConfig;"
        needchange_new = "//import org.apache.cordova.BuildConfig;"
        var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        var module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/stepper/BootReceiver.java"
        needchange_ori = "import org.apache.cordova.BuildConfig;"
        needchange_new = "//import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/stepper/SensorListener.java"
        needchange_ori = "import org.apache.cordova.BuildConfig;"
        needchange_new = "//import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        
        needchange_path = "src/main/java/org/apache/cordova/stepper/SensorListener.java"
        needchange_ori = `if (BuildConfig.DEBUG) {
			if (sm.getSensorList(Sensor.TYPE_STEP_COUNTER).size() < 1)
				return; // emulator
		}`
        needchange_new = `/**if(BuildConfig.DEBUG){if (sm.getSensorList(Sensor.TYPE_STEP_COUNTER).size() < 1){return; // emulator}}*/`
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/stepper/Database.java"
        needchange_ori = "import org.apache.cordova.BuildConfig;"
        needchange_new = "//import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
    }else{
        needchange_path = "src/main/java/org/apache/cordova/stepper/AppUpdatedReceiver.java"
        needchange_ori = "//import org.apache.cordova.BuildConfig;"
        needchange_new = "import org.apache.cordova.BuildConfig;"
        var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        var module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/stepper/BootReceiver.java"
        needchange_ori = "//import org.apache.cordova.BuildConfig;"
        needchange_new = "import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/stepper/SensorListener.java"
        needchange_ori = "//import org.apache.cordova.BuildConfig;"
        needchange_new = "import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
        
        needchange_path = "src/main/java/org/apache/cordova/stepper/SensorListener.java"
        needchange_ori = `/**if(BuildConfig.DEBUG){if (sm.getSensorList(Sensor.TYPE_STEP_COUNTER).size() < 1){return; // emulator}}*/`
        needchange_new = `if (BuildConfig.DEBUG) {
			if (sm.getSensorList(Sensor.TYPE_STEP_COUNTER).size() < 1)
				return; // emulator
		}`
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/stepper/Database.java"
        needchange_ori = "//import org.apache.cordova.BuildConfig;"
        needchange_new = "import org.apache.cordova.BuildConfig;"
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app/',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
    }
}

function local_notification(module_version,ctx){
    if (module_version.split(".")[0] !== "9"){
        needchange_path = "cordova-plugin-local-notification/hellocordova-localnotification.gradle"
        needchange_ori = 'compile "me.leolin:ShortcutBadger:${appShortcutBadgerVersion}@aar"'
        needchange_new = 'implementation "me.leolin:ShortcutBadger:${appShortcutBadgerVersion}@aar"'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Notification.java"
        needchange_ori = 'import android.support.v4.util.ArraySet;'
        needchange_new = 'import androidx.collection.ArraySet;'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Notification.java"
        needchange_ori = 'import android.support.v4.util.Pair;'
        needchange_new = 'import androidx.core.util.Pair;'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Manager.java"
        needchange_ori = 'import static android.support.v4.app.'
        needchange_new = 'import static androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Manager.java"
        needchange_ori = 'import android.support.v4.app.'
        needchange_new = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<2; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Builder.java"
            needchange_ori = 'import android.support.v4.app.'
            needchange_new = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Builder.java"
        needchange_ori = 'import android.support.v4.media.app.'
        needchange_new = 'import androidx.media.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/localnotification/ClickReceiver.java"
        needchange_ori = 'import android.support.v4.app.'
        needchange_new = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/util/AssetProvider.java"
        needchange_ori = 'import android.support.v4.content.'
        needchange_new = 'import androidx.core.content.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/action/Action.java"
        needchange_ori = 'import android.support.v4.app.'
        needchange_new = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<4; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Notification.java"
            needchange_ori = 'import android.support.v4.app.'
            needchange_new = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        for (var i=0; i<3; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Options.java"
            needchange_ori = 'import android.support.v4.app.'
            needchange_new = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        for (var i=0; i<7; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Options.java"
            needchange_ori = 'import static android.support.v4.app.NotificationCompat'
            needchange_new = 'import static androidx.core.app.NotificationCompat'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        for (var i=0; i<2; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Notification.java"
            needchange_ori = 'import static android.support.v4.app.'
            needchange_new = 'import static androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }
    }else{
        needchange_path = "cordova-plugin-local-notification/hellocordova-localnotification.gradle"
        needchange_ori = 'implementation "me.leolin:ShortcutBadger:${appShortcutBadgerVersion}@aar"'
        needchange_new = 'compile "me.leolin:ShortcutBadger:${appShortcutBadgerVersion}@aar"'
        var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android',needchange_path);
        var module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Notification.java"
        needchange_new = 'import android.support.v4.util.ArraySet;'
        needchange_ori = 'import androidx.collection.ArraySet;'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Notification.java"
        needchange_new = 'import android.support.v4.util.Pair;'
        needchange_ori = 'import androidx.core.util.Pair;'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Manager.java"
        needchange_new = 'import static android.support.v4.app.'
        needchange_ori = 'import static androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Manager.java"
        needchange_new = 'import android.support.v4.app.'
        needchange_ori = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<2; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Builder.java"
            needchange_new = 'import android.support.v4.app.'
            needchange_ori = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Builder.java"
        needchange_new = 'import android.support.v4.media.app.'
        needchange_ori = 'import androidx.media.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/localnotification/ClickReceiver.java"
        needchange_new = 'import android.support.v4.app.'
        needchange_ori = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/util/AssetProvider.java"
        needchange_new = 'import android.support.v4.content.'
        needchange_ori = 'import androidx.core.content.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/action/Action.java"
        needchange_new = 'import android.support.v4.app.'
        needchange_ori = 'import androidx.core.app.'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<4; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Notification.java"
            needchange_new = 'import android.support.v4.app.'
            needchange_ori = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        for (var i=0; i<3; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Options.java"
            needchange_new = 'import android.support.v4.app.'
            needchange_ori = 'import androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        for (var i=0; i<7; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Options.java"
            needchange_new = 'import static android.support.v4.app.NotificationCompat'
            needchange_ori = 'import static androidx.core.app.NotificationCompat'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        for (var i=0; i<2; i++){
            needchange_path = "src/main/java/de/appplant/cordova/plugin/notification/Notification.java"
            needchange_new = 'import static android.support.v4.app.'
            needchange_ori = 'import static androidx.core.app.'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }
    }
}

function local_notification(module_version,ctx){
    if (module_version.split(".")[0] !== "9"){
        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_ori = 'import org.apache.cordova.Whitelist;'
        needchange_new = 'import org.apache.cordova.AllowList;'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<3; i++){
            needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
            needchange_ori = 'private Whitelist'
            needchange_new = 'private AllowList'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_ori = 'public WhitelistPlugin(Whitelist allowedNavigations, Whitelist allowedIntents, Whitelist allowedRequests) {'
        needchange_new = 'public WhitelistPlugin(AllowList allowedNavigations, AllowList allowedIntents, AllowList allowedRequests) {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<3; i++){
            needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
            needchange_ori = 'public Whitelist '
            needchange_new = 'public AllowList '
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_ori = 'public void setAllowedNavigations(Whitelist allowedNavigations) {'
        needchange_new = 'public void setAllowedNavigations(AllowList allowedNavigations) {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_ori = 'public void setAllowedIntents(Whitelist allowedIntents) {'
        needchange_new = 'public void setAllowedIntents(AllowList allowedIntents) {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_ori = 'public void setAllowedRequests(Whitelist allowedRequests) {'
        needchange_new = 'public void setAllowedRequests(AllowList allowedRequests) {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<8; i++){
            needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
            needchange_ori = 'new Whitelist()'
            needchange_new = 'new AllowList()'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }
    }else{
        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_new = 'import org.apache.cordova.Whitelist;'
        needchange_ori = 'import org.apache.cordova.AllowList;'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<3; i++){
            needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
            needchange_new = 'private Whitelist'
            needchange_ori = 'private AllowList'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_new = 'public WhitelistPlugin(Whitelist allowedNavigations, Whitelist allowedIntents, Whitelist allowedRequests) {'
        needchange_ori = 'public WhitelistPlugin(AllowList allowedNavigations, AllowList allowedIntents, AllowList allowedRequests) {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<3; i++){
            needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
            needchange_new = 'public Whitelist '
            needchange_ori = 'public AllowList '
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }

        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_new = 'public void setAllowedNavigations(Whitelist allowedNavigations) {'
        needchange_ori = 'public void setAllowedNavigations(AllowList allowedNavigations) {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_new = 'public void setAllowedIntents(Whitelist allowedIntents) {'
        needchange_ori = 'public void setAllowedIntents(AllowList allowedIntents) {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
        needchange_new = 'public void setAllowedRequests(Whitelist allowedRequests) {'
        needchange_ori = 'public void setAllowedRequests(AllowList allowedRequests) {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);

        for (var i=0; i<8; i++){
            needchange_path = "src/main/java/org/apache/cordova/whitelist/WhitelistPlugin.java"
            needchange_new = 'new Whitelist()'
            needchange_ori = 'new AllowList()'
            platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori,needchange_new)
            fs.writeFileSync(platformRoot, module_java);
        }
    }
}

function x_socialsharing(module_version,ctx){
    if (module_version.split(".")[0] == "9"){
        needchange_path = "src/main/java/nl/xservices/plugins/FileProvider.java"
        needchange_new = 'public class FileProvider extends androidx.core.content.FileProvider {'
        needchange_ori = 'public class FileProvider extends android.support.v4.content.FileProvider {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
    }else{
        needchange_path = "src/main/java/nl/xservices/plugins/FileProvider.java"
        needchange_new = 'public class FileProvider extends android.support.v4.content.FileProvider {'
        needchange_ori = 'public class FileProvider extends androidx.core.content.FileProvider {'
        platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android/app',needchange_path);
        module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
        module_java = module_java.replace(needchange_ori,needchange_new)
        fs.writeFileSync(platformRoot, module_java);
    }
}

module.exports = function(ctx) {
    // console.log(ctx);
    cp_support = true;
    try{
        // Make sure android platform is part of build
        if (!ctx.opts.platforms.includes('android')) return "No android";
    
        const cordova_android_version_path = path.join(ctx.opts.projectRoot,'node_modules/cordova-android/package.json');
        let version_json = fs.readFileSync(cordova_android_version_path, {encoding: 'utf-8'});
        var jsonParsed = JSON.parse(version_json);
        var module_version = String(jsonParsed["version"].toString());

        var ANDROID_SDK_PATH = process.env.ANDROID_SDK_ROOT;
        if (!ANDROID_SDK_PATH || ANDROID_SDK_PATH == "" || ANDROID_SDK_PATH == undefined){
            var ANDROID_SDK_PATH  = process.env.ANDROID_HOME;
            if (!ANDROID_SDK_PATH || ANDROID_SDK_PATH == "" || ANDROID_SDK_PATH == undefined) throw "CANNOT_FIND_ANDROID_SDK"
            console.log(`(ANDROID_HOME)ANDROID_SDK_PATH=${ANDROID_SDK_PATH}`)
        }else{
            console.log(`(ANDROID_SDK_ROOT)ANDROID_SDK_PATH=${ANDROID_SDK_PATH}`)
        }
        const android_sdk_buildtool_path = path.join(ANDROID_SDK_PATH, 'build-tools');

        let dir_paths = fs.readdirSync(android_sdk_buildtool_path);
        var android_sdk_buildtool_new_path = "";
        console.log(dir_paths.sort()[dir_paths.length - 1].split(".")[0])
        if (Number(dir_paths.sort()[dir_paths.length - 1].split(".")[0]) > 30) android_sdk_buildtool_new_path = path.join(android_sdk_buildtool_path, dir_paths.sort()[dir_paths.length - 1]);
        if (android_sdk_buildtool_new_path=="") throw "Cannot_Find_Newest_BuildTools_Version";
        console.log(android_sdk_buildtool_new_path);
        fs.copyFile(path.join(android_sdk_buildtool_new_path,"d8"),path.join(android_sdk_buildtool_new_path,"dx"),(err)=>{if (err){console.log(err)}});
        fs.copyFile(path.join(android_sdk_buildtool_new_path,"lib/d8.jar"),path.join(android_sdk_buildtool_new_path,"lib/dx.jar"),(err)=>{if (err){console.log(err)}});
        qrscan(module_version,ctx);
        camera(module_version,ctx);
        step(module_version,ctx);
        if(cp_support){
            local_notification(module_version,ctx)
            x_socialsharing(module_version,ctx)
        }
        return "Fix Android Sdk Buildtools DX Scucess";
        // return stat(apkFileLocation).then(stats => {
        //   console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
        // });
    }catch(err){
        console.log(err);
        throw err;
    }
};

