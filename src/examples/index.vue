<template>
  <div class="home-container">
    <!-- <div class="Header">图片预览组件</div> -->
    <toolbar :handleDelete="handleDelete" :rotate="handleRotate"></toolbar>
    <vue-fabric ref="canvas" :width="width" :height="height"></vue-fabric>
    <image-list :handleAdd="handleAdd"></image-list>
  </div>
</template>

<script>
import toolbar from "./toolbar";
import ImageList from "./image-list";

export default {
  name: 'el-index',
  components:{
    toolbar,
    ImageList
  },
  data(){
    return{
          imgUrl:"http://data618.oss-cn-qingdao.aliyuncs.com/ys/3524/img/b.jpg",
          width:300,
          height:500
    }
  },
  created(){
    this.width=document.body.offsetWidth;
    this.height=document.body.offsetHeight;
  },
  mounted(){
    this.$refs.canvas.createTriangle(40,40,'yellow');
    this.$refs.canvas.createImage('/static/images/sticker1.png');
    this.$refs.canvas.createImage('/static/images/sticker2.png');
    this.$refs.canvas.createImage('/static/images/sticker3.png');
  },
  methods:{
    handleDelete(){
      console.log("handleDelete");
      
      this.$refs.canvas.removeCurrentObj();
    },
    handleRotate(){
      this.$refs.canvas.setRotate(); 
     // this.$refs.canvas.moveTo();
    },
    handleAdd(url){
      this.$refs.canvas.createImage(url);
    },
  }
};
</script>

<style lang="scss" scoped>
.tab {
  text-align: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #F2F2F2;
  a {
    color: #7e8c8d;
  }
}

  .home-container{
    width: 100%;
    position: relative;
    .Header{
      background:linear-gradient(90deg, rgb(231, 86, 142), #ff696b);
      padding: 4vw;
      color: #fff;
      text-align: center;
    }
    .item-wrapper{
      display: flex;
      padding: 4vw;
    }
    .item-image{  
      width: 25vw;
    }
    .item-right{
      flex: 1;
      margin-left: 3vw;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 1vw 0;
    }
  }
</style>
