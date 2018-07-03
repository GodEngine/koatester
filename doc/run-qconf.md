## 如何安装并启动QConf

### [官方安装说明](https://github.com/Qihoo360/QConf#qconf)
### 执行以下命令启动QConf（tip:每次重启电脑后都需要执行一次）
```
sudo -s
sysctl kern.sysv.shmall=268435456
sysctl kern.sysv.shmmax=2048000000
/usr/local/qconf/bin/qconf_agent start
```
