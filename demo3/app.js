var cheerio = require("cheerio");
var superagent = require("superagent");
var async = require("async");
var fs = require("fs");

var targetBaseUrl = "http://search.jd.com/search?keyword=%E6%A3%AE%E9%A9%AC%E5%AE%98%E6%96%B9%E6%97%97%E8%88%B0%E5%BA%97&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&sttr=1&sid=27250&ev=exbrand_%E6%A3%AE%E9%A9%AC%EF%BC%88Semir%EF%BC%89%40&click=0";
var targetUrls = [];
// 截止2015/10/31,森马在京东的商品数量有44页
// pageNum 上限为 44，方便调试，设置为5页
var pageNum = 44;
for(var i=1;i<=pageNum;i++){
  targetUrls.push(targetBaseUrl + "&page=" + i);
}

function processHTML(html,callback){
  $ = cheerio.load(html);
  fs.writeFile("text.txt",html);
  var result = [];
  //下面是cheerio的使用，详情看链接
  $('.goods-list-v1 .gl-item').each(function(idx,element){
    $element = $(element);
    var price = $element.find('.p-price strong i').text();
    var description = $element.find('.p-name em').text();
    var url = $element.find('.p-name a').attr("href");
    var commentCnt = $element.find('.p-commit strong a').text();
    var uid = url.match(/[0-9]+/)[0];
    result.push({
      price:price, //价格
      description:description, //描述
      url:url, //地址
      commentCnt:commentCnt, //评论数量
      uid:uid, //目测是唯一id
      nick:"森马官方旗舰店" //京东可以直接确定店铺
    });
  });
  callback(null,result);
}

function getHTML(url,callback){
  superagent.get(url)
    .end(function(err,res){
      if(err){
        console.log(err)
        callback(err);
        return ;
      }
      processHTML(res.text,callback);
    });
}

function processResult(results){
  var goodsArray = [];
  //js 的for...in 居然 不是直接获得引用， -_-!
  for(var i in results){
    for (var j in results[i]){
      goodsArray.push(results[i][j]);
    }
  }
  goodsArray = goodsArray.filter(function(element,idx){
      //nick 字段为  店铺名称
      //去除掉非官方店的商品信息
      if(element.nick == "森马官方旗舰店"){
        return true;
      }
      else{
        return false;
      }
  })
  console.log("size = " + goodsArray.length);
  //json格式，想放哪里就放哪里
  fs.writeFile("semir.txt",JSON.stringify(goodsArray));
}


//京东的抓取太简单，所以换个方式
// async 是一个异步模块，同时发起多个请求
//mapLimit(arr, limit, iterator, [callback])
async.mapLimit(targetUrls,2,function(url,callback){
   getHTML(url,callback);
},function(err,results){
  if(err){
    console.log(err);
    return ;
  }
  processResult(results);
});