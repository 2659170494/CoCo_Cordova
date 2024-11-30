const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');

module.exports = function(ctx) {
    try{
        // console.log(ctx);
		old_java_version = "1.8.x"
        java_version = "11.x"

        // Make sure android platform is part of build
        //if (!ctx.opts.platforms.includes('android')) return;
        const cordova_android_version_path = path.resolve('node_modules/cordova-android/package.json');
        const java_version_delection_modules = path.resolve('node_modules/cordova-android/bin/templates/cordova/lib/check_reqs.js');
        const java_version_delection_platform = path.resolve('platforms/android/cordova/lib/check_reqs.js');
        
        let version_json = fs.readFileSync(cordova_android_version_path, {encoding: 'utf-8'});
        var jsonParsed = JSON.parse(version_json); 
        //console.log(jsonParsed);
        var module_version = String(jsonParsed["version"].toString());
        //console.log(module_version);
        if (module_version.split(".")[0] !== "9") return "No Cordova_android@9";
        let module_js = fs.readFileSync(java_version_delection_modules, {encoding: 'utf-8'});
        let platform_js = fs.readFileSync(java_version_delection_platform, {encoding: 'utf-8'});
        
		module_js = module_js.replace(`const EXPECTED_JAVA_VERSION = '${old_java_version}';`,`const EXPECTED_JAVA_VERSION = '${java_version}';`)
        platform_js = platform_js.replace(`const EXPECTED_JAVA_VERSION = '${old_java_version}';`,`const EXPECTED_JAVA_VERSION = '${java_version}';`)
        module_js = module_js.replace("const EXPECTED_JAVA_VERSION = '1.8.x';",`const EXPECTED_JAVA_VERSION = '${java_version}';`)
        platform_js = platform_js.replace("const EXPECTED_JAVA_VERSION = '1.8.x';",`const EXPECTED_JAVA_VERSION = '${java_version}';`)
        
        fs.writeFileSync(java_version_delection_modules, module_js);
        fs.writeFileSync(java_version_delection_platform, platform_js);

        return "Change JAVA version Hook Scucess";
        
        
        // return stat(apkFileLocation).then(stats => {
        //   console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
        // });
    }catch(err){
        console.log(err);
        throw err;
    }
};

