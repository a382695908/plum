var superagent = require("superagent");
var async = require("async");
var urlencode = require("urlencode");
var fs = require("fs");
var myurl = require("./myurl");

//未使用数据库，txt不好保存大量数据，只抓取部分岗位
var citys = 
  ["北京","上海","深圳","广州","杭州","成都","南京","武汉","西安","厦门","长沙","苏州","天津","重庆","郑州",
  "青岛","合肥","福州","济南","大连","珠海","无锡","佛山","东莞","宁波","常州","沈阳","石家庄","昆明","南昌",
  "南宁","哈尔滨","海口","中山","惠州","贵阳","长春","太原","嘉兴","泰安","昆山","烟台","兰州","泉州"];
citys= ["北京","杭州"];

var languages =
//语言
  ["Java","Python","PHP",".NET","C#","C++","C","VB","Delphi","Perl","Ruby","Hadoop","Node.js",
//前端
  "JavaScript","U3D","COCOS2D-X",
//平台
  "Android","iOS","WP"];

  languages = ["Python","U3D"];

//数据来源  拉勾网
var baseUrl = "http://www.lagou.com/jobs/positionAjax.json?px=new&city=";
var requestsFirst = []; //第一轮请求，获取页数
var requestsSecond = []; //第二轮请求，获取岗位详细信息
for(var i=0;i<citys.length;i++){
  var url = baseUrl + urlencode(citys[i]);
  for(var j=0;j<languages.length;j++){
    var params = "first=true&pn=1&kd=" + urlencode(languages[j]);
    requestsFirst.push({
      url:url,
      params:params
    })
  }
}

console.log("request Count =",requestsFirst.length);

var finishedCnt = 0;

function getData(request,callback){
  superagent
    .post(request.url)
    .send(request.params)
    .end(function(err,res){
      var json = JSON.parse(res.text);
      var postParams = myurl.decodeParams(request.params);
      var getParams = myurl.decodeParams(request.url);
      var language = postParams.kd;
      var city = getParams.city;
      var totalCount = res.body.content.totalCount;
      var pageNum = Math.floor((totalCount + 14)/15);
      for(var i=1;i<=pageNum&&i<=30;i++){
        requestsSecond.push({
          pn:i,
          kd:language,
          first:false,
          city:city
        })
      }
      callback(null,{
        language:language,
        city:city,
        totalCount:totalCount//岗位需求量
      });
      finishedCnt ++;
      if(finishedCnt%30 == 0){
        console.log("finished percent " + Math.floor(finishedCnt/requestsFirst.length * 100) + "%");
      }
    });
}

async.mapLimit(requestsFirst,2,function(request,callback){
  getData(request,callback);
},function(err,result){
  startSecondRequest();
});


function startSecondRequest(){
  console.log("requestsSecond = ",requestsSecond.length);
  finishedCnt = 0;
  async.mapLimit(requestsSecond,2,function(params,callback){
    getJobInfo(params,callback);
  },function(err,result){
      var jobs = [];
      for(var i in result){
        for (var j in result[i]){
          jobs.push(result[i][j]);
        }
      }
      fs.writeFile("jobs.txt",JSON.stringify(jobs));
  });
}

function getJobInfo(params,callback){
  superagent
    .post(baseUrl + urlencode(params.city))
    .send(myurl.encodeParams(params,"pn","kd","first"))
    .end(function(err,res){
      var language = params.kd;
      var city = params.city;
      var jobs = res.body.content.result;
      for(var k in jobs){
        jobs[k]["language"] = language;
      }
      callback(null,jobs);
      finishedCnt ++;
      if(finishedCnt%30 == 0){
        console.log("finished percent " + Math.floor(finishedCnt/requestsSecond.length * 100) + "%");
      }
    });
}

