has_root() {
    if [[ $EUID -ne 0 ]]; then
        echo "Permission needs to be elevated: This installation program must be executed by root or sudo,You can use this command:sudo bash install-JDK-Android_SDK.sh" 1>&2
		exit 1
    fi
}
has_root
now_file_path=$(cd $(dirname $0);pwd) ;
#↓remove android sdk
echo "Now path is:$now_file_path ";
echo "This install script is only test in ubuntu"
echo "If you still want to use,please change the Android SDK Path for yourself Better!"
echo "Or your codespace will be break and cannot be boot."
echo "Sorry about that."
echo "Now will delete build-tools from $now_file_path !!!";
echo "Now will delete build-tools from $now_file_path !!!";
echo "Now will delete build-tools from $now_file_path !!!";
echo "Now will delete build-tools from $now_file_path !!!";
echo "Now will delete build-tools from $now_file_path !!!";
echo "Wait 5 Seconds...";
sleep 5;
echo "press enter to continue.";
read -n 1 -s ;
echo "Starting delete build-tools from $now_file_path !!!";
sudo rm -rf $now_file_path/build-tools
#↑remove android sdk
#↓setting system
echo "adding openjdk repository"
sudo add-apt-repository ppa:openjdk-r/ppa 
echo "updating and upgrading apt-get"
sudo apt-get update && sudo apt-get upgrade
#↑setting system
#↓install JDK 17
# echo "Use Sdkman to Java 17"
# sdk install java 17.0.17-amzn
# sdk default java 17.0.17-amzn
echo "install openjdk-17-jdk"
sudo apt-get install openjdk-17-jdk
echo "set JAVA_HOME to openjdk-17-jdk"
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 ;
# sudo echo "export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64">>/etc/profile|source /etc/profile ;
echo "JAVA_HOME=$JAVA_HOME" ;
echo "Change Java version for Ubuntu";
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-17-openjdk-amd64/bin/java 1511 ;
# echo "Change Java version for Codespace";
# echo "If it crash and you are not using github codespace,Please delete this command!";
# echo ""
# sudo update-alternatives --install /home/codespace/java/current/bin/java java /usr/lib/jvm/java-17-openjdk-amd64/bin/java 1511 ;
# sudo rm /usr/local/sdkman/candidates/java/current
# sudo ln -s /usr/lib/jvm/java-17-openjdk-amd64 /usr/local/sdkman/candidates/java/current
# echo ""
# echo "If it crash and you are not using github codespace,Please delete this command!";
#↑install JDK 17
echo "press enter to continue.";
read -n 1 -s ;
#↓install gradle 8
echo "Create folder for build-tools";
cd $now_file_path ;
sudo mkdir build-tools ;
cd build-tools ;
# echo "Use Sdkman to install gradle 8.14.3"
# sdk install gradle 8.14.3
# sdk default gradle 8.14.3
echo "Create folder for gradle 8.14.3";
sudo mkdir gradle
cd gradle
echo "Create folder for gradle current for ubuntu"
sudo mkdir current
# echo "Link folder for gradle current for codespace";
# sudo ln -s /usr/local/sdkman/candidates/gradle/current current
echo "Starting Download gradle 8.14.3" ;
sudo wget -O gradle-8.14.3-bin.zip https://services.gradle.org/distributions/gradle-8.14.3-bin.zip ;
echo "Unzip gradle 8.14.3" ;
sudo chmod 777 gradle-8.14.3-bin.zip
sudo unzip -d ./current gradle-8.14.3-bin.zip
echo "Install gradle 8.14.3"
cd ./current/gradle-8.14.3
sudo cp -r  * ../
export GRADLE_HOME=$(cd $now_file_path;cd ./build-tools/gradle/current ;pwd) 
echo "GRADLE_HOME=$GRADLE_HOME"
echo "Delete Temp File"
cd ..
sudo rm -rf gradle-8.14.3
cd ..
sudo rm -f gradle-8.14.3-bin.zip
#↑install gradle 8
#↓install android sdk
echo "Create folder for android-sdk";
cd $now_file_path ;
cd build-tools ;
sudo mkdir android-sdk ;
cd android-sdk ;
echo "Starting Download commandlinetools" ;
sudo wget -O commandlinetools-linux-11076708_latest.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip ;
echo "Unzip commandlinetools" ;
sudo mkdir cmdline-tools ;
cd cmdline-tools
sudo mkdir tools
cd ..
sudo chmod 777 commandlinetools-linux-11076708_latest.zip
sudo unzip -d ./cmdline-tools/tools commandlinetools-linux-11076708_latest.zip 
cd ./cmdline-tools/tools/cmdline-tools
sudo mv * ../ && cd .. && sudo rm -rf ./cmdline-tools
echo "Starting Download Android-SDK-28"
export ANDROID_SDK_ROOT=$(cd $now_file_path;cd ./build-tools/android-sdk ;pwd) ;
# sudo echo "export ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT">>/etc/profile|source /etc/profile;
echo "ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT";
cd $ANDROID_SDK_ROOT/cmdline-tools/tools/bin;
sudo bash sdkmanager "platforms;android-29" "platforms;android-33" "build-tools;34.0.0" "extras;google;m2repository" "extras;android;m2repository";
#↑also you can install "build-tools;33.0.2" "build-tools;29.0.2" "build-tools;30.0.3" 
#↑install android sdk
#↓install JDK 8 
# echo "Use Sdkman to Java 8"
# sdk install java 8.0.472-amzn
# sdk default java 8.0.472-amzn
echo "install openjdk-8-jdk"
sudo apt-get install openjdk-8-jdk
echo "set JAVA_HOME to openjdk-8-jdk"
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 ;
# sudo echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64">>/etc/profile|source /etc/profile ;
echo "JAVA_HOME=$JAVA_HOME" ;
echo "Change Java version for Ubuntu";
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-8-openjdk-amd64/bin/java 1511 ;
# echo "Change Java version for Codespace";
# echo "If it crash and you are not using github codespace,Please delete this command!";
# echo ""
# sudo update-alternatives --install /home/codespace/java/current/bin/java java /usr/lib/jvm/java-8-openjdk-amd64/bin/java 1511 ;
# sudo rm /usr/local/sdkman/candidates/java/current
# sudo ln -s /usr/lib/jvm/java-8-openjdk-amd64 /usr/local/sdkman/candidates/java/current
# echo ""
# echo "If it crash and you are not using github codespace,Please delete this command!";
#↑install JDK 8 
echo "cleaning temp file";
cd $ANDROID_SDK_ROOT ;
sudo rm -f commandlinetools-linux-11076708_latest.zip;
sudo rm -rf .temp;
echo "Install is over! You need to check for yourself for something wrong.";
echo "If everything is fine"
echo "You JAVA_HOME is :$JAVA_HOME";
echo "You GRADLE_HOME is :$GRADLE_HOME";
echo "You ANDROID_SDK_ROOT is :$ANDROID_SDK_ROOT";
echo "You ANDROID_HOME is :$ANDROID_SDK_ROOT";
echo "if you want need change java to jdk-17 ";
echo "just type this: sudo update-alternatives --config  java && sudo update-alternatives --config javac";
echo "and select '/usr/lib/jvm/java-17-openjdk-amd64/bin/java'";
echo "and then type this:sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-17-openjdk-amd64/bin/java 1511 && sudo update-alternatives --install /home/codespace/java/current/bin/java java /usr/lib/jvm/java-17-openjdk-amd64/bin/java 1511 ;"
echo "and type this if you use in codespace:sudo rm /usr/local/sdkman/candidates/java/current & sudo ln -s /usr/lib/jvm/java-17-openjdk-amd64 /usr/local/sdkman/candidates/java/current"
echo "and jdk-8 too,type this if you use in codespace:sudo rm /usr/local/sdkman/candidates/java/current & sudo ln -s /usr/lib/jvm/java-8-openjdk-amd64 /usr/local/sdkman/candidates/java/current"
echo "more information,please check the notepad.txt";