// 配置文件里lib.js.xxx; Headers.ejs里也添加
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "https://cdn.jsdelivr.net/gh/guixinchn/image/blog/favicon.png");
        document.title = '我相信你还会回来的！';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/medias/logo.png");
        // document.title = '哈哈，我就知道！' + OriginTitle;
        document.title = '哈哈，我就知道！' ;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 1000);
    }
});
