<template>
  <div>
    <canvas id="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script type='text/ecmascript-6'>
import Utils from '../../utils';
export default {
  name: 'VueFabric',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      canvas: null,
      currentObj: null
    };
  },
  created () {

  },
  mounted () {
    fabric.Canvas.prototype.customiseControls({
      tl: {
        action: 'scale'
        // cursor: '/static/images/dot-circle.png',
      },
      tr: {
        action: 'scale'
      },
      bl: {
        action: 'scale',
        cursor: 'pointer'
      },
      br: {
        action: 'scale',
        cursor: 'pointer'
      },
      mb: {
        action: 'scale',
        cursor: 'pointer'
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
        // action: {
        //   rotateByDegrees: 30
        // },
        action: 'scale',
        cursor: 'pointer'
      },
      // only is hasRotatingPoint is not set to false
      mtr: {
        action: 'rotate'
        // cursor: '/static/images/cow.png',
      }
    });

    // basic settings
    fabric.Object.prototype.customiseCornerIcons(
      {
        settings: {
          borderColor: '#e4e4e4',
          cornerSize: 25,
          cornerShape: 'circle',

          cornerBackgroundColor: '#ffffff'
        },
        tl: {
          icon: '/static/images/dot-circle.png'
        },
        tr: {
          icon: '/static/images/dot-circle.png'
        },
        bl: {
          icon: '/static/images/dot-circle.png'
        },
        br: {
          icon: '/static/images/dot-circle.png'
        },
        ml: {
          icon: '/static/images/dot-circle.png'
        },
        mr: {
          icon: '/static/images/dot-circle.png'
        },
        // only is hasRotatingPoint is not set to false
        mtr: {
          icon: '/static/images/rotate-mdr.png'
        }
      },
      function () {
        canvas.renderAll();
      }
    );

    this.canvas = new fabric.Canvas('canvas', { preserveObjectStacking: true });
    // this.createRect();
    let canvas = this.canvas;

    // canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
    canvas.backgroundColor = '#ffffff';
    // canvas.renderAll();
    // this.canvas.push(canvas);
    let that = this;
    this.canvas.controlsAboveOverlay = false;
    this.canvas.skipOffscreen = true;
    // this.drawControls();
    this.canvas.on('selection:created', function (options) {
      that.$emit('selection:created', options);
    });
    this.canvas.on('mouse:down', function (options) {
      that.$emit('mouse:down', options);
    });
    this.canvas.on('mouse:up', function (options) {
      that.$emit('mouse:up', options);
    });
    this.canvas.on('mouse:move', function (options) {
      that.$emit('mouse:move', options);
    });
    this.canvas.on('mouse:dblclick', function (options) {
      that.$emit('mouse:dblclick', options);
    });
    this.canvas.on('mouse:over', function (options) {
      that.$emit('mouse:over', options);
    });
    this.canvas.on('mouse:out', function (options) {
      that.$emit('mouse:out', options);
    });
    this.canvas.on('object:added', function (options) {
      that.$emit('object:added', options);
    });
    this.canvas.on('object:removed', function (options) {
      that.$emit('object:removed', options);
    });
    this.canvas.on('object:modified', function (options) {
      that.$emit('object:modified', options);
    });
    this.canvas.on('object:rotating', function (options) {
      that.$emit('object:rotating', options);
    });
    this.canvas.on('object:scaling', function (options) {
      that.$emit('object:scaling', options);
    });
    this.canvas.on('object:moving', function (options) {
      that.$emit('object:moving', options);
    });
    this.canvas.on('selection:updated', function (options) {
      that.$emit('selection:updated', options);
    });
    this.canvas.on('selection:cleared', function (options) {
      that.$emit('selection:cleared', options);
    });
    this.canvas.on('before:selection:cleared', function (options) {
      that.$emit('before:selection:cleared', options);
    });
  },
  methods: {

    drawDottedline ({ x, y, x1, y1, color = '#B2B2B2', drawWidth = 2, offset = 6, empty = 3 }) {
      let canvasObject = new fabric.Line([x, y, x1, y1], {
        strokeDashArray: [offset, empty],
        stroke: color,
        strokeWidth: drawWidth
      });
      this.canvas.add(canvasObject);
      this.canvas.renderAll();
    },
    drawArrowLine ({ x, y, x1, y1, color = '#B2B2B2', drawWidth = 2, fillColor = 'rgba(255,255,255,0)', theta = 35, headlen = 35 }) {
      let canvasObject = new fabric.Path(this.drawArrowBase(x, y, x1, y1, theta, headlen), {
        stroke: color,
        fill: fillColor,
        strokeWidth: drawWidth
      });
      this.canvas.add(canvasObject);
      this.canvas.renderAll();
    },
    drawArrowBase (fromX, fromY, toX, toY, theta, headlen) {
      theta = typeof theta !== 'undefined' ? theta : 30;
      headlen = typeof theta !== 'undefined' ? headlen : 10;
      // 计算各角度和对应的P2,P3坐标
      var angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
        angle1 = ((angle + theta) * Math.PI) / 180,
        angle2 = ((angle - theta) * Math.PI) / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
      var arrowX = fromX - topX,
        arrowY = fromY - topY;
      var path = ' M ' + fromX + ' ' + fromY;
      path += ' L ' + toX + ' ' + toY;
      arrowX = toX + topX;
      arrowY = toY + topY;
      path += ' M ' + arrowX + ' ' + arrowY;
      path += ' L ' + toX + ' ' + toY;
      arrowX = toX + botX;
      arrowY = toY + botY;
      path += ' L ' + arrowX + ' ' + arrowY;
      return path;
    },
    freeDrawConfig (isDrawingMode, color = '#B2B2B2', drawWidth = 2) {
      this.canvas.isDrawingMode = isDrawingMode;
      this.canvas.freeDrawingBrush.color = color; // 设置自由绘颜色
      this.canvas.freeDrawingBrush.width = drawWidth;
    },
    removeCurrentObj () {
      let obj = this.canvas.getActiveObject();
      // console.log(obj);
      this.canvas.remove(obj);
      this.canvas.renderAll();
    },
    getEditObj () {
      let obj = this.canvas.getActiveObject();
      this.removeCurrentObj();
      return obj;
    },
    setEditObj (obj) {
      this.canvas.add(obj);
      this.canvas.renderAll();
    },
    setRotate (deg = 36) {
      let obj = this.canvas.getActiveObject();
      // console.log(obj);
      // let skewX=obj.skewX;
      let angle = obj.angle;
      obj.rotate(angle + deg);

      // let matrix=obj.calcTransformMatrix(true);
      // console.log(matrix);
      // let coords= obj.getCoords();
      // let src=obj.getSrc();
      // let src=this.toDataUrl();
      // obj.setSrc(src,()=>{
      //     this.canvas.renderAll();
      // },{});
      // obj.skewX=skewX+36;
      this.canvas.renderAll();
    },
    discardActive () {
      this.canvas.discardActiveObject();
      this.canvas.discardActiveGroup();
      this.canvas.renderAll();
    },
    moveTo () {
      let obj = this.canvas.getActiveObject();
      // console.log(obj);
      console.log(this.canvas.sendBackwards);
      this.canvas.sendBackwards(obj, true);
      this.canvas.discardActiveObject();
      this.canvas.discardActiveGroup();
      // this.canvas.sendToBack(obj);
      // this.canvas.moveTo(obj,3);
    },
    createRect ({ width, height, fillColor = 'rgba(255, 255, 255, 0)', left = 50, top = 50 }) {
      let rect = new fabric.Rect({
        left: left, // 距离画布左侧的距离，单位是像素
        top: top, // 距离画布上边的距离
        fill: fillColor, // 填充的颜色
        width: width, // 方形的宽度
        height: height // 方形的高度
      });
      this.canvas.add(rect);
      this.canvas.renderAll();
    },
    createCircle ({ left, top, radius = 30, fillColor = 'rgba(255, 255, 255, 0)', color = '#B2B2B2', drawWidth = 2 }) {
      let defaultOption = {
        left: left, // 距离画布左侧的距离，单位是像素
        top: top, // 距离画布上边的距离
        radius: radius, // 半径
        fill: fillColor,
        strokeWidth: drawWidth,
        stroke: color
      };
      let Circle = new fabric.Circle(defaultOption);
      this.canvas.add(Circle);
      this.canvas.renderAll();
    },
    createTriangle ({ x, y, x1, y1, x2, y2, left = 100, top = 100, color = '#B2B2B2', drawWidth = 2, fillColor = 'rgba(255, 255, 255, 0)' }) {
      var path = 'M ' + x + ' ' + y + ' L ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2 + ' z';
      let canvasObject = new fabric.Path(path, {
        left: left,
        top: top,
        stroke: color,
        strokeWidth: drawWidth,
        fill: fillColor
      });
      this.canvas.add(canvasObject);
      this.canvas.renderAll();
    },
    createEqualTriangle ({ left = 100, top = 100, width = 50, height = 80, fillColor = 'rgba(255, 255, 255, 0)', color = '#B2B2B2', drawWidth = 2 }) {
      let defaultOption = {
        left: left,
        top: top,
        width: width,
        height: height,
        fill: fillColor,
        strokeWidth: drawWidth,
        stroke: color
      };
      defaultOption = Object.assign(defaultOption, options);
      // console.log(defaultOption);
      let triangle = new fabric.Triangle(defaultOption);
      this.setContronVisibility(triangle);
      this.canvas.add(triangle);
      this.canvas.renderAll();
    },
    createLine ({ x, y, x1, y1, fillColor = 'rgba(255, 255, 255, 0)', strokeColor = '#B0B0B0' }) {
      let line = new fabric.Line([x, y, x1, y1], {
        fill: fillColor,
        stroke: strokeColor
      });
      this.canvas.add(line);
      this.canvas.renderAll();
    },
    createEllipse (options) {
      options = Object.assign({ rx: 100, ry: 200, fillColor: 'rgba(255, 255, 255, 0)', angle: 90, strokeColor: '#B0B0B0', strokeWidth: 3, left: 50, top: 50 }, options);
      var ellipse = new fabric.Ellipse({
        ...options,
        fill: options.fillColor,
        stroke: options.strokeColor
      });
      this.canvas.add(ellipse);
      this.canvas.renderAll();
    },
    createText (text, { left = 100, top = 100 }) {
      var canvasObj = new fabric.Text(text, { left: left, top: top });
      this.canvas.add(canvasObj);
      this.canvas.renderAll();
    },
    createTextbox (text, { fontSize = 14, fillColor = '#000000', registeObjectEvent = false, width = 100, left = 100, top = 100 }) {
      var canvasObj = new fabric.Textbox(text, {
        left: left,
        top: top,
        width: width,
        fontSize: fontSize,
        fill: fillColor
      });
      // console.log(text);
      this.canvas.add(canvasObj);
      if (registeObjectEvent) {
        Utils.registeObjectEvent(this, canvasObj);
      }
      this.canvas.renderAll();
    },
    createImage (url, options) {
      let canvas = this.canvas;
      let that = this;
      fabric.Image.fromURL(url, function (img) {
        // 添加过滤器
        // img.filters.push(new fabric.Image.filters.Grayscale());
        // 应用过滤器并重新渲染画布执行
        // img.applyFilters(canvas.renderAll.bind(canvas));
        // console.log(img);
        let maxWidth = that.width / 2;

        let width = 0;
        let height = 0;

        if (img.width > img.height) {
          if (img.width > maxWidth) {
            width = maxWidth;
            height = (img.height / img.width) * width;
          } else {
            width = img.width;
            height = img.height;
          }
        } else {
          if (img.height > maxWidth) {
            height = maxWidth;
            width = (img.width / img.height) * height;
          } else {
            width = img.width;
            height = img.height;
          }
        }
        if (options && options.width) {
          width = options.width;
        }
        if (options && options.height) {
          height = options.height;
        }
        let leftP = that.width / 2;
        let topP = that.height / 2;
        if (options && options.left) {
          leftP = options.left;
        }
        if (options && options.top) {
          topP = options.top;
        }
        img.set({
          id: 'cat',
          left: leftP,
          top: topP,
          scaleX: width / img.width,
          scaleY: height / img.height,
          originX: 'center',
          originY: 'center',
          cornerStrokeColor: 'blue'
        });

        var oldOriginX = img.get('originX');
        var oldOriginY = img.get('originY');
        var center = img.getCenterPoint();
        img.hasControls = true;
        img.hasBorders = true;
        img.customiseCornerIcons(
          {
            settings: {
              borderColor: '#b4b4b4',
              cornerSize: 35,
              cornerBackgroundColor: 'red',
              cornerShape: 'circle',
              cornerPadding: 10
            },
            tl: {
              icon: '/static/images/dot-circle.png'
            },
            tr: {
              icon: '/static/images/dot-circle.png'
            },
            bl: {
              icon: '/static/images/dot-circle.png'
            },
            br: {
              icon: '/static/images/dot-circle.png'
            },
            mb: {
              icon: '/static/images/dot-circle.png'
            },
            mt: {
              icon: '/static/images/dot-circle.png'
            },
            mr: {
              icon: '/static/images/dot-circle.png'
            },
            mtr: {
              icon: '/static/images/rotate-mdr.png'
            }
          },
          function () {
            canvas.renderAll();
          }
        );
        img.setControlsVisibility({
          bl: true,
          br: true,
          mb: false,
          ml: true,
          mr: true,
          mt: false,
          mtr: true,
          tl: true,
          tr: true
        });
        canvas.add(img); // 把图片添加到画布上
        if (options.registeObjectEvent) {
          Utils.registeObjectEvent(that, img);
        }
        canvas.renderAll.bind(canvas);
      });
    },
    setBackgroundImage (url) {
      let canvas = this.canvas;
      canvas.setBackgroundImage(url, canvas.renderAll.bind(canvas));
    },
    toJson () {
      let json = this.canvas.toJSON();
      return json;
    },
    toDataUrl () {
      let canvas = this.canvas;
      let dataURL = canvas.toDataURL({
        format: 'jpeg',
        quality: 1
      });
      return dataURL;
    },
    loadFromJSON (json, cb) {
      let canvas = this.canvas;
      canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function (
        o,
        object
      ) {
        // `o` = json object
        // `object` = fabric.Object instance
        // ... do some stuff ...
        cb(o);
        // console.log(o);
        object.setControlsVisibility({
          bl: true,
          br: true,
          mb: false,
          ml: true,
          mr: true,
          mt: false,
          mtr: true,
          tl: true,
          tr: true
        });
      });
    },
    clear () {
      this.canvas.clear();
    },
    getObjects () {
      return this.canvas.getObjects();
    },
    renderAll () {
      this.canvas.renderAll(this.canvas);
    },
    renderTop () {
      this.canvas.renderTop();
    },
    setBackgroundColor (color) {
      let canvas = this.canvas;
      this.canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    },
    setBackgroundImage (
      imgUrl,
      opacity = 1,
      angle = 0,
      left = 0,
      top = 0,
      crossOrigin = null
    ) {
      let canvas = this.canvas;
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
    toSvg () {
      return this.canvas.toSVG();
    },
    drawControls () {
      let canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.ellipse(100, 100, 50, 75, (45 * Math.PI) / 180, 0, 2 * Math.PI); // 倾斜45°角
      ctx.stroke();
      ctx.setLineDash([5]);
      ctx.moveTo(0, 200);
      ctx.lineTo(200, 0);
      ctx.stroke();
      // console.log(ctx);
      // document.body.appendChild(canvas)
      this.canvas.drawControls(ctx);
      // this.canvas.controlsAboveOverlay=true;
    },
    setContronVisibility (obj) {
      obj.setControlsVisibility({
        bl: true,
        br: true,
        mb: false,
        ml: true,
        mr: true,
        mt: false,
        mtr: true,
        tl: true,
        tr: true
      });
    },
    // 设置mirror
    toggleMirror ({ flip = 'X' }) {
      let img = this.canvas.getActiveObject();
      // console.log(img);
      if (img && img.type == 'image') {
        if (flip === 'X') {
          img.toggle('flipX');
        } else {
          img.toggle('flipY');
        }
        this.renderAll();
      }
    },
    // 设置层级
    toNextLayer () {
      let obj = this.canvas.getActiveObject();
      if (!obj) {
        return;
      }
      obj.sendBackwards(true);
      // this.canvas.discardActiveObject();
      // this.canvas.discardActiveGroup();
      this.renderTop();
      // this.canvas.setActiveObject(obj);
    },
    toBottomLayer () {
      let obj = this.canvas.getActiveObject();
      if (!obj) {
        return;
      }
      obj.sendToBack();
      // this.canvas.discardActiveObject();
      // this.canvas.discardActiveGroup();
      this.renderTop();
      // this.canvas.setActiveObject(obj);
    },
    toLastLayer () {
      let obj = this.canvas.getActiveObject();
      if (!obj) {
        return;
      }
      obj.bringForward(true);
      this.renderTop();
    },
    toTopLayer () {
      let obj = this.canvas.getActiveObject();
      if (!obj) {
        return;
      }
      obj.bringToFront();
      this.renderTop();
    }
  }
};
</script>

<style lang='scss' scoped>
</style>