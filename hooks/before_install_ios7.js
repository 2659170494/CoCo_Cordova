const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');

function cordova_ws(){
    const cordova_ws_versions_node_path = path.resolve('node_modules/cordova-plugin-advanced-websocket/package.json');
    const cordova_ws_versions_plugin_path = path.resolve('plugins/cordova-plugin-advanced-websocket/package.json');
    const cordova_ws_config_node_path = path.resolve('node_modules/cordova-plugin-advanced-websocket/plugin.xml');
    const cordova_ws_config_plugin_path = path.resolve('plugins/cordova-plugin-advanced-websocket/plugin.xml');
    
    let version_node_json = fs.readFileSync(cordova_ws_versions_node_path, {encoding: 'utf-8'});
    let version_plugin_json = fs.readFileSync(cordova_ws_versions_plugin_path, {encoding: 'utf-8'});
    var nodejsonParsed = JSON.parse(version_node_json); 
    var pluginjsonParsed = JSON.parse(version_plugin_json); 
    //console.log(jsonParsed);
    var node_module_version = String(nodejsonParsed["version"].toString());
    var plugin_module_version = String(pluginjsonParsed["version"].toString());
    //console.log(module_version);
    if (node_module_version.split(".")[0] !== "1" && node_module_version.split(".")[1] !== "1") return "(node_modules)No cordova-plugin-advanced-websocket@1.1.x";
    if (plugin_module_version.split(".")[0] !== "1" && plugin_module_version.split(".")[1] !== "1") return "(plugins)No cordova-plugin-advanced-websocket@1.1.x";

    let module_js = fs.readFileSync(cordova_ws_config_node_path, {encoding: 'utf-8'});
    let plugin_js = fs.readFileSync(cordova_ws_config_plugin_path, {encoding: 'utf-8'});
    
    module_js = module_js.replace('<framework src="SocketRocket" type="podspec" spec="0.5.1" />',`<podspec><pods use-frameworks="true"><pod name="SocketRocket" spec="0.5.1" /></pods></podspec>`)
    plugin_js = plugin_js.replace('<framework src="SocketRocket" type="podspec" spec="0.5.1" />',`<podspec><pods use-frameworks="true"><pod name="SocketRocket" spec="0.5.1" /></pods></podspec>`)
    
    fs.writeFileSync(cordova_ws_config_node_path, module_js);
    fs.writeFileSync(cordova_ws_config_plugin_path, plugin_js);
}

function cordova_qr(project_name){
    const cordova_qr_versions_node_path = path.resolve('node_modules/cordova-plugin-qrscanner/package.json');
    const cordova_qr_versions_plugin_path = path.resolve('plugins/cordova-plugin-qrscanner/package.json');
    
    let qr_version_node_json = fs.readFileSync(cordova_qr_versions_node_path, {encoding: 'utf-8'});
    let qr_version_plugin_json = fs.readFileSync(cordova_qr_versions_plugin_path, {encoding: 'utf-8'});
    var qr_nodejsonParsed = JSON.parse(qr_version_node_json); 
    var qr_pluginjsonParsed = JSON.parse(qr_version_plugin_json); 
    //console.log(jsonParsed);
    var qr_node_module_version = String(qr_nodejsonParsed["version"].toString());
    var qr_plugin_module_version = String(qr_pluginjsonParsed["version"].toString());
    //console.log(module_version);
    if (qr_node_module_version.split(".")[0] !== "3" && qr_node_module_version.split(".")[1] !== "0") return "(node_modules)No cordova-plugin-qrscanner@3.0.x";
    if (qr_plugin_module_version.split(".")[0] !== "3" && qr_plugin_module_version.split(".")[1] !== "0") return "(plugins)No cordova-plugin-qrscanner@3.0.x";
    try{
        const cordova_qr_config_plugin_path = path.resolve('plugins/cordova-plugin-qrscanner/src/ios/QRScanner.swift');
        let qr_plugin_js = fs.readFileSync(cordova_qr_config_plugin_path, {encoding: 'utf-8'});
        qr_plugin_js = qr_plugin_js.replace('guard let settingsUrl = URL(string: UIApplication.openSettingsURLString',`guard let settingsUrl = URL(string: UIApplicationOpenSettingsURLString`)
        qr_plugin_js = qr_plugin_js.replace('UIApplication.shared.openURL(NSURL(string: UIApplication.openSettingsURLString)! as URL)',`UIApplication.shared.openURL(NSURL(string: UIApplicationOpenSettingsURLString)! as URL)`)
        fs.writeFileSync(cordova_qr_config_plugin_path, qr_plugin_js);

        const cordova_qr_config_node_path = path.resolve('node_modules/cordova-plugin-qrscanner/src/ios/QRScanner.swift');
        let qr_module_js = fs.readFileSync(cordova_qr_config_node_path, {encoding: 'utf-8'});
        qr_module_js = qr_module_js.replace('guard let settingsUrl = URL(string: UIApplication.openSettingsURLString',`guard let settingsUrl = URL(string: UIApplicationOpenSettingsURLString`)
        qr_module_js = qr_module_js.replace('UIApplication.shared.openURL(NSURL(string: UIApplication.openSettingsURLString)! as URL)',`UIApplication.shared.openURL(NSURL(string: UIApplicationOpenSettingsURLString)! as URL)`)
        fs.writeFileSync(cordova_qr_config_node_path, qr_module_js);
        try{
            const cordova_qr_config_platform_path = path.resolve(`platforms/ios/${project_name}/Plugins/cordova-plugin-qrscanner/QRScanner.swift`);
            let qr_platform_js = fs.readFileSync(cordova_qr_config_platform_path, {encoding: 'utf-8'});
            qr_platform_js = qr_platform_js.replace('guard let settingsUrl = URL(string: UIApplication.openSettingsURLString',`guard let settingsUrl = URL(string: UIApplicationOpenSettingsURLString`)
            qr_platform_js = qr_platform_js.replace('UIApplication.shared.openURL(NSURL(string: UIApplication.openSettingsURLString)! as URL)',`UIApplication.shared.openURL(NSURL(string: UIApplicationOpenSettingsURLString)! as URL)`)
            fs.writeFileSync(cordova_qr_config_platform_path, qr_platform_js);
        }catch(err){
            return "Platform_IOS_Path_Error"
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}


module.exports = function(ctx) {
    /**
     * 如果项目名称有修改,请修改此处!
    */
    project_name = "HelloCordova"
    try{
        console.log(cordova_ws());
        console.log(cordova_qr(project_name));
        return "Change WebSocket podspec Hook Scucess";
    }catch(err){
        console.log(err);
        throw err;
    }
};

