# 《豆瓣美女图片抓取》
## 实现目标
抓取豆瓣美女这个网站的首页每个分页(最下面一排的分页)的图片
## 任务分析
分两个步骤
1. 计算出所有的页面地址(只有offset这个参数值不一样)
2. 访问页面，得到所有图片的url  
3. 访问图片页面，保存图片

  
## 结果示例
暂无

        
## 使用到的nodejs~~库~~包
* [superagent](https://github.com/visionmedia/superagent)
* [async](https://github.com/caolan/async)
* [urlencode](https://github.com/node-modules/urlencode)
* [cheerio](https://github.com/cheeriojs/cheerio)


## 运行方式
**注意，运行环境为windows,mac和linux可能存在兼容性问题**

1. ```git clone https://github.com/isghost/plum```
2. ```cd .\plum\demo8```
3. ```npm i```
4. ```npm start```
