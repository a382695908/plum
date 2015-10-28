var superagent = require("superagent");
var cheerio = require("cheerio");
var eventproxy = require("eventproxy");
var url = require("url");
var fs = require("fs");
var urlencode = require("urlencode");


var targetSearchUrl = "https://s.taobao.com/search?commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.7724922.8452-taobao-item.2&ie=utf8&initiative_id=tbindexz_20151028";
var targetShop = "森马官方旗舰店";
// 最多保存100页的搜索结果,可能出现没有一百页的情况
var pageNum = 2;

var ep = new eventproxy();
//抓取搜索结果的前一百页
for(var i=0;i < pageNum;i++){
  // 搜索 森马官方旗舰店 
  superagent.get(targetSearchUrl)
  //s 这个参数是观察url得来的，表示从搜索结果的第s位显示，一般一个页面显示48个
  	.query("s="+ i*48)
    //q 查询字段
    .query("q="+urlencode(targetShop))
    //.query({q:urlencode(targetShop)})   待查
    .end(function (err, res) {
      // 错误处理
      if (err) {
        return next(err);
      }
      //这里cheerio的使用是多余的
      var $ = cheerio.load(res.text);

      var items = [];
      $('script').each(function (idx, element) {
        var $element = $(element);
        var str = $element.text()
        /*
          观察淘宝搜索返回的数据
          淘宝商品数据在第一次请求后，就已经保存在名为  g_page_config的变量里面
          这个变量里面还包含了其它信息，比如每页显示的数量，一般情况是48个，
          所以每页的数量被我写死了
        */
        if(str.search(/g_page_config/)==-1){
          return ;
        }
        //<script>这个标签里不止g_page_config一个变量，获取定义这个变量的子字符串
      	var startIndex = str.search(/\{/);
      	var endIndex = 0;
      	var bracket1Num = 1;
      	var bracket2Num = 0;
      	for(var i = startIndex + 1;i<str.length;i++){
      		if (str.charAt(i) == '{'){
      			bracket1Num +=1;
      		}
      		else if(str.charAt(i) == '}'){
      			bracket2Num += 1;
      		}
      		if(bracket1Num == bracket2Num){
      			endIndex = i;
      			break;
      		}
      	}
        // g_page_config的变量，一个json字符串
        var jsonStr = str.substring(startIndex,endIndex+1);
        //转化为一个json对象
        var json = JSON.parse(jsonStr);
        //商品数据在这个json对象mods.itemlist.data.auctions
        ep.emit("ff",json.mods.itemlist.data.auctions);
      });
  });
}

ep.after("ff",pageNum,function(result){
  var goodsArray = [];
  //js 的for...in 居然 不是直接获得引用， -_-!
  for(var i in result){
    for (var j in result[i]){
      goodsArray.push(result[i][j]);
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
  //json格式，先放哪里就放哪里
  fs.writeFile("semir.txt",JSON.stringify(goodsArray));
});