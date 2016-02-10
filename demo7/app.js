/*
  获取数据主要分四步
  1. 根据第一个页面的页数显示，计算出所有需要请求的url  对应函数 getUrls
  2. 发起请求，得到页面 对应函数 getUrlText
  3. 处理得到的页面，提示需要的信息 对应函数 processHTML
  3. 将信息保存到excel 对应函数 saveToExcel
*/
var cheerio = require("cheerio");
var superagent = require("superagent");
var async = require("async");
var fs = require("fs");

var targetUrl = "https://www.zhihu.com/people/liu-xiao-min-32-94/answers";

function processHTML(html,callback){  //处理获得的页面
  $ = cheerio.load(html);
  //fs.writeFile("text.txt",html);
  var result = [];
  //下面是cheerio的使用，详情看链接
  $('.zm-profile-section-list .zm-item').each(function(idx,element){
    $element = $(element);
    var question = $element.find('h2').text();
    var questionUrl = $element.find('h2 a').attr("href");
    if(!(questionUrl.search(/^http/) != -1 || questionUrl.search(/^www/) != -1)){
      questionUrl = "www.zhihu.com" + questionUrl
    }
    var vote = $element.find('.zm-item-vote').text();
    var summary = $element.find('.zh-summary').text();
    result.push({
      question:question, //问题描述
      questionUrl:questionUrl, //问题地址
      vote:vote, //投票数
      summary:summary, //回答
    });
  });
  callback(null,result);
}

function saveToExcel(arrays,saveFileName){ //保存结果
  saveFileName = saveFileName || "result.xls";
  var colNames = [];
  var resultStr = "";
  for(var name in arrays[0][0]){
    console.log("name = ",name);
    colNames.push(name);
  }
  for(var nameIndex in colNames){
    resultStr += colNames[nameIndex] + "\t";
  }
  resultStr += "\n";
  for(arrayIndex in arrays){
    for(itemIndex in arrays[arrayIndex]){
      var item = arrays[arrayIndex][itemIndex];
      for(var nameIndex in colNames){
        resultStr += item[colNames[nameIndex]].replace(/\n/g,"") + "\t";
      }
      resultStr += "\n";
    }
  }
  fs.writeFile(saveFileName,resultStr);
}


function getUrlText(urlArray,processFunc,resultCallback){ //获取所有的页面
  async.mapLimit(urlArray,2,function(url,callback){
     superagent.get(url)
      .end(function(err,res){
        if(err){
          console.log(err)
          callback(err);
          return ;
        }
        processFunc(res.text,callback);
      });
  },function(err,results){
    if(err){
      console.log(err);
      return ;
    }
    resultCallback(results);
  });
}

(function getUrls(){ // 获得所有页面的地址
  superagent
  .get(targetUrl)
  .end(function(err,res){
    if(err){
      console.log(err)
      callback(err);
      return ;
    }
    var $ = cheerio.load(res.text);
    var result1 = $(".zm-invite-pager span a");
    var result2 = $(result1.get(result1.length-2));
    var pageNum = parseInt(result2.text());
    if(isNaN(pageNum)){
      pageNum = 1;
    }
    var urlArray = [];
    for(var i = 1;i <= pageNum;i++){
      if(targetUrl.search(/\?/) == -1){
        urlArray.push(targetUrl + "?page=" + i);
      }
      else{
        urlArray.push(targetUrl + "&page=" + i);
      }
    }
    getUrlText(urlArray,processHTML,saveToExcel);
  });
})();
