const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');

module.exports = function(ctx) {
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
        fs.copyFile(path.join(android_sdk_buildtool_new_path,"d8"),path.join(android_sdk_buildtool_new_path,"dx"),(err)=>{if (err){console.log(err)}})
        fs.copyFile(path.join(android_sdk_buildtool_new_path,"lib/d8.jar"),path.join(android_sdk_buildtool_new_path,"lib/dx.jar"),(err)=>{if (err){console.log(err)}})


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
            needchange_ori1 = "import android.support.v4.app.ActivityCompat"
            needchange_new1 = "import androidx.core.app.ActivityCompat;"
            platformRoot = path.join(ctx.opts.projectRoot, needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori1,needchange_new1)
            fs.writeFileSync(platformRoot, module_java);

            needchange_path = "platforms/android/app/src/main/java/com/bitpay/cordova/qrscanner/QRScanner.java"
            needchange_ori1 = "import android.support.v4.app.ActivityCompat"
            needchange_new1 = "import androidx.core.app.ActivityCompat;"
            platformRoot = path.join(ctx.opts.projectRoot, needchange_path);
            module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
            module_java = module_java.replace(needchange_ori1,needchange_new1)
            fs.writeFileSync(platformRoot, module_java);
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
