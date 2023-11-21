## 使用
```
    <el-list-refresh
     
      :default-condition="{ rs: '2', id: base.pid }"
      url="app_list_get_info"
      keyword="codes"
    >
    
      <template slot-scope="scope" v-if="scope.data">
        <div class="list__item van-hairline--bottom" @click="god(scope.data)">
          <div class="van-ellipsis">{{ scope.data.name }}</div>
        </div>
      </template>
    </el-list-refresh>

```
## 封装

```
   <van-pull-refresh v-model="isRefresh" @refresh="_onRefresh">
      <van-list
        v-model="isLoading"
                :finished-text="list.length == 0 ? '' : '没有更多了'"
        :finished="isFinished"
        :error.sync="errorLoading"
        error-text="请求失败，点击重新加载"
        @load="getList"
      >
        <slot name="prefix"></slot>
        <template v-for="(item, i) in list">
          <slot :data="item" :index="i" />
        </template>
      </van-list>
      <no-data v-if="!errorLoading && !isRefresh && !isLoading && list.length == 0"></no-data>
    </van-pull-refresh>




     _onRefresh() {
      this.isFinished = false
      this.getList(true)
    },
    getList(isReSearch) {
      if (!isReSearch) {
        if (this.isFinished) {
          return
        }
        this.pager.pageNum++
      } else {
        this.isFinished = false
        this.pager.pageNum = 1
      }
      this.isLoading = true
      // 非无限加载的，只调用一次接口
      if (!this.isInfinate) {
        this.isFinished = true
      }
      let params = { ...this.pager, ...this.defaultCondition }
      try {
        this.get(url,params)
          .then(res => {
            let data = this.opFormat && this.opFormat(res)
            let list = data.list || data || []
            if (!Array.isArray(list)) list = []
            this.list = isReSearch ? list : this.list.concat(list || [])
            this.pager.total = data.totalRows || this.pager.total
            if (this.pager.pageNum >= Math.ceil(this.pager.total / this.pageSize)) {
              this.isFinished = true
            } else if (list.length === 0) {
              this.isFinished = true
            }
            if (this.isRefresh) {
              Toast('刷新成功')
            }
            this.isLoading = false
            this.isRefresh = false
            this.errorLoading = false
            this.$emit('change', { data: data, status: true })
          })
          .catch(() => {
            this.errorLoading = true
            // 出错需要 重新把编码减掉，重新请求
            this.pager.pageNum--
            this.isLoading = false
            this.isRefresh = false
            this.$emit('change', { status: false })
          })
      } catch (e) {
        this.isLoading = false
        this.isRefresh = false
        this.$emit('change', { status: false })
      }
    },

```


