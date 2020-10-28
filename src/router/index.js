import Vue from "vue";
import Router from "vue-router";
import PostList from "@/components/PostList";
import Article from "@/components/Article";
import UserInfo from "@/components/UserInfo";
import SlideBar from "@/components/SlideBar";
import MoreInfo from "@/components/MoreInfo";

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
/**
 *	源码 install 安装依赖时，Router（路由版本不一致）
 *	也可以修改 package.json 里面的 Router 版本
 */

export default new Router({
  mode: "history",
  routes: [
    {
      name: "root",
      path: "/",
      components: {
        main: PostList
      }
    },
    {
      name: "post_content",
      path: "/topic/:id&author=:loginname",
      components: {
        main: Article,
        SlideBar: SlideBar
      }
    },
    {
      name: "user_info",
      path: "/user/:loginname",
      components: {
        main: UserInfo
      }
    },
    {
      name:"more_info",
      path:"/user/:loginname/:type",
      components:{
        main: MoreInfo
      }
    }
  ]
});
