const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('example.com', 3000);

const browser = new Browser();
browser.on("loaded",function(){
  console.log("an page is loaded");
})
browser.on("loading",function(){
  console.log("loading .....");
})

function login(){
  browser
    .fill('userName',    '第XXX个小号')
    .fill('password', '1q1q1q');
  browser.pressButton('登录', function(){
      for(var i in browser.resources){
        console.log(i);
        //console.log(browser.resources[i].request);
        //console.log(browser.resources[i].request);
        if((typeof browser.resources[i].request) == "undefined"||(typeof browser.resources[i].request.url) == "undefined"){
          continue;
        }
        console.log(browser.resources[i].request.method);
        console.log(browser.resources[i].request.url);
        console.log(browser.resources[i].request.body);
        if(browser.resources[i].request.url == "https://passport.baidu.com/v2/?login&tpl=mn&u=http%3A%2F%2Fwww.baidu.com%2F"){
          console.log(browser.resources[i].response.body);
          console.log(browser.resources[i].response.headers);
        }
        // console.log(browser.resources[i].error);       
      }
      console.log(browser.cookies);
    });
}

console.log(browser.cookies,"begin");
browser.visit('https://passport.baidu.com/v2/?login&tpl=mn&u=http%3A%2F%2Fwww.baidu.com%2F', function(){
  console.log(browser.cookies);
  login();
});
