您好，这是一个为一些编程猫的安卓发烧友准备的CoCo转Cordova工程！
这个项目可能极不活跃，但一般有灵感了或者有时间了就会更新!

这个工程已经帮你把CoCo_Runtime所依赖的插件和环境配置好了。
您所需要做的就是准备好cordova、AndroidSDK和JAVA，
如果你是Linux且是Ubuntu，并且没有安装Java和android sdk的话,
可以在本目录执行这条命令进行安装啦：chmod 777 install-JDK-Android_SDK.sh && sudo bash install-JDK-Android_SDK.sh
但是！请不要将Android SDK安装在本项目的目录里！尤其是Codespace!!!
如果您将它安装在本项目目录且更改了默认路径且并没有添加进.gitignore，
这将导致您的Git卡死，Codespace奔溃无法启动且无法导出更改！！！
而且，这个脚本安装的SDK包会很大，所以个人比较推荐您参照notepad.txt给的教程进行手动安装。
当然您不嫌弃的话也行。安装完毕后会输出android sdk和java的路径。
并且在安装过程中脚本也会提示你一些事情，忘了或者没看到可以自己打开脚本文件查看。
之后在上面java和android sdk的安装完毕后，
将coco打包的apk解压出来，把assets/www文件夹覆盖到本项目www文件夹。
并且删除www文件夹中的cordova.js、cordova_plugins.js、plugins和cordova-js-src.
之后回到项目根目录，
先执行npm install，安装本项目的包。
然后执行npm install cordova -g安装cordova到全局。
不要用npm i cordova 等之类的将cordova安装至项目！
那会破坏掉项目的node_modules和plugins!
之后执行export ANDROID_SDK_ROOT=<您的android sdk> && export ANDROID_HOME=<您的android sdk>
将<您的android sdk>替换成您本地安装的android sdk的路径。
如果您执行过上面的安装脚本，在脚本结束后脚本会有给出它们的路径。
JAVA_HOME同理，如果您缺少他，可以执行export JAVA_HOME=<您的JDK路径>。
同样上面的安装脚本有给出.
之后执行cordova platform add android，
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

