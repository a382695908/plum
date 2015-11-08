var superagent = require("superagent");
var async = require("async");
var urlencode = require("urlencode");
var fs = require("fs");

var citys = 
  ["北京","上海","深圳","广州","杭州","成都","南京","武汉","西安","厦门","长沙","苏州","天津","重庆","郑州",
  "青岛","合肥","福州","济南","大连","珠海","无锡","佛山","东莞","宁波","常州","沈阳","石家庄","昆明","南昌",
  "南宁","哈尔滨","海口","中山","惠州","贵阳","长春","太原","嘉兴","泰安","昆山","烟台","兰州","泉州"];


var languages =
//语言
  ["Java","Python","PHP",".NET","C#","C++","C","VB","Delphi","Perl","Ruby","Hadoop","Node.js",
//前端
  "JavaScript","U3D","COCOS2D-X",
//平台
  "Android","iOS","WP"];


var requests = [];
for(var i=0;i<citys.length;i++){
  var url = "http://www.lagou.com/jobs/positionAjax.json?px=new&city=" + urlencode(citys[i]);
  for(var j=0;j<languages.length;j++){
    var params = "first=true&pn=1&kd=" + urlencode(languages[j]);
    requests.push({
      url:url,
      params:params
    })
  }
}

console.log("reques Count =",requests.length);

var finishedCnt = 0;

function getData(request,callback){
  superagent
    .post(request.url)
    .send(request.params)
    .end(function(err,res){
      var json = JSON.parse(res.text);
      var language = urlencode.decode(request.params.match(/[^=]*$/)[0]);
      var city = urlencode.decode(request.url.match(/[^=]*$/)[0]);
      var totalCount = res.body.content.totalCount;
      callback(null,{
        language:language,
        city:city,
        totalCount:totalCount//岗位需求量
      });
      finishedCnt ++;
      if(finishedCnt%30 == 0){
        console.log("finished percent " + Math.floor(finishedCnt/requests.length * 100) + "%");
      }
    });
}

async.mapLimit(requests,2,function(request,callback){
  getData(request,callback);
},function(err,result){
//  console.log(result);
  fs.writeFile("jobCount.txt",JSON.stringify(result));
});

