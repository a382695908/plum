# 《淘宝搜索结果收集篇2》
## 实现目标
在淘宝首页搜索```森马官方旗舰店```，获取搜索结果的商品数据，将其以json格式保存在txt文件中。
## 任务分析
上一篇的做法是观察返回数据，进行字符串处理，显示有点山寨。  
这一篇将通过phantom包获得最后的html文件，然后通过cheerio的selector获取想要数据
## 结果示例
可以查看当前目录下的semir.txt文件，目前只抓了三个页面,130个左右的商品，只需将代码里pageNum调大就能获得更多数据

	[{
	    "price": "139.90",
	    "dealCnt": "37",
	    "description": "森马加厚棉衣 男 2015冬装新款男士夹克棒球情侣服棉袄外套韩版潮",
	    "nick": "森马官方旗舰店",
	    "nid": "521993753706",
	    "url": "//detail.tmall.com/item.htm?id=521993753706&ad_id=&am_id=&cm_id=140105335569ed55e27b&pm_id=&abbucket=0"
	}]

## 使用到的nodejs~~库~~包
* [cheerio](https://github.com/cheeriojs/cheerio)
* [eventproxy](https://github.com/JacksonTian/eventproxy)
* [urlencode](https://github.com/node-modules/urlencode)
* [phantom](https://github.com/sgentle/phantomjs-node)

## 运行方式
**注意，运行环境为windows,mac和linux可能存在兼容性问题**
1. ```git clone https://github.com/isghost/plum```
2. ```cd .\plum\demo2```
3. ```npm i -g phantomjs```
4. ```npm i```
5. ```npm start```