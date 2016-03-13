var request = require('superagent');
var urlencode = require("urlencode");
var cheerio = require("cheerio");
var async = require("async");
var fs = require("fs");
var crypto = require("crypto");

// function crawlerImage(imageUrl,savePath,callback){
//   var name = imageUrl.match(/[^\/$]*$/)[0];
//   if(!savePath){
//     var cwd = process.cwd();
//     savePath = cwd + "/images/" + name;
//     if(!checkExistDir){
//       checkExistDir = true
//       if(!fs.existsSync(cwd + "/images")){
//         fs.mkdirSync(cwd + "/images");
//       }
//     }
//   }
  
//   if (!(/^http:/.test(imageUrl) || /^https:/.test(imageUrl))){
//     imageUrl = "http:"+imageUrl;
//   }
//   request.get(imageUrl)
//   .end(function(err,res){
//     if(err){
//       console.log(err,imageUrl);
//       callback(null,false);
//       return ;
//     }
//     console.log(savePath);
//     fs.writeFile(savePath,res.body);
//     callback(null,true);
//   });
// }

// function getImageUrls(url){
//   request.get(url)
//     .end(function(err,res){
//       if(err){
//         console.log(err);
//         return 
//       }
//       var $ = cheerio.load(res.text);
//       $("img").each(function(idx,element){
//         var $element = $(element);
//         var url = $element.attr("src");
//         if (url && url.length <= 0 || !url){
//           return ;
//         }

//         console.log(md5Str,url);

//         var md5Str = crypto.createHash("md5").update(url).digest("hex");
//         imageUrls[md5Str] = url;
//       });
//       getAllImage();
//     });
// }

// function getAllImage(){
//   async.mapLimit(imageUrls, 5, function (url, callback) {
//     //fetchUrl(url, callback);
//     console.log(url);
//     crawlerImage(url,null,callback);
//   }, function (err, result) {
//     console.log('final:');
//     console.log(result);
//   });
// }

// getImageUrls("http://v3.bootcss.com/components/")
var basePageUrl = "http://www.dbmeinv.com/?pager_offset=";
var pageUrls = [];
var imageUrls = [];
var pageNum = 10;
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
    dealPageUrl(url,callback);
  }, function (err, result) {
    getImages();
  });
}

(function main(){
  initPageUrls();
  getImageUrls();
})();