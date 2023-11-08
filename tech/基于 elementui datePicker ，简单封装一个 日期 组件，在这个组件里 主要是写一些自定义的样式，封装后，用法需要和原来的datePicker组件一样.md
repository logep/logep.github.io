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




如果弹出的日期选择器是在`body`元素之外渲染的，通常可以通过全局样式或者添加一个自定义的 CSS 类来修改其样式。全局样式是一种常见的方法，但如果你只需要修改特定的日期选择器的样式，你可以使用一些工具或技巧来选择特定的元素，并添加自定义样式。

以下是一些可能的方法：

1. **全局样式：** 使用全局样式表来修改日期选择器的样式，这将影响整个应用中的所有日期选择器。这是最简单的方法，但可能会影响到其他组件。

2. **Scoped CSS 或 CSS Modules：** 如果你使用了 Vue 的 `scoped` 样式或 CSS Modules，你可以在父组件中创建一个带有特定命名空间的样式，然后将其应用于日期选择器的容器元素。这将确保你的样式仅适用于当前组件的日期选择器。

3. **通过选择器定位：** 如果日期选择器具有唯一的 class 或 id，你可以使用 CSS 选择器来选择它。你可以在父组件的样式表中添加一个特定选择器，以定位日期选择器的容器元素，并应用自定义样式。

4. **内联样式：** 如果你能够在父组件中获取日期选择器的引用，你可以使用内联样式属性直接修改其样式。这需要在父组件中访问日期选择器的 DOM 元素，通常需要使用 `this.$refs` 或 `document.querySelector`。

选择最合适的方法取决于你的具体需求和项目架构。如果只需要修改特定日期选择器的样式，尽量避免全局样式，而是使用较为精确的方法，如 scoped CSS 或 CSS Modules 或选择器定位。
            
### 大数据屏日期样式改造

.board-datePicker {
  .z-picker-panel__content {
    color: #fff;
    background: #0a2f68;
  }
  .z-month-table td .cell,
  .z-picker-panel__icon-btn {
    color: #fff;
  }
  .z-month-table td.disabled .cell {
    color: #c0c4cc;
  }
  .z-month-table td.in-range div,
  .z-month-table td.in-range div:hover {
    background-color: #1a3f79;
  }
  .z-month-table td.end-date .cell,
  .z-month-table td.start-date .cell {
    background-color: #1d4a91;
  }
}


### 选择的月份区间 怎么把数据改成 起始月份 1日 00:00:00  结束月份 月底最后一天 23:59:59，new Date（） 和dayjs插件分别实现

你可以使用 JavaScript 的 `Date` 对象和 Day.js 插件来将选择的月份区间更改为起始月份的第一天（00:00:00）和结束月份的最后一天（23:59:59）。以下是两种方法的示例：

### 使用 JavaScript 的 `Date` 对象：

```javascript
// 获取选择的月份（示例中选择的是 2023 年 5 月）
const selectedMonth = new Date(2023, 4); // 月份从 0 开始，所以 4 代表 5 月

// 计算起始月份第一天
const startDate = new Date(selectedMonth);
startDate.setDate(1);
startDate.setHours(0, 0, 0, 0);

// 计算结束月份最后一天
const endDate = new Date(selectedMonth);
endDate.setMonth(selectedMonth.getMonth() + 1, 0); // 月底最后一天
endDate.setHours(23, 59, 59, 999);

console.log('起始日期:', startDate);
console.log('结束日期:', endDate);
```

### 使用 Day.js 插件：

```javascript
const dayjs = require('dayjs');
const isLastDayOfMonth = require('dayjs/plugin/isLastDayOfMonth');
dayjs.extend(isLastDayOfMonth);

// 获取选择的月份（示例中选择的是 2023 年 5 月）
const selectedMonth = dayjs('2023-05');

// 计算起始月份第一天
const startDate = selectedMonth.startOf('month');

// 计算结束月份最后一天
const endDate = selectedMonth.endOf('month');

console.log('起始日期:', startDate.format('YYYY-MM-DD HH:mm:ss'));
console.log('结束日期:', endDate.format('YYYY-MM-DD HH:mm:ss'));
```

这两种方法都能将选择的月份区间更改为起始月份的第一天（00:00:00）和结束月份的最后一天（23:59:59）。你可以根据实际需求选择使用 JavaScript 的 `Date` 对象或 Day.js 插件。
