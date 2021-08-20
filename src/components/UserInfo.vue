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
          <span>主页 /</span>
        </router-link>
      </div>
      <section class="clearfix">
        <div class="imgWrapper">
          <img :src="userInfo.avatar_url" :title="userInfo.loginname" />
        </div>
        <span style="padding-left:10px;">{{userInfo.loginname}}</span>
        <ul>
          <li class="big">{{userInfo.score}}&nbsp;积分</li>
          <li>
            <span>{{userInfo.collect}}个话题收藏</span>
          </li>
          <li>
            <span>
              <a
                :href="'https://github.com/'+userInfo.githubUsername"
                target="_blank"
              >☎&nbsp;Github---@{{userInfo.githubUsername}}</a>
            </span>
          </li>
          <li>
            <span style="color:#ababab">注册时间&nbsp;{{userInfo.create_at|formatDate}}&nbsp;</span>
          </li>
        </ul>
      </section>
      <div class="topics">
        <p>最近创建的话题</p>
        <ul>
          <li v-for="topics in sliceTopics" :key="topics.id">
            <!-- userInfo.recent_topics -->

            <img :src="topics.author.avatar_url" :title="topics.author.loginname" />
            <!-- v-on:error = "errorImg('avatar')" -->
            <!-- 回复数/浏览数 -->
            <!-- 标题 -->
            <router-link
              :to="{
          name: 'post_content',
          params:{
            id: topics.id,
            type: 'topics'
          }
        }"
              style="margin:0 20px"
            >{{topics.title}}</router-link>
            <!-- 最终回复时间 -->
            <span class="last_reply">{{topics.last_reply_at|formatDate}}</span>
          </li>
          <li>
            <router-link class="dark" :to="{
              name:'more_info',
              params:{
                id:userInfo.loginname,
                type: 'topics'
              }
            }">查看更多»</router-link>
          </li>
        </ul>
      </div>
      <div class="topics">
        <p>参与的话题</p>
        <ul>
          <li v-for="replies in sliceReplies" :key="replies.id">
            <!-- userInfo.recent_replies -->
            <img :src="replies.author.avatar_url" :title="replies.author.loginname" />
            <!-- v-on:error = "errorImg('avatar')" -->
            <!-- 回复数/浏览数 -->
            <!-- 标题 -->
            <router-link
              :to="{
          name: 'post_content',
          params:{
            id: replies.id,
            name: replies.author.loginname
          }
        }"
              style="margin:0 20px"
            >{{replies.title}}</router-link>
            <!-- 最终回复时间 -->
            <span class="last_reply">{{replies.last_reply_at|formatDate}}</span>
          </li>
          <li>
            <router-link class="dark" :to="{
              name:'more_info',
              params:{
                id:userInfo.loginname,
                type: 'replies'
              }
            }">查看更多»</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: true,
      getUrl: "https://cnodejs.org/api/v1/",
      // getUrl:"http://mock.hunger-valley.com/cnode/api/v1/",
      userInfo: {}
    };
  },
  methods: {
    getUserInfoData() {
      let userInfo = {};
      this.$http
        .get(this.getUrl + "user/" + this.$route.params.loginname, {
          // params: {
          //   page: 1,
          //   limit: 5
          // }
        })
        .then(res => {
          // console.log(res);
          userInfo = res.data.data;
          this.$http
            .get(this.getUrl + "topic_collect/" + this.$route.params.loginname, {
              // params: {
              //   page: 1,
              //   limit: 10
              // }
            })
            .then(res => {
              console.log(res,'数据');
              // console.log(this.userInfo.collect);

              userInfo.collect = res.data.data.length;
              this.userInfo = userInfo;
              this.isLoading = false;
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        // 数据返回后的操作
        .catch(function(err) {
          //处理返回失败的问题
          console.log(err);
        });


    }
  },
  beforeMount() {
    this.getUserInfoData();
  },
  updated() {
    Vue.prototype.errorImg();
  },
  computed: {
    sliceTopics() {
      if (this.userInfo.recent_topics) {
        return this.userInfo.recent_topics.slice(0, 5);
        // this.userInfo.recent_replies.slice(0,4)
      }
    },
    sliceReplies() {
      if (this.userInfo.recent_replies) {
        // return this.userInfo.recent_topics.slice(0,5)
        return this.userInfo.recent_replies.slice(0, 5);
      }
    }
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
