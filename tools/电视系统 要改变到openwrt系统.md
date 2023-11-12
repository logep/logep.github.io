##地址
https://openwrt.ai/?target=armsr%2Farmv8&id=box
https://github.com/ophub/amlogic-s9xxx-openwrt/blob/main/README.cn.md#%E5%AE%89%E8%A3%85%E5%8F%8A%E5%8D%87%E7%BA%A7-openwrt-%E7%9A%84%E7%9B%B8%E5%85%B3%E8%AF%B4%E6%98%8E


## https://github.com/ophub/amlogic-s9xxx-openwrt/releases
在这个 release版本搜索 s905d 相关固件

安装 OpenWrt
Rockchip 平台的安装方法请查看说明文档中的 第 8 章节 的介绍，和 Armbian 的安装方法相同。

Amlogic 和 Allwinner 平台，使用 Rufus 或者 balenaEtcher 等工具将固件写入 USB 里，然后把写好固件的 USB 插入盒子。从浏览器访问 OpenWrt 的默认 IP: 192.168.1.1 → 使用默认账户登录进入 OpenWrt → 系统菜单 → 晶晨宝盒 → 安装 OpenWrt ，在支持的设备下拉列表中选择你的盒子，点击 安装 OpenWrt 按钮进行安装。

升级 OpenWrt
从浏览器访问 OpenWrt 的 IP 如: 192.168.1.1 → 使用账户登录进入 OpenWrt → 系统菜单 → 晶晨宝盒 → 手动上传更新 / 在线下载更新

如果选择 手动上传更新 OpenWrt 固件，可以将编译好 OpenWrt 固件压缩包，如 openwrt_xxx_k5.15.50.img.gz 进行上传（推荐上传压缩包，系统会自动解压。如果上传解压缩后的 xxx.img 格式的文件，可能会因为文件太大而上传失败），上传完成后界面将显示 更新固件 的操作按钮，点击即可更新。

如果选择 手动上传更新 OpenWrt 内核，可以将 boot-xxx.tar.gz, dtb-xxx.tar.gz, modules-xxx.tar.gz 这 3 个内核文件上传（其他内核文件不需要，如果同时上传也不影响更新，系统可以准确识别需要的内核文件），上传完成后界面将显示 更新内核 的操作按钮，点击即可更新。

如果选择 在线下载更新 OpenWrt 固件或内核，将根据插件设置中的固件下载地址和内核下载地址进行下载，你可以自定义修改下载来源，具体操作方法详见 luci-app-amlogic 的编译与使用说明。


```
一定记得备份自己的电视系统
备份/还原 EMMC 原系统
支持在 TF/SD/USB 中对盒子的 EMMC 分区进行备份/恢复。建议您在全新的盒子里安装 OpenWrt 系统前，先对当前盒子自带的安卓 TV 系统进行备份，以便日后在恢复电视系统等情况下使用。

请从 TF/SD/USB 启动 OpenWrt 系统，浏览器访问 OpenWrt 的默认 IP: 192.168.1.1 → 使用默认账户登录进入 OpenWrt → 系统菜单 → TTYD 终端 → 输入命令

openwrt-ddbr
根据提示输入 b 进行系统备份，输入 r 进行系统恢复。
```

## 前提 是电视系统 要改变到openwrt系统
无需打开ADB，只要安装APP，把刷好的U盘，插入N1，打开APP

盒子里安装一下
链接：https://pan.baidu.com/s/1IT0ZZGtzaZKkluRnPYkx7g
提取码：5uua


### 有的人是需要刷会原来原系统，在走u盘刷会openwrt系统


电视盒子刷OP

　　刷机流程图如下，建议先了解一下刷机流程再看下面的具体操作步骤，不容易出错。


　　 具体步骤：
https://etcher.balena.io/#download-etcher
　
  无需打开ADB，只要安装APP，把刷好的U盘，插入N1，打开APP

盒子里安装一下 链接：https://pan.baidu.com/s/1IT0ZZGtzaZKkluRnPYkx7g 提取码：5uua

## 进行这个前 一定先要 这个软件做启动u盘

  1、使用belana etcher将固件写入U盘，写入完成后不要格式化u盘；

　　2、将u盘插在N1背部的usb口，进行通电开机；

　　3、等待wifi出现，然后连接wifi，如果使用定制插件，请使用定制的wifi账号和密码。

　　4、默认开启了WIFI, WIFI名:OpenWrt_5G 无密码，后台入口 op/ 或 10.0.0.1  初始密码: root

　　5、通过晶晨宝盒插件后台傻瓜式更新固件,备份固件, 写入EMMC, CPU调整等( 可先更新 固件 然后备份固件，再写入EMMC CPU可以调整)

　　6、最后拔掉U盘，重新通电即可


![tt](https://www.right.com.cn/forum/data/attachment/forum/202302/27/213456uisfyfpds88py8dy.png)


## 安装晶辰宝盒

首先，非常感谢原文链接 https://www.right.com.cn/FORUM/thread-4241851-1-1.html 作者给我的启发。
自用的N1 openwrt 自从21年6月安装openwrt_s905d_n1_R21.3.8_by_wangxiaofeng_k5.4.101-flippy-54+o.img版本固件之后，就万年没变过，因为正好近期家里宽带升级，N1 做单臂路由，AP 网速一直上不去（已解决,会另发我的解决办法），就想着把固件也顺便升级。
使用u盘安装了好多次66+o，都失败了，就向看看有没有其他办法能升级。
最终看到论坛中，这篇文章，通过TTYD 一键脚本成功安装“晶晨宝盒”具体升级方法很简单：
1、登录软路由管理界面后，找到系统-TTYD终端，输入软路由用户名和密码 登录（有的版本无需登录）
2、登录后，直接输入  curl -fsSL git.io/luci-app-amlogic | bash   回车即可，等待一段时间，自动安装完成。
3、重启软路由，找到系统选项，就能看到安装成功的 晶晨宝盒了

### 
、对于DDNSTO，需要的可以直接使用如下命令升级
cd /tmp
wget --no-check-certificate http://fw.koolcenter.com/binary/ddnsto/openwrt/install_ddnsto.sh; sh ./install_ddnsto.sh

安装完成重启软路由即可。

1、某东签到
下载ipk文件，使用 openwrt 自带的上传功能，上传之后，直接更新即可如果更新提示报错，可以使用putty或者openwrt 里内置的TTYD工具。执行命令，安装以下依赖：
opkg update  opkg install node wget lua之后点击安装即可。（22-03-27更新）
下载地址：链接：https://pan.baidu.com/s/1NEbeLpRCYI1FsoLBk-b7-A
提取码：yxsi     （需解压）
