https://www.youtube.com/watch?v=G3Gri7fesYU&ab_channel=%E6%90%9E%E6%9C%BA%E9%9B%B6%E8%B7%9D%E7%A6%BB

> 本文原文地址 [www.right.com.cn](https://www.right.com.cn/forum/thread-4035785-1-1.html)  ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=612280&size=middle) edywh _ 本帖最后由 edywh 于 2021-4-22 15:52 编辑_  
相信很多童鞋的 N1 都刷了 f 大的固件，恩山里帖子很多但比较杂乱，重新梳理一下 N1 网关模式（旁路由）的详细设置  
配置 “单 LAN + 添加防火墙规则” 是比较常见的方式，大多数情况下，主路由 PPPoE 拨号上网（少数情况主路由 DHCP 接入外网）  
**不论主路由以何种方式接入互联网，N1 作为局域网网关（旁路由）的 LAN 设置中，都要将网关和 DNS** **都指向主路由**  
当然，DNS 也可以使用 114 等公共 DNS，或自行配置 SmartDNS  
国内外公共 DNS 参考：  
[https://public-dns.info/](https://public-dns.info/)  
[https://www.ip.cn/dns.html](https://www.ip.cn/dns.html)  
三种常见的设置方式：  
**（1）主路由开 DHCP，N1 关 DHCP**  
主路由无需设置（负责 PPPoE/NAT/Wi-Fi/DHCP 等）  
N1 的 LAN 设置，关闭 DHCP，网关和 DNS 指向主路由（负责特殊功能）  
终端**必须**手动配置，需要特殊功能的终端（手机 / PC / 电视盒子 / 游戏机等）在网络设置中，将网关和 DNS 手动指向 N1；没有需要的终端，无需设置正常上网  
适合终端较少的场景，以及无法配置主路由（合租或不想影响其他人上网）；优点：N1 万一崩了，不影响其他终端上网  
**（2）主路由开 DHCP，N1 关 DHCP**  
主路由 LAN 设置，**可以指定**网关和 DNS，如：ASUS/TP-Link 等原厂固件，或 OpenWrt/Padavan/Merlin 等第三方固件  
主路由 LAN 设置，网关和 DNS 指向 N1（负责 PPPoE/NAT/Wi-Fi/DHCP 等）  
N1 的 LAN 设置，关闭 DHCP，网关和 DNS 指向主路由（负责特殊功能）  
终端**不需要**手动配置  
此方式适合终端较多的场景，避免逐一设置终端的麻烦，前提主路由固件可以指定网关和 DNS；缺点：N1 万一崩了，所有终端无法上网  
  
**（3）主路由关 DHCP，N1 开 DHCP**  
主路由 LAN 设置，**无法指定**网关和 DNS，如：华为 / 小米等原厂固件  
主路由 LAN 设置，关闭 DHCP（负责 PPPoE/NAT/Wi-Fi 等）  
N1 的 LAN 设置，开启 DHCP，网关和 DNS 指向主路由（负责 DHCP / 特殊功能）  
终端**不需要**手动配置  
几乎所有的主路由都能关闭 DHCP，**此方式可用于绝大多数场景**；缺点：N1 万一崩了，所有终端无法上网  
以上三种方式建议根据个人实际情况选用，以下内容以**第（3）种****方式**示例，前两种方式的设置也不难，建议自行摸索  
_**【准备工作】**_  
1）下载 flippy 大最新版固件，感谢 f 大，@flippy  
新帖：[2020-10-18] 46+O S905x3(含 x2)、N1、贝壳云、我家云等 OP 固件  
[https://www.right.com.cn/forum/thread-4055451-1-1.html](https://www.right.com.cn/forum/thread-4055451-1-1.html)  
旧帖：[N1 盒子] [2020-5-14]★36+o 版 N1_OP_U 盘直刷包，及贝壳云_OP_线刷包 (链接已补)  
[https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=981406](https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=981406)  
2）下载刷机软件 balenaEtcher，将固件写入 U 盘  
[https://www.balena.io/etcher/](https://www.balena.io/etcher/)  
3）将 U 盘插入 N1 的 USB 口（有帖子建议插在靠近 HDMI 的 USB 口，实测中两个都可以）  
用网线连接电脑和 N1，确认电脑网卡是 DHCP 自动获得 IP，等待电脑获得 IP 后，登录管理后台  
192.168.1.1  
用户名：root  
密码：password  
_**【N1 设置旁路网关】**_  
1）系统 >> 系统 >> 基本设置 >> 主机名 >> 设置为 N1  
                                        >> 语言和界面 >>bootstrap>> 保存 & 应用，手动刷新  
_此步骤可选，仅为截图示意方便_  
2）系统 >> 管理权 >> 修改主机密码 >> 保存 & 应用  
3）网络 >> 接口 >>LAN>> 修改 >> 一般配置 >> 基本设置 >>IPv4 地址 (IP 设为与主路由同网段)>> 保存 & 应用  
_最近更换了新的主路由华为 AX3Pro，截图中，设置为同一网段的 192.168.3.3  
等待 1 分钟左右，电脑会自动获取新的 IP，若无法自动获取，重新插拔网线，等待电脑获得 IP 后，再次登录管理后台_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 01-44-52 的屏幕截图. png** _(91.97 KB, 下载次数: 35)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MTg5fGQ1OGE3NTE1fDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

LAN 基本设置

2020-6-12 18:25 上传

  
网络 >> 接口 >>LAN>> 修改 >> 一般配置 >> 基本设置 >>IPv4 网关 >> 主路由 IP  
                                                                                           >>DNS 服务器 >> 主路由 IP（或公共 DNS）  
_N1 的 IPv4 网关填入 AX3Pro 的 IP 地址 192.168.3.1  
DNS 可以继续填入 192.168.3.1，也可以填写本地网络延时最低的 DNS，截图中以阿里和 114DNS 示例__国内外公共 DNS 参考：_  
[https://public-dns.info/](https://public-dns.info/)  
[https://www.ip.cn/dns.html](https://www.ip.cn/dns.html)  
网络 >> 接口 >>LAN>> 修改 >> 一般配置 >> 高级设置 >> 关闭 “内置的 IPv6 管理”  
_本地局域网一般不需要 IPv6，避免冲突，主动关闭_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 01-55-44 的屏幕截图. png** _(88.53 KB, 下载次数: 25)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjExfDg2NDBmM2JmfDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

LAN 高级设置

2020-6-12 18:50 上传

  
网络 >> 接口 >>LAN>> 修改 >> 一般配置 >> 物理设置 >> 取消 “桥接”，接口固定为 eth0  
_取消 N1 的桥接，是为了在本地局域网内，只使用主路由 Wi-Fi_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 01-58-00 的屏幕截图. png** _(98.83 KB, 下载次数: 28)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjEyfGMxMjk3YzA4fDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

LAN 物理设置

2020-6-12 19:01 上传

  
                                                 
DHCP 服务器 >> 高级设置 >> 强制 “使用本机 DHCP”  
_此步骤是将 N1 设置为局域网内唯一的 DHCP 服务器  
为避免一个局域网内有两个 DHCP 服务器而产生不必要的冲突，后续将关闭主路由 DHCP_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-01-09 的屏幕截图. png** _(107.18 KB, 下载次数: 26)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjE0fDEyNDJlNWZhfDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

DHCP 高级设置

2020-6-12 19:11 上传

  
                          
DHCP 服务器 >>IPv6 设置 >> 禁用 “路由通告服务 / DHCPv6 服务”>> 保存 & 应用  
_本地局域网一般不需要 IPv6，避免冲突，主动关闭_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-03-46 的屏幕截图. png** _(80.25 KB, 下载次数: 31)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjE1fGRiMzE5ODZjfDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

DHCPIPv6 设置

2020-6-12 19:11 上传

  
4）网络 >> 无线 >> 停用，设置立即生效  
_截图为关闭后的状态，N1 的 Wi-Fi 只支持 1x1 MIMO，性能很差，不建议使用  
关闭后，局域网内的终端无线接入全部使用主路由 Wi-Fi_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-06-48 的屏幕截图. png** _(86.11 KB, 下载次数: 29)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjE2fDA1NmFmOGVifDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

关闭无线功能

2020-6-12 19:20 上传

  
5）网络 >> 防火墙 >> 自定义规则  
在最下面一行复制粘贴以下规则，重启防火墙，设置立即生效  
iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE  
  
_建议增加，最近发现，如果不加这一条防火墙规则，手机自带的应用商店，会无法打开（iPhone app store）或非常卡顿无法更新 (小米应用商店)_  
_由于 N1 只有一个网口，flippy 大的固件中，默认只有 LAN，没有 WAN，N1 作为内网旁路网关时，手机 / PC 等终端请求的数据包会先到 N1，再转发给主路由_  
_转发的默认设置并不修改数据包来源 IP 地址，添加这条规则的目的就是把数据包来源 IP 修改为 N1 的 IP_  
_如果不想添加这一条规则，需要在_ _“网络>> 接口”__添加一个 WAN 口，关闭 LAN 的桥接，并将 WAN 和 LAN 口共用 eth0_  
关于防火墙规则的分析：[https://www.right.com.cn/forum/thread-2983767-1-1.html](https://www.right.com.cn/forum/thread-2983767-1-1.html)  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-10-54 的屏幕截图. png** _(93.99 KB, 下载次数: 25)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjE3fGI2OTkyMjI3fDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

添加防火墙规则

2020-6-12 19:22 上传

  
6）网络 >>Turbo ACC 网络加速 >> 启用 “Flow Offloading 转发加速 / BBR/DNS 加速”>> 保存 & 应用  
_此处 DNS 可不作修改使用默认设置，也可以填入本地网络延时最低的 DNS，截图中以阿里和 114DNS 示例_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-13-10 的屏幕截图. png** _(118.17 KB, 下载次数: 31)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjE4fDhkNDEyODdifDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

开启加速

2020-6-12 19:33 上传

  
_**【主路由（华为 AX3Pro）**__**设置**__**】（注：小米原厂固件设置类似）**_  
1）更多功能 >> 网络设置 >> 局域网 >> 关闭 DHCP>> 保存  
_几乎所有的硬路由和第三方固件都可以关闭 DHCP，该方法可以应用到任何硬路由_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-20-36 的屏幕截图. png** _(82.71 KB, 下载次数: 33)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjE5fDVkMzM5MjBifDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

关闭华为路由 DHCP

2020-6-12 19:37 上传

  
更多功能 >> 网络设置 >>IPv6>> 关闭  
_主动关闭 AX3Pro 的 IPv6，避免某些情况下，打开 IPv6 的同时终端可能无法上网（感谢 @ds87 的补充）_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-07-10 16-19-45 的屏幕截图. png** _(122.94 KB, 下载次数: 36)_

[下载附件](forum.php?mod=attachment&aid=NDAwMTMzfDk4N2Y2ODUwfDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

AX3PRO 关闭 IPv6

2020-7-10 16:36 上传

  
2）更多功能 >> 系统设置 >> 网口设置 >> 固定 WAN 口 (靠近电源的网口)>> 保存  
_注意网线的连接，靠近电源的网口连接光猫（或上级路由器）  
AX3Pro 默认 LAN/WAN 自适应，这个设定非常坑_  
_如果不固定，AX3Pro 有时会把 N1 当作上级路由，导致无法上网，为了网络稳定，固定 WAN 口_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-25-19 的屏幕截图. png** _(85 KB, 下载次数: 31)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjIwfGY3YmM3Nzk0fDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

固定华为路由 WAN 口

2020-6-12 19:38 上传

  
3）我的 WiFi>> 关闭 5G 优选  
                      >> 关闭 2.4G / 取消路由器重启后自动开启 2.4G  
                      >> 设置 5G 名称 / 密码  
                      >> 保存  
_如果有智能家居硬件，可单独开启 2.4GHz 频段，建议把 2.4GHz 和 5GHz 分开为两个 SSID  
截图关闭了 2.4GHz，仅使用 5GHz_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-26-13 的屏幕截图. png** _(140.4 KB, 下载次数: 31)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjIzfGRmMjJlMjBmfDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

华为路由 WiFi 设置

2020-6-12 19:42 上传

  
4）我要上网 >> 选择 PPPoE 或 DHCP（视实际情况）  
                      >> 勾选静态 DNS  
                      >> 首选和备用 DNS  
                      >> 保存  
_截图示例中，AX3Pro 以 DHCP 客户端模式上网，也可根据实际情况，选择 PPPoE 拨号上网  
如果 AX3Pro 以 PPPoE 拨号上网，会自动使用宽带 ISP 提供的 DNS  
如果 AX3Pro 以 DHCP 自动上网，建议填写本地网络延时最低的公共 DNS_  
_国内外公共 DNS 参考：_  
[https://public-dns.info/](https://public-dns.info/)  
[https://www.ip.cn/dns.html](https://www.ip.cn/dns.html)  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-28-50 的屏幕截图. png** _(137.88 KB, 下载次数: 26)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjI0fGQwOTc2YTU1fDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

华为路由上网设置

2020-6-12 19:45 上传

  
**至此，N1 和 AX3Pro 已分别完成设置  
首先，AX3Pro 的 WAN 口连接光猫第一个 LAN 口设置 PPPoE 拨号（或上级路由器任意 LAN 口以 DHCP 模式上网）  
其次，AX3Pro 的 LAN 口连接到 N1 唯一的 LAN 口**  
5）检查终端  
各终端分别连接 AX3Pro 的 WiFi，查看网卡信息是否正确  
电脑端，默认路由和 DNS 都是 N1 的 IP 地址  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 02-35-14 的屏幕截图. png** _(62.66 KB, 下载次数: 26)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjI1fDVjMjAzYmM4fDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

电脑端检查设置

2020-6-12 19:52 上传

  
手机端，路由正确显示了 N1 的 IP 地址  
握手速度 1200Mbps，说明手机运行在 80MHz/2x2MIMO 的 Wi-Fi6 模式  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**Mi10.jpg** _(130.91 KB, 下载次数: 30)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjI3fDU3NGI3MTc1fDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

手机端检查设置

2020-6-12 20:04 上传

  
_**【完成全部设置后，将 U 盘配置写入 EMMC】**_  
登陆 N1 后台：系统 - TTYD 终端（或 SSH 登录；还可以将 N1 接上 USB 键盘后，用 HDMI 线连接显示器或电视）  
_此步骤为可选_  
![](https://www.right.com.cn/forum/static/image/common/none.gif)

**2020-06-11 03-03-19 的屏幕截图. png** _(62.46 KB, 下载次数: 25)_

[下载附件](forum.php?mod=attachment&aid=Mzk0MjI4fDFjZTU2M2VlfDE3MDAyNzIyNzN8MHw0MDM1Nzg1&nothumb=yes)  [保存到相册](javascript:;)

写入 EMMC

2020-6-12 20:13 上传

  
在命令行中运行:  
cd /root  
./inst-to-emmc.sh  
耐心等待几分钟，等屏幕提示写入成功，拔掉 U 盘，重启 N1，其他特殊功能，不再赘述  
=================================  
**又及：**  
f 大发现 N1 网速不稳定是因为流控在有些情况下没有自动开启  
所以 f 大建议增加一个交换机，通常流控会自动开启  
flippy 大原帖：[N1 盒子] 终于找到真正的锅了：关于 N1 进行 speedtest 测速忽快忽慢的原因  
[https://www.right.com.cn/forum/thread-4017145-1-1.html](https://www.right.com.cn/forum/thread-4017145-1-1.html)  
测试发现，N1 做内网网关（旁路由）时  
如果主路由是华为 AX3Pro，流控**不会自动开启**，可根据实际情况增加交换机  
如果主路由刷了 Padavan（猜测刷 OpenWrt 也是如此，未经测试），流控**会自动开启**，无需增加交换机  
流控是否自动开启，似乎和主路由固件有关  
如果 N1 做单臂路由负责 PPPoE 拨号，N1 需要手动添加 WAN 口，与 LAN 公用 eth0 接口，并放行防火墙  
这种模式下，虽然部分品牌硬路由有 AP 模式可选，但不建议将硬路由切换到 AP 模式  
建议只关闭硬路由的 DHCP，同时：光猫的 LAN1——网线——硬路由任意 LAN 口  
这样硬路由和 N1 的 IP 地址在同一个网段，通过浏览器都可以进入两个设备的管理后台  
**又及之后之****又及：**  
N1 和 AX3Pro 都出了，所以很多问题没法复现，有问题的恐怕只能根据原理尽量回答，建议多用排除法自行摸索  
旁路由的设置，相对麻烦一点，会有很多莫名其妙的问题，遇到暂时无法解决的问题，善用论坛的搜索功能  
建议入一个小米 / 红米 AC2100、小米 R3G、斐迅 K2P、新路由 3 等可刷 openwrt 固件的路由器，价格百元上下  
这些硬路由大多都支持不死 breed，恩山上帖子很多，，刷 openwrt 都很方便  
刷入 openwrt 后作为二级路由，接入上一级的硬路由，这样局域网中两个 WiFi，不同需要的终端各自连接即可  
随着 X 瑞的迭代更新，这些老款路由器也可以刷新固件焕发青春，此部分不再展开，建议自行摸索  
![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=643130&size=middle)anthonysh  _ 本帖最后由 anthonysh 于 2020-9-19 04:37 编辑_  
刚好和楼主配置相同，ax3pro 后接了一个交换机，而电脑和 n1 都是链接这交换机  
之前用水星 D268g+n1 一直尝试像搞成单臂路由模式，n1 盒子实在无法拨号，wan 口添加毫无反应，折腾半天也没搞定……  
后面换了 ax3pro，好像有教程说 n1 做旁路由效果也不错，想想前面单臂的没搞定，干脆事实旁路由，  
严格按照楼主教程配置，一次成功，感谢感谢！！！！  
但在使用中有点问题想请教楼主：  
n1 配置完全就是照搬教程（区别可能就在于 ip 不同之类的），网络里 acc 加速也启用了，出 greatwall 相关该更新的列表也都更新了  
使用 n1 做 dhcp 后，上网访问感觉页面打开都要顿一下才出来，而 dx3pro 做 dhcp 则没这感觉  
另外里我后面添加了 v 贰瑞节点后，运行模式无论我选择 GFW 列表模式还是绕过中国大陆 ip 模式，访问国内网页时看上去效果就像走的全局模式（我以前电脑用的 v 贰瑞 N，经常在全局和 pac 模式切换，所以比较了解），举例来说，我运行绕过中国大陆 ip 模式，访问优酷，页面会是优酷好大一个图标然后旁边写着 “很抱歉！暂时无法处理您的请求... 您可以先逛逛 [优酷](https://www.youku.com/) “ 运行 GFW 列表模式有时也这样，有时正常，而另外当我在 n1 停用了这个 v 贰瑞节点，想着再到 pc 用 v 贰瑞 N 客户端使用这个节点，发现用不了，说什么远程服务器出错，后面我再应用 n1 上这个节点，网络又能正常出国了，难道在旁路由上设置过这个节点后，pc 端这个节点就不能再用 v 贰瑞 N 使用？这是正常的还是什么原因？问题有些绕，不知道我讲清楚了没有？有劳达人看看  
软路由方面才开始接触，小白一个，见谅！  
大致情况就是这样，请问楼主你也是这样吗？如果不是可能是什么原因造成？  
![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=569774&size=middle)royleecn  首先感谢楼主无私奉献。  
我是从去年年初开始折腾 N1 出国海淘的。当时的路由器是华为荣耀 Pro2，当时折腾了好久，最后是看到另外一个大神说的，N1 做二级主路由，网内所有的设备通过 N1 分配 ip 地址上网，具备全局性，所有的设备都可以进飞机场。其他路由和交换机只是提供 lan 口扩展和 AP 无线功能。  
N1：网线接入光猫 lan 口。网络 --- 接口 ---lan—修改 --- 静态地址写与光猫相同网段的 ip（同一网段，不冲突即可），网关填光猫的 ip，DNS 填写光猫的 ip，底部的 DHCP 服务器勾选 “忽略此接口”；其他默认，保存应用。光猫：进入光猫后台，关闭 LAN 口的 DHCP 模式。当时是成功了。  
最近因为换路由器成 AX3pro，而且给 N1 刷了新系统，结果一下子就完蛋了，再按原来操作也不行了。有幸看到你的贴子，发现是 N1 接 AX3pro 上而不是光猫上，按你说的操作下来，倒是能上了，但是我原本 1000M 移动宽带掉到了 500M 左右，后来 SSH 发现流控未开，加交换机后流控打开了，但是速度还是 500M 左右。我倒不是在乎这个，关键是出国海淘的速度实在有点慢，跟别人同样的搬瓦工服务器，同样的 Trojan 设置，看油管只有两三千的速度，别家都是上来就好几万。。。而且还不稳定。  
哎，折腾不易啊 ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=612280&size=middle) edywh 

> [请盖好夏凉被 发表于 2020-7-9 23:05](https://www.right.com.cn/forum/forum.php?mod=redirect&goto=findpost&pid=9704335&ptid=4035785)  
> 老哥您好，教程写的非常好，已收藏。但是使用了 n1 后 wifi 测速真的降了一半，甚至更多。wifi 如果手动配置网关 ...

似乎你这个现象和 f 大的帖子有些相似的地方，  
[N1 盒子] 终于找到真正的锅了：关于 N1 进行 speedtest 测速忽快忽慢的原因  
[https://www.right.com.cn/forum/thread-4017145-1-1.html](https://www.right.com.cn/forum/thread-4017145-1-1.html)  
不过 f 大是在单一应用 speedtest 测速中发现的  
你的网速不稳定，是不同的应用，某些 app 快，某些 app 慢  
也许，终端手动配置 IP 之后，N1 针对某些 app 就没有开流控，  
f 大的建议是加个交换机  
但是，当 AX3PRO 关 DHCP，N1 开 DHCP，SSH 看 N1 的流控是没有开启的，  
但把主路由替换成刷了 padavan 的小米 AC2100 开 DHCP，N1 关 DHCP，N1 的流控就开启了  
这似乎和主路由固件有关，不知道你的主路由是什么，  
有条件的话，换一个 openwrt 或 padavan 主路由试试  
当然 f 大也提到了 MTU 也可能带来速度不稳定的问题，  
可以试试强制把 N1 的 LAN 口高级设置中，把 eth0 的 MTU 设为 1472，  
通常，以太网默认是 1500，PPPoE 默认是 1492，这是网络传输机制导致的 ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=389772&size=middle) rxjhlijia 谢谢，感谢提供详细教程![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=612280&size=middle)edywh 

> [rxjhlijia 发表于 2020-6-12 22:13](https://www.right.com.cn/forum/forum.php?mod=redirect&goto=findpost&pid=9534643&ptid=4035785)  
> 谢谢，感谢提供详细教程

![](https://www.right.com.cn/forum/static/image/smiley/default/smile.gif)![](https://www.right.com.cn/forum/static/image/smiley/default/handshake.gif)![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=486415&size=middle)hzokdj  很详细，不错![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=575204&size=middle)极北暗夜流光  多多刷几次什么都记住了哈哈  
![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=625268&size=middle)Jebeoo  学习优秀经验![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=189108&size=middle)含流星  好帖子必须顶 ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=607111&size=middle) imacer 求扩展 ipv6 教程 ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=612280&size=middle) edywh 

> [极北暗夜流光 发表于 2020-6-13 12:34](https://www.right.com.cn/forum/forum.php?mod=redirect&goto=findpost&pid=9537278&ptid=4035785)  
> 多多刷几次什么都记住了哈哈

是这个意思 ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=612280&size=middle) edywh 

> [imacer 发表于 2020-6-13 19:33](https://www.right.com.cn/forum/forum.php?mod=redirect&goto=findpost&pid=9539658&ptid=4035785)  
> 求扩展 ipv6 教程

ipv6 的那几个选项不关闭也一样可以，但偶尔可能会有问题，这个很难说 ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=607111&size=middle) imacer 

> edywh 发表于 2020-6-14 17:41  
> ipv6 的那几个选项不关闭也一样可以，但偶尔可能会有问题，这个很难说

按照教程设置完了 wifi 测速速度减半。什么原因？![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=612280&size=middle)edywh 

> [imacer 发表于 2020-6-14 19:35](https://www.right.com.cn/forum/forum.php?mod=redirect&goto=findpost&pid=9546019&ptid=4035785)  
> 按照教程设置完了 wifi 测速速度减半。什么原因？

不要被论坛上这些测速的带歪了，网络稳定够用是第一位的，况且看 4K 流媒体也不过只需要大概 30Mbps 的速度，更何况国内一些 4K 片源还是伪 4K，在大多数情况下，ipv6 对本地局域网没有用，除非你是开发者 ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=258326&size=middle) hf97542 感谢提供详细教程 ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=604211&size=middle) likeqd 好帖子必须顶 ![](https://www.right.com.cn/forum/uc_server/avatar.php?uid=486864&size=middle) wriking13 所有不能设置 dhcp 网关的主路由都可以用这个方法
