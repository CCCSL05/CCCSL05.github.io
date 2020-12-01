var app = new Vue({
    el: "#app",
    data: {
        city: "",
        arr: [],
        url: "",
        imgUrl: "",
        name: "",
        lyric: "",
        zzz:"",
    },
    methods: {
        getjoke: function () {
            var that = this;
            // 搜索信息
            axios.get("https://autumnfish.cn/search?keywords=" + this.city).then(function (response) {
                that.arr = response.data.result.songs;
                console.log("歌曲信息如下：");
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        },
        fun: function (i, a, b) {
            this.name = a + "-" + b;
            var that = this;
            //歌曲链接
            axios.get("https://autumnfish.cn/song/url?id=" + i).then(function (response) {
                that.url = response.data.data[0].url;
                console.log("歌曲连接信息如下：");
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
            //封面图
            axios.get("https://autumnfish.cn/song/detail?ids=" + i).then(function (response) {
                that.imgUrl = response.data.songs[0].al.picUrl;//设置封面
                var box = document.getElementById("box");//dom获取body元素
                box.style.backgroundImage = "url(" + that.imgUrl + ")";//设置背景图
                that.zzz="url(" + that.imgUrl + ")";
                console.log("封面信息如下：");
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
            //歌词
            axios.get("https://autumnfish.cn/lyric?id=" + i).then(function (response) {
                that.lyric = response.data.lrc.lyric.split("\n");
                console.log("歌词信息如下：");
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        },
    }
});
var ahh=new Vue({
    el:"#ahh",
    data:{
        ok:true,
    },
    methods:{
        first:function(){
            if(this.ok){
                document.getElementById("box").style.backgroundImage="url(../img/179.jpg)";
            }else{
                document.getElementById("box").style.backgroundImage= app.zzz;
            }
            this.ok=!this.ok;
        },
    }
})