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

在Vue中，通过`$attrs`将父组件中的`style`和`class`属性传递给子组件的特定`div`元素是可行的，但需要一些特殊的处理。通常，`$attrs`主要用于将父组件的非原生HTML属性传递给子组件。对于`style`和`class`属性，Vue提供了一种更直接的方式，即通过`v-bind`绑定。

以下是如何将父组件中的`style`和`class`属性传递给子组件的特定`div`元素：

**父组件的模板：**

```vue
<template>
  <div>
    <custom-component :style="customStyle" :class="customClass"></custom-component>
  </div>
</template>
```

**父组件的数据：**

```vue
<script>
import CustomComponent from './CustomComponent.vue';

export default {
  components: {
    CustomComponent,
  },
  data() {
    return {
      customStyle: {
        color: 'red',
        fontSize: '16px',
      },
      customClass: 'custom-div',
    };
  },
};
</script>
```

**子组件（CustomComponent.vue）的模板：**

```vue
<template>
  <div class="custom-div" :style="customStyle">
    <!-- 子组件的内容 -->
  </div>
</template>
```

**子组件的Props定义：**

```vue
<script>
export default {
  props: {
    customStyle: Object,
  },
};
</script>
```

在这个示例中，我们通过`v-bind`将父组件中的`style`和`class`属性传递给子组件的特定`div`元素。子组件使用`props`接收`customStyle`属性，然后将其应用到自身的`style`中，实现了样式的传递。

这是一种更常见且直接的方式，而不是使用`$attrs`。但如果你确实希望使用`$attrs`，你可以在子组件的`div`上添加`v-bind="$attrs"`，并在子组件的`props`中定义对应的属性。请注意，这种方法会将所有的非原生HTML属性传递给子组件的`div`，包括不仅限于`style`和`class`。




`inheritAttrs` 是一个 Vue 组件选项，用于控制组件是否继承父组件的属性。你需要将它设置为 `false`，以禁止属性继承。通常，你会在子组件的定义中使用它。

以下是如何在子组件的定义中使用 `inheritAttrs`：

```vue
<template>
  <div class="custom-div">
    <!-- 子组件的内容 -->
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // 禁止属性继承
};
</script>
```

在上述示例中，我们将 `inheritAttrs` 设置为 `false`，这将禁止子组件自动继承父组件的属性。

当你在子组件中设置 `inheritAttrs: false` 时，子组件将不再自动继承父组件的属性，这意味着你可以手动控制哪些属性应用在子组件的根元素上，而哪些属性不应用。

这个选项通常用于自定义组件，当你希望在组件内部更精确地控制属性传递和渲染时非常有用。
export default {
  inheritAttrs: false, // 关闭属性继承

默认半个月的时间 赋值


   disabledDate: (time: any) => {
      if (this.dt !== '') {
        let maxTime = new Date(this.dt).setMonth(new Date(this.dt).getMonth() + 11)
        let minTime = new Date(this.dt).setMonth(new Date(this.dt).getMonth() - 11)
        if (maxTime > new Date().getTime()) {
          maxTime = new Date().getTime()
        }
        return time.getTime() < minTime || time.getTime() > maxTime
      }
      // return false
      return time.getTime() > Date.now()
    }
[new Date().format('yyyy-MM-dd') + ' 00:00:00', new Date().format('yyyy-MM-dd') + ' 23:59:59'],
[new Date().format('yyyy-MM'), new Date().format('yyyy-MM')],
  this.$dayjs(this.$dayjs().format('YYYY-MM-DD'))
 this.$dayjs()
      .subtract(1, 'month')
      .format('YYYY-MM')
 this.$dayjs(data[1])
        .endOf('month')
        .format('YYYY-MM-DD')
dayjs()
        .subtract(90, 'day')
        .format('YYYY-MM-DD')
dayjs()
      .startOf('month')
      .format('YYYY-MM-DD'),
 dayjs()
      .endOf('month')
      .format('YYYY-MM-DD'),
dayjs()
      .subtract(1, 'year')
      .format('YYYY-MM-DD')





默认只能选择 12个月区间


     minDate: null,
            maxDate: null,
            pickerOptions: {
                disabledDate: (time) => {
                    if (this.minDate !== null && this.maxDate === null) {
                        let minMonth = this.minDate.getMonth(),
                            lastYear = new Date(this.minDate).setMonth(minMonth - 11),
                            nextYear = new Date(this.minDate).setMonth(minMonth + 11);
                        // 只能选 minDate 前后一年的范围
                        return time.valueOf() < lastYear.valueOf() || time.valueOf() > nextYear.valueOf();
                    }
                    return false;
                },
                onPick: ({minDate, maxDate}) => {
                    this.minDate = minDate;
                    this.maxDate = maxDate;
                }
            },
