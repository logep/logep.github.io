

> 本原文地址 [blog.csdn.net](https://blog.csdn.net/qq_40903527/article/details/127670847)



根据您提供的Systemd服务单元配置文件，`ExecStart` 中的命令在语法上是不正确的。Systemd 不直接支持在 `ExecStart` 中使用 `nohup` 和后台运行的方式来启动进程。`nohup` 和 `&` 是用于在交互式终端中使用的 shell 特性，而 Systemd 需要执行的是可执行文件，而不是 shell 命令。

为了在 Systemd 服务中启动 Java 应用程序，您可以创建一个启动脚本，然后在 `ExecStart` 中引用该脚本，或者直接指定 Java 可执行文件。以下是一个示例 Systemd 服务单元配置文件的修正版本：

```plaintext
[Unit]
Description=test.jar包服务程序
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
User=root
Group=root
WorkingDirectory=/home/ping/bak/
ExecStart=/usr/bin/java -jar /home/ping/bak/unimall-launcher-0.0.1-RELEASE.jar --spring.profiles.active=prd
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
Restart=always

[Install]
WantedBy=multi-user.target
```

请注意以下更改：

1. 将 `nohup` 和 `&` 从 `ExecStart` 中删除，直接指定 Java 可执行文件的路径和参数。

2. 使用 `WorkingDirectory` 指定工作目录，以确保应用程序在正确的目录中执行。

3. 添加 `Restart=always` 以在应用程序意外退出时重新启动它。

确保修改了配置文件后，使用以下命令重新加载 Systemd 并启动服务：

```bash
sudo systemctl daemon-reload
sudo systemctl start your-service-name
```

请将 `your-service-name` 替换为您的服务的名称，然后可以使用 `systemctl enable your-service-name` 将其设置为开机启动。



在 systemd 服务单元配置文件中，`After` 和 `WantedBy` 是两个重要的指令，它们控制服务的启动顺序和依赖关系：

1. `After=`：`After` 指令用于定义服务启动的顺序，即服务应该在哪些系统目标或其他服务之后启动。在您的示例中，`After` 指令列出了多个系统目标（target）和服务单元，包括 `syslog.target`、`network.target`、`remote-fs.target` 和 `nss-lookup.target`。这意味着您的服务会在这些目标（或服务）之后启动。这通常用于确保服务在依赖的服务或系统目标已经准备就绪之后再启动。

2. `WantedBy=`：`WantedBy` 指令用于定义系统目标（target），在该目标下启用了该服务。在您的示例中，`WantedBy` 定义了 `multi-user.target`，这意味着您的服务将在系统进入 `multi-user.target` 时启动，通常这是在系统启动时或用户登录后的多用户模式下启动的服务。

总之，`After` 和 `WantedBy` 指令用于定义服务的启动顺序和依赖关系，以确保服务按照正确的顺序在适当的时机启动。这有助于管理系统中不同服务之间的依赖关系和启动顺序。


在 Systemd 服务单元配置文件中，`ExecReload` 和 `ExecStop` 是用于定义服务的重新加载和停止操作的指令。

1. `ExecReload`：这个指令定义了在执行服务的重新加载操作时要运行的命令。重新加载通常用于重新加载配置文件或重新初始化服务，而不需要完全停止和重新启动服务。在您的示例中，`ExecReload` 指定了 `/bin/kill -s HUP $MAINPID` 命令，它发送了一个HUP（Hang Up）信号给主服务进程的 PID（进程标识符）。这通常用于通知服务重新加载其配置或进行某种特定操作。服务本身必须实现对HUP信号的响应以使此操作有效。

2. `ExecStop`：这个指令定义了在执行服务停止操作时要运行的命令。停止操作通常用于完全终止服务。在您的示例中，`ExecStop` 指定了 `/bin/kill -s QUIT $MAINPID` 命令，它发送了一个QUIT信号给主服务进程的 PID，这通常用于优雅地终止服务。服务可以在接收QUIT信号后进行资源清理和关闭操作。

这两个指令的具体命令内容可以根据服务的需要进行定制。通常，`ExecReload` 和 `ExecStop` 的目标是在管理服务的生命周期时执行必要的操作，以确保服务能够正确启动、重新加载和停止。



The provided code is a Unix command that starts a Java application using the `nohup` command and redirects its output to `/dev/null`, allowing the program to run in the background. Let me break down the command for you:

1. `nohup`: `nohup` stands for "no hang up." It's a Unix command that is used to run another command in such a way that it doesn't terminate when the terminal session ends. This is typically used for running processes in the background, and it prevents the process from being terminated when the user logs out or closes the terminal.

2. `java -jar /home/ping/bak/unimall-launcher-0.0.1-RELEASE.jar`: This part of the command runs a Java application. It uses the `java` command to execute a Java program, specifying the JAR (Java Archive) file to be executed. In this case, it's running the `unimall-launcher-0.0.1-RELEASE.jar` JAR file located at `/home/ping/bak/`.

3. `--spring.profiles.active=prd`: This part of the command sets a Spring profile for the Java application. It's specifying that the "prd" (presumably "production") profile should be active. Spring profiles are often used to configure different application settings for different environments (e.g., development, production).

4. `>/dev/null`: This part redirects the standard output of the command to `/dev/null`, effectively discarding any output that the Java application generates. `/dev/null` is a special device file that essentially acts as a black hole for data. This is often done when you want to run a process in the background without cluttering your terminal with its output.

5. `&`: The ampersand at the end of the command is used to run the entire command in the background. It allows you to continue using the terminal while the Java application runs separately.

In summary, this command starts a Java application (`unimall-launcher-0.0.1-RELEASE.jar`) with a specific Spring profile ("prd") and redirects its standard output to `/dev/null`. The `nohup` command is used to ensure that the process continues running even after the terminal session ends, and the `&` runs the command in the background.





提供的代码是一个在Unix/Linux环境下运行Java应用程序的命令，使用`nohup`命令将其输出重定向到`/dev/null`，以便让程序在后台运行。让我为您逐步解释这个命令：

1. `nohup`：`nohup`代表"no hang up"，是一个Unix命令，用于以不会在终端会话结束时终止的方式运行另一个命令。通常用于在后台运行进程，防止在用户退出或关闭终端时终止进程。

2. `java -jar /home/ping/bak/unimall-launcher-0.0.1-RELEASE.jar`：这部分命令运行一个Java应用程序。它使用`java`命令来执行一个Java程序，指定要执行的JAR（Java存档）文件。在这种情况下，它正在运行位于`/home/ping/bak/`目录下的`unimall-launcher-0.0.1-RELEASE.jar` JAR文件。

3. `--spring.profiles.active=prd`：这部分命令为Java应用程序设置了一个Spring配置文件（profile）。它指定了"prd"（可能代表"production"，即生产环境）配置文件应该是活动的。Spring配置文件通常用于配置不同环境（如开发、生产）下的应用程序设置。

4. `>/dev/null`：这部分将命令的标准输出重定向到`/dev/null`，实际上是丢弃Java应用程序生成的任何输出。`/dev/null`是一个特殊的设备文件，实际上是一个数据的黑洞。通常在您希望在后台运行进程而不希望终端显示其输出时使用此选项。

5. `&`：命令末尾的和号（`&`）用于将整个命令在后台运行，这样您可以在Java应用程序在后台运行时继续使用终端。







**目录:**

[一、nohup 详解](#t0)

[1、什么是 nohup？](#t1)

[2、nohup 案例](#t2)

[3、nohup 和 & 两者的区别](#t3)

[二、利用 systemd 工具管理程序，并实现（以 java 为例）服务开机自启动](#t4)

[1、systemd 工具介绍](#t5)

[①什么是 service？](#t6)

[②什么是 systemctl？](#t7)

[2、编写 systemctl 脚本](#t8)

[①编写简单的 systemctl 脚本](#t9)

[②JVM 知识扩展:](#t10)

[③用 systemctl 命令，让服务实现开机启动](#t11)

[3、systemctl 实现启动、停止、重启、查看运行状态、开机启动、取消开机启动](#t12)

 [①systemctl 的常用命令：](#t13)

[②顺便扩展一下 service 的各种管理命令：](#t14)

[三、利用 sh 脚本实现 java 服务开机自启动](#t15)

[1、创建 sh 脚本](#t16)

[①使用 notepad++ 软件转换成 unix 格式](#t17)

[② server.sh 脚本代码如下：](#t18)

[③ sh 脚本的功能说明：启动、停止、重启、查询状态、归档、调试、备份](#t19)

[2、编辑系统 rc.local 文件，让脚本加入系统开机启动](#t20)

[3、系统重启，查看效果](#t21)

[欢迎点赞收藏，有问题请在评论区告诉我~](#t22)

一、[nohup](https://so.csdn.net/so/search?q=nohup&spm=1001.2101.3001.7020) 详解
---------------------------------------------------------------------------

#### 1、什么是 nohup？

nohup 命令运行由 Command 参数和任何相关的 Arg 参数指定的命令，忽略所有挂断（SIGHUP）信号。在注销后使用 nohup 命令运行后台中的程序。要运行后台中的 nohup 命令，添加 & （ 表示 “and” 的符号）到命令的尾部。

nohup 是 no hang up 的缩写，就是**不挂断的意思**。

nohup 命令：如果你正在运行一个进程，而且你觉得在退出帐户时该进程还不会结束，那么可以使用 nohup 命令。该命令可以在你退出帐户 / 关闭终端之后继续运行相应的进程。

在缺省情况下该作业的所有输出都被**重定向到一个名为 nohup.out 的文件中**。

#### 2、nohup 案例

1.   nohup python3 main.py >> main.log 2> &1 &

在上面的例子中，0 – stdin (standard input)，1 – stdout (standard output)，2 – stderr (standard error) ；

2>&1 是将标准错误（2）重定向到标准输出（&1），标准输出（&1）**再被重定向**输入到 myout.file 文件中。例如 nohup command > myout.file 2>error.txt &   那么错误内容会输出到 error.txt 文件中

2. 0 22 * * * /usr/bin/python /home/pu/download_pdf/download_dfcf_pdf_to_oss.py > /home/pu/download_pdf/download_dfcf_pdf_to_oss.log 2>&1

这是放在 crontab 中的定时任务，晚上 22 点时候怕这个任务，启动这个 python 的脚本，并把日志写在 download_dfcf_pdf_to_oss.log 文件中

#### 3、nohup 和 & 两者的区别

& ： 指在后台运行

nohup ： **不挂断的运行，注意并没有后台运行的功能，，就是指，用 nohup 运行命令可以使命令永久的执行下去，和用户终端没有关系，例如我们断开 SSH 连接都不会影响他的运行，注意了 nohup 没有后台运行的意思；& 才是后台运行**

& 是指**在后台运行，但当用户推出 (挂起) 的时候，命令自动也跟着退出**

那么，我们可以巧妙的吧他们结合起来用就是  
**nohup COMMAND &**  
这样就能使命令永久的在后台执行

例如：

1. sh test.sh &    
将 sh test.sh 任务放到后台 ，即使关闭 xshell 退出当前 session 依然继续运行，但**标准输出和标准错误信息会丢失（缺少的日志的输出）**

将 sh test.sh 任务放到后台 ，关闭 xshell，对应的任务也跟着停止。  
2. nohup sh test.sh    
将 sh test.sh 任务放到后台，关闭标准输入，**终端不再能够接收任何输入（标准输入）**，重定向标准输出和标准错误到当前目录下的 nohup.out 文件，即使关闭 xshell 退出当前 session 依然继续运行。  
3. nohup sh test.sh  &   
将 sh test.sh 任务放到后台，但是依然可以使用标准输入，**终端能够接收任何输入**，重定向标准输出和标准错误到当前目录下的 nohup.out 文件，即使关闭 xshell 退出当前 session 依然继续运行。

二、利用 systemd 工具管理程序，并实现（以 java 为例）服务开机自启动
-----------------------------------------

### 1、systemd 工具介绍

        说道 systemd 工具，不得不提到 service 命令。**它们是 Linux 服务管理的两种方式 service 和 systemctl。但还是有区别，可以这么说：systemctl 基本上是的更强大的版本 service。**

#### ①什么是 service？

        service 命令**是 [Redhat](https://so.csdn.net/so/search?q=Redhat&spm=1001.2101.3001.7020 "Redhat") Linux 兼容的发行版中用来控制系统服务的实用工具**，它以启动、停止、重新启动和关闭系统服务，还可以显示所有系统服务的当前状态。

        service 命令**实现的原理其实是去 / etc/init.d 目录下，去执行**脚本文件，init.d 目录包含许多系统各种服务的启动和停止脚本。当 Linux 启动时，会寻找这些目录中的服务脚本。

#### ②什么是 systemctl？

        **systemctl 是一个 systemd 工具**，主要负责控制 systemd 系统和服务管理器。

        在 systemd 管理体系中，被管理的 deamon(守护进程) 称作 unit(单元)，对于单元的管理是通过命令 systemctl 来进行控制的。unit 表示不同类型的 systemd 对象，通过配置文件进行标识和配置；文件主要包含了系统服务、监听 socket、保存的系统快照以及其它与 init 相关的信息。

### 2、编写 systemctl 脚本

#### ①编写简单的 systemctl 脚本

编写 test.service 丢到 / usr/lib/systemd/system 目录下

```
[Unit] 
Description=test.jar包服务程序
After=syslog.target network.target remote-fs.target nss-lookup.target
 
[Service] 
User=root
Group=root
 
ExecStart=/opt/jdk1.8.0_161/bin/java  -server -Xms1024m -Xmx2048m -Dspring.profiles.active=production  -jar /root/test.jar
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
 
[Install] 
WantedBy=multi-user.target
```

> #### **②JVM 知识扩展:**
> 
> **​/opt/jdk1.8.0_161/bin/java  -server -Xms1024m -Xmx2048m -Dspring.profiles.active=production  -jar /root/test.jar**
> 
> **JVM 调优参数：**
> 
> **-Xms 最小堆的大小， 也就是当你的虚拟机启动后， 就会分配这么大的堆内存给你   
> -Xmx 是最大堆的大小 ，当最小堆占满后，会尝试进行 GC**
> 
> **JVM 标准参数 - server 与 - client 参数的区别：**
> 
> **可以通过 - server 或 - client 设置 jvm 的运行参数。  
> 　　它们的区别是 Server VM 的初始堆空间会大一些，默认使用的是并行垃圾回收器，启动慢运行快。  
> Client VM 相对来讲会保守一些，初始堆空间会小一些，使用串行的垃圾回收器，它的目标是为了让 JVM 的启  
> 动速度更快，但运行速度会比 Serverm 模式慢些。  
> 　　JVM 在启动的时候会根据硬件和操作系统自动选择使用 Server 还是 Client 类型的 JVM。32 位操作系统  
> 　　如果是 Windows 系统，不论硬件配置如何，都默认使用 Client 类型的 JVM。  
> 　　如果是其他操作系统上，机器配置有 2GB 以上的内存同时有 2 个以上 CPU 的话默认使用 server 模式，否则  
> 使用 client 模式。  
> 　　64 位操作系统  
> 　　只有 server 类型，不支持 client 类型。**

 把 service 后缀的文件放在指定目录中后，就可以用 systemctl 命令来管理程序了！

```
#启动test.service服务
systemctl start test.service
 
#查看服务状态
systemctl status test.service
```

效果如下： 

![](https://img-blog.csdnimg.cn/17bb0fd30ac447b1a93db84eb98ed3bd.png)

 我这里试了试 service test status，发现也可以，额，好吧

![](https://img-blog.csdnimg.cn/b897ee47f67c4eb1a65e80a4f6ccf7f3.png)  
 

>  我重启了一下，发现又用不了了：
> 
> The service command supports only basic LSB actions (start, stop, restart, try-restart, reload, force-reload, status). For other actions, please try to use systemctl.
> 
> 它的意思是：服务命令只支持基本的 LSB 操作 (启动、停止、重启、尝试重启、重载、强制重载、状态)。对于其他操作，请尝试使用 systemctl。
> 
> (⊙o⊙)…

在你修改了. service 文件后使用 systemctl 管理命令，可能会出现警告信息：

Warning: test.service changed on disk. Run 'systemctl daemon-reload' to reload units.

这个时候就要重新加载`systemctl配置了，然后就会应用最新的配置。`

```
systemctl daemon-reload

```

  对于那些支持 Systemd 的软件，安装的时候，会自动在 / usr/lib/systemd/system 目录添加一个配置文件。这个时候你就可以直接用 [systemctl 命令](https://so.csdn.net/so/search?q=systemctl%E5%91%BD%E4%BB%A4&spm=1001.2101.3001.7020)来管理了。

#### ③用 **systemctl 命令，让服务实现开机启动**

  
        到第②小节的步骤就已经可以用 **systemctl** 管理命令来管理你自己的程序了，如果你想让该程序开机启动，就执行下面的命令（以 test.service 为例）。

```
sudo systemctl enable test

```

  
        上面的命令相当于在 / etc/systemd/system 目录添加一个符号链接，指向 / usr/lib/systemd/system 里面的 test.service 文件。  
这是因为开机时，**Systemd 只执行  /etc/systemd/system 目录里面的配置文件**。这也意味着，如果把 test.service 文件不使用符号链接而是直接放到 **/etc/systemd/system** 目录下，就可以实现开机启动。当然，在 **/usr/lib/systemd/system** 如果没有放 test.service 文件就用不了 **systemctl 命令来管理程序了**！

那么，利用 systemd 工具来实现开机自启动（以 java 为例），就大功告成了！

### 3、**systemctl** 实现启动、停止、重启、查看运行状态、开机启动、取消开机启动

####  ①**systemctl 的常用命令：**

**(注意：systemctl start test 也可以用 systemctl start test.seriver)**

```
#启动test
systemctl start test
#停止test
systemctl stop test
#重启test
systemctl restart test
#查看状态test
systemctl status test
#如果需要开机启动
systemctl enable test
#如果需要取消开机启动
systemctl disable test
#杀进程，向正在运行的进程发出kill信号。
systemctl kill test
#查看test相关的service配置文件
systemctl cat test
##查看 multi-user.target 包含的所有服务
systemctl list-dependencies multi-user.target
#切换到另一个 target，shutdown.target 就是关机状态
sudo systemctl isolate shutdown.target
```

#### ②顺便扩展一下 service 的各种管理命令：

```
service的常用方式：
1.格式：service <service>
打印指定服务<service>的命令行使用帮助。
2.格式：service <service> start
启动指定的系统服务<service>
3.格式：service <service> stop
停止指定的系统服务<service>
4.格式：service <service> restart
重新启动指定的系统服务<service>，即先停止（stop），然后再启动（start）。
5.格式：chkconfig --list
查看系统服务列表，以及每个服务的运行级别。
6.格式：chkconfig <service> on
设置指定服务<service>开机时自动启动。
7.格式：chkconfig <service> off
设置指定服务<service>开机时不自动启动。
8.格式：ntsysv
以全屏幕文本界面设置服务开机时是否自动启动。
 
打开redis命令:service redis start
关闭redis命令:service redis stop
设为开机启动:chkconfig redis on
```

三、利用 [sh 脚本](https://so.csdn.net/so/search?q=sh%E8%84%9A%E6%9C%AC&spm=1001.2101.3001.7020)实现 java 服务开机自启动
---------------------------------------------------------------------------------------------------------

### 1、创建 sh 脚本

请使用下列方式创建 sh 脚本：**server.sh（脚本亲测好用，不用额外配置编辑）**

#### ①使用 notepad++ 软件转换成 unix 格式

　[notepad++ 官方下载地址](https://notepad-plus.en.softonic.com/ "notepad++官方下载地址")

　使用 notepad++ 打开文件 --- 编辑 --- 文档格式转换 --- 转为 unix--- 上传至 linux

![](https://img-blog.csdnimg.cn/fbb756ba3b4d474ba48ba88f81cd444a.png)

#### ② **server.sh** 脚本代码如下：

```
#!/bin/bash
# log format function
function log(){
   loglevel="$1"
   shift
   if [ "$1" ];then case "$loglevel" in
       debug)
          ;; # echo -e "\033[35m[$(date "+%Y-%m-%d %H:%M:%S")] [DEBUG]\t${@}\033[0m" ;;
       info)
          echo -e "\033[32m[$(date "+%Y-%m-%d %H:%M:%S")] [INFO]\t${@}\033[0m" ;;
       warning)
          echo -e "\033[33m[$(date "+%Y-%m-%d %H:%M:%S")] [WARNING]\t${@}\033[0m" ;;
       error)
          echo -e "\033[31m[$(date "+%Y-%m-%d %H:%M:%S")] [ERROR]\t${@}\033[0m" ;;
       *)
          echo "${@}" ;;
     esac
   fi
}
 
# Load environment variables
if [ -f "/etc/profile" ]; then
   log debug "从 [/etc/profile] 加载环境变量."
   . /etc/profile
fi
if [ -f "$HOME/.bash_profile" ]; then
   log debug "从 [$HOME/.bash_profile]加载环境变量."
   . $HOME/.bash_profile
fi
if [ -f "$HOME/.bashrc" ]; then
   log debug "从 [$HOME/.bashrc]加载环境变量."
   . $HOME/.bashrc
fi
 
# Verify that the service is running as a normal user
if [ "$(whoami)" == "root" ]; then
   log warning "不推荐使用 [$(whoami)] 用户运行应用服务."
fi
 
# Verify the java command, otherwise exit directly
if [ ! "$(command -v java)" ];then
   log error "未找到java命令,必须先安装JDK或JRE并配置环境变量."; exit 1
fi
 
# Switch working directory and define variables
cd $(dirname $0)
basedir="$(pwd -P)"
jarfile="$(find $basedir -maxdepth 1 -type f -name "*.jar")"
jarnums="$(find $basedir -maxdepth 1 -type f -name "*.jar"|wc -l)"
logfile="$basedir/log/application.log"
logconf="$basedir/log/logrotate.cnf"
logstat="$basedir/log/logrotate.status"
jarback="$basedir/backup"
 
log debug  "basedir: [$basedir]"
log debug  "jarfile: [$jarfile]"
log debug  "jarnums: [$jarnums]"
log debug  "logfile: [$logfile]"
log debug  "logconf: [$logconf]"
log debug  "jarback: [$jarback]"
 
# check jar file exists
function check(){
   if [ "$jarnums" -lt "1" ];then
      log error "目录 [${basedir}] 下未找到.jar文件."; exit 1
   elif [ "$jarnums" -gt "1" ];then
      log warning "目录 [${basedir}] 下.jar文件不唯一"; exit 1
   else
      pid="$(ps -aux|grep "java"|grep "$jarfile"|grep -v "grep"|awk '{print $2}'|tr '\n' ' ')"
   fi
}
 
# status function
function status(){
   check
   if [ "$pid" ];then
      log info "应用服务 [$(basename $jarfile)] 状态: 运行中,PID:[ $pid]."
   else
      log info "应用服务 [$(basename $jarfile)] 状态: 未运行."
   fi
}
 
# start function
function start(){
   check
   if [ "$pid" ];then
      log warning "应用服务 [$(basename $jarfile)] 已经在运行中, PID: [ $pid]."
   else
      log info "应用服务 [$(basename $jarfile)] 正在启动..."
      log debug "创建应用服务日志目录"
      log debug "mkdir -p $basedir/log"
      mkdir -p "$basedir/log"
      log debug "nohup $(command -v java) -Xms256M -Xmx512M -jar $jarfile $@ >> $logfile 2>&1 &"
      nohup $(command -v java) -Xms256M -Xmx512M -jar $jarfile $@ >> $logfile 2>&1 &
      pid="$!"
      if [ "$pid" ];then
         log debug "应用服务 日志轮转开始."
         log debug "(while kill -0 $pid;do rotate;sleep 60;done) > /dev/null 2>&1 &"
         (while kill -0 $pid;do rotate;sleep 60;done) > /dev/null 2>&1 &
         log info "应用服务 [$(basename $jarfile)] 启动完成,PID: [ $pid ]"
         log warning "应用服务 [$(basename $jarfile)] 日志输出将在30秒后自动退出."
         sleep 3
         log debug "应用启动日志: tail -1f $logfile &"
         tail -1f $logfile &
         (sleep 30 && kill $!) > /dev/null 2>&1 &
         log debug "(sleep 60 && kill $!) > /dev/null 2>&1 &"
      fi
   fi
}
 
# stop function
function stop(){
   check
   if [ "$pid" ];then
      log info "应用服务 [$(basename $jarfile)] 停止中..."
      log debug "kill -9 $pid"
      kill -9 $pid > /dev/null 2>&1
      sleep 2 && echo
      log debug "应用服务 [$(basename $jarfile)] 已经停止"
   else
      log warning "应用服务 [$(basename $jarfile)] 似乎没有在运行,不需要停止"
   fi
}
 
# restart function
function restart(){
   stop
   sleep 2
   start "$@"
}
 
 
# console start function
function console(){
   check
   if [ "$pid" ];then
      log warning "应用服务 [$(basename $jarfile)] 已经在运行中, PID: [ $pid]."
   else
      log info "应用服务 [$(basename $jarfile)] 正在启动..."
      log warning "console 参数仅用于调试, 使用 [Ctrl + C] 终止调试进程."
      log debug "创建应用服务日志目录"
      log debug "mkdir -p $basedir/log"
      mkdir -p "$basedir/log"
      sleep 2
      log debug "cd $basedir && $(command -v java) -Xms256M -Xmx512M -jar $jarfile $@ 2>&1 | tee $logfile"
      cd $basedir && $(command -v java) -Xms256M -Xmx512M -jar $jarfile $@ 2>&1 | tee $logfile
   fi
}
 
# rotate function
function rotate(){
   log debug "创建应用服务日志目录"
   log debug "mkdir -p $basedir/log"
   mkdir -p "$basedir/log"
   if [ ! -e $logconf ];then
      log warning "日志轮转配置文件 [${logconf}] 不存在, 将创建此配置文件."
      log debug "${logfile} {\n  size 32M\n rotate 16\n  compress\n  missingok\n  dateext\n  dateformat -%Y%m%d-%s\n  copytruncate\n}"
      echo -e "${logfile} {\n  size 32M\n rotate 16\n  compress\n  missingok\n  dateext\n  dateformat -%Y%m%d-%s\n  copytruncate\n}" > $logconf
   fi
   if [ -e $logfile ];then
      log info "归档并压缩应用服务日志 [${logfile}]"
      log debug "/usr/sbin/logrotate -s $logstat $logconf"
      /usr/sbin/logrotate -s $logstat $logconf
      log info "归档并压缩日志文件 ${logfile} 完成."
      log debug "使用 [ll -h ${logfile}*] 命令查看归档日志文件"
   fi
}
 
# backup function
function backup(){
   if [ ! -d "$jarback" ];then
      log warning "创建jar包备份目录 [$jarback]"
      log debug "mkdir -p $jarback"
      mkdir -p $jarback
   fi
   jarbase
   jarbackname="${jarbasename%.*}-$(date "+%Y%m%d-%H%M%S").${jarbasename##*.}"
   log debug "应用服务 备份jar包目录 [$jarback]"
   log debug "应用服务 备份jar包名称 [$jarback/$jarbackname]"
   log info "备份jar包文件 [$jarfile]"
   log info " ==> jar包备份目录 [$jarback]"
   cp $basedir/$jarbasename $jarback/$jarbackname
}
 
# help
function help(){
   log "" "使用说明:"
   log "" " $0 {start|stop|status|restart|console|backup|rotate} [options]"
   log "" " [options] : "
   log "" "   --spring.config.location=app.yml,app-ext.yml  # 指定服务配置文件为: app.yml,app-ext.yml"
   log "" "   --spring.profiles.active=development          # 指定服务配置环境为: development"
   log "" "   --server.port=8888                            # 指定服务配置端口为: 8888"
   log "" "   --server.servlet.context-path=/test           # 指定服务配置路径为: /text"
}
 
act="$1"
shift
arg="$(echo "$@"|sed 's/[ ]*=[ ]*/=/g')"
 
log debug "Script parameters [ $act ]"
 
case "$act" in
   start)
      start $arg ;;
   stop)
      stop ;;
   restart)
      restart $arg ;;
   status)
      status ;;
   rotate )
      rotate ;;
   console)
      console $arg ;;
   backup)
      backup ;;
   *)
    start $arg ;;
esac
 
exit 0
```

**注意：文件都要设置为可执行文件:**

```
sudo chmod 755 server.sh

```

**因为脚本会自动获取当前目录可运行的 jar 包，所以在当前目录下请保持仅有一个包；**

#### ③ sh 脚本的功能说明：启动、停止、重启、查询状态、归档、调试、备份

```
脚本功能介绍：
 
./server.sh             默认执行./server.sh start ========》启动当前目录java程序
 
./server.sh stop        默认执行./server.sh start ========》启动当前目录java程序
 
./server.sh restart     ========》重启程序
 
./server.sh status      ========》查询程序运行状态
 
./server.sh rotate      ========》归档日志
 
./server.sh console     ========》前台运行程序，[Ctrl + C] 会终止进程
 
./server.sh backup      ========》备份jar包文件
```

### 2、编辑系统 rc.local 文件，让脚本加入系统开机启动

在上面的第一步就可以使用脚本来管理程序了，接下来是让脚本加入到系统的开机启动

记录当前 server.sh 脚本的路径, 编辑 / etc/rc.d/rc.local。命令如下：

> cd /etc/rc.d
> 
> vi rc.local

```
#!/bin/bash
# THIS FILE IS ADDED FOR COMPATIBILITY PURPOSES
#
# It is highly advisable to create own systemd services or udev rules
# to run scripts during boot instead of using this file.
#
# In contrast to previous versions due to parallel execution during boot
# this script will NOT be run after all other services.
#
# Please note that you must run 'chmod +x /etc/rc.d/rc.local' to ensure
# that this script will be executed during boot.
 
#就是说rc.local的程序已经启动了, 防止重复运行
touch /var/lock/subsys/local
 
#脚本的绝对路径
/root/server.sh
 
```

**注意：rc.local 文件要授权：sudo chmod 755 rc.local**

### 3、系统重启，查看效果

```
sudo reboot

```

 查看 java 程序：

```
ps -ef | grep java


```

 可以看到：![](https://img-blog.csdnimg.cn/d54b2f0260434236adbc25ae62de6f27.png)

**大功告成！** 

-------------------
