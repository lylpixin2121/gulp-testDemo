## gulp-uglify 压缩js的插件

### 参数说明

- **mangle** : 默认为true 表示会修改变量名，如果为false 表示不会修改变量名，同时可以传入一个对象，``{except : ['require','exports','module','$']}``表示修改变量名  但是排除混淆以下指定关键字

- **compress** : 是否完全压缩，默认是true

- **preserveComments** : 保留注释的方式 目前支持四种方式
  
> 1、**all  表示 保留所有注释** 

> 2、**license  表示保留看似和许可相关的一些信息，当通过满足一些特殊的条件的时候 认为它是一条许可信息，比如：当文件第一行存在注释的时候；比如通过正则表达式 匹配到诸如：MIT @license或者copyright的时候；比如在前一行存在注释 并且匹配1、2、3的时候** 

> 3、**function  表示指定自己的评论保留算法，你讲通过当前节点和当前评论来决定返回的是true还是false**  

> 4、**some 表示 目前已经弃用** 

PS：注意 git push -u origin master 的用法 神奇

