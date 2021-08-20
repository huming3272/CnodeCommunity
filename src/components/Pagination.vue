<template>
  <div class="pagination">
    <button v-on:click="turnPage">首页</button>
    <button v-on:click="turnPage">上一页</button>
    <button v-if="flag">...</button>
    <button
      v-for="(btn,id) in pagebtns"
      v-bind:key="id"
      :class="[{'currentPage':(currentPage===btn)}]"
      v-on:click="changeBtn(btn)"
      myAttr="btnList"
    >{{btn}}</button>
    <button>...</button>
    <button v-on:click="turnPage">下一页</button>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  data() {
    return {
      pagebtns: [1, 2, 3, 4, 5],
      currentPage: 1,
      flag: false
    };
  },
  methods: {
    refreshBtn() {
      if (this.$route.query.page && this.$route.query.page > 3) {
        let page = Number(this.$route.query.page);
        this.pagebtns.splice(
          0,
          5,
          page - 2,
          page - 1,
          page,
          page + 1,
          page + 2
        );

        if (page > 3) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
      this.currentPage = Number(this.$route.query.page) || 1;
    },
    changeBtn(page) {
      // 页数等于第四位时增加一位
      // console.log(this.currentPage, "1");
      // console.log(page, "按钮数字");
      if (page == this.pagebtns[3]) {
        this.pagebtns.shift();
        this.pagebtns.push(this.pagebtns[this.pagebtns.length - 1] + 1);
        // console.log(this.pagebtns,'debugger')
        // this.pagebtns[4]
        // console.log(page, this.pagebtns[3], "判断1");
      }
      // 页数等于第五位时尾部增加两位，头部减少两位
      else if (page == this.pagebtns[4]) {
        this.pagebtns.splice(5, 0, this.pagebtns[4] + 1, this.pagebtns[4] + 2);
        this.pagebtns.splice(0, 2);

        // console.log(page, this.pagebtns, "判断2");
      }
      // 页数小于2的时候减少
      if (page == this.pagebtns[1] && page > 2) {
        this.pagebtns.pop();
        this.pagebtns.unshift(this.pagebtns[0] - 1);
      } else if (page == this.pagebtns[0]) {
        if (page <= 2 && page > 1) {
          this.pagebtns.pop();
          this.pagebtns.unshift(this.pagebtns[0] - 1);
          // console.log("222");
        } else if (page > 2) {
          this.pagebtns.splice(3, 2);
          this.pagebtns.splice(
            0,
            0,
            this.pagebtns[0] - 2,
            this.pagebtns[0] - 1
          );
        }
      }
      if (page > 3) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      // console.log(page, this.pagebtns[3]);
      this.currentPage = page;


      this.$emit("emitPage", this.currentPage);
      // 朝父元素传值
      // console.log(this.pagebtns)
    },
    turnPage(btnElement) {
      switch (btnElement.target.innerText) {
        case "上一页":
          if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.changeBtn(this.currentPage);
          }
          break;
        case "下一页":
          this.currentPage = this.currentPage + 1;
          this.changeBtn(this.currentPage);
          break;
        case "首页":
          this.pagebtns = [1, 2, 3, 4, 5];
          this.changeBtn(1);
          // this.refreshBtn()

          break;
      }
    }
  },
  watch:{
    "$route":function(){
      if(this.$route.query.page ===1){
        this.currentPage = 1
        this.pagebtns = [1,2,3,4,5]
      }

      // this.currentPage = this.$route.query.page
      // this.refreshBtn()
      // console.log(this.$route.query.page,'路由page')
      // console.log('捕捉成功')
    }
  },
  mounted() {
    this.refreshBtn();
    // this.currentPage = 2
  },
  updated() {

  }
};
</script>
<style scoped>
.pagination {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: white;
  padding: 6px 20px;
  border-radius: 5px;
  /*box-shadow: 0px 2px 9px #888888;*/
  border: 1px solid #888888;
}

button {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  height: 21px;
  cursor: pointer;
  margin: 0 2px;
  width: 55px;
  height: 29px;
  vertical-align: middle;
}
button:hover {
  background: #f5f5f5;
}
.pagebtn {
  position: relative;
  bottom: 1px;
  width: 40px;
  margin: 0 4px;
}

.currentPage {
  color: white;
  background-color: #1f1b1b;
}
</style>
