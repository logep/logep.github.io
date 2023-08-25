```
  <el-form ref="form" :model="form" :rules="rules" >

 <el-form-item
    prop="email"
    label="邮箱"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >

   <el-form-item
            
              :configs="configFun('list', index)"
              :form-data="form"
            
            >
  <span :slot="getSlotName('list', index)">
                <z-input v-model="item.price" />
              </span>

 configFun(type, index) {
      return [
    
        {
          prop: `${type}.${index}.price`,
          label: '平',
          itemType: 'input',
          showSlot: true,
          rules: [{ required: true, message: '请输入', trigger: 'blur' }] //还有写法 直接写到 z-form-item上,那如果组件不支持，需要改组件，所以写在 config里配置最好
        }
      ]
    },
    getSlotName(type, index) {
      return `${type}.${index}.price`
    },
```

很抱歉，我之前的回答可能有些误导。在 Vue 中，不能直接在 `:slot` 绑定中使用点号 `.` 来动态构建 slot 名称，因为点号在绑定表达式中是被解释为对象属性访问的。

如果您想在 slot 名称中使用动态值，您可以通过计算属性或方法来实现。以下是一种可能的解决方案：

```vue
<template>
  <my-component>
    <template v-for="(item, index) in stampList" :slot="getSlotName(index)" :key="index">
      <!-- 内容 -->
    </template>
  </my-component>
</template>

<script>
export default {
  data() {
    return {
      stampList: [
        // ...
      ]
    };
  },
  methods: {
    getSlotName(index) {
      return `stampList.${index}.price`;
    }
  }
};
</script>
```

在这个例子中，我们使用了 `getSlotName` 方法来返回动态构建的 slot 名称。这样可以确保动态值在计算属性或方法中被正确处理，从而生成正确的 slot 名称。
