
<template>
  <div class="PostList">
    <!-- 页面加载动画 -->
    <div class="loading" v-if="isLoading">
      <div class="taiji">
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
    <!-- 主题帖子列表 -->
    <ul v-show="!isLoading">
      <!-- 头部导航栏 -->
      <li class="toobar">
        <span
          v-on:click="changActive('all')"
          v-bind:class="[{
          'active':(active==='all')
        }]"
        >全部</span>
        <span
          v-on:click="changActive('good')"
          v-bind:class="[{
          'active':(active==='good')
        }]"
        >精华</span>
        <span
          v-on:click="changActive('share')"
          v-bind:class="[{
          'active':(active==='share')
        }]"
        >分享</span>
        <span
          v-on:click="changActive('ask')"
          v-bind:class="[{
          'active':(active==='ask')
        }]"
        >问答</span>
        <span
          v-on:click="changActive('job')"
          v-bind:class="[{
          'active':(active==='job')
        }]"
        >招聘</span>
        <span
          v-on:click="changActive('dev')"
          v-bind:class="[{
          'active':(active==='dev')
        }]"
        >客户端测试</span>
      </li>
      <!-- 每一行帖子信息 -->
      <li v-for="post in posts" :key="post.id">
        <!-- 帖子头像 -->
        <img :src="post.author.avatar_url" :title="post.author.loginname" />
        <!-- v-on:error = "errorImg('avatar')" -->
        <!-- 回复数/浏览数 -->
        <span class="allcount">
          <span class="reply_count">{{post.reply_count}}</span>
          /
          {{post.visit_count}}
        </span>
        <!-- 帖子类型 -->
        <span
          v-bind:class="[
        {'put_good':(post.good===true)},
        {'put_top':(post.top === true)},
        {'topiclist-tab':(post.good ===false && post.top ===false)}
        ]"
        >
          <span>{{post | tabFormatter}}</span>
        </span>
        <!-- 标题 -->
        <router-link
          :to="{
          name: 'post_content',
          params:{
            id: post.id,
            loginname: post.author.loginname
          }
        }"
          style="margin:0 20px"
        >{{post.title}}</router-link>
        <!-- 最终回复时间 -->
        <span class="last_reply">{{post.last_reply_at|formatDate}}</span>
      </li>
      <li>
        <!-- <pagination v-on:emitPage="test"></pagination> -->
        <pagination v-on:emitPage="getPage"></pagination>
      </li>
    </ul>
  </div>
</template>
<script>
// https://www.jianshu.com/p/394c487d81d7 默认图片替代线索
// https://www.cnblogs.com/1032473245jing/p/12580014.html
import Vue from "vue";
import pagination from "./Pagination";
export default {
  name: "PostList",
  data() {
    return {
      isLoading: true,
      posts: [],
      active: "all",
      getUrl: "https://cnodejs.org/api/v1/",
      // getUrl:"http://mock.hunger-valley.com/cnode/api/v1/",
      pageParams: 1
    };
  },
  components: {
    pagination
  },
  methods: {
    getData() {
      let that = this;
      this.isLoading = true;
      // this.pageParams = this.$route.query.page
      // if (this.$route.query.page && this.pageParams != this.$route.query.page) {
      //   // this.pageParams = this.$route.query.page;
      //   console.log(this.pageParams, "pageParams");
      //   console.log(this.$route.query.page, "query.page");
      // }

      this.$http
        .get(this.getUrl + "topics", {
          params: {
            // page: that.$route.query.page||that.pageParams,
            page: that.$route.query.page || 1,
            // limit: 10
            tab: that.$route.query.tab || "all"
          }
        })
        .then(res => {
          // console.log(res);
          this.posts = res.data.data;
          this.isLoading = false;
        })
        // 数据返回后的操作
        .catch(function(err) {
          //处理返回失败的问题
          console.log(err);
        });


      this.isloading = false;
      window.scrollTo(0, 0);

      // console.log(this.pageParams, "页面参数");
    },
    changActive(type) {
      this.active = type;

      this.pageParams = 1
      this.$router.push({
        name: "root",
        query: {
          tab: this.active,
          page: this.pageParams

          // page: '鸡儿'
        }
      });

      this.getData();
    },
    getPage(page) {
      this.pageParams = page;
      // this.$route.query.page = page
      this.$router.push({
        name: "root",
        query: {
          tab: this.active,
          page: this.pageParams

          // page: '鸡儿'
        }
      });
      // this.$route.query.page = page
      // console.log(this.pageParams);
      // v-if重新渲染元素的时候生命周期会走一遍

      this.getData();
    },
  },
  beforeMount() {
    this.getData();
  },
  mounted() {

    this.active = this.$route.query.tab||"all";
  },
  updated() {
    Vue.prototype.errorImg();
  }
};
</script>
<style scoped>
.active {
  background: #80bd01;
  color: white !important;
}
.PostList {
  margin: 0 auto 0 auto;
}
.PostList {
  background-color: #e1e1e1;
}
.posts {
  margin-top: 10px;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  /* max-width: 1400px; */
  margin: 0 auto;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
  background: #f5f5f5;
}

li:last-child:hover {
  background: white;
}

li span {
  line-height: 30px;
}

.allcount {
  min-width: 80px;
  margin: 0 10px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  color: #b4b4b4;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.toobar {
  height: 40px;
  background-color: #f5f5f5;
}

.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  padding: 4px 8px 4px 8px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 3px;
}

.toobar span:hover {
  color: #005580;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
</style>
