#!/usr/bin/env node

/**
 * @return {?Promise}
 */
module.exports = function(ctx) {
    // make sure android platform is part of build
    if (!ctx.opts.platforms.includes('android')) {
        return;
    }

    var fs = require('fs'),
        Q = require('q'),
        config = getConfig(ctx),
        template = getTemplate(ctx, config);

    return Q.nfcall(fs.writeFile, config.activityPath, template, 'UTF-8');
};

/**
 * @param {Context} ctx Cordova HookRunner context object
 * @return {Object} Path to main activity file for android project.
 */
function getConfig(ctx) {
    var fs = require('fs');
    var path = require('path');
    var ConfigParser = ctx.requireCordovaModule('cordova-common').ConfigParser;

    var projectRoot = ctx.opts.projectRoot;
    var config = new ConfigParser(path.join(projectRoot, 'config.xml'));
    var packageName = config.android_packageName() || config.packageName();
    var activityName = config.android_activityName() || 'MainActivity';
    var packagePath = packageName.replace(/\./g, path.sep);

    var activityPath = path.join(projectRoot, 'platforms/android/app/src/main/java', packagePath, activityName + '.java');
    var isNewAndroidStructure = fs.existsSync(activityPath);
    if (!isNewAndroidStructure) {
      activityPath = path.join(projectRoot, 'platforms/android/src', packagePath, activityName + '.java');
    }

    var isXwalk = ctx.opts.cordova.plugins.includes('cordova-plugin-crosswalk-webview')

    return { packageName, activityPath, activityName, isXwalk };
}

/**
 * @param {Context} ctx Cordova HookRunner context object
 * @param {Object} config Extract of required configurations from config.xml.
 * @return {string}
 */
function getTemplate(ctx, config) {
    var fs = require('fs'),
        path = require('path'),
        templatePath = path.join(ctx.opts.plugin.dir, 'templates', config.isXwalk ? 'xwalk.java' : 'default.java');

    return fs.readFileSync(templatePath, 'utf8')
        .replace(/__ID__/g, config.packageName)
        .replace(/__ACTIVITY__/g, config.activityName);
}
