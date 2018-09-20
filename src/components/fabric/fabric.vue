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
        
        fabric.Canvas.prototype.customiseControls({
        tl: {
            action: 'scale',
            // cursor: '/static/images/dot-circle.png',
        },
        tr: {
            action: 'scale',
        },
        bl: {
            action: 'scale',
            cursor: 'pointer',
        },
        br: {
            action: 'scale',
            cursor: 'pointer',
        },
        mb: {
            action: 'scale',
            cursor: 'pointer',
        },
        // mr: {
        //     // action: function(e, target) {
        //     //     target.set({
        //     //         left: 200,
        //     //     });
        //     //     canvas.renderAll();
        //     // },
        //     action: 'scale',
        //     cursor: 'pointer',
        // },
        mt: {
            action: {
                'rotateByDegrees': 30,
            },
            cursor: 'pointer',
        },
        // only is hasRotatingPoint is not set to false
        mtr: {
            action: 'rotate',
            // cursor: '/static/images/cow.png',
        },
        });


         // basic settings
    fabric.Object.prototype.customiseCornerIcons({
        settings: {
             borderColor: '#e4e4e4',
            cornerSize: 25,
            cornerShape: 'circle',
            
            cornerBackgroundColor: '#ffffff',
        },
        tl: {
            icon: '/static/images/dot-circle.png',
        },
        tr: {
            icon: '/static/images/dot-circle.png',
        },
        bl: {
            icon: '/static/images/dot-circle.png',
        },
        br: {
            icon: '/static/images/dot-circle.png',
        },
        ml: {
            icon: '/static/images/dot-circle.png',
        },
        mr: {
            icon: '/static/images/dot-circle.png',
        },
        // only is hasRotatingPoint is not set to false
        mtr: {
            icon: '/static/images/rotate-mdr.png',
        },
        }, function() {
            canvas.renderAll();
        });


        this.canvas =new fabric.Canvas('canvas',{ preserveObjectStacking: true });
        //this.createRect();
        let canvas=this.canvas;

        //canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
        canvas.backgroundColor = '#ffffff';
        //canvas.renderAll();
        //this.canvas.push(canvas);

        let that=this;

        this.canvas.controlsAboveOverlay=false;
        this.canvas.skipOffscreen=true;

        //this.drawControls();

        this.canvas.on('object:selected', function (options) {
            //alert(String(options.target.type));
            //console.log(options.target);
           // that.currentObj=options.target;

            //console.log(options.target.getElement());
            
                
            that.canvas.renderAll()

            //canvas.remove(this.currentObj)
        });
    },
    methods:{
        removeCurrentObj(){
            //console.log(this.currentObj);
            let obj=this.canvas.getActiveObject();
            console.log(obj);
            
            this.canvas.remove(obj);
            this.canvas.renderAll();
        },
        getEditObj(){
            let obj=this.canvas.getActiveObject();
            this.removeCurrentObj();
            return obj;
        },
        setEditObj(obj){
            this.canvas.add(obj);
            this.canvas.renderAll();
        },
        setRotate(deg=36){
            let obj=this.canvas.getActiveObject();
            console.log(obj);
            //let skewX=obj.skewX;
            let angle=obj.angle;
             obj.rotate(angle+deg);

            //let matrix=obj.calcTransformMatrix(true);
            //console.log(matrix);

            //let coords= obj.getCoords();
           // console.log(coords[0].x);
            

            //let src=obj.getSrc();

           // console.log(src)

            //let src=this.toDataUrl();

            // obj.setSrc(src,()=>{
            //     this.canvas.renderAll();
            // },{});
            
            
            //obj.skewX=skewX+36;
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
            this.canvas.renderAll();
        },
        createCircle(radius,fillColor,left=50,top=50){
            let Circle= new fabric.Circle({
                left:left,//距离画布左侧的距离，单位是像素
                top:top,//距离画布上边的距离
                fill:fillColor,//填充的颜色
                radius: radius //半径
            });
            this.canvas.add(Circle);
            this.canvas.renderAll();

        },
        createTriangle(width,height,fillColor,left=50,top=50){
            let triangle = new fabric.Triangle({
                    width: width, height: height, fill: fillColor, left: 50, top: 50
                });
            this.setContronVisibility(triangle);
            this.canvas.add(triangle);
            this.canvas.renderAll();
        },
        createLine(x,y,x1,y1,fillColor,strokeColor){
            let line = new fabric.Line([x, y, x1, y1], {
                    fill: fillColor,
                    stroke: strokeColor
                });
            this.canvas.add(line); 
            this.canvas.renderAll();   
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
            this.canvas.renderAll(); 
        },
        createText(text,options){

            var text = new fabric.Text(text, { left: 100, top: 100 });
            this.canvas.add(text);
            this.canvas.renderAll();
        },
        createTextbox(text,options={fontSize:14,fill:'#000000'}){

            var text = new fabric.Textbox(text, { left: options.left, top: options.top ,width:options.width,fontSize:options.fontSize,fill:options.fill});
            console.log(text);
            this.canvas.add(text);
            this.canvas.renderAll();
        },
        createImage(url,options){
            let canvas=this.canvas;

            let that=this;
            
            fabric.Image.fromURL(url, function(img) {
                //添加过滤器
                //img.filters.push(new fabric.Image.filters.Grayscale());
                //应用过滤器并重新渲染画布执行
                //img.applyFilters(canvas.renderAll.bind(canvas));
                console.log(img);
                let maxWidth=that.width/2;

                let width=0;
                let height=0;
                if(img.width>img.height){
                    if(img.width>maxWidth){
                        width=maxWidth;
                        height=(img.height/img.width)*width;
                    }else{
                        width=img.width;
                        height=img.height;
                    }

                }else{
                    if(img.height>maxWidth){
                        height=maxWidth;
                        width=(img.width/img.height)*height;
                    }else{
                        width=img.width;
                        height=img.height;
                    }

                }
                //  img.width=width;
                //  img.height=height;
                // img.left=50;
                // img.top=50;

                console.log(width);
                console.log(height);

                if(options.width){
                    width=options.width;
                }
                if(options.height){
                    height=options.height;
                }

                let leftP=that.width/2;
                let topP=that.height/2;

                if(options.left){
                    leftP=options.left;
                }
                if(options.topP){
                    topP=options.top;
                }
                
                img.set({
                    id: 'cat',
                    left: leftP,
                    top: topP,
                    // width:width,
                    // height:height,
                    scaleX: width/img.width,
                    scaleY: height/img.height,
                    originX: 'center',
                    originY: 'center',
                    cornerStrokeColor: 'blue',
                });

                var oldOriginX = img.get('originX');
                var oldOriginY = img.get('originY');
                var center = img.getCenterPoint();

                // img.set({
                //     originX: 'center',
                //     originY: 'center',
                //     left: center.x,
                //     top: center.y
                //     });

                //img.toggle('flipX');
                   // img.toggle('flipY');

                // img.on('selected', function(obj) {
                //     console.log('selected a image');
                //     console.log(obj);
                    
                // });
                img.hasControls=true;
                img.hasBorders = true;



                img.customiseCornerIcons({
            settings: {
                borderColor: '#b4b4b4',
                cornerSize: 35,
                cornerBackgroundColor: 'red',
                cornerShape: 'circle',
                cornerPadding: 10,
            },
            tl: {
                icon: '/static/images/dot-circle.png',
            },
            tr: {
                icon: '/static/images/dot-circle.png',
            },
            bl: {
                icon: '/static/images/dot-circle.png',
            },
            br: {
                icon: '/static/images/dot-circle.png',
            },
            mb: {
                icon: '/static/images/dot-circle.png',
            },
            mt: {
                icon: '/static/images/dot-circle.png',
            },
            mr: {
                icon: '/static/images/dot-circle.png',
            },
            // only is hasRotatingPoint is not set to false
            mtr: {
                icon: '/static/images/rotate-mdr.png',
            },
        }, function() {
            canvas.renderAll();
        });
            img.setControlsVisibility({
                    bl:true,
                    br:true,
                    mb:false,
                    ml:true,
                    mr:true,
                    mt:false,
                    mtr:true,
                    tl:true,
                    tr:true
                });

                canvas.add(img);//把图片添加到画布上
                canvas.renderAll.bind(canvas)

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
                //console.log(o);

                object.setControlsVisibility({
                    bl:true,
                    br:true,
                    mb:false,
                    ml:true,
                    mr:true,
                    mt:false,
                    mtr:true,
                    tl:true,
                    tr:true
                });
                
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
        renderTop(){
            this.canvas.renderTop();
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
        },
        drawControls(){
            let canvas=document.createElement('canvas');
            var ctx = canvas.getContext('2d');



            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.ellipse(100, 100, 50, 75, 45 * Math.PI/180, 0, 2 * Math.PI); //倾斜45°角
            ctx.stroke();
            ctx.setLineDash([5]);
            ctx.moveTo(0,200);
            ctx.lineTo(200,0);
            ctx.stroke();

            //console.log(ctx);

            //document.body.appendChild(canvas)
            

            this.canvas.drawControls(ctx);
           // this.canvas.controlsAboveOverlay=true;
        },
        setContronVisibility(obj){
               obj.setControlsVisibility({
                    bl:true,
                    br:true,
                    mb:false,
                    ml:true,
                    mr:true,
                    mt:false,
                    mtr:true,
                    tl:true,
                    tr:true
                });
        },
        //设置mirror
        toggleMirror(){
            let img=this.canvas.getActiveObject();
            console.log(img);
            if(img && img.type=='image'){

                img.toggle('flipX');
                this.renderAll();
            }
        },
        //设置层级
        toNextLayer(){
            let obj=this.canvas.getActiveObject();
            if(!obj){
                return;
            }
            obj.sendBackwards(true);
            //this.canvas.discardActiveObject();
            //this.canvas.discardActiveGroup();

            this.renderTop();
            //this.canvas.setActiveObject(obj);
        },
        toBottomLayer(){
             let obj=this.canvas.getActiveObject();
            if(!obj){
                return;
            }
            obj.sendToBack();
            //this.canvas.discardActiveObject();
            //this.canvas.discardActiveGroup();
            this.renderTop();
            //this.canvas.setActiveObject(obj);
        },
        toLastLayer(){
             let obj=this.canvas.getActiveObject();
            if(!obj){
                return;
            }
            obj.bringForward(true);
            //this.canvas.discardActiveObject();
            //this.canvas.discardActiveGroup();
            this.renderTop();
            //this.canvas.setActiveObject(obj);
        },
        toTopLayer(){
             let obj=this.canvas.getActiveObject();
            if(!obj){
                return;
            }
            obj.bringToFront();
            //this.canvas.discardActiveObject();
            //this.canvas.discardActiveGroup();
            this.renderTop();
            //this.canvas.setActiveObject(obj);
        }

    }
  }
</script>

<style lang='scss' scoped>

</style>