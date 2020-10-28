// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Axios from "axios";
Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
// 图片加载失败时替换
Vue.prototype.errorImg = () => {
  
    let img = document.querySelectorAll("img");
        // console.log(img);
        for (var i = 0; i < img.length; i++) {
          img[i].onerror = function() {
            if(this.title){
              this.src = require('./assets/avatar.png')  
            }
            else{
              this.src = require('./assets/errorPic.jpg')
            }
          
          };
          
        }
  // console.log(event.srcElement.src,"--出错")
  // console.log('捕捉错误')
  
  // 线索：路径有问题，但是图片可以修改
};
// Vue.prototype.changeErrorPic=function() {
//       let img = document.querySelectorAll("img");
//       console.log(img);
//       for (var i = 0; i < img.length; i++) {
//         img[i].onerror = function() {
//           this.src = require('./assets/errorPic.jpg')
//         };
//       }

//     }

// 处理版块文字
Vue.filter("tabFormatter", function(post) {
  if (post.top === true) {
    return "置顶";
  } else if (post.good === true) {
    return "精华";
  } else if (post.tab === "share") {
    return "分享";
  } else if ((post.tab === "ask") | (post.tab === undefined)) {
    return "问答";
  }
});
// 处理最后回复时间
Vue.filter("formatDate", function(iniTime) {
  if (!iniTime) return "未知时间";
  var time = Date.parse(iniTime);
  var toNow = Date.parse(new Date()) - time;
  if (toNow < 0) {
    return "";
  } else if (toNow / 1000 < 30) {
    return "刚刚";
  } else if (toNow / 1000 < 60) {
    return parseInt(toNow / 1000) + " 秒前";
  } else if (toNow / 1000 / 60 < 60) {
    return parseInt(toNow / 1000 / 60) + " 分钟前";
  } else if (toNow / 1000 / 60 / 60 < 24) {
    return parseInt(toNow / 1000 / 60 / 60) + " 小时前";
  } else if (toNow / 1000 / 60 / 60 / 24 < 31) {
    return parseInt(toNow / 1000 / 60 / 60 / 24) + " 天前";
  } else if (toNow / 1000 / 60 / 60 / 24 / 30 < 12) {
    return parseInt(toNow / 1000 / 60 / 60 / 24 / 30) + " 月前";
  } else {
    return parseInt(toNow / 1000 / 60 / 60 / 24 /365) + " 年前";
  }
});
Vue.filter("formatRecentType",function(type){
  if(type==='topics'){
    return '创建'
  }
  else if(type ==='replies'){
    return '参与'
  }
})
