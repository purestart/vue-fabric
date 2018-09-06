<template>
    <div>
        <canvas id="canvas" :width='width' :height='height'></canvas>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
      name:"VueFabric",
      props:{
          width:{
              type:Number,
              required:true
          },
          height:{
              type:Number,
              required:true
          },
        
      },
    data () {
      return {
          canvas:null,
          currentObj:null,
      }
    },
    created () {
    },
    mounted () {            
        this.canvas =new fabric.Canvas('canvas');
        //this.createRect();
        let canvas=this.canvas;

        //canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
        canvas.backgroundColor = '#ffffff';
        //canvas.renderAll();
        //this.canvas.push(canvas);

        let that=this;

        this.canvas.on('object:selected', function (options) {
            //alert(String(options.target.type));
            console.log(options.target);
            that.currentObj=options.target;
            //canvas.remove(this.currentObj)
        });
    },
    methods:{
        removeCurrentObj(){
            //console.log(this.currentObj);
            let obj=this.canvas.getActiveObject();
            console.log(obj);
            
            this.canvas.remove(obj);
        },
        setRotate(){
            let obj=this.canvas.getActiveObject();
            console.log(obj);
            let angle=obj.angle;
            obj.rotate(angle+36);
            this.canvas.renderAll();
        },
        moveTo(){
            let obj=this.canvas.getActiveObject();
            //console.log(obj);

            console.log(this.canvas.sendBackwards);
            this.canvas.sendBackwards(obj,true);
            this.canvas.discardActiveObject();
            this.canvas.discardActiveGroup();
            
            //this.canvas.sendToBack(obj);
            //this.canvas.moveTo(obj,3);
        },
        createRect(width,height,fillColor,left=50,top=50){
            let rect = new fabric.Rect({
                left:left,//距离画布左侧的距离，单位是像素
                top:top,//距离画布上边的距离
                fill:fillColor,//填充的颜色
                width:width,//方形的宽度
                height:height//方形的高度
            });
            this.canvas.add(rect);
        },
        createCircle(radius,fillColor,left=50,top=50){
            let Circle= new fabric.Circle({
                left:left,//距离画布左侧的距离，单位是像素
                top:top,//距离画布上边的距离
                fill:fillColor,//填充的颜色
                radius: radius //半径
            });

        },
        createTriangle(width,height,fillColor,left=50,top=50){
            let triangle = new fabric.Triangle({
                    width: width, height: height, fill: fillColor, left: 50, top: 50
                });
            this.canvas.add(triangle);
        },
        createLine(x,y,x1,y1,fillColor,strokeColor){
            let line = new fabric.Line([x, y, x1, y1], {
                    fill: fillColor,
                    stroke: strokeColor
                });
            this.canvas.add(line);    
        },
        createEllipse(rx,ry,fillColor,angle,strokeColor,strokeWidth=3,left=50,top=50){
            var ellipse = new fabric.Ellipse({
                    rx: rx,
                    ry: ry,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    angle: angle,
                    left: left,
                    top: top
                });
            this.canvas.add(ellipse);        
        },
        createImage(url){
            let canvas=this.canvas;
            
            fabric.Image.fromURL(url, function(img) {
                //添加过滤器
                //img.filters.push(new fabric.Image.filters.Grayscale());
                //应用过滤器并重新渲染画布执行
                //img.applyFilters(canvas.renderAll.bind(canvas));
                console.log(img);
                let width=0;
                let height=0;
                if(img.width>img.height){
                    if(img.width>100){
                        width=100;
                        height=(img.height/img.width)*width;
                    }else{
                        width=img.width;
                        height=img.height;
                    }

                }else{
                    if(img.height>100){
                        height=100;
                        width=(img.width/img.height)*height;
                    }else{
                        width=img.width;
                        height=img.height;
                    }

                }
                img.width=width;
                img.height=height;
                img.left=50;
                img.top=50;

                // img.on('selected', function(obj) {
                //     console.log('selected a image');
                //     console.log(obj);
                    
                // });
                img.hasControls=true;
                img.hasBorders = true;

                canvas.add(img);//把图片添加到画布上


            });

        },
        setBackgroundImage(url){
            let canvas=this.canvas;
            canvas.setBackgroundImage(url,canvas.renderAll.bind(canvas));
        },
        toJson(){
            let json = this.canvas.toJSON();
            return json;
        },
        toDataUrl(){
            let canvas=this.canvas;
            let dataURL = canvas.toDataURL({
                format: 'jpeg',
                quality: 1
            });
            return dataURL;
        },
        loadFromJSON(json,cb){
            let canvas=this.canvas;
            canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function(o, object) {
                // `o` = json object
                // `object` = fabric.Object instance
                // ... do some stuff ...
                cb(o);
            });
        },
        clear(){
            this.canvas.clear();
        },
        getObjects(){
           return this.canvas.getObjects();
        },
        renderAll(){
            this.canvas.renderAll(this.canvas);
        },
        setBackgroundColor(color){
            let canvas=this.canvas;
            this.canvas.setBackgroundColor(color,canvas.renderAll.bind(canvas))
        },
        setBackgroundImage(imgUrl,opacity=1,angle=0,left=0,top=0,crossOrigin=null){
            let canvas=this.canvas;
            canvas.setBackgroundImage(imgUrl, canvas.renderAll.bind(canvas), {
                opacity: opacity,
                angle: angle,
                left: left,
                top: top,
                originX: 'left',
                originY: 'top',
                crossOrigin: crossOrigin
            });
        },
        toSvg(){
            return this.canvas.toSVG();
        }
    }
  }
</script>

<style lang='scss' scoped>

</style>