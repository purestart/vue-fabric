<template>
  <div @click="close" class="image-model">
    <i class="pt-iconfont icon-guanbi"></i>
    <img @click.stop="()=>{}" :src="url" alt="">
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'vue-image-model',
  props: {
    url: String,
    close: Function
  },
  data () {
    return {
    };
  },
  created () {
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style lang='scss' scoped>
.image-model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #e4e4e4;
  z-index: 667;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -moz-box;
  display: -webkit-box;
  display: flex;

  box-pack: center;
  -webkit--moz-box-pack: center;
  -moz-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;

  box-align: center;
  -moz-box-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;

  .pt-iconfont {
    position: absolute;
    right: 5vw;
    top: 5vw;
    color: #777;
  }

  img {
    max-width: 80vw;
    max-height: 80vh;
  }
}
</style>