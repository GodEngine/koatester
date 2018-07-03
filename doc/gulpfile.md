### 2016/09 版本的gulpfile

暴露如下任务：
* ```gulp``` 执行代码编译
* ```gulp watch``` 文件有变后执行代码编译
* ```gulp build``` 执行代码编译、上传静态资源、替换资源路径、删除public文件夹

> JS可以使用ES2016语法，对于babel的一些缺陷，也使用了[pollfill](http://babeljs.io/docs/usage/polyfill/)来解决，但是需要在模版中引用该文件  
> CSS可以使用CSS3
