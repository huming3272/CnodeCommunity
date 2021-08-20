<template>
  <div class="UserInfo">
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
    <div class="userInformation border" v-else>
      <div class="toobar border">
        <router-link :to="{name:'root'}">
          <span>主页 / </span>
        </router-link>
        <router-link :to="{name:'user_info'}">
          <span>{{this.$route.params.loginname}}的主页</span>
        </router-link>
      </div>
      <div class="topics">
        <p>{{this.$route.params.loginname}}{{this.$route.params.type|formatRecentType}}的话题</p>
        <ul>
          <li v-for="recents in recentData" :key="recents.id">
            <img :src="recents.author.avatar_url" :title="recents.author.loginname" />
            <!-- 回复数/浏览数-->
            <!-- 标题 -->
            <router-link
              :to="{
          name: 'post_content',
          params:{
            id: recents.id,
            name: recents.author.loginname
          }
        }"
              style="margin:0 20px"
            >{{recents.title}}</router-link>
            <!-- 最终回复时间-->
            <span class="last_reply">{{recents.last_reply_at|formatDate}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "MoreInfo",
  data() {
    return {
      isLoading: true,
      getUrl: "https://cnodejs.org/api/v1/",
      // getUrl:"http://mock.hunger-valley.com/cnode/api/v1/",
      recentData: {}
    };
  },
  methods: {
    getData(type) {
      this.$http
        .get(this.getUrl + "user/" + this.$route.params.loginname, {
          // params: {
          //   page: 1,
          //   limit: 5
          // }
        })
        .then(res => {
          //   console.log(res);
          if(type === 'topics'){
              this.recentData = res.data.data.recent_topics
          }else if(type === 'replies'){
              this.recentData = res.data.data.recent_replies
          }
          ;

          this.isLoading = false;
        })
        // 数据返回后的操作
        .catch(function(err) {
          //处理返回失败的问题
          console.log(err);
        });
    },
    test() {
      console.log("执行");
    }
  },
  beforeMount() {
    this.getData(this.$route.params.type);
    this.test();
  },
  updated(){
      Vue.prototype.errorImg();
  }
};
</script>
<style scoped>
a {
  color: inherit;
}

.dark:hover {
  color: #385f8a;
}
.big {
  font-size: 14px;
}
.userInformation {
  background: white;
  /* width: 75%; */
  margin: 10px auto;
}
.userInformation .toobar {
  height: 40px;
  background-color: #f5f5f5;
}
.userInformation .imgWrapper {
  float: left;
  border-radius: 10px;
}
.userInformation .imgWrapper img {
  border-radius: 3px;
}
.userInformation .toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

.userInformation section {
  padding: 12px;
}
.userInformation .topics > ul > li {
  padding-right: 20px;
}
.userInformation .topics > ul > li img {
  width: 30px;
  height: 30px;
  border-radius: 3px;
}
.userInformation .topics .last_reply {
  float: right;
  font-size: 12px;
  /* color:#777777; */
}

.userInformation section span {
  color: #778087;
  font-size: 14px;
}
.userInformation section ul {
  margin: 30px 0 0 0;
}
.userInformation section ul li {
  margin: 0 0 10px 0;
}
.userInformation img {
  width: 40px;
  height: 40px;
}
.userInformation li {
  list-style: none;
}
.userInformation .replies,
.userInformation .topics {
  font-size: 0.72rem;
  border-top: 10px #dddddd solid;
}
.userInformation > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  /* font-size: 0.75rem; */
  font-size: 14px;
  margin: 0;
}
.userInformation > div > ul > li {
  padding: 4px 0 4px 12px;
  white-space: nowrap;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  vertical-align: middle;
  border-top: 1px solid #f0f0f0;
  font-size: 16px;
  color: #777777;
}
.userInformation > div > ul > li img,
.userInformation > div > ul > li span {
  vertical-align: middle;
}
.userInformation > div > ul > li > a {
  color: #08c;
  text-decoration: none;
}
.userInformation > div > ul > li > .dark {
  color: #666666;
  font-size: 14px;
}
.userInformation > div > ul > li > .dark:hover {
  color: #385f8a;
}
.userInformation > div > ul > li > a:hover {
  color: #005580;
  text-decoration: underline;
}
</style>
