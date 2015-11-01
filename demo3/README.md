# 《京东店铺商品收集》
## 实现目标
将京东```森马官方旗舰店```的商品全部收集，以json格式保存在semir.txt文件里
## 任务分析
京东返回的数据就是完整的html文件，直接selector目标就可以了。为了增加一些变化，实现的时候使用```async```，可以控制发起请求的数量(访问过快，可能会被认为是爬虫而拒绝访问)。京东一个网页实际显示两页的商品数据，在页面往下拉的过程中，会动态加载第二个页面数据。点击```2```翻页时，实际已经是第3个页面数据。查看京东url的page参数就能明白。
## 结果示例
可以查看当前目录下的semir.txt，里面有```1131```个商品信息

	[{
    "price": "199.00",
    "description": "森马男装2015夏装新款休闲裤 男士韩版直筒长裤纯色薄款裤子 潮流 深蓝8830 30",
    "url": "//item.jd.com/1521292691.html",
    "commentCnt": "661",
    "uid": "1521292691",
    "nick": "森马官方旗舰店"
	},
	{
	    "price": "69.90",
	    "description": "森马牛津纺长袖衬衫 2015冬装新款 男士韩版纯色直筒棉质衬衣潮流 蓝色调0488 M",
	    "url": "//item.jd.com/1708919311.html",
	    "commentCnt": "326",
	    "uid": "1708919311",
	    "nick": "森马官方旗舰店"
	}]

## 使用到的nodejs~~库~~包
* [cheerio](https://github.com/cheeriojs/cheerio)
* [superagent](https://github.com/visionmedia/superagent)
* [async](https://github.com/caolan/async)

## 运行方式
**注意，运行环境为windows,mac和linux可能存在兼容性问题**

1. ```git clone https://github.com/isghost/plum```
2. ```cd .\plum\demo3```
3. ```npm i```
4. ```npm start```