var request = require('superagent');
var urlencode = require("urlencode");
var cheerio = require("cheerio");
var async = require("async");
var fs = require("fs");
var crypto = require("crypto");
var mongodb = require("./mongodb");


var basePageUrl = "http://www.dbmeinv.com/?pager_offset=";
var pageUrls = [];
var imageUrls = [];
var pageNum = 1;
// 记录是否判断过Images这个文件目录是否存在过
var checkExistDir = false;

function initPageUrls(){
  for(var i=1;i<=pageNum;i++){
    pageUrls.push(basePageUrl + i);
    console.log(pageUrls[i-1]);
  }
}


function dealImageUrl(imageUrl,callback){
  var name = imageUrl.match(/[^\/$]*$/)[0];
  var cwd = process.cwd();
  savePath = cwd + "/images/" + name;
  if(!checkExistDir){
    checkExistDir = true
    if(!fs.existsSync(cwd + "/images")){
      fs.mkdirSync(cwd + "/images");
    }
  }
  
  if (!(/^http:/.test(imageUrl) || /^https:/.test(imageUrl))){
    imageUrl = "http:"+imageUrl;
  }
  request.get(imageUrl)
  .end(function(err,res){
    if(err){
      callback(null,false);
      return ;
    }
    fs.writeFile(savePath,res.body);
    callback(null,true);
  });
}

function getImages(){
  async.mapLimit(imageUrls, 1, function (url, callback) {
    dealImageUrl(url,callback);
  }, function (err, result) {
  });
}

function dealPageUrl(url,callback){
  setTimeout(function(){
    request.get(url)
      .end(function(err,res){
        if(err){
          console.log(err);
          return 
        }
        var $ = cheerio.load(res.text);
        console.log(res.text);
        $(".thumbnails > li img").each(function(idx,element){
          var $element = $(element);
          var imageUrl = $element.attr("src");
          if (imageUrl && imageUrl.length <= 0 || !imageUrl){
            return ;
          }
          imageUrls.push(imageUrl);
        });
        callback(null,url);
    });
  },1000);
}

function getImageUrls(){
  async.mapLimit(pageUrls, 1, function (url, callback) {
    console.log("deal url : ",url);
    dealPageUrl(url,callback);
  }, function (err, result) {
    getImages();
  });
}

(function main(){
  initPageUrls();
  getImageUrls();
})();