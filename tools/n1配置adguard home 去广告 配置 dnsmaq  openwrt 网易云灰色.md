进入自己的wifi详情，代理选自动配置，pac网址填http://你的服务器网址:5200/proxy.pac。保存即可。还不行的话，要试试关闭ipv6

感谢感谢，用您这个方法+您提供的APP，成功解锁，

只能用代理模式了 早就只能用代理模式了，所以苹果已经不能用

历经几个月，我也是前两个月才找到解决方法，那就是，不要用最新版，网易云2.9.7即可

ad 默认用户  root  密码 root




> 本文原文地址 [www.right.com.cn](https://www.right.com.cn/forum/thread-4090928-1-1.html)  ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=559184&size=middle) bzlzm _ 本帖最后由 bzlzm 于 2021-5-25 16:53 编辑_  
**2021 年 03 月 21 日更新：写在前面，留言区给了我启示，因为我是一直是用 x86 折腾，忽略了硬路由刷 openwrt 用户的感受，以我在 x86 平台折腾体会需要两个硬件条件，一是存储空间要给 AdGuardHome 至少配置 50-80M，二是 AdGuardHome 需要内存 30M 左右，如果这两硬条件满足不了那么这个方案就不适配！**  
看到论坛里说 AdGuardHome 不好用，我用着一直挺好的，给大家参考一下，此方法是去广告和自建 DNS 合集  
说得再好也不如先来个效果图  
![](data/attachment/forum/202103/12/134247r7n6713z117jczg9.png)

**10.png** _(122.01 KB, 下载次数: 32)_

[下载附件](forum.php?mod=attachment&aid=NDUzMDkwfDQ5MzM2MWQwfDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 13:42 上传

  
近 2 万个查询，平均值还可以吧，我这还是开了 Openclash 经常溜达到外面转的值。  
进入正题：  
首先，你的固件得安装了 luci-app-adguardhome，安装完成请先不要启动，如果以前安装过老版，想更新也可以按此方法更新，但请先停止运行 AdGuardHome。  
![](data/attachment/forum/202103/20/231435vx4nlaaxl6madd8a.png)

**13131.png** _(129.49 KB, 下载次数: 26)_

[下载附件](forum.php?mod=attachment&aid=NDU5NDMyfDEwYzI2ZDA3fDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-20 23:14 上传

  
然后，请去官网下载 AdGuardHome 最新版，注意自己的 CPU 型号，不懂的度娘哈，下载的话把琏接复制到工具里，用下载工具下载，不然会很慢，新手就不要在 AdGuarHome 里点  更新核心 了，这个巨慢，还有 90% 以上机率不成功，这个要有学习环境才行。  
[https://github.com/AdguardTeam/AdGuardHome/releases](https://github.com/AdguardTeam/AdGuardHome/releases)  
（x86 下载 [AdGuardHome_linux_amd64.tar.gz](https://github.com/AdguardTeam/AdGuardHome/releases/download/v0.105.2/AdGuardHome_linux_amd64.tar.gz)）  
下载完成请解压，然后用 winscp 上传到 openwrt 的 **/usr/bin** 目录下，如果以前安装过，请先按上面图示在 openwrt 里停止运行 AdGuardHome, 然后把此目录老版的文件夹删除上传新版  
![](data/attachment/forum/202103/12/124143bi3k7ki2dsx72i07.png)

**1.png** _(24.65 KB, 下载次数: 32)_

[下载附件](forum.php?mod=attachment&aid=NDUzMDY3fGFlZDU3YTZlfDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 12:41 上传

  
**请给权限**  
**★**![](data/attachment/forum/202103/12/124246qp121hntnfla879n.png)

**2.png** _(38.65 KB, 下载次数: 29)_

[下载附件](forum.php?mod=attachment&aid=NDUzMDY4fDVjNzYyMzA0fDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 12:42 上传

  
**★**  
如果以前安装过，请去 / etc 目录下删除 AdGuardHome.yaml，然后可以关闭 winscp 了  
上传完文件然后现在回到上面那个启动项的图示，把 AdGuardHome 禁用关掉但不启动。  
至此，软件安装成功，不成功的请按上面步骤重做一次  
**知识点**：好多安装后显示无核心其实就是第一次运行时**权限**不够导致的，想要显示有核心，把 Openwrt 里的所有 AdGuardHome 配置和服务删除再重新安装一次就可，共有三处，我上面提到两处了，另一处是在 / etc/init.d 下，此操作务必小心，这个文件夹下的是 AdGuardHome 的主服务程序，删除就必须重新安装 AdGuardHome.ipk，或者固件初始化后可恢复。  
**重点一**：  
1，你到底需要不需要 openwrt 自带的 dnsmasq，如果不需要，请更改 dnsmasq 的端口，请看图（建议用此方法）：  
![](data/attachment/forum/202103/12/125239urtumouhum1sor1z.png)

**3.png** _(185.06 KB, 下载次数: 24)_

[下载附件](forum.php?mod=attachment&aid=NDUzMDczfDY0OWI1Njc0fDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 12:52 上传

  
2，如果需要使用 dnsmasq, 那么注意 L 大固件里防火墙 53 端口优先的指令，注销防火墙的 53 端口优先指令，然后配置 AdGuardHome 里的：  
![](data/attachment/forum/202103/12/125245vffrbuzbruauu3dj.png)

**4.png** _(94.74 KB, 下载次数: 33)_

[下载附件](forum.php?mod=attachment&aid=NDUzMDc0fGNkOTMyNzljfDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 12:52 上传

  
注销防火墙的 53 端口这两项，前面加 #号保存  
![](data/attachment/forum/202103/12/125919zdyz5upng45cbwwt.png)

**5.png** _(135.41 KB, 下载次数: 37)_

[下载附件](forum.php?mod=attachment&aid=NDUzMDc3fDNhYmM0NTQzfDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 12:59 上传

  
重定向勾选并启动 AdGuardHome 后会自动改写 dnsmasq 的 DHCP/DNS 配置转发。一般都是  127.0.0.1# 你的自定义端口，  
![](data/attachment/forum/202103/21/223804v6326fhuhq636t0z.png)

**1333.png** _(173.95 KB, 下载次数: 29)_

[下载附件](forum.php?mod=attachment&aid=NDU5Njc2fDk3MTQ0YjcwfDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-21 22:38 上传

  
到此，openwrt 里的配置就完成了，请勾选上面的启用并保存，然后点击下图  
   ![](data/attachment/forum/202103/12/203958owcr2l2wz21qrj2h.png)

**113.png** _(8.09 KB, 下载次数: 36)_

[下载附件](forum.php?mod=attachment&aid=NDUzMjQwfDIwODZlY2FkfDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 20:39 上传

  
_（如果是 docker 或 linux 安装，这里就去浏览器输入  IP:3000  访问）_  
设置端口号这里注意，如果不打算用 openwrt 的 dnsmasq，请一定直接用 53 端口，我个人一直使用的 53 端口替代 dnsmasq，没啥附作用，挺好的，而且这种配置方法也适合 docker 和 linux 安装 AdGuardHome  
（这里把逻辑给捊一下，DNS 软件或远程 DNS 服务器解析默认端口都是 53，L 大的固件默认也是 53，而且优先级最高，而 openwrt 里的太多设置 DNS 插件和需要用到 dns 的插件，怕小白们弄冲突所有上面有把防火墙注销掉，其实明白了原理防火墙那里 53 优先配置最好不注销，让 AdGuardHome 占用 53 端口，所以建议新手直接把 dnsmasq 改个端口变相达到弃用的目的，按我的方法执行下去就变成了让 AdGuardHome 的 DNS 配置代替 L 大默认的 dnsmasq）  
然后用户名密码随意  
好了，下面的一个优秀的高效的 DNS 和广告过滤配置的重点来了  
**重点二：**  
[size=1.5] 常规设置  
![](data/attachment/forum/202103/12/130547z5z8tmx5fbp1yx5b.png)

**6.png** _(118.51 KB, 下载次数: 29)_

[下载附件](forum.php?mod=attachment&aid=NDUzMDc4fDAyYjA5YmU2fDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 13:05 上传

  
第二、三项不要勾选，因为这个会连接 AdGuradHome 服务器，从而导致打开网页缓慢  
下面的日志配置各位根据自己机器容量来，两个全 7 天的话，AdGuardHome 运行七天后记录文件会达到至少 50M 以上  
![](data/attachment/forum/202103/12/131200tc5otcvtcjp6n46d.png)

**7.png** _(18.02 KB, 下载次数: 25)_

[下载附件](forum.php?mod=attachment&aid=NDUzMDc5fGRjZWM5ODM4fDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 13:12 上传

  
**DNS 设置****上游 DNS 服务器**   
**知识点**：这里就是大家日常上网用到的干净的 DNS 域名服务器了，各位根据自己所处的位置和国内外环境填就好，一般国内的建议用阿里百度腾讯，国外谷歌就好，这里有个技巧，日常多 Ping 一下公共 dns，哪个值优秀填到第一项，这里不是填得越多越好，越多解析 DNS 用的时间越久，打开网页越慢，给出我的配置大家参考  
![](data/attachment/forum/202103/12/132104q9t39y1y9oo9tx1z.png)

**8.png** _(110.18 KB, 下载次数: 38)_

[下载附件](forum.php?mod=attachment&aid=NDUzMDg1fDJiMDFlMDE0fDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 13:21 上传

  
**上图可以选  并行请求  实测区别不太明显**  
有 IPV6 的可以再添加下面三个 IPV6 的 DNS，这里大家**一定要注意**，如果你用不到这些 DNS，那就不要加进去，贪大求多导致没必要的负担，因为我平时上网主力线路是移动大内网，加上很好使的。  
阿里云：  
2400:3200::1  
国家互联网工程中心 DNS：  
240c::6666  
谷歌：  
2001:4860:4860::8888  
**Bootstrap DNS 服务器**  
**知识点**：这里填大家宽带运营商的本地 DNS，这里的 DNS 是用来解析上面的公共 DNS 用的，所以越近越好，最近的当然是你家宽带运营商的 DNS 了。我用的双线路接入，所以填了移动大内网的本地 DNS 和 IPV6 的 DNS 还有联通的 DNS  
211.137.96.205  
2409:8062:2000:1::1  
119.6.6.6  
**重要的事情强调多次，如果你没有 IPV6，把列表里的 ipv6 都去掉，没有溜达出去需求的把谷歌的也去掉。**  
**2021 年 03 月 14 日补充更新：看到大家对这两个 DNS 地址设定有很多疑惑，那么补充一点把原理说一下，首先要知道，DNS 就是域名解析，找到你要访问的域名对应的互联网真实地址，互联网架构决定了，服务器离我们越近、转发的次数越少速度就越快，（当然这里要排除 ISP 之间的互联策略，有可能电信联通同在一个机房里但两台 DNS 的 PING 值也很高的，）我们自架 DNS 是为了屏蔽广告，但运营商如果给你的本地 DNS 本来就是很纯净的，那么就没有必要舍近求远去用别人家的 DNS，在 AdGuardHome 里上游 DNS 和 Bootstrap DNS 都设定成本地的 DNS 速度就是最快的，但，运营商本地区域性的 DNS 对域名记录是偏少的，知名网站肯定都有记录，当某个域名不知名并没有记录时，你的网页就在那里转圈圈半天打不开，再但，国内的某些运营商你懂的，比如我以前用过广电的网络，解析电信线路就卡得一批，还有欢迎的弹窗广告，同一运营商，不同省份，不同城市，DNS 也不一定一样，这个得大家自己在平时多用心观察。****所以我们就要用阿里这些知名的 DNS，不仅速度快且记录全，具体到个人的网络环境就又不一样的，****因此最好的办法就是 CMD 里去 ping，找到最优秀而且没广告的就可以了。最后还是建议大家用公共的 DNS，虽然比你本地的慢一点，但这点速度肯定是你体会不到的，再者，玩这论坛的都是到处找教程、学习资料，别人的资料可能就在自建的路由器上，国外申请免费域名，你本地运营商的 DNS 肯定没有记录的，这个见仁见智哈，明白了这个道理就按个人需求来吧。**  
**服务设定：**  
![](data/attachment/forum/202103/12/205532cyz337q3qy04eq3u.png)

**112.png** _(116.6 KB, 下载次数: 23)_

[下载附件](forum.php?mod=attachment&aid=NDUzMjQzfGU1OTcxMDg4fDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-12 20:55 上传

  
**缓存设置**  
缓存大小设置，各位根据自己的固件空间来，我自己编译的旁路，空间设的大  
83886080  
如果主路开启了缓存，这里可以关闭，要关闭的话把值设成 0 即可  
![](data/attachment/forum/202103/16/052800bvvj1wuqnwe9aw61.png)

**121.png** _(61.93 KB, 下载次数: 27)_

[下载附件](forum.php?mod=attachment&aid=NDU0MDYzfGI0YThkZGJhfDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-16 05:28 上传

  
**知识点**：如果 openwrt 是旁路且主路打开了 DNS 缓存，那么经常在日志里不能实时反映出客户端的 DNS 请求现像，这是因为主路缓存了那个域名的 IP，客户端的请求就不会再经过 AdGuardHome 了，这对有些需要用到日志来抓包的朋友来说并不是软件失灵，要想实时抓出地址，把主路的缓存关闭即可。  
**2021 年 03 月 20 日补充更新：**  
![](data/attachment/forum/202103/20/212938b423w8w8w34wntnh.png)

**1.png** _(126.53 KB, 下载次数: 28)_

[下载附件](forum.php?mod=attachment&aid=NDU5NDIxfDlhZGRjZmFkfDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-3-20 21:29 上传

  
设置里面下面的另两项因我不需要这些功能，所以没有配置，DHCP 功能、加密设置  我想在 AdGuardHome 安装在 linux 服务器下还是有点武之地吧，咱们不搞服务器没必要了![](https://www.right.com.cn/forum/static/image/smiley/default/lol.gif)  
2021 年 05 月 25 日更新：  
各位如果有经常写 win10 的 C:\Windows\System32\drivers\etc\hosts 文件需求的话，下面这个功能就可以一劳永逸了  
![](data/attachment/forum/202105/25/164946s82z6806405kg506.png)

**123123.png** _(67.9 KB, 下载次数: 24)_

[下载附件](forum.php?mod=attachment&aid=NDczOTY4fGI5MGFiZjU0fDE3MDAzMTc2NTF8MHw0MDkwOTI4&nothumb=yes)  [保存到相册](javascript:;)

2021-5-25 16:49 上传

  
_另外说个小技巧，由于大家经常折腾，每次固件折腾完了重新配置 AdGuardHome 比较麻烦，有个技巧就是用 WinSCP 工具进入固件的 / etc 目录下，把 AdGuardHome.yaml 文件拷贝出来，以后重新安装固件了，在启动 AdGuardHome 前先把备份的配置文件拷贝回去，再启动 AdGuardHome 就可以了。_  
**DNS 封锁清单**  
easylist  
[https://anti-ad.net/easylist.txt](https://anti-ad.net/easylist.txt)  
rule  
[https://gitee.com/xinggsf/Adblock-Rule/raw/master/rule.txt](https://gitee.com/xinggsf/Adblock-Rule/raw/master/rule.txt)  
easyprivacy 隐私  
[https://easylist-downloads.adblockplus.org/easyprivacy.txt](https://easylist-downloads.adblockplus.org/easyprivacy.txt)  
easylistchina  
[https://easylist-downloads.adblockplus.org/easylistchina.txt](https://easylist-downloads.adblockplus.org/easylistchina.txt)  
adgk 手机去广告规则  
[https://banbendalao.coding.net/p ... raw/master/ADgk.txt](https://banbendalao.coding.net/p/adgk/d/ADgk/git/raw/master/ADgk.txt)  
YouTube - 去广告  
[https://gist.githubusercontent.c ... 828c37/hosts-yt-ads](https://gist.githubusercontent.com/Ewpratten/a25ae63a7200c02c850fede2f32453cf/raw/b9318009399b99e822515d388b8458557d828c37/hosts-yt-ads)  
视频去广告  
[https://gitee.com/lhzgl6587/hosts/raw/master/myruler](https://gitee.com/lhzgl6587/hosts/raw/master/myruler)  
乘风视频  
[https://gitee.com/xinggsf/Adblock-Rule/raw/master/mv.txt](https://gitee.com/xinggsf/Adblock-Rule/raw/master/mv.txt)  
**知识点**：这里如果右下角出现红色提示 Error 502 有两个可能，一是你的 openwrt 没有通网，二是这里列表里有几个是国外服务器，被当地 ISP 或哪级防火墙给墙了，  
解决办法：一是等 AdGuardHome 配置完成了公共的 DNS 时再来试下，基本都能成功；二是找个违禁词语了。  
**自定义过滤规则**  
下面是平时抓取的**创维智能电视、百度百家号、IOS 的 OTA 更新**屏蔽地址，拷贝粘贴到自定义过滤规则表里点击应用就可以了  
||active.tc.skysrt.com^  
||ad.3.cn^  
||admaster.com.cn^  
||alog.umeng.com^  
||amdcopen.m.taobao.com^  
||api.app.skysrt.com^  
||api.device.skysrt.com^  
||api.hoisin.hw.coocaatv.com^  
||api.home.skysrt.com^  
||api.skyworthiot.com^  
||api.upgrade.skysrt.com^  
||api-app.coocaa.ottcn.com^  
||api-home.coocaa.ottcn.com^  
||api-home.skysrt.com^  
||api-upgrade.coocaa.ottcn.com^  
||app.snm0516.aisee.tv^  
||btrace.play.t002.ottcn.com^  
||business.video.tc.skysrt.com^  
||cl-dl.cc0808.com^  
||clog.skysrt.com^  
||conf-darwin.xycdn.com^  
||connect.play.aiseet.atianqi.com^  
||data-dl.skysrt.com^  
||data-hoisin.coocaa.com^  
||dl.skysrt.com^  
||dp3.play.t002.ottcn.com^  
||gs.getui.com^  
||hoisin.coocaa.com^  
||hoisin.coocaatv.com^  
||irs01.com^  
||kaola.com^  
||livep.l.t002.ottcn.com^  
||log.skysrt.com^  
||mdp-at.geely.com^  
||member.coocaa.com^  
||miaozhen.com^  
||mtrace.play.t002.ottcn.com^  
||ocsp.int-x3.letsencrypt.org^  
||p.tencentmind.com^  
||play.t002.ottcn.com^  
||push.tc.skysrt.com^  
||push.tvos.skysrt.com^  
||puui.qpic.cn^  
||qr.coocaa.com^  
||res.hoisin.coocaatv.com^  
||rpc-tc.skysrt.com^  
||rpt-gdt.play.t002.ottcn.com^  
||s.jpush.cn^  
||sdk1xyajs.data.p2cdn.com^  
||sis.jpush.io^  
||sky.tvos.skysrt.com^  
||skyworthdigital.com^  
||skyworthiot.com^  
||stats.jpush.cn^  
||status.tvos.skysrt.com^  
||status2.tvos.skysrt.com^  
||sv.video.qq.com^  
||taps.net^  
||tq.skysrt.com^  
||tracker.appadhoc.com^  
||tvapp.hpplay.cn^  
||tvos.skysrt.com^  
||tx.ctrmi.cn^  
||umengacs.m.taobao.com^  
||uop.umeng.com^  
||update01.skyworth-cloud.com.wswebpic.com^  
||update01.skyworth-cloud.com^  
||vqq.admaster.com.cn^  
||webapp.skysrt.com^  
||bak.bajintech.com^$important^  
||iwd.skysrt.com^$important^  
||ipv4only.arpa^$important^  
||api.bajintech.com^$important^  
||wifimodule.doubimeizhi.com^$important^  
||msy59wz.mqtt.iot.gz.baidubce.com^$important^  
||i.ytimg.com^$important^  
度娘搜索去掉讨人嫌的百家号（这个有副作用，电脑端新闻版面里多数是百家号的域名冠名，会导致打不开）：  
||baijiahao.baidu.com^  
创维电视没事去连这些是给赚点击广告赚钱的吧？需要用的请把后面的 IP 换成自己电视的 IP，另外，如果使用了，在电视上是打不开这些网站的哦  
||qq.com^$client='10.0.0.99'  
||baidu.com^$client='10.0.0.99'  
||aliyun.com^$client='10.0.0.99'^  
||taobao.com^$client='10.0.0.99'^  
||alibaba.com^$client='10.0.0.99'^  
||aliyuncs.com^$client='10.0.0.99'^  
屏蔽苹果 OTA 更新  
||xp.apple.com^  
||mesu.apple.com^  
||gdmf.apple.com^  
||ocsp.apple.com^  
||appldnld.apple.com^  
||world-gen.g.aaplimg.com^  
**现在去把负责 DHCP 的主路由 DNS 改成 AdGuarDhome 的 IP 就大功告成了**。  
如果 openwrt 是旁路，在  接口  里把 DNS 设置成本机 IP 就可  
补充：  
日常可以在日志里看设备访问了哪些网址，如果涉嫌广告，鼠标一点加入自定义列表就可  
日志可以常清理一下  
**2021 年 03 月 17 日更新：看到回复里说了一些 AD 的问题，其实质是没有把 Ad 的日志功能使用起来，Ad 的日志功能是相当强大的，想去广告就得重视日志**  
下面是我回复坛友的话：  
**_只要你能找准网址，没有不能屏蔽的，区别广告网址和正常网址费时费力，需要时间_**  
**_再有，创维牛哈，广告地址随时也是在变的，道行高，但逃不出 AD 的日志，多观察并找准广告地址一键加入自定义列表_**  
**_比如我，主路由爱快的 docker 有一个 AD，旁路 Openwrt 也有一个 AD，如果我要抓创维电视的地址，我把创维的 DNS 设置成主路 IP，让电视一个人用主路的 AD，这样日志里全是创维的地址，就像刚才你打不开视频，电视不停止的访问被拦截的内容，主路的 AD 日志就会刷屏显示拦截，基本就可以找出准确地址了，然后放行就可以看被拦截的视频了，想要拦截也一样，不停的访问就是了，抓几个网址挨个加个自定义列表测试就知道了_**  
**_2021 年 4 月 26 日更新_**  
_**DNS 查询优先缓存，缓存有，直接访问这个 IP 地址，如果没有就去查询，大型公有网站一般都固定 IP，缓存有就是好事，但如果你访问我路由器，我是动态 IP，IPV6 是七天换一次，我公有 IPV4 是三天拨号一次，你缓存了，三天后访问我 IP 而我的 IP 已经变更，这样你就得重新查询并缓存，你的速度反而变慢了，逻辑就是这个逻辑，如何配置取决你个人的兴趣爱好，这个爱好比如你只看 youtube 和 blibli，人家都固定 IP 你当然设定缓存时间久和大是最好的。多想想就知道自己如何配置了**_  
_**2021 年 05 月 08 日更新**_  
_**不要一有问题就是 ADG 的，代理软件问题本身就很多，要不版本几天一变呢，这个不行换个版本试试，还有就是 openwrt 固件本身集成太多插件导致各种冲突问题，反正我的 ADG 稳如老狗，可能跟我自编译有关，我的固件只有我需要的插件，其它不需要的能不要全没要。**_  
![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=515091&size=middle)rq1025330 
