在 Element UI 的 Table 中，可以通过使用 `expandRowKeys` 属性来控制表格中所有行的展开和收缩状态。你可以在按钮点击事件中修改 `expandRowKeys` 的值，从而实现全部展开或全部收缩的效果。

以下是通过按钮来控制全部展开和全部收缩的示例代码：

```vue
<template>
  <div>
    <el-button @click="expandAllRows">展开全部</el-button>
    <el-button @click="collapseAllRows">收缩全部</el-button>

    <el-table
      :data="tableData"
      :expand-row-keys="expandedKeys"
      @expand-change="handleExpandChange"
    >
      <!-- Table columns definition -->
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        // Table data here
      ],
      expandedKeys: [], // Array to store expanded row keys
    };
  },
  methods: {
    expandAllRows() {
      // Get all row keys to expand
      const allRowKeys = this.tableData.map((item, index) => index);
      this.expandedKeys = allRowKeys;
    },
    collapseAllRows() {
      this.expandedKeys = []; // Clear the expanded row keys array to collapse all rows
    },
    handleExpandChange(row, expanded) {
      if (expanded) {
        // Add the row key to expandedKeys when a row is expanded
        this.expandedKeys.push(row.index);
      } else {
        // Remove the row key from expandedKeys when a row is collapsed
        const index = this.expandedKeys.indexOf(row.index);
        if (index !== -1) {
          this.expandedKeys.splice(index, 1);
        }
      }
 this.$set(data, 'childrens', childrens) // 自己加的
    },
  },
};
</script>
```

在上述代码中，我们使用 `expandRowKeys` 属性绑定到 `expandedKeys` 数组，该数组用于存储展开的行的索引。然后，我们分别定义了 `expandAllRows` 和 `collapseAllRows` 两个方法，在点击按钮时分别设置 `expandedKeys` 数组以展开或收缩所有行。同时，我们在表格中通过 `@expand-change` 事件来监听行的展开和收缩操作，确保 `expandedKeys` 数组的同步更新。

这样，通过点击按钮就可以实现全部展开或全部收缩表格的功能。
