const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');

module.exports = function(ctx) {
    // console.log(ctx);
    /**
     * 使用布尔值来启用是否支持Creation-Project! 
    */
    cp_support = false; 
    try{
        // Make sure android platform is part of build
        if (!ctx.opts.platforms.includes('android')) return "No android";
        const cordova_android_version_path = path.join(ctx.opts.projectRoot,'platforms/android/app/build/outputs/apk/debug/');
        fs.renameSync(cordova_android_version_path+'app-debug.apk', path.join(ctx.opts.projectRoot,'builds/app-debug.apk'));
    }catch(err){
        console.log(err);
        throw err;
    }
};