const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');

module.exports = function(ctx) {
    try{
        // console.log(ctx);
        /**
         * 在此处修改你想要更改的cordova-android判断的java版本 
        */
		old_java_version = "1.8.x"
        java_version = "17.x"

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

        console.log("Change JAVA version Hook Scucess");
        
        const jcenter_cordova_gradle_delection_modules = path.resolve('node_modules/cordova-android/framework/cordova.gradle');
        const jcenter_cordova_gradle_delection_platform = path.resolve('platforms/android/CordovaLib/cordova.gradle');
        const jcenter_repositories_gradle_delection_modules = path.resolve('node_modules/cordova-android/framework/repositories.gradle');
        const jcenter_repositories_gradle_delection_project = path.resolve('node_modules/cordova-android/bin/templates/project/repositories.gradle');
        const jcenter_repositories_gradle_delection_app = path.resolve('node_modules/cordova-android/bin/templates/project/app/repositories.gradle');
        const jcenter_repositories_gradle_delection_platform = path.resolve('platforms/android/repositories.gradle');
        const jcenter_repositories_gradle_delection_app_platform = path.resolve('platforms/android/app/repositories.gradle');
        const jcenter_repositories_gradle_delection_CordovaLib_platform = path.resolve('platforms/android/CordovaLib/repositories.gradle');

        let module_jcenter_cordova_gradle = fs.readFileSync(jcenter_cordova_gradle_delection_modules, {encoding: 'utf-8'});
        let platform_jcenter_cordova_gradle = fs.readFileSync(jcenter_cordova_gradle_delection_platform, {encoding: 'utf-8'});
        let module_jcenter_repositories_gradle = fs.readFileSync(jcenter_repositories_gradle_delection_modules, {encoding: 'utf-8'});
        let project_jcenter_repositories_gradle = fs.readFileSync(jcenter_repositories_gradle_delection_project, {encoding: 'utf-8'});
        let app_jcenter_repositories_gradle = fs.readFileSync(jcenter_repositories_gradle_delection_app, {encoding: 'utf-8'});
        let platform_jcenter_repositories_gradle = fs.readFileSync(jcenter_repositories_gradle_delection_platform, {encoding: 'utf-8'});
        let platform_app_jcenter_repositories_gradle = fs.readFileSync(jcenter_repositories_gradle_delection_app_platform, {encoding: 'utf-8'});
        let platform_CordovaLib_jcenter_repositories_gradle = fs.readFileSync(jcenter_repositories_gradle_delection_CordovaLib_platform, {encoding: 'utf-8'});
        
        module_jcenter_cordova_gradle = module_jcenter_cordova_gradle.replace(`        jcenter()`,`        //jcenter()\n        maven { url "https://jcenter.bintray.com" }\n        maven { url 'https://repo.grails.org/grails/core/' }`)
        platform_jcenter_cordova_gradle = platform_jcenter_cordova_gradle.replace(`        jcenter()`,`        //jcenter()\n        maven { url "https://jcenter.bintray.com" }\n        maven { url 'https://repo.grails.org/grails/core/' }`)
		module_jcenter_repositories_gradle = module_jcenter_repositories_gradle.replace(`    jcenter()`,`    //jcenter()\n    maven { url "https://jcenter.bintray.com" }\n    maven { url 'https://repo.grails.org/grails/core/' }`)
        project_jcenter_repositories_gradle = project_jcenter_repositories_gradle.replace(`    jcenter()`,`    //jcenter()\n    maven { url "https://jcenter.bintray.com" }\n    maven { url 'https://repo.grails.org/grails/core/' }`)
        app_jcenter_repositories_gradle = app_jcenter_repositories_gradle.replace(`    jcenter()`,`    //jcenter()\n    maven { url "https://jcenter.bintray.com" }\n    maven { url 'https://repo.grails.org/grails/core/' }`)
        platform_jcenter_repositories_gradle = platform_jcenter_repositories_gradle.replace(`    jcenter()`,`    //jcenter()\n    maven { url "https://jcenter.bintray.com" }\n    maven { url 'https://repo.grails.org/grails/core/' }`)
        platform_app_jcenter_repositories_gradle = platform_app_jcenter_repositories_gradle.replace(`    jcenter()`,`    //jcenter()\n    maven { url "https://jcenter.bintray.com" }\n    maven { url 'https://repo.grails.org/grails/core/' }`)
        platform_CordovaLib_jcenter_repositories_gradle = platform_CordovaLib_jcenter_repositories_gradle.replace(`    jcenter()`,`    //jcenter()\n    maven { url "https://jcenter.bintray.com" }\n    maven { url 'https://repo.grails.org/grails/core/' }`)
        
        fs.writeFileSync(jcenter_cordova_gradle_delection_modules, module_jcenter_cordova_gradle);
        fs.writeFileSync(jcenter_cordova_gradle_delection_platform, platform_jcenter_cordova_gradle);
        fs.writeFileSync(jcenter_repositories_gradle_delection_modules, module_jcenter_repositories_gradle);
        fs.writeFileSync(jcenter_repositories_gradle_delection_project, project_jcenter_repositories_gradle);
        fs.writeFileSync(jcenter_repositories_gradle_delection_app, app_jcenter_repositories_gradle);
        fs.writeFileSync(jcenter_repositories_gradle_delection_platform, platform_jcenter_repositories_gradle);
        fs.writeFileSync(jcenter_repositories_gradle_delection_app_platform, platform_app_jcenter_repositories_gradle);
        fs.writeFileSync(jcenter_repositories_gradle_delection_CordovaLib_platform, platform_CordovaLib_jcenter_repositories_gradle);
        
        console.log("Change Jcenter gradle Hook Scucess");

        const versioncompare_cordova_gradle_delection_modules = path.resolve('node_modules/cordova-android/framework/cordova.gradle');
        const versioncompare_cordova_gradle_delection_platform = path.resolve('platforms/android/CordovaLib/cordova.gradle');

        let module_versioncompare_cordova_gradle = fs.readFileSync(versioncompare_cordova_gradle_delection_modules, {encoding: 'utf-8'});
        let platform_versioncompare_cordova_gradle = fs.readFileSync(versioncompare_cordova_gradle_delection_platform, {encoding: 'utf-8'});

        module_versioncompare_cordova_gradle = module_versioncompare_cordova_gradle.replace(`import com.g00fy2.versioncompare.Version`,`import io.github.g00fy2.versioncompare.Version`)
        // module_versioncompare_cordova_gradle = module_versioncompare_cordova_gradle.replace(`import io.github.g00fy2.versioncompare.Version\n\nString`,`import io.github.g00fy2.versioncompare.Version\nimport groovy.xml.XmlParser\n\nString`) //gradle 8以上才需要
        module_versioncompare_cordova_gradle = module_versioncompare_cordova_gradle.replace(`        classpath 'com.g00fy2:versioncompare:1.3.4@jar'`,`        classpath 'io.github.g00fy2:versioncompare:1.4.0@jar'`)
        module_versioncompare_cordova_gradle = module_versioncompare_cordova_gradle.replace(`        classpath 'io.github.g00fy2:versioncompare:1.4.0@jar'\n    }`,`        classpath 'io.github.g00fy2:versioncompare:1.4.0@jar'\n        classpath 'org.codehaus.groovy:groovy-swing:3.0.9'\n    }`)
        platform_versioncompare_cordova_gradle = platform_versioncompare_cordova_gradle.replace(`import com.g00fy2.versioncompare.Version`,`import io.github.g00fy2.versioncompare.Version`)
        // platform_versioncompare_cordova_gradle = platform_versioncompare_cordova_gradle.replace(`import io.github.g00fy2.versioncompare.Version\n\nString`,`import io.github.g00fy2.versioncompare.Version\nimport groovy.xml.XmlParser\n\nString`) //gradle 8以上才需要
        platform_versioncompare_cordova_gradle = platform_versioncompare_cordova_gradle.replace(`        classpath 'com.g00fy2:versioncompare:1.3.4@jar'`,`        classpath 'io.github.g00fy2:versioncompare:1.4.0@jar'`)
        platform_versioncompare_cordova_gradle = platform_versioncompare_cordova_gradle.replace(`        classpath 'io.github.g00fy2:versioncompare:1.4.0@jar'\n    }`,`        classpath 'io.github.g00fy2:versioncompare:1.4.0@jar'\n        classpath 'org.codehaus.groovy:groovy-swing:3.0.9'\n    }`)

        fs.writeFileSync(versioncompare_cordova_gradle_delection_modules, module_versioncompare_cordova_gradle);
        fs.writeFileSync(versioncompare_cordova_gradle_delection_platform, platform_versioncompare_cordova_gradle);
		
        console.log("Change Versioncompare groovy-swing XmlParser gradle Hook Scucess")

        return "install_android9_OK";
        
        // return stat(apkFileLocation).then(stats => {
        //   console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
        // });
    }catch(err){
        console.log(err);
        throw err;
    }
};

