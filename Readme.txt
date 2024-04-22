您好，这是一个为高版本Android和一些安卓发烧友准备的CoCo转Cordova工程！

这个工程已经帮你把CoCo_Runtime所依赖的插件和环境配置好了。
您所需要做的就是准备好cordova、AndroidSDK和JAVA，
将coco打包的apk解压出来，把assets/www文件夹覆盖到本项目www文件夹。
删除cordova.js、cordova_plugins.js、plugins和cordova-js-src.
之后在根目录执行cordova platform add android，
最后运行cordova build android编译apk即可。

本项目为Android 13设计（主要是Cordova-Android指定错了，但是懒得改了），
所以有些插件和API（如全屏启动图）可能无法适用。
如需自定义请自行参考cordova教程本工程仅作为修改模板参考。
如有需要或者遇到问题，请联系提交issue获得帮助！

接下来就是一些笔记和注意事项了，如果您有编译上的问题，不妨看看下面有没有您想要的。

应用图标位于res/icon.png
启动页面位于res/splash.png
如需要编译其他的软件，请自行cordova clean清除编译文件后再打包

如果AndroidManifest.xml没有：
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:maxSdkVersion="32" android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:maxSdkVersion="32" android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
则请在项目根目录执行三遍cordova build android，而不是直接在config.xml添加。补全的代码在hooks文件夹里
#tip:忽略这条，导致上面的原因是因为cordova-plugin-camera插件太新了，降级到4.0.3即可

如果有如下错误：
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
可以改为：
import androidx.core.app.ActivityCompat;
import androidx.appcompat.app.AppCompatActivity;
————————————————
原文链接：https://blog.csdn.net/hzhnzmyz/article/details/109570216

cordova-plugin-stepper插件必须是@felicienfrancois\cordova-plugin-stepper

coco辨别web与android的方法是检测UserAgent字符串是否有Cordova

随着Android studio版本的升级，会出现无法引用android.support.v4包
解决办法：
将
android:name="android.support.v4.content.FileProvider"
修改为
android:name="androidx.core.content.FileProvider"
即可
————————————————
原文链接：https://blog.csdn.net/qq_31877171/article/details/114266592

I am also facing same issue.
Replace Whitelist class with AllowList in cordova-plugin-file-transfer > src > android > FileTransfer.java
import org.apache.cordova.Whitelist;  => import org.apache.cordova.AllowList;
https://github.com/apache/cordova-plugin-file-transfer/issues/306
#已弃用，已将cordova-plugin-whitelist卸载。如果需要请自己重装修复

https://github.com/apache/cordova-android/issues/1604
./gradlew --stacktrace cdvBuildDebug -b build.gradle
You may not have your ANDROID_HOME variable set. Cordova makes educated guesses and it's possible Cordova is guessing correctly but would be better to explicitly set your ANDROID_HOME however in your .bashrc file. You'll need to start a new terminal session for changes to apply.
export ANDROID_HOME="/path/to/android/sdk"
General error during conversion: Unsupported class file major version 61
Means you're using Java 17 (which is file major version 61) . AGP 7.x, which is what cordova-android@11 uses requires Java 11.
Would be best to use Java 11 for Cordova. CORDOVA_JAVA_HOME can be used to tell cordova where a JDK 11 installation is, while having JDK 17 for other things.
As mentioned #1604 one of the breaking changes of AGP 8 requiring JDK 17, so support for JDK 17 will be coming soon, but I'm not sure if it will be included in our next release since AGP 8 is only necessary for API 34, which will be in beta until summer of this year at the earliest.

https://stackoverflow.com/questions/75114728/no-matching-variant-of-com-android-tools-buildgradle7-4-0-was-found
There are two ways to change Gradle JDK to 11.
File -> Settings -> Build, Execution, Deployment -> Build Tools -> Gradle
or config in gradle.properties:
"org.gradle.java.home= /xxx/Java/jdk-11.0.1"

Note that the compile, runtime, testCompile, and testRuntime configurations introduced by the Java plugin have been deprecated since Gradle 4.10 (Aug 27, 2018), and were finally removed in Gradle 7.0 (Apr 9, 2021).
The aforementioned configurations should be replaced by implementation, runtimeOnly, testImplementation, and testRuntimeOnly, respectively.

关于config.xml/plugin.xml修改AndroidManifest注意：
如果你在plugin.xml或config.xml使用了 config-file或edit-config等类似参数
若要删除它们的话，在config.xml/plugin.xml删除了的同时，
还需到platforms\android\android.json和platforms\android\app\src\main\AndroidManifest.xml删除它们
否则所做的更改仍然保留

关于修改插件的内容：
不仅仅需要更改plugins里的插件，还需要更改node_modules和platforms文件夹里的插件

目前已知bug：4.e8bfe7ab.chunk.js:2  Uncaught TypeError: Cannot read property 'clientX' of undefined

由于android 10起不再支持全局启动页面，且cordova android 12自带splash。因此cordova-plugin-splashscreen已被启用
如果您需要这类的启动图，请自行降低cordova-android并对相关插件和配置进行修改
https://stackoverflow.com/questions/73720590/is-there-a-way-to-still-have-full-screen-splash-images-in-cordova-android-11

附带2024/04/21截止，CoCo_Cordova插件版本：
#出于兼容问题，本模板部分模块经过修复和版本升级
#可能与一下模块版本不同，仅作参考使用
module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-geolocation": "4.1.0",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-screen-orientation": "3.0.2",
    "cordova-plugin-magnetometer": "1.0.0",
    "cordova-plugin-device-motion": "2.0.1",
    "cordova-plugin-shake": "0.7.0",
    "cordova-plugin-android-permissions": "1.1.2",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-file": "6.0.2",
    "cordova-plugin-media": "5.0.3",
    "cordova-plugin-camera": "4.0.3",
    "cordova-plugin-media-capture": "3.0.3",
    "cordova-plugin-viewport": "1.0.5",
    "cordova-plugin-advanced-http": "3.1.1",
    "cordova-plugin-vibration": "2.1.6",
    "cordova-plugin-phone-call": "1.1.3",
    "cordova-plugin-calltrap": "0.0.4",
    "cordova-sms-plugin": "1.0.1",
    "cordova-plugin-contacts": "3.0.1",
    "cordova-plugin-sms-receive": "1.0.2",
    "cordova-plugin-x-toast": "2.7.2",
    "cordova-plugin-advanced-websocket": "1.1.6",
    "cordova-plugin-battery-status": "2.0.3",
    "cordova-plugin-brightness": "0.1.5",
    "@felicienfrancois/cordova-plugin-stepper": "0.2.53",
    "@crc/cordova-plugin-qrscanner": "3.2.0",
    "cordova-plugin-splashscreen": "6.0.2"
  };