//https://github.com/sgentle/phantomjs-node
var phantom = require('phantom');
var cheerio = require("cheerio");
var eventproxy = require("eventproxy");
var fs = require("fs");
var urlencode = require("urlencode");


var goodsArray = [];
var pageNum = 1;


phantom.create(function (ph) {
  var ep = new eventproxy();
  function processHTML(html){
    console.log("html =",html);
    var $ = cheerio.load(html);
    var result = [];
    $('#J_itemlistCont .item').each(function(idx,element){
      var $element = $(element);
      var price = $element.find(".price.g_price.g_price-highlight > strong").text();//价格
      var dealCnt = $element.find(".deal-cnt").text().match(/^[1-9]+/)[0];//已购买人数
      var description = $element.find(".row.row-2.title > a").text().trim();//描述
      var nick = $element.find(".row.row-3.g-clearfix a span").last().text();//店铺名称
      var nid = $element.find(".row.row-2.title .J_U2IStat").attr("data-nid");
      var url = $element.find(".row.row-2.title .J_U2IStat").attr("href");
      //其它名称略
      result.push({
        price:price,
        dealCnt:dealCnt,
        description:description,
        nick:nick,
        nid:nid,
        url:url
      });
    });
    console.log("result size = ",result.length);
    ep.emit('fff', result);
  }
  var targetShop = "森马官方旗舰店";
  var targetUrl = "https://s.taobao.com/search?js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20151030&ie=utf8";
  targetUrl +="&q="+urlencode(targetShop);
  for(i = 0;i < pageNum;i++){
    var curUrl = targetUrl + "&s=" + i*48;
    console.log(curUrl);
    ph.createPage(function (page) {
        page.open(curUrl, function (status) {
          console.log("opened google? ", status);
          page.evaluate(function () { return document.body.innerHTML; }, function (html) {
            processHTML(html);
          });
        });
    });
  }
  ep.after("fff",pageNum,function(results){
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
	  //json格式，先放哪里就放哪里
	  fs.writeFile("semir.txt",JSON.stringify(goodsArray));
    ph.exit();
  });
});