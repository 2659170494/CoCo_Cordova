!!!在您使用本项目之前,请看完本文档!!!

0.项目介绍
您好，这是一个为一些编程猫的安卓发烧友准备的CoCo转Cordova工程！
这个工程已经帮你把CoCo_Runtime所依赖的插件和环境配置好了,
只需拆出资源文件，就可以将CoCo项目转成Cordova项目来实现更多玩法
但这个项目目前极不活跃，一般有灵感了或来issue了才会更新!

1.环境准备部分
首先准备好gradle 7、NodeJS、Android SDK 29和33(build-tools 34.0.0) 和JAVA 8、Java17，
如果您已经安装好了，可以直接跳转到下一部分。
但如果没有安装Java、NodeJS、Gradle和android sdk的话还请继续往下看,

如果您是Windows，还请自行搜索安装Android Studio、NodeJS、Java以及Grade的教程。
因为这个项目所编写的脚本都是在Linux下进行的，并没有对Windows环境进行适配和勘测。
主要原因是我的Windows剩余空间支撑不起Android项目了，我能做的支持很有限。

如果你是Linux且是Ubuntu，可以在本目录执行这条命令进行安装啦：
chmod 777 install-JDK-Android_SDK.sh && sudo bash install-JDK-Android_SDK.sh
请注意，如果您有修改了脚本的安装目录并保存在了项目内，请记得添加进.gitignore，
本项目有过“因没有将安装目录添加进.gitignore导致Codespace死机且无法提取项目”的成就，
并且该脚本目前没有自动安装NodeJS的操作，就当是本项目的一个小门槛。
如果您介意的话，比较推荐您参照notepad.txt给的教程进行手动安装，但很乱而且杂。
执行脚本并且安装完毕后，会输出android sdk和java以及Gradle的安装路径，
并且安装过程中，脚本也会中途停止并提醒些事情，该行为会暂停脚本的执行以免发生意外。
之后您需要向您的环境变量中添加ANDROID_SDK_ROOT和ANDROID_HOME，
您可以参照这个命令进行修改和执行：
export ANDROID_SDK_ROOT=<您的android sdk> && export ANDROID_HOME=<您的android sdk> && export JAVA_HOME=<您的JAVA 8> && export GRADLE_HOME=<您的Gradle 7> && export PATH=$PATH:<您的JAVA 17>:<您的Gradle 7>/bin
替换方式就比如“将<您的android sdk>替换成您本地安装的android sdk的路径”这样，
如果您执行过上面的安装脚本，在脚本结束后脚本会有给出它们的路径。
执行完成后再执行一遍这个命令确认路径是否正确：
echo "You JAVA_HOME is :$JAVA_HOME" && echo "You GRADLE_HOME is :$GRADLE_HOME" && echo "You ANDROID_SDK_ROOT is :$ANDROID_SDK_ROOT" && echo "You ANDROID_HOME is :$ANDROID_SDK_ROOT"
确认对应变量的路径都正确之后，如果您的系统有sdkman（执行sdk这个命令有输出），还需要执行：
export PATH=$(echo $PATH | sed 's#/usr/local/sdkman/candidates/java/current/bin:##' | sed 's#/usr/local/sdkman/candidates/gradle/current/bin:##' | sed 's#/usr/local/sdkman/candidates/maven/current/bin:##' | sed 's#/usr/local/sdkman/candidates/ant/current/bin:##' | sed 's#/home/codespace/java/current/bin:##')
(不推荐直接执行chmod 777 delete_sdkman_env.sh && ./delete_sdkman_env.sh ，亲测无效，环境变量不会被修改)
否则就可以进入下一部分啦~~
(如果您fork了项目并且没有改名CoCo_Coreova，又或者直接在我的仓库里创建了codespace，
那么可以直接执行codespace_auto_set_android_sdk.sh)

2.编译部分
配置完上面的所需运行环境后，
先将要转换的coco项目所打包的apk解压出来，
把里面的assets里的www文件夹复制出来，覆盖到本项目www文件夹。
并且删除本项目www文件夹中的cordova.js、cordova_plugins.js、plugins和cordova-js-src.
之后回到项目根目录，执行npm install ，安装本项目的依赖包。
如果没有安装过Cordova，就执行npm install cordova -g安装cordova到全局。
不要用npm i cordova 等之类的将cordova安装至项目，
那会破坏掉项目的node_modules和plugins文件夹
如果您破坏了,请执行git reset --hard或重新克隆本项目一遍.

之后执行java -version ，确认执行的Java二进制文件在17以上，
然后执行echo $JAVA_HOME ，并确认您JAVA_HOME的JDK版本为1.8,
随后执行cordova platform add android@9 ，
安装完成后，接着执行cordova platform remove android 或cordova platform rm android ,
卸载完成后，再重新执行cordova platform add android@9 激活hook脚本,
然后运行一次cordova build android ，
如果遇到A problem occurred evaluating project ':app'.
并且包含org/gradle/initialization/BuildCompletionListener
请再运行一次cordova build android ，通常这是初始化项目导致的。
看到出现绿色的BUILD SUCCESSFUL，就是编译成功了呢。
编译的apk文件可以在builds或platforms/android/app/build/outputs/apk/debug的文件夹找到。

3.升级建议部分
当然，如果您想要编译最新版的android版本，
就需要先确认您JAVA_HOME的JDK版本为11以上(建议JDK17,本人仅在该版本下测试并开发)，
检查Android SDK的Build-tools是最新版本之后,
执行 cordova platform remove android
然后 cordova platform add android
安装最新的Cordova-android后再尝试cordova build android
但由于gradle 9已弃用org.gradle.util，cordova-android9已无法正常编译
执意使用最新版的android版本意味着遇到问题只能您自行修复，
本脚本因gradle和cordova，无法保证正常适配新版本，
若有问题，可翻阅底部查看更多帮助或提问咨询。

4.操作建议部分
如果编译成功的话，说明您的项目配置已经成功了。
你可以通过这个命令检查依赖配置： cordova requirements
之后您就可以基于本项目开发额外的扩展了，不过在开发之前记得检查一下项目目录的.gitignore
确认下里面没有你将要会使用的文件夹名字，因为如果它存在里面，那么文件夹和文件将不会被提交到git上。
如果您遇到插件上的问题,可以先"cordova platform remove android"
然后再重新安装一遍,大部分原因很可能是负责hook处理依赖的脚本没有被正确运行.

5.改编建议部分
本项目主要针对于为Cordova-android@9以及cordova-android@13及以上的版本设计，
目标是想向上兼容的同时，可切换cordova-android版本向下兼容，如安卓8.0、6.0。
高版本也可以运行低版本cordova-android，不过有些插件和API（如全屏启动图）可能无法适用。
如需自定义请自行参考cordova教程本工程仅作为修改模板参考。
如果您要用ios项目的话,目前暂时适配的版本是:
Apple macOS@darwin
Xcode@14.2
cordova-ios@7.1.1
cocoapods@1.15.2
ios-deploy@1.12.2

6.联系帮助部分
一些编译上的问题,还有笔记以及注意事项,也可以查看同目录的notepad.txt哇。
也可以查看同目录中的hooks文件夹,那里面包含我对一些代码错误的一些修改脚本.
如有需要或者遇到问题，可以提交issue获得帮助！
或者加入编程猫CoCo编辑器QQ交流群(861247613)，寻找绿色耀西（薄荷本兽）。
这样可以更快获得帮助！