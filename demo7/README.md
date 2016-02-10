# 《知乎答主的所有回答》
## 实现目标
将知乎某一个用户的所有回答，回答的问题，得到的投票数，问题地址保存到excel
## 任务分析
与前面抓取京东信息的方式没有什么区别，简单的概括成四步  

	1. 根据第一个页面的页数显示，计算出所有需要请求的url  对应函数 getUrls
	2. 发起请求，得到页面 对应函数 getUrlText
	3. 处理得到的页面，提示需要的信息 对应函数 processHTML
	3. 将信息保存到excel 对应函数 saveToExcel
下一步还可以添加答主回答问题的时间，从而分析答主上知乎的习惯（可惜只能精确到日）
## 结果示例
可以查看当前目录下vczh_answer.xls，里面有轮子哥所有回答的问题以及得到的投票数

		question	questionUrl	vote	summary	
		假如给你一次可以对知乎某一处功能进行改造的机会，你会改哪？	www.zhihu.com/question/40254590/answer/85603097	53	因为匿名的消息被举报成功的自动解开并无法再次匿名	
		C#中是怎样确定条件表达式的类型？	www.zhihu.com/question/40242425/answer/85529128	42	C#里面，函数类型都是带名字的、具体的delegate，他不像某些语言有内建的函数类型。C#光有一个函数名字的时候，他是没有类型的。之所以你在有些地方不需要写类型，是因为它可以帮你隐式转换成某个delegate类型。但是在条件表达式这里，并不存在这个做法。所…显示全部	
		这种情况下我应该如何做以突破窘境？	www.zhihu.com/question/40238397/answer/85509968	329	擅自替女朋友做出钱重要还是男朋友重要的决定是不道德的。	

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