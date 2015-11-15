# 《拉勾网岗位信息获取2--岗位详细信息》
## 实现目标
将拉勾网上，所有岗位的信息抓取下来。由于岗位大于30页后，拉勾网不再显示，我也将忽略30页以后的内容。将抓取到的数据保存到mongodb。
## 任务分析
在demo4取得岗位数量的基础上，计算显示的页数，生成第二轮请求的参数

    requestsSecond.push({
      pn:i,
      kd:language,
      first:false,
      city:city
    })

与demo4相比，主要增加了```startSecondRequest```和```getJobInfo```两个函数，以及```myurl```代码块。岗位信息存放的位置：```res.body.content.result```
  
## 结果示例
可以查看当前目录下jobs.csv(csv文件只存放了北京，C++的450个岗位)或者mongodb(Lagou.zip是mongodb的压缩包,岗位数量2w+，收集时间为2015/11/15)。
### 查看mongodb方法
1. [安装mongodb](https://www.mongodb.org/),并添加到```path```
2. 运行数据库 ```>mongod --dbpath LagouPath```,其中LagouPath指Lagou.zip的解压目录
3. 打开新的```cmd```,```>mongo```,```>db.jobs.find()```

  	[{
      "positionId": 790491,
      "positionName": "VC/C++",
      "companyId": 54731,
      "companyShortName": "北京玉笛信息技术有限责任公司",
      "positionFirstType": "技术",
      "industryField": "移动互联网",
      "education": "本科",
      "workYear": "3-5年",
      "city": "北京",
      "positionAdvantage": "期权，分红",
      "createTime": "2015-11-13 21:26:44",
      "salary": "8k-12k",
      "leaderName": "沈经理",
      "companyName": "金笛软件",
      "companySize": "15-50人",
      "companyLogo": "image1/M00/1E/39/Cgo8PFUtygiAZHIbAABHRQTMIaw711.png",
      "financeStage": "初创型(未融资)",
      "jobNature": "全职",
      "positionType": "后端开发",
      "companyLabelList": ["节日礼物", "技能培训", "绩效奖金", "年度旅游"],
      "score": 1081,
      "haveDeliver": false,
      "adWord": 0,
      "randomScore": 0,
      "countAdjusted": false,
      "calcScore": false,
      "orderBy": 110,
      "showOrder": 0,
      "adjustScore": 0,
      "relScore": 807,
      "formatCreateTime": "1天前发布",
      "imstate": null,
      "createTimeSort": 1447421204000,
      "positonTypesMap": null,
      "hrScore": 164,
      "totalCount": 0,
      "searchScore": 0,
      "language": "C++"
    },
    {
        "positionId": 894938,
        "positionName": "C++高级软件研发工程师",
        "companyId": 54731,
        "companyShortName": "北京玉笛信息技术有限责任公司",
        "positionFirstType": "技术",
        "industryField": "移动互联网",
        "education": "本科",
        "workYear": "5-10年",
        "city": "北京",
        "positionAdvantage": "分红",
        "createTime": "2015-11-13 21:26:35",
        "salary": "9k-12k",
        "leaderName": "沈经理",
        "companyName": "金笛软件",
        "companySize": "15-50人",
        "companyLogo": "image1/M00/1E/39/Cgo8PFUtygiAZHIbAABHRQTMIaw711.png",
        "financeStage": "初创型(未融资)",
        "jobNature": "全职",
        "positionType": "后端开发",
        "companyLabelList": ["节日礼物", "技能培训", "绩效奖金", "年度旅游"],
        "score": 942,
        "haveDeliver": false,
        "adWord": 0,
        "randomScore": 0,
        "countAdjusted": false,
        "calcScore": false,
        "orderBy": 110,
        "showOrder": 0,
        "adjustScore": 0,
        "relScore": 668,
        "formatCreateTime": "1天前发布",
        "imstate": null,
        "createTimeSort": 1447421195000,
        "positonTypesMap": null,
        "hrScore": 164,
        "totalCount": 0,
        "searchScore": 0,
        "language": "C++"
    }]

## 使用到的nodejs~~库~~包
* [superagent](https://github.com/visionmedia/superagent)
* [async](https://github.com/caolan/async)
* [urlencode](https://github.com/node-modules/urlencode)
* [mongodb](https://docs.mongodb.org/getting-started/node/client/)

## 运行方式
**注意，运行环境为windows,mac和linux可能存在兼容性问题**

1. ```git clone https://github.com/isghost/plum```
2. ```cd .\plum\demo5```
3. ```npm start```
