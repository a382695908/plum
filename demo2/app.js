//https://github.com/sgentle/phantomjs-node
//使用phantom之前需要安装 phantomjs
//npm i -g phantomjs
var phantom = require('phantom');
var cheerio = require("cheerio");
var eventproxy = require("eventproxy");
var fs = require("fs");
var urlencode = require("urlencode");

//抓取的页面数
var pageNum = 3;

// step   1
phantom.create(function (ph) {
  // step  3
  var ep = new eventproxy();
  function processHTML(html){
    var $ = cheerio.load(html);
    var result = [];
    $('#J_itemlistCont .item').each(function(idx,element){
      var $element = $(element);
      //下面这些就是纯粹的selector知识点
      //好吧，还混进了基础的正则式
      var price = $element.find(".price.g_price.g_price-highlight > strong").text();//价格
      var dealCnt = $element.find(".deal-cnt").text().match(/^[1-9]+/)[0];//已购买人数
      var description = $element.find(".row.row-2.title > a").text().trim();//描述
      var nick = $element.find(".row.row-3.g-clearfix a span").last().text();//店铺名称
      var nid = $element.find(".row.row-2.title .J_U2IStat").attr("data-nid");//目测是唯一ID
      var url = $element.find(".row.row-2.title .J_U2IStat").attr("href");//商品详细信息地址
      //...其它数据略
      result.push({
        price:price,
        dealCnt:dealCnt,
        description:description,
        nick:nick,
        nid:nid,
        url:url
      });
    });
    console.log("page size = ",result.length);
    //将结果发给ep.after,最后合并处理
    ep.emit('fff', result);
    getPageCnt++;
    if(getPageCnt < pageNum){
      myCreatePage();
    }
  }
  var targetShop = "森马官方旗舰店";
  var targetUrl = "https://s.taobao.com/search?js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20151030&ie=utf8";
  targetUrl +="&q="+urlencode(targetShop);
  var getPageCnt = 0;
  function myCreatePage(){  //<----------------<------------------------<---
    var curUrl = targetUrl + "&s=" + getPageCnt*48;                //       |
    console.log(curUrl);
    ph.createPage(function (page) {
        page.open(curUrl, function (status) {                        //     |
          console.log("page "+getPageCnt + " status = ", status);
          //同时创建几个页面，会导致document对象为null,暂时使用递归         |
          page.evaluate(function () {                                //     ^
            return document.body.innerHTML; }, function (html) {     //     |
            processHTML(html);     // jump to step2                                  
          });                                                        //     |
        });
    });                                                              //     |
  }
  // step 2                                                                 |
 myCreatePage();  //----------->------------------>----------------------->--


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
	  //json格式，想放哪里就放哪里
	  fs.writeFile("semir.txt",JSON.stringify(goodsArray));
    ph.exit();
  });
});