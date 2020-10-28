<template>
  <div class="header">
    <div class="container">
      <router-link :to="{name:'root'}">
        <img src="../assets/cnodejs_light.svg" alt="logo" />
      </router-link>
      <ul>
        <li>
          <router-link :to="{name:'root'}">首页</router-link>
        </li>
        <li>
          <a href="#">新手入门</a>
        </li>
        <li>
          <a href="#">API</a>
        </li>
        <li>
          <a href="#">关于</a>
        </li>
        <li>
          <a href="#">注册</a>
        </li>
        <li>
          <a href="#">登录</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "vheader",
  data(){
    return{

    }
  },
  methods:{
  },
};
</script>
<style scoped>
.header {
  background: #444444;
  padding: 5px 0;
  margin: 0px 0px 16px 0px; 
}
.container{
  max-width: 1400px;
  min-width: 960px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  width:120px;
  max-width: 120px;
  height:29px;
  max-height: 29px;
}
ul{
  display: flex;
  justify-content: space-around;
}
li{
  padding: 10px 15px;
  display: inline-block;
}
a{
  color: #cccccc;
  font-size: 13px;
}
a:hover{
  color: #fff;
}
</style>