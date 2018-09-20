# vue-fabric
purestart vue-fabric.

## Installation
```
npm install vue-fabric --save
```

## 依赖
下载[customiseControls.min.js](https://github.com/purestart/vue-fabric/blob/master/static/js/customiseControls.min.js).和 [fabric.min.js](https://github.com/purestart/vue-fabric/blob/master/static/js/fabric.min.js).到本地static/js/文件下
    
    本地项目index.html引入
    <script type="text/javascript" src="./static/js/fabric.min.js"></script>
    <script type="text/javascript" src="./static/js/customiseControls.min.js"></script>

## Import
```
在main.js中
import 'vue-fabric/dist/vue-fabric.min.css';
import { Fabric } from 'vue-fabric';
```
```
Vue.use(Fabric);
```

使用

```
 <vue-fabric ref="canvas" :width="width" :height="height"></vue-fabric>
```

## Usage
#### Props
| Name              | Type               | Default             | Description                                         |
| ----------------| ---------------- | ---------------| ------------------------------------------|
| width             | Number            |  0                | canvas width    |
| height				| Number		|  0               | canvas height |


## Function
>方法调用
>this.$refs.canvas.方法名(params)
#### createImage(url,options) 绘制图片
| params              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| url             | String            | image url    |
| options             | Object            | width,height,left,top |

#### createTextbox(text,options) 绘制文本
| params              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| text             | String            | text content    |
| options             | Object            | width,left,top,fill,fontSize, |

#### createRect(width,height,fillColor,left,top) 绘制矩形
| params              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| left             | Number            | left    |
| top             | Number            | top |
| width             | Number            | Rect width    |
| height             | Number            | Rect height |
| fillColor             | String            | Rect fillColor |


#### createLine(x,y,x1,y1,fillColor,strokeColor) 绘制直线
| params              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| x,y,x1,y1             | Number            | line points,直线两点坐标    |
| fillColor             | String            | fillColor 填充颜色 |
| strokeColor             | String            | strokeColor 绘制颜色 |

#### createTriangle(options) 绘制三角形
| options              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| left,top             | Number            | position 位置    |
| fill             | String            | fillColor 填充颜色 |
| width             | Number            | 三角形底边宽度 |
| height             | Number            | 三角形高 |

#### createCircle(options) 绘制圆
| options              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| left,top             | Number            | position 位置    |
| fill             | String            | fillColor 填充颜色 |
| radius             | Number            | 圆形半径 |


#### setRotate(angle) 旋转选中元素
| params              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| angle             | Number            | 旋转角度    |

#### setBackgroundImage(url) 设置画布背景图片
| params              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| url             | String            | 背景图片Url    |

#### renderAll() 重新渲染画布

#### setBackgroundColor(color) 设置画布背景颜色
| params              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| color             | String            | 背景颜色    |

#### toggleMirror() 设置图片元素镜像翻转

#### toNextLayer() 设置当前选中画布到下一层

#### toLastLayer() 设置当前选中画布到上一层

#### toBottomLayer() 设置当前选中画布到底层

#### toTopLayer() 设置当前选中画布到顶层

#### getObjects() 获取当前画布上的所有元素对象

#### clear() 清除当前画布上的所有元素对象

#### toDataUrl() 返回当前画布的base64图片

#### toJson() 返回当前画布的json对象

#### loadFromJSON(json,cb) 从json对象中加载画布数据
| params              | Type             | Description                                         |
| ----------------| ----------------| ------------------------------------------|
| json             | Object            | json对象    |
| cb             | Function            | 加载完成回调函数    |

#### toSvg() 返回当前画布的svg图片

#### removeCurrentObj() 删除当前选中对象

#### getEditObj() 返回当前选中对象，并不在画布上显示，用于编辑当前元素

#### setEditObj(obj) 设置添加对象到画布

## Changelog
### 2018.8.26
> v0.1.4 * 初始化组件库
### 2018.9.20
> v0.1.8 * 新增api常用接口创建文档