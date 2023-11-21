show-checkbox 不显示 checkbox  check-on-click-node
只能单选控制
check-on-click-node  @check="checkFn" 这两个可以控制多选
      default-expand-all 不默认全部展开

          draggable  配合 node-drag-start  node-drag-enter node-drag-leave node-drag-end node-drop  allow-drop allow-drag

    可以试着扩展下 node-contextmenu  这方法使用
想实现 拖动 鼠标下有 元素 可以用draggable实现
    draggable
  getDraggableElement(data) {
      const draggableElement = document.createElement('div');
      draggableElement.innerText = data.label;

      draggableElement.style.backgroundColor = '#e6f7ff';
      draggableElement.style.border = '1px dashed #1890ff';
      return draggableElement;
    }, 
       <template v-slot:default="{ node, data }">
        <draggable v-if="node.dragging" :element="getDraggableElement(data)" :options="dragOptions">
          {{ data.label }}
        </draggable>


         <el-input placeholder="关键字进行过滤" clearable v-model="filterText" />

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
// 定位逻辑
  this.$refs.tree.setCurrentKey(item.id) //通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
        const node = document.getElementById(item.id) // 通过Id获取到对应的dom元素
        setTimeout(() => {
          if (node) {
            this.$nextTick(() => {
              node.scrollIntoView({ block: 'center' }) // 通过scrollIntoView方法将对应的dom元素定位到可见区域 【block: 'center'】这个属性是在垂直方向居中显示
            })
          }
        }, 100)




    resetFn() {
      this.$refs.tree.setCurrentKey(null)
      this.filterText = ''
      this.selectedId = ''
   
    },


递归寻找
 // 找到子级 是否有 disable状态
    getDisableList(node) {
      let isDisable = false
      function flatTree(data) {
        data.forEach(item => {
          if (item.data.ss === 1) {
           
            isDisable = true
            return true
          }
          if (item.childNodes?.length) {
            flatTree(item.childNodes)
          }
        })
        return isDisable
      }
      return flatTree(node?.childNodes)
    },



         <el-tree
      :data="companyTree"
       highlight-current
      node-key="id" check-strictly
      ref="tree"    default-expand-all
   :expand-on-click-node="false"
         :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :default-expanded-keys="expandedKeys"
      @node-click="handleNodeClick"
      :filter-node-method="filterNode"
      style="height: calc(100% - 20px)"
      :props="{ children: 'children', id: 'code', label: 'name', isLeaf: 'leaf' }"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"

      :render-after-expand="false"
    >
    
      <span class="span-text-slot" slot-scope="{ node, data }">
 
       
        <!--<span class="custom-drag-indicator" v-if="node.id === draggingId">{{ node.label }}</span>-->
        <!--<span :id="data.id" v-else>{{ node.label }}</span>-->

        <span
          :class="data.ss === 0 ? 'color-danger' : ''"
          v-if="data.id && selectedId === data.id"
          style="background: red"
          :id="data.id"
        >
          {{ node.label }}
        </span>
        <span v-else :class="data.ss === 0 ? 'color-danger' : ''" :id="data.id">{{ node.label }}</span>
    
        <!--<draggable v-if="node.id === draggingId" :element="getDraggableElement(data)" :options="dragOptions">-->
        <!--<span>{{ node.label }}</span>-->
        <!--</draggable>-->
        <!--<span v-else>{{ node.label }}</span>-->
        <span>
          <!--// 可以判断在某一级才显示 这些按钮-->
         
          <!--v-if="node.level === 1 || node.level === 2"-->
      
          <!--@click.stop.prevent="() => append(node, data)"-->
          <!--&gt;-->
          <!--添加-->
          <!--</el-button>-->
          <!--<el-button type="text" size="mini" @click.stop.prevent="() => remove(node, data)">-->
          <!--删除-->
          <!--</z-button>-->
          <!--<el-button v-if="node.level !== 1" type="text" size="mini" @click.stop.prevent="() => remove(node, data)">-->
          <!--上移-->
        
          <!--<el-button v-if="node.level !== 1" type="text" size="mini" @click.stop.prevent="() => remove(node, data)">-->
          <!--下移-->
         
        </span>
      </span>
    </el-tree>
