<template>
    <div class="image-list">
        <div :key="item.id" v-for="item in list" class="image-wrapper">
            <img :src="item.url" />
            <i @click="handleAdd(item.url)" class="pt-iconfont icon-plus-circle"></i>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props:{
        handleAdd:Function,
    },
    data () {
      return {
          list:[
              {
                  id:1,
                  url:"/static/images/sticker1.png"
              },
              {
                  id:2,
                  url:"/static/images/sticker2.png"
              },
              {
                  id:3,
                  url:"/static/images/sticker3.png"
              },
              {
                  id:4,
                  url:"/static/images/sticker4.png"
              },
              {
                  id:5,
                  url:"/static/images/sticker5.png"
              },{
                  id:6,
                  url:"/static/images/sticker1.png"
              },
          ],
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{

    }
  }
</script>

<style lang='scss' scoped>
    .image-list{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        overflow-y: auto;

        overflow: scroll;

        display: flex;
        -webkit-overflow-scrolling: touch;
        

        flex-wrap:nowrap;
        border-top: 1px solid #e4e4e4;

        &::-webkit-scrollbar {
            display: none;
        }

        .image-wrapper{
            padding: 4vw;
            border-right: 1px solid #EBEEF5;
            min-width: 20vw;
            
            display: -webkit-flex;
            display: -ms-flexbox;
            display: -moz-box;
            display:-webkit-box;
            display: flex;

            box-pack:center;
            -webkit--moz-box-pack:center;
            -moz-box-pack:center;
            -webkit-justify-content:center;
            justify-content:center;

            box-align:center;
            -moz-box-align:center;
            -webkit-box-align:center;
            -webkit-align-items:center;
            align-items:center;

            -moz-flex-wrap:nowrap;
            -webkit-flex-wrap:nowrap;
            flex-wrap:nowrap;


            position: relative;
            img{
                width: 20vw;
                object-fit: cover;
            }
            .pt-iconfont{
                position:absolute;
                right: 0vw;
                top: 0vw;
                color: #999;
                font-size: 4.5vw;
                padding: 1vw;
            }
        }
    }
</style>