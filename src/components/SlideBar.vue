<template>
  <div class="authorinfo">
    <div class="authorsummay">
      <div class="topbar">作者</div>
      <div class="content">
        <router-link :to="{
          name:'user_info'
        }">
          <img :src="slideData.avatar_url" :title="slideData.loginname" />
          <span>{{slideData.loginname}}</span>
        </router-link>
        <p>积分{{slideData.score}}</p>
      </div>
    </div>
    <div class="recent_topics">
      <div class="topbar">作者最近主题</div>
      <ul>
        <li v-for="topics in sliceTopics" :key="topics.id" >
          <router-link :to="{
            name:'post_content',
            params:{
              id:topics.id,
              loginname: topics.author.loginname
            }
          }">
            {{topics.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topbar">作者最近主题</div>
      <ul>
        <li v-for="replies in slideData.recent_replies" :key="replies.id">
          <router-link :to="{
            name:'post_content',
            params:{
              id:replies.id,
              loginname: replies.author.loginname
            }
          }">{{replies.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {

  name: "SlideBar",
  data() {
    return {
      getUrl: "https://cnodejs.org/api/v1/",
      // getUrl:"http://mock.hunger-valley.com/cnode/api/v1/",
      slideData: {}
    };
  },
  methods: {
    getSlideData() {
      this.$http
        .get(this.getUrl + "user/" + this.$route.params.loginname, {
          // params: {
          //   page: 1,
          //   limit: 5
          // }
        })
        .then(res => {
          // console.log(res.data.data, "slide");
          this.slideData = res.data.data;
        })
        // 数据返回后的操作
        .catch(function(err) {
          //处理返回失败的问题
          console.log(err);
        });
    }
  },
  computed:{
    sliceTopics(){
      if(this.slideData.recent_topics)
      return this.slideData.recent_topics.slice(0,5)
    },
    sliceReplies(){
      if(this.slideData.recent_replies){
        return this.slideData.recent_replies.slice(0,5)
      }
    }
  },
  beforeMount() {
    this.getSlideData();
  },
  updated(){
    Vue.prototype.errorImg();
  }
};
</script>
<style scoped>

.authorsummay,
.recent_replies,
.recent_topics {
  background-color: #fff;
}
.authorsummay>div {
  padding:10px;
}
.authorsummay p{
  font-size: 14px;
  margin-top: 5px;
}
.authorsummay img,
.authorsummay span {
  vertical-align: middle;
}
.authorsummay span{
  color: #778087;
}
.authorinfo {
  /* width: 328px; */
  width: 19%;
  float: right;
  margin-top: 0;
}
.authorinfo ul>li{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
li {
  padding: 3px 0;
}
.recent_replies ul,
.recent_topics ul {
  margin-top: 0px;
  margin-bottom: 0px;
  list-style: none;
  padding:3px 7px 3px 7px;
}

ul a {
  font-size: 12px;
  text-decoration: none;
  color: #778087;
}

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

img {
  height: 48px;
  width: 48px;
  border-radius: 3px;
  /* margin: 10px; */
}

.loginname {
  width: 100px;
  float: right;
  margin-top: 22px;
  margin-right: 159px;
  font-size: 14px;
}

.loginname a {
  text-decoration: none;
  color: #778087;
}

.authorsummay .topbar {
  margin-top: 0px;
}
</style>
