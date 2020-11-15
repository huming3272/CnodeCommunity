<template>
  <div class="article">
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
    <div v-else>
    <!-- <div> -->
      <div class="topic_header">
        <div class="topic_title">
          <!-- <span> -->
          <span
            v-bind:class="[
        {'put_good':(post.good=undefined? false:post.good===true)},
        {'put_top' :(post.top =undefined? false:post.top===true)},
        {'topiclist-tab':(post.good ===false && post.top ===false)}
        ]"
          >
            <span>{{post|tabFormatter}}</span>
          </span>
          {{post.title}}
        </div>
        <ul>
          <li>•发布于{{post.create_at| formatDate}}</li>
          <li>•作者{{post.author.loginname}}</li>
          <li>•{{post.visit_count}}次浏览</li>
          <li>•来自 {{post|tabFormatter}}</li>
        </ul>
        <div class="topic_content" v-html="post.content"></div>
      </div>
      <div id="reply">
        <div class="topbar">{{post.reply_count}}&nbsp;&nbsp;回复</div>
        <div class="replySec" v-for="(reply,index) in post.replies" :key="reply.id">
          <div class="replyUp">
            <router-link
              :to="{
              name:'user_info',
              params:{
                loginname: reply.author.loginname,
                
              }
            }"
            >
              <img :src="reply.author.avatar_url" alt :title="reply.author.loginname" />
              {{reply.author.loginname}}
            </router-link>
            <!-- <router-link to="">{{reply.author.loginname}}</router-link> -->
            <span>{{index+1}}楼•{{reply.create_at|formatDate}}</span>
          </div>
          <div class="reply_content" v-html="reply.content"></div>
        </div>
      </div>
    </div>
    <!-- 一个组件--这是路由跳转后的ID------{{$route.params.id}} -->
    <br />
    <!-- name:{{$route.params.name}} -->
    <!-- <router-link :to="{
          name: 'root',
          params:{
            id: $route.params.id,
            name: $route.params.name
          }
        }" style="margin:0 20px">
          一个测试
    </router-link>-->
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "Article",
  data() {
    return {
      post: {},
      // url: "https://cnodejs.org/api/v1/",
      url:"http://mock.hunger-valley.com/cnode/api/v1/",
      isLoading: true,
    };
  },
  methods: {
    getArticleData() {
      this.isLoading = true;
      this.$http
        .get(this.url + "topic/" + this.$route.params.id)
        .then(res => {
          this.post = res.data.data;
          // console.log(this.post, "数据回来了");
          // this.isLoading = !this.isLoading;
          this.isLoading = false
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
    // Vue.prototype.changeErrorPic();
    Vue.prototype.errorImg();
  },
  beforeMount() {
    this.getArticleData();
  },
  watch: {
    // this.$route.path
    '$route.path':function(to, from) {
      this.getArticleData();
      console.log(this.$route.path)
    }
  }
};
</script>
<style>
/* 引入了markdown的css所以不能使用scoped来限制使用范围 */
@import url("../assets/markdown-github.css");
.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}
.article {
  width: 80%;
  float: left;
}
.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}

#reply,
.topic_header {
  background-color: #fff;
  border-radius: 5px;
}

#reply {
  margin-top: 15px;
}
#reply > div:not(:first-child) {
  padding: 10px;
}

#reply .replyUp> a >img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}

#reply a,
#reply span {
  font-size: 13px;
  text-decoration: none;
}
#reply a {
  color: #08c;
}
#reply span {
  color: #666;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}

.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}
.reply_content {
  margin-top: 10px;
  padding-left: 40px;
  font-size: 15px;
}
.reply_content .markdown-text img{
  width: 15%;
  height: auto;
}

.topic_header {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}
.topic_content p {
  font-size: 15px;
  line-height: 1.7em;
  overflow: auto;
  margin: 1em 0;
}
.markdown-text img {
  width: 92% ;
}
</style>