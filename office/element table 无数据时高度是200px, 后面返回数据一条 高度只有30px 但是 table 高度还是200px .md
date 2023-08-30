在Element UI框架中，使用Vue语言编写的表格，您可以通过以下方法来解决您描述的问题：

1. **使用`height`属性：** 默认情况下，Element UI的表格会自动根据内容调整高度，但您可以通过设置`height`属性来控制表格的高度。在您的表格组件中，确保没有设置固定的高度，以便让表格根据内容自动调整高度。

   ```vue
   <el-table :data="tableData" height="auto">
     <!-- 表格列定义 -->
   </el-table>
   ```

2. **使用`max-height`属性：** 您还可以考虑使用`max-height`属性来设置表格的最大高度，从而确保表格在内容较少时不会超过指定的高度。

   ```vue
   <el-table :data="tableData" :max-height="200">
     <!-- 表格列定义 -->
   </el-table>
   ```

3. **动态调整高度：** 如果您的表格在获取数据后是通过异步请求更新的，您可以在数据更新后，使用Vue的生命周期钩子或`$nextTick`来动态调整表格容器的高度，以适应内容。

   ```vue
   <template>
     <div>
       <el-table :data="tableData" ref="myTable">
         <!-- 表格列定义 -->
       </el-table>
     </div>
   </template>

   <script>
   export default {
     data() {
       return {
         tableData: []
       };
     },
     methods: {
       fetchData() {
         // 模拟异步数据获取
         setTimeout(() => {
           this.tableData = [...]; // 更新数据
           this.adjustTableHeight();
         }, 1000);
       },
       adjustTableHeight() {
         this.$nextTick(() => {
           const tableContainer = this.$refs.myTable.$el.querySelector('.el-table__body-wrapper');
           tableContainer.style.height = tableContainer.scrollHeight + 'px';
         });
       }
     },
     mounted() {
       this.fetchData();
     }
   };
   </script>
   ```

通过上述方法，您应该能够解决Element UI表格在数据更新后高度没有自动调整的问题。如果问题仍然存在，您可能需要仔细检查您的代码，特别是样式和数据更新的部分，以确保没有其他因素干扰了表格的高度调整。
