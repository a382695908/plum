var request = require('superagent');
var urlencode = require("urlencode");
var cheerio = require("cheerio");
var async = require("async");
var fs = require("fs");
var crypto = require("crypto");

var imageUrls = {};

var checkExistDir = false;

function crawlerImage(imageUrl,savePath,callback){
  var name = imageUrl.match(/[^\/$]*$/)[0];
  if(!savePath){
    var cwd = process.cwd();
    savePath = cwd + "/images/" + name;
    if(!checkExistDir){
      checkExistDir = true
      if(!fs.existsSync(cwd + "/images")){
        fs.mkdirSync(cwd + "/images");
      }
    }
  }
  
  if (!(/^http:/.test(imageUrl) || /^https:/.test(imageUrl))){
    imageUrl = "http:"+imageUrl;
  }
  request.get(imageUrl)
  .end(function(err,res){
    if(err){
      console.log(err,imageUrl);
      callback(null,false);
      return ;
    }
    console.log(savePath);
    fs.writeFile(savePath,res.body);
    callback(null,true);
  });
}

function getImageUrls(url){
  request.get(url)
    .end(function(err,res){
      if(err){
        console.log(err);
        return 
      }
      var $ = cheerio.load(res.text);
      $("img").each(function(idx,element){
        var $element = $(element);
        var url = $element.attr("src");
        if (url.length <= 0){
          return ;
        }

        var md5Str = crypto.createHash("md5").update(url).digest("hex");
        imageUrls[md5Str] = url;
        console.log(md5Str,url);
      });
      getAllImage();
    });
}

function getAllImage(){
  async.mapLimit(imageUrls, 5, function (url, callback) {
    //fetchUrl(url, callback);
    console.log(url);
    crawlerImage(url,null,callback);
  }, function (err, result) {
    console.log('final:');
    console.log(result);
  });
}

getImageUrls("http://www.zhihu.com/question/38264716")