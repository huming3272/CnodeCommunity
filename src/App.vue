<template>
  <div id="app">
    <vheader></vheader>
    <div class="main clearfix">
      <router-view name="main"></router-view>
      <router-view name="SlideBar"></router-view>
    </div>
  </div>
</template>

<script>
import vheader from "./components/vHeader";
import PostList from "./components/PostList";

export default {
  name: "App",
  components: {
    vheader,
    PostList
  }
};
</script>

<style>

* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.main {
  width: 1400px;
  margin: 0 auto;
}
body {
  background: #e1e1e1;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
}
a {
  text-decoration: none;
}
.border{
  border-radius:5px;
}
.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}
/* animation */

.taiji {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    #000000 0%,
    #000000 50%,
    #000000 50%,
    #ffffff 50%,
    #ffffff 100%
  );
  position: relative;
  animation: rotate1 1s linear infinite;
  margin: 0 auto;
}
.taiji > div:nth-child(0n + 1) {
  background: black;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.taiji > div:nth-child(0n + 1) div {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: white;
}
.taiji > div:nth-child(0n + 2) {
  background: white;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.taiji > div:nth-child(0n + 2) div {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: black;
}
@keyframes rotate1 {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
