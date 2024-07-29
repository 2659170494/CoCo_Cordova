您好，这是一个为一些编程猫的安卓发烧友准备的CoCo转Cordova工程！
这个项目可能极不活跃，但一般有灵感了或者有时间了就会更新!

这个工程已经帮你把CoCo_Runtime所依赖的插件和环境配置好了。
您所需要做的就是准备好cordova、AndroidSDK和JAVA，
如果你是Linux且是Ubuntu,
只需要在本目录执行这条命令就可以开始安装啦：chmod 777 install-JDK-Android_SDK.sh && ./install-JDK-Android_SDK.sh
将coco打包的apk解压出来，把assets/www文件夹覆盖到本项目www文件夹。
删除cordova.js、cordova_plugins.js、plugins和cordova-js-src.
之后在根目录执行cordova platform add android，
最后运行cordova build android编译apk即可。

本项目暂时为Android 13设计（主要是Cordova-Android指定错了，但是懒得改了），
主要目标是想向下兼容，如安卓8.0、6.0，
当然高版本也可以运行，不过有些插件和API（如全屏启动图）可能无法适用。
如需自定义请自行参考cordova教程本工程仅作为修改模板参考。
如有需要或者遇到问题，可以提交issue获得帮助！
或者加入编程猫CoCo编辑器QQ交流群(861247613)，寻找绿色耀西（薄荷本兽）。
这样可以更快获得帮助！

如果您有编译上的问题，还请查看同目录的notepad.txt哇。
一些笔记和注意事项也在里面哦。

