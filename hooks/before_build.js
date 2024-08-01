const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');

module.exports = function(ctx) {

    // const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    // const apkFileLocation = path.join(platformRoot, 'build/outputs/apk/android-debug.apk');
    try{
        // Make sure android platform is part of build
        if (!ctx.opts.platforms.includes('android')) return "No android";
    
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
        return "Fix Android Sdk Buildtools DX Scucess";
        // return stat(apkFileLocation).then(stats => {
        //   console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
        // });
    }catch(err){
        console.log(err);
        throw err;
    }
};

