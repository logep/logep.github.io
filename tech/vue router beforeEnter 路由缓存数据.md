把原来页面 
包一层  通过 $route.fullPath  和  restore 控制 页面的缓存 借助comopent 然后用key手动控制是否重新渲染 组件 
当你切换动态组件类型时，通过增加componentKey的值，强制Vue.js重新渲染动态组件。确保在动态组件内部的数据都通过属性或其他方式重新赋值，以确保重新渲染后组件内部的状态正确。
<template>
  <keep-alive>
    <component :is="comp" :key="$route.fullPath + restore"></component>
  </keep-alive>
</template>
<script>
import comp from './comp'
export default {
  name: 'test',
  data() {
    return {
      comp,
      restore: 1,//这个也可以不要
      originFullPath: ''
    }
  },
  mounted() {

   //在mounted里做一些公共的处理
  },
  activated() {

    if (this.originFullPath !== this.$route.fullPath) {

      this.restore++
    }
    this.originFullPath = this.$route.fullPath

  },
  beforeDestroy() {
   把一些公共的处理在页面离开前销毁掉
  }
}
</script>

3.如果页面有tab页签 在页签切换事件里 需要处理 好 这个click事件带上 query 和 params
   if (v.name === view.name) {
     
		  processViews: ['test'],
        if (state.processViews.includes(view.name)) {
         
          v.params = view.params // 更新params
          v.query = view.query // 更新params
        }
        return
      }
## 第二种方案  在 router-view出口 加key 那么公用的因为key 缓存不一样
      <router-view
            class="test22332423"
            :key="$route.fullPath"
          ></router-view>
          <router-view v-else></router-view>


