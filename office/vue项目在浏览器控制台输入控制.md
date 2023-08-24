// 假设 WatermarkComponent 是包含水印的组件的名称
const watermarkComponent = Vue.$children.find(child => child.$options.name === 'WatermarkComponent');
window.Vue = require('vue'); // 这样在控制台上就可以使用了
