你可以通过创建一个自定义的 Vue 组件，然后在这个组件内包装 Element UI 的 DatePicker 组件，并添加自定义的样式和属性来实现你的需求。以下是一个示例，演示如何简单封装一个日期选择组件：

```vue
<template>
  <div class="custom-date-picker">
    <el-date-picker
      v-model="selectedDate"
      type="date"
      :placeholder="placeholder"
      :clearable="clearable"
      @change="handleDateChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Date,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Select Date',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedDate: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.selectedDate = newValue;
    },
  },
  methods: {
    handleDateChange() {
      this.$emit('input', this.selectedDate);
    },
  },
};
</script>

<style scoped>
.custom-date-picker {
  /* 添加你的自定义样式 */
}
</style>
```

在上述示例中，我们创建了一个名为 `CustomDatePicker` 的自定义日期选择组件，它包装了 Element UI 的 DatePicker 组件。组件接受 `value`、`placeholder` 和 `clearable` 等属性，这些属性可以在使用组件时进行设置。我们使用 `v-model` 来实现数据双向绑定。

你可以将此自定义日期选择组件在你的项目中使用，使用方式与原始的 Element UI DatePicker 组件相同：

```vue
<template>
  <div>
    <custom-date-picker v-model="selectedDate" :placeholder="customPlaceholder" :clearable="false" />
  </div>
</template>

<script>
import CustomDatePicker from '@/components/CustomDatePicker'; // 导入自定义日期选择组件

export default {
  components: {
    CustomDatePicker, // 注册自定义日期选择组件
  },
  data() {
    return {
      selectedDate: null,
      customPlaceholder: 'Custom Date', // 设置自定义的 placeholder
    };
  },
};
</script>
```

这样，你就可以在项目中使用自定义日期选择组件，并应用自定义样式和属性，同时保持与 Element UI 的 DatePicker 组件相似的使用方式。你可以根据自己的需求进一步扩展和自定义这个组件。

## 继承原来的方法和属性
    v-bind="$attrs"
    v-on="$listeners"

