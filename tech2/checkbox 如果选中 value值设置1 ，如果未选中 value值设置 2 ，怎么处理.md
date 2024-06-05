要实现复选框选中时值为1，未选中时值为2，可以通过 `el-checkbox` 的 `true-label` 和 `false-label` 属性来实现。以下是具体的示例代码：

### 完整代码示例

```html
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      
      <!-- 第一列复选框 -->
      <el-table-column
        width="55"
        align="center"
        header-align="center">
        <template slot="header">
          <el-checkbox
            :indeterminate="isIndeterminate1"
            v-model="checkAll1"
            @change="handleCheckAllChange1">
            要参加
          </el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox
            :true-label="1"
            :false-label="2"
            v-model="scope.row.participate">
          </el-checkbox>
        </template>
      </el-table-column>

      <!-- 第二列复选框 -->
      <el-table-column
        width="55"
        align="center"
        header-align="center">
        <template slot="header">
          <el-checkbox
            :indeterminate="isIndeterminate2"
            v-model="checkAll2"
            @change="handleCheckAllChange2">
            已完成
          </el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox
            :true-label="1"
            :false-label="2"
            v-model="scope.row.completed">
          </el-checkbox>
        </template>
      </el-table-column>

      <!-- 其他数据列 -->
      <el-table-column
        prop="date"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        participate: 2,
        completed: 2
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        participate: 2,
        completed: 2
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        participate: 2,
        completed: 2
      }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        participate: 2,
        completed: 2
      }],
      checkAll1: false,
      isIndeterminate1: false,
      checkAll2: false,
      isIndeterminate2: false
    }
  },
  methods: {
    handleCheckAllChange1(val) {
      const newVal = val ? 1 : 2;
      this.tableData.forEach(item => {
        item.participate = newVal;
      });
      this.updateCheckStatus1();
    },
    handleCheckAllChange2(val) {
      const newVal = val ? 1 : 2;
      this.tableData.forEach(item => {
        item.completed = newVal;
      });
      this.updateCheckStatus2();
    },
    updateCheckStatus1() {
      const checkedCount = this.tableData.filter(item => item.participate === 1).length;
      this.checkAll1 = checkedCount === this.tableData.length;
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.tableData.length;
    },
    updateCheckStatus2() {
      const checkedCount = this.tableData.filter(item => item.completed === 1).length;
      this.checkAll2 = checkedCount === this.tableData.length;
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.tableData.length;
    }
  },
  watch: {
    tableData: {
      handler() {
        this.updateCheckStatus1();
        this.updateCheckStatus2();
      },
      deep: true
    }
  }
}
</script>
```

### 解释

- **数据结构**：在`tableData`中，为每一行数据添加`participate`和`completed`字段来存储复选框的状态。初始值为`2`（未选中状态）。
- **表头复选框**：
  - 使用`el-checkbox`手动创建表头复选框，并绑定`checkAll1`和`checkAll2`控制它们的状态。
  - `handleCheckAllChange1`和`handleCheckAllChange2`方法用于全选/取消全选操作。根据复选框的状态（`true`或`false`）设置相应的值（`1`或`2`）。
- **行复选框**：
  - 使用`el-checkbox`手动创建行内复选框，并通过`true-label`和`false-label`属性设置选中和未选中的值。
- **状态更新**：
  - `updateCheckStatus1`和`updateCheckStatus2`方法用于更新全选复选框和不确定状态。
  - 通过`watch`监听`tableData`变化，自动更新复选框状态。

这样可以实现复选框选中时值为1，未选中时值为2，并且支持多列复选框。




#####比较简单的处理方式

#### toggleAllSelection  怎么实现手动全选逻辑
如果需要手动实现全选逻辑而不使用 `toggleAllSelection` 方法，可以通过直接操作表格的选中行来实现全选和取消全选的功能。以下是具体的实现方法：

1. **在表头的复选框中绑定事件以手动控制全选/取消全选**。
2. **在 `handleCheckAllChange` 方法中手动操作表格的选中行**。

### 完整代码示例

```html
<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      
      <!-- 自定义复选框列表头 -->
      <el-table-column
        type="selection"
        width="55"
        align="center"
        header-align="center">
        <template slot="header">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange">
            要参加
          </el-checkbox>
        </template>
      </el-table-column>

      <!-- 其他数据列 -->
      <el-table-column
        prop="date"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }],
      checkAll: false,
      isIndeterminate: false,
      selectedItems: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedItems = val;
      this.checkAll = val.length === this.tableData.length;
      this.isIndeterminate = val.length > 0 && val.length < this.tableData.length;
    },
    handleCheckAllChange(val) {
      if (val) {
        this.selectedItems = [...this.tableData];
      } else {
        this.selectedItems = [];
      }
      this.$refs.multipleTable.clearSelection();
      this.selectedItems.forEach(item => {
        this.$refs.multipleTable.toggleRowSelection(item, val);
      });
      this.isIndeterminate = false;
    }
  }
}
</script>
```

### 解释

- **`handleSelectionChange`**: 这个方法在选中行变化时触发，用于更新 `checkAll` 和 `isIndeterminate` 的状态。
  - `this.checkAll`：更新是否全部选中状态。
  - `this.isIndeterminate`：更新是否部分选中状态。

- **`handleCheckAllChange`**: 这个方法在表头复选框状态变化时触发，用于全选或取消全选所有行。
  - 如果 `val` 为 `true`，表示需要全选，此时将所有数据行添加到 `selectedItems` 数组中。
  - 如果 `val` 为 `false`，表示取消全选，此时将 `selectedItems` 清空。
  - 调用 `this.$refs.multipleTable.clearSelection()` 清除当前所有选中项。
  - 使用 `toggleRowSelection(item, val)` 方法来选中或取消选中每一行。

这样可以手动实现全选和取消全选功能，并且更新表头复选框的状态以反映当前的选中状态。


####  不用 toggleAllSelection 实现全选

要在Element UI的表格组件中添加一个复选框列，并在表头显示“要参加”以及一个全选复选框，可以使用自定义表头插槽实现。以下是具体步骤和示例代码：

1. **自定义复选框列的表头**：

   使用插槽自定义表头内容，并确保全选复选框仍然可用。

2. **完整代码示例**：

   ```html
   <template>
     <div>
       <el-table
         ref="multipleTable"
         :data="tableData"
         style="width: 100%"
         @selection-change="handleSelectionChange">
         
         <!-- 自定义复选框列表头 -->
         <el-table-column
           type="selection"
           width="55"
           align="center"
           header-align="center">
           <template slot="header" slot-scope="{ store }">
             <el-checkbox
               :indeterminate="isIndeterminate"
               v-model="checkAll"
               @change="handleCheckAllChange">
               要参加
             </el-checkbox>
           </template>
         </el-table-column>

         <!-- 其他数据列 -->
         <el-table-column
           prop="date"
           label="日期"
           width="120">
         </el-table-column>
         <el-table-column
           prop="name"
           label="姓名"
           width="120">
         </el-table-column>
         <el-table-column
           prop="address"
           label="地址">
         </el-table-column>
       </el-table>
     </div>
   </template>

   <script>
   export default {
     data() {
       return {
         tableData: [{
           date: '2016-05-02',
           name: 'Tom',
           address: 'No. 189, Grove St, Los Angeles'
         }, {
           date: '2016-05-04',
           name: 'Tom',
           address: 'No. 189, Grove St, Los Angeles'
         }, {
           date: '2016-05-01',
           name: 'Tom',
           address: 'No. 189, Grove St, Los Angeles'
         }, {
           date: '2016-05-03',
           name: 'Tom',
           address: 'No. 189, Grove St, Los Angeles'
         }],
         checkAll: false,
         isIndeterminate: false,
         selectedItems: []
       }
     },
     methods: {
       handleSelectionChange(val) {
         this.selectedItems = val;
         this.checkAll = val.length === this.tableData.length;
         this.isIndeterminate = val.length > 0 && val.length < this.tableData.length;
       },
       handleCheckAllChange(val) {
         this.$refs.multipleTable.toggleAllSelection();
         this.checkAll = val;
         this.isIndeterminate = false;
       }
     }
   }
   </script>
   ```

### 解释
- **`<template slot="header" slot-scope="{ store }">`**: 使用插槽自定义复选框列的表头内容。
- **`<el-checkbox>`**: 表头中显示的复选框，用于全选和取消全选。
- **`handleSelectionChange`**: 当选择项发生变化时触发，用于更新`checkAll`和`isIndeterminate`的状态。
- **`handleCheckAllChange`**: 当表头的复选框状态变化时触发，用于全选或取消全选所有行。

### 注意事项
- 确保`toggleAllSelection`方法在`Element UI`版本中可用。如果不可用，需要手动实现全选逻辑。
- `checkAll`和`isIndeterminate`用于控制复选框的全选状态和不确定状态。
