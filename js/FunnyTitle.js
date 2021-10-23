// 配置文件里lib.js.xxx; Headers.ejs里也添加
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "https://cdn.jsdelivr.net/gh/guixinchn/image/blog/favicon.png");
        document.title = '我在这儿等着你回来';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/medias/logo.png");
        // document.title = '哈哈，我就知道！' + OriginTitle;
        document.title = '等着你回来看那桃花开' ;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});
