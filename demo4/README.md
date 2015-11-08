# 《拉勾网岗位信息获取1》
## 实现目标
将拉勾网上，不同城市和不同岗位的需求数量抓取下来，以json格式保存在jobsCount.txt里面（为方便查看，已提供csv格式文件）
## 任务分析
不同于淘宝网和京东商城，拉勾网岗位数据是通过```AJAX```加载。通过phantomJS获取完整界面，再cheerio得到目标数据是可行的，但是存在一个非常大的缺点，慢。这个demo4采用的方式是查找获取岗位数据的请求，如下。

  http://www.lagou.com/jobs/positionAjax.json
  
当然，还要添加一些请求参数
## 结果示例
可以查看当前目录下的jobCount.txt，总共```850+```项

	[{
    "language": "Java",
    "city": "北京",
    "totalCount": 5000
     },
     {
      "language": "Python",
      "city": "北京",
      "totalCount": 577
     },
     {
      "language": "PHP",
      "city": "北京",
      "totalCount": 4578
    },
    {
      "language": "C#",
      "city": "北京",
      "totalCount": 426
    },
    {
      "language": "C++",
      "city": "北京",
      "totalCount": 1147
    },
    {
      "language": "C",
      "city": "北京",
      "totalCount": 1330
    },
    {
      "language": "U3D",
      "city": "北京",
      "totalCount": 202
    },
    {
      "language": " COCOS2D-X",
      "city": "北京",
      "totalCount": 105
    },
    {
      "language": "Android",
      "city": "北京",
      "totalCount": 4068
    },
    {
      "language": "iOS",
      "city": "北京",
      "totalCount": 2892
    }]

## 使用到的nodejs~~库~~包
* [superagent](https://github.com/visionmedia/superagent)
* [async](https://github.com/caolan/async)
* [urlencode](https://github.com/node-modules/urlencode)

## 运行方式
**注意，运行环境为windows,mac和linux可能存在兼容性问题**

1. ```git clone https://github.com/isghost/plum```
2. ```cd .\plum\demo4```
3. ```npm start```
