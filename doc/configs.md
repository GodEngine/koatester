## configs详细说明

该文件夹目录结构如下
```
.
├── env
│   ├── development.js
│   ├── local_dev.js
│   ├── local.js
│   └── production.js
├── backend.js
├── qconf.js
└── views.js
```

### backend.js

基本没有啥用了，唯一用到的地方是里边有一个配置是往某台机器上去打log，以后会将这个配置挪进 env下边的文件中（在不远的将来，会干掉它的:)）

### qconf.js

存储了webapp中所用到的所有的数据库链接对应的qconf的配置路径

### views.js

存储了各个项目所使用的模版解析引擎（额，目前来讲都是handlebars）

### env下的四个文件
以下四个文件都是为了在QConf可能会获取不到数据时的一个保护措施，存储了各种数据库的配置信息。

* ```development.js``` 测试环境
* ```local_dev.js``` 测试环境
* ```local.js``` 线上环境
* ```production.js``` 线上环境

唯一的区别在于，本地开发时是使用的```local.js```和```local_dev.js```两个文件  
而在服务器上会使用```development.js```和```production.js```两个文件
