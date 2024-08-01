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
            if (module_version.split(".")[0] !== "9"){
                needchange_path = "src/android/QRScanner.java"
                needchange_ori = "import android.support.v4.app.ActivityCompat;"
                needchange_new = "import androidx.core.app.ActivityCompat;"
                const platformRoot = path.join(ctx.opts.projectRoot, 'plugins/cordova-plugin-qrscanner',needchange_path);
                const apkFileLocation = path.join(ctx.opts.projectRoot, 'node_modules/cordova-plugin-qrscanner',needchange_path);
                let module_java = fs.readFileSync(platformRoot, {encoding: 'utf-8'});
                let platform_java = fs.readFileSync(apkFileLocation, {encoding: 'utf-8'});
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
            }
        }
        if (ctx_plugins.indexOf('cordova-plugin-qrscanner') !== -1) ctx_plugins.push('cordova-plugin-camera');
        console.log(ctx_plugins)
        if (ctx_plugins.indexOf('cordova-plugin-camera') !== -1){
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
            }
        }
    }catch(err){
        console.log(err);
        throw err;
    }
};

