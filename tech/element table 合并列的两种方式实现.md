  <el-table :data="dataList" height="100%" :span-method="objectSpanMethod" border>
        <el-table-column prop="val" label="a列" />
        <el-table-column prop="val1" label="b列" show-overflow-tooltip></el-table-column>
      </el-table>

      <el-table :data="dataList1" height="100%" :span-method="objectSpanMethod1" border>
        <el-table-column prop="val" label="a列" />
        <el-table-column prop="val1" label="b列" show-overflow-tooltip></el-table-column>
        <el-table-column prop="val2" label="c列" show-overflow-tooltip></el-table-column>
      </el-table>
      
 mounted() {
    let dataList = [
      {
        value: '分类'
      },
      {
        children: [
          {
            value: '其他'
          },
          {
            value: '测试'
          }
        ],
        value: '其他'
      }
    ]
    let list = []
    dataList.forEach(item => {
      if (item.children && item.children.length) {
        item.children.forEach((sub, subIndex) => {
          list.push({
            rowspan: subIndex ? 0 : item.children.length,
            val: sub.value
          })
        })
      } else {
        list.push({
          rowspan: 1,
          val: item.value
        })
      }
    })
    this.dataList = list
    this.dataList1 = [
      { rowspan: 3, rowspan1: 2, val1: 1, val2: 111 },
      { rowspan: 0, rowspan1: 0, val1: 1, val2: 222 },
      { rowspan: 0, rowspan1: 1, val1: 1, val2: 333 }
    ]
  },
  methods: {
    objectSpanMethod({ row, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan,
          colspan: row.rowspan && 1
        }
      }
    },
    objectSpanMethod1({ row, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan,
          colspan: row.rowspan && 1
        }
      }
      if (columnIndex === 1) {
        return {
          rowspan: row.rowspan1,
          colspan: row.rowspan1 && 1
        }
      }
    },
