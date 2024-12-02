const fs = require('fs');
const util = require('util');
const stat = util.promisify(fs.stat);
const path = require('path');

function replaceContent(filePath, sourceRegx, targetStr) {
    fs.readFile(filePath, function(err, data) {
        if (err) {
            return err;
        }
        let str = data.toString();
        str = str.replaceAll(sourceRegx, targetStr);
        fs.writeFileSync(filePath, str, function(err) {
            if (err) return err;
        });
    });
};

function traverseFolder(folderPath, sourceRegx, targetStr) {
    // 读取文件夹列表
    const files = fs.readdirSync(folderPath)
    // 遍历文件夹列表
    files.forEach(function (fileName) {
        // 拼接当前文件路径
        const filePath = path.join(folderPath, fileName)
        // 判断该路径是文件夹还是文件
        const stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
        // 如果是文件夹，递归遍历
            traverseFolder(filePath)
            //console.log('文件夹',filePath)
        } else {
        // 如果是文件，执行操作
            replaceContent(filePath, sourceRegx, targetStr);
            //console.log('文件',filePath)
        }
    })
}


function getFiles(OriginFilePath,CopyFilePath){
//读取newFile文件夹下的文件
  fs.readdir(OriginFilePath,{withFileTypes:true},(err,files)=>{
      for(let file of files){
      	//判断是否是文件夹，不是则直接复制文件到newFile中
        if(!file.isDirectory()){
         //获取旧文件夹中要复制的文件
          const OriginFile = path.resolve(OriginFilePath,file.name)
          //获取新文件夹中复制的地方
          const CopyFile = path.resolve(CopyFilePath,file.name)
          //将文件从旧文件夹复制到新文件夹中
          fs.copyFileSync(OriginFile,CopyFile) 
        }else{//如果是文件夹就递归变量把最新的文件夹路径传过去
          const CopyDirPath = path.resolve(CopyFilePath,file.name)
          const OriginDirPath = path.resolve(OriginFilePath,file.name)
          fs.mkdir(CopyDirPath,(err)=>{
      
          })
          // OriginFilePath = OriginPath
          // CopyFilePath = DirPath
          getFiles(OriginDirPath,CopyDirPath)
        }
      }
  })
}


module.exports = function(ctx) {
    // console.log(ctx);
    cp_support = true;
    try{
        // Make sure android platform is part of build
        if (!ctx.opts.platforms.includes('ios')) return "No Ios";
        if(!fs.existsSync('platforms/ios/www')){
            fs.mkdir('platforms/ios/www' ,err=>{
              console.log(err)
            })
        }
        getFiles('www','platforms/ios/www') //不知道为什么时不时生效,index.html起作用但entrypoint.js不行
        traverseFolder('platforms/ios/www','file:///android_asset/www/','././././');
    }catch(err){
        console.log(err);
        throw err;
    }
}

/**
2024-12-03 00:41:30.453451+0800 HelloCordova[6068:560399] Could not load the "LaunchStoryboard" image referenced from a nib in the bundle with identifier "io.cordova.hellocordova"
2024-12-03 00:45:38.573017+0800 HelloCordova[6068:560399] ERROR: Plugin 'CallTrap' not found, or is not a CDVPlugin. Check your plugin mapping in config.xml.
2024-12-03 00:45:38.588849+0800 HelloCordova[6068:560399] FAILED pluginJSON = ["CallTrap1643778134","CallTrap","onCall",[]]
2024-12-03 00:45:38.590891+0800 HelloCordova[6068:560399] ERROR: Plugin 'SMSReceive' not found, or is not a CDVPlugin. Check your plugin mapping in config.xml.
2024-12-03 00:45:38.593420+0800 HelloCordova[6068:560399] FAILED pluginJSON = ["SMSReceive1643778135","SMSReceive","startWatch",[]]
 */