# vue-fabric

#### 项目介绍
Vue组件，vue-fabric组件 ，fabric组件，绘图板，图片组合组件

#### 软件架构
软件架构说明


#### 安装教程

    npm install auto-preview-image --save

#### 使用说明

    在main.js中
    import 'auto-preview-image/dist/auto-preview-image.min.css';
    import { ApImage } from 'auto-preview-image';
    Vue.use(ApImage);

    页面中使用
    <ap-image :showClose="false" :thumb="imgUrl" :radius="3" :full="imgUrl" :maxWidth="300"></ap-image>

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
