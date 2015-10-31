# 《淘宝搜索结果收集篇1》
## 实现目标
在淘宝首页搜索```森马官方旗舰店```，获取搜索结果的商品数据，将其以json格式保存在txt文件中。
## 任务分析
淘宝的页面是在本地执行```javascript```生成的，直接得到的```html```无法通过```selector```获取数据。  
仔细观察搜索结果的返回数据，商品数据已经以json格式保存在```<script> g_page_config = {...}```里面,商品信息路径

	g_page_config.mods.itemlist.data.auctions

确定目标位置后，接下来就是简单的字符串处理
## 结果示例
可以查看当前目录下的semir.txt文件，目前只抓了两个页面,90个左右的商品，只需将代码里pageNum调大就能获得更多数据

	[{
    "p4p": 1,
    "p4pSameHeight": true,
    "nid": "521993753706",
    "category": "",
    "pid": "",
    "title": "森马加厚棉衣 男 2015冬装新款男士夹克棒球情侣服棉袄外套韩版潮",
    "raw_title": "森马棉衣 15冬装 男士夹克棒球情侣服韩版潮",
    "pic_url": "//g-search1.alicdn.com/img/bao/uploaded/i4/imgextra/i3/140200128847009685/TB2.E8kgXXXXXccXXXXXXXXXXXX_!!20844020-0-saturn_solar.jpg",
    "detail_url": "https://click.simba.taobao.com/cc_im?p=%C9%AD%C2%ED%B9%D9%B7%BD%C6%EC%BD%A2%B5%EA&s=1145915053&k=321&e=uXYcONWCIPrpdM2a69o4M3jyUAU79Wa%2B2TctM5Xs9G3TjZomezwigkPMidiyVdtpRFYWUAbplcrnfeKPljIPC2N%2B0hQl3RUbc598vyuMifG5B%2Bd7VTEKOoBk5OxeBHsflzpt0eGxrfdgo8vHqPKn5kYgg9sKtHnya68assmbUIRz7os2ChH4APJHj0p8NBd4strQ6tmuuqkFl%2FJD8YnqtDe6LFm1eZBbExGQ%2BSPmV5O7qWKKPR6SULPb2L39KdsXaCAI5hVwL8tfwZjj3WN%2Fp7WjkmdkenKfncCH7MHwhpUNR8P0stE0N18MzZcIBr%2B6",
    "view_price": "139.90",
    "view_fee": "0.00",
    "item_loc": "浙江 杭州",
    "reserve_price": "239.0",
    "view_sales": "3457人付款",
    "comment_count": "",
    "user_id": "397341302",
    "nick": "森马官方旗舰店",
    "shopcard": {
        "levelClasses": [],
        "isTmall": true,
        "delivery": [0, 0, 0],
        "description": [0, 0, 0],
        "service": [0, 0, 0],
        "encryptedUserId": "UvGkuvGQYvGNy"
    },
    "icon": [{
        "title": "掌柜热卖宝贝",
        "dom_class": "icon-service-remai",
        "position": "1",
        "show_type": "0",
        "icon_category": "ad",
        "outer_text": "0",
        "html": "",
        "icon_key": "icon-service-remai",
        "trace": "srpservice",
        "traceIdx": 0,
        "innerText": "掌柜热卖宝贝",
        "url": "//re.taobao.com/search?keyword=%C9%AD%C2%ED%B9%D9%B7%BD%C6%EC%BD%A2%B5%EA&refpid=420432_1006&frcatid=&"
    },
    {
        "title": "尚天猫，就购了",
        "dom_class": "icon-service-tianmao",
        "position": "1",
        "show_type": "0",
        "icon_category": "baobei",
        "outer_text": "0",
        "html": "",
        "icon_key": "icon-service-tianmao",
        "trace": "srpservice",
        "traceIdx": 1,
        "innerText": "天猫宝贝"
    }],
    "isHideIM": true,
    "isHideNick": false,
    "comment_url": "https://click.simba.taobao.com/cc_im?p=%C9%AD%C2%ED%B9%D9%B7%BD%C6%EC%BD%A2%B5%EA&s=1145915053&k=321&e=uXYcONWCIPrpdM2a69o4M3jyUAU79Wa%2B2TctM5Xs9G3TjZomezwigkPMidiyVdtpRFYWUAbplcrnfeKPljIPC2N%2B0hQl3RUbc598vyuMifG5B%2Bd7VTEKOoBk5OxeBHsflzpt0eGxrfdgo8vHqPKn5kYgg9sKtHnya68assmbUIRz7os2ChH4APJHj0p8NBd4strQ6tmuuqkFl%2FJD8YnqtDe6LFm1eZBbExGQ%2BSPmV5O7qWKKPR6SULPb2L39KdsXaCAI5hVwL8tfwZjj3WN%2Fp7WjkmdkenKfncCH7MHwhpUNR8P0stE0N18MzZcIBr%2B6&on_comment=1",
    "shopLink": "https://click.simba.taobao.com/cc_im?p=%C9%AD%C2%ED%B9%D9%B7%BD%C6%EC%BD%A2%B5%EA&s=1145915053&k=321&e=uXYcONWCIPrpdM2a69o4M3jyUAU79Wa%2B2TctM5Xs9G3TjZomezwigkPMidiyVdtpRFYWUAbplcrnfeKPljIPC2N%2B0hQl3RUbc598vyuMifG5B%2Bd7VTEKOoBk5OxeBHsflzpt0eGxrfdgo8vHqPKn5kYgg9sKtHnya68assmbUIRz7os2ChH4APJHj0p8NBd4strQ6tmuuqkFl%2FJD8YnqtDe6LFm1eZBbExGQ%2BSPmV5O7qWKKPR6SULPb2L39KdsXaCAI5hVwL8tfwZjj3WN%2Fp7WjkmdkenKfncCH7MHwhpUNR8P0stE0N18MzZcIBr%2B6"
	}]

## 使用到的nodejs~~库~~包
* [cheerio](https://github.com/cheeriojs/cheerio)
* [superagent](https://github.com/visionmedia/superagent)
* [eventproxy](https://github.com/JacksonTian/eventproxy)
* [urlencode](https://github.com/node-modules/urlencode)

## 运行方式
**注意，运行环境为windows,mac和linux可能存在兼容性问题**
1. ```git clone https://github.com/isghost/plum```
2. ```cd .\plum\demo1```
3. ```npm i```
4. ```npm start```