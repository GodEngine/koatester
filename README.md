## 开发环境相关
1. 下载编辑器[Atom](https://atom.io/)、[下载项目所依赖插件](https://git.blued.cn/nieweidong/blued-webapp/blob/master/doc/atom-package.md)
2. 安装[QConf](https://github.com/Qihoo360/QConf#qconf)、[启动Qconf](https://git.blued.cn/nieweidong/blued-webapp/blob/master/doc/run-qconf.md)

## 项目结构介绍
<TABLE>
  <TR>
    <TH>路径</TH>
    <TH>描述</TH>
    <TH align="center">详细介绍</TH>  
  </TR>
  <TR>
    <TD>apps</TD>
    <TD>项目代码</TD>
    <TD align="center"><a href="">详细介绍</a></TD>  
  </TR>
  <TR>
    <TD>configs</TD>
    <TD>项目相关的配置</TD>
    <TD align="center"><a href="">详细介绍</a></TD>  
  </TR>
  <TR>
    <TD>data</TD>
    <TD>一些静态的数据（多语言翻译之类的）</TD>
    <TD align="center">－</TD>  
  </TR>
  <TR>
    <TD>libs</TD>
    <TD>一些server端公共函数存放的位置</TD>
    <TD align="center">－</TD>  
  </TR>
  <TR>
    <TD>development、production</TD>
    <TD>上线所使用的配置文件存放的位置</TD>
    <TD align="center">－</TD>  
  </TR>
  <TR>
    <TD>public</TD>
    <TD>网站的icon，以及一些不能说的静态文件...</TD>
    <TD align="center">－</TD>  
  </TR>
  <TR>
    <TD>test</TD>
    <TD>测试用例...</TD>
    <TD align="center">－</TD>  
  </TR>
</TABLE>

## 几个常用的命令

* ```npm start```（启动本地项目［正式环境］）
* ```npm run start:dev```（启动本地项目［测试环境］）
* `npm run deploy` （新版上线正式环境）
* `npm run deploy:dev` （新版上线测试环境）
* `npm run rollback` （新版回滚正式环境）
* `npm run rollback:dev` （新版回滚测试环境）


## 目前的几个分支的作用

* master：        用于上线正式环境
* test：          用于上线测试环境（新版）
=======
# koatester
web服务器
