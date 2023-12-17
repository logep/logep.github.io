windows版本有emule/amule
Linux版本有amule
android手机版有jmule【mule on android】
amule支持Linux，Mac，Solaris，*BSD平台以及几乎所有处理器架构。

ed2k 和kad 网络 需要设置好 才进行下一步

ed2k节点
下载最新安全eD2k电驴服务器列表server.met文件，地址为“http://ed2k.im/server.met”（或使用备用地址http://upd.emule-security.org/server.met），然后手动将该文件放入eMule的config文件夹下（在C:\Program Files\eMule\config\（WinXP）或C:\用户\你的用户名\AppData\Local\eMule\config\（Vista、Win7默认位置，显示隐藏文件夹可见，但可以设置））。这样彻底覆盖了服务器列表server.met文件， 不保留原服务器。
KAD节点文件更新

方法1（新手推荐）：如下图所示，在eMule的“KAD”面板右栏，将kad节点文件的地址：“http://upd.emule-security.org/nodes.dat ”输入到“从以下网址获取节点信息”下方的框中，点击“引导程序”按钮，并重启eMule，即可让你的eMule自动更新nodes.dat文件。



拥有一些服务器后，推荐把他们设置为“静态服务器”，尤其是lowID emule用户，这样服务器就不会因为连接不上而被eMule自动删除。方法如下。

如下图，在eMule的“服务器”面板右栏，用选中所有服务器，右键鼠标，选择“添加到静态服务器列表”。设置过的服务器，会在“静态”处，显示“是”。

然后打开，“选项”、“服务器”，如下图。在“移除无响应服务器在X次重试后”处填入“10”，同时勾选“禁止自动移除静态服务器”。
