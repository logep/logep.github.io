<template>
  <!--  给请求增加防重复处理-->
  <!--  固定选项和后台请求并存 options apiUrl-->
  <!--  v-bind="$attrs"  试试 disabled 是否可以-->
  <!-- 在 filterable 生效的情况下 传入的值一定要和options匹配（自己做处理,不然就出现一个options 和一个无匹配数据）
   如果传入一个不符合的值过来 options有值 那么就会显示错乱
   针对上述 问题 如果配置 remote 和 remoteMethod  那么就不会走到 else最后一个分支判断 而是执行了 remoteMethod方法 就不会有问题

       if (this.remote && typeof this.remoteMethod === 'function') {
          this.hoverIndex = -1;
          this.remoteMethod(val);
        } else if (typeof this.filterMethod === 'function') {
          this.filterMethod(val);
          this.broadcast('ElOptionGroup', 'queryChange');
        } else {
          this.filteredOptionsCount = this.optionsCount;
          this.broadcast('ElOption', 'queryChange', val);
          this.broadcast('ElOptionGroup', 'queryChange');
        }


如果配置了 remote 和 remoteMethod  那么  filterable 不生效了必须自己处理 ，由于下面代码问题，那么就需要配置
filterMethod方法 那么就会自动过滤 增加一个默认的filterMethod方法
    if (
          this.previousQuery === null &&
          (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')
        ) {
          this.previousQuery = val;
          return;
        }
force 加一个强制性回写value 显示 通过这种匹配 不会把下拉框显示的值显示选中（有bug）所以通过下面这种方式 显示绝对层显示相应的值 也不覆盖相应的value

如果是多选 自己一定要处理好数组的问题 multiple

如果按照这样赋值，每次update的时候，如果有watch这个forceLabel 就会每次执行 最好写个变量里

如果不是 focus 直接查询 那么就要控制查询字符串不能为空
      :forceLabel="[
                        { value: '测试13', label: '测试1' },
                        { value: '441', label: '测试2' }
                      ]"

如果是multiple 传入对象 那么 就需要 设置value 为对象 并设置 valueKey

如果是针对多个 需要多选 那么  v-model="testList"     :options="testList" 两个一起传入 加上 innerObj 属性即可
如果是单个  可以使用forceLabel


使用方式 

     <select-ui
        v-model="testValueArr1"
        :options="testList"
        :optionsFormatter="optionsFormatter"
        clearable
        searchKeyWord="sealName"
        forceValueWrite
        is-api
        api-url="companyManager/query/searchSealByName"
        placeholder="请选择输入"
      />
      
   -->
  <!--  :remote="remote"-->
  <!--  :remote-method="query"-->
  <!--  @focus="handleFocus"-->
  <!--  @blur="handleBlur"-->
  <!--  @change="handleValue"-->
  <!--  @clear="handleClear"-->

  <!--  -->

  <z-select
    ref="selectPack"
    v-model="selectedValue"
    v-bind="$attrs"
    v-on="$listeners"
    :loading="loading"
    @focus="handleFocus"
    remote
    filterable
    :remote-method="fetchDataFromApi"
    :placeholder="placeholder"
    @change="handleChange"
  >
    <!--    :key="handleValue(item) + '' + index"-->
    <!--    :label="item && item[labelName]"-->
    <!--    :value="handleValue(item)"-->
    <z-option v-for="item in filteredOptionList" :key="item.value" :label="item.label" :value="handleValue(item)" />
  </z-select>
</template>

<script>
import request from '@/utils/request'
import { HostName } from '@/config/env.js'

export default {
  props: {
    // 下拉框的值
    value: {
      type: [String, Number],
      default: ''
    },
    // 是否从接口获取数据
    isApi: {
      type: Boolean,
      default: false
    },
    focusAutoLoad: {
      type: Boolean,
      default: false
    },
    forceValueWrite: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: 'label'
    },
    labelValue: {
      type: String,
      default: 'value'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    innerObj: {
      type: Boolean, // 一般需要传入对象  一般是和multiple value-key一起使用
      default: false
    },
    forceLabel: {
      type: String,
      default: ''
    },
    searchKeyWord: {
      type: String,
      default: 'keyword'
    },

    optionsFormatter: {
      type: Function,
      default: val => val
    },
    // apiFormatter: {
    //   type: Function,
    //   default: () =>
    //     new Promise(resolve => {
    //       resolve()
    //     })
    // },
    innerFun: {
      type: Function,
      default: () =>
        new Promise(resolve => {
          resolve()
        })
    },

    // 如果是接口，接口的地址
    apiUrl: {
      type: String,
      default: ''
    },
    // 固定选项，如果不是接口获取数据，直接传入固定选项
    options: {
      type: Array,
      default: () => []
    },
    // 下拉框的占位符
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      uuidSingle: 0,
      loading: false,
      forceWrite: this.forceValueWrite,
      filteredOptionList: this.options,
      selectedValue: ''
    }
  },
  watch: {
    // 监听外部传入的值的变化，当编辑详情页时更新下拉框的值
    value: {
      handler(newValue) {
        console.log(newValue)
        console.log('13134444444444444444444444444444444412312312')
        // 如果要兼容 这个强制回写 必须 给这个forceLabel赋值
        this.selectedValue = JSON.parse(JSON.stringify(newValue))
        // this.selectedValue = this.forceValueWrite && this.forceLabel ? this.forceLabel : newValue
      },
      immediate: true
    },
    forceLabel: {
      handler(newValue) {
        console.log(newValue)
        console.log('131312355555555555555555555555512312')
        // 如果要兼容 这个强制回写 必须 给这个forceLabel赋值
        //todo 传入的如果不是对象 倒没问题，如果是对象 那么直接这样赋值 后续修改值 会因为是引用对象 会有问题
        if (this.forceWrite && newValue) {
          this.selectedValue = JSON.parse(JSON.stringify(newValue))
        }
      },
      immediate: true
    }
  },
  methods: {
    handleValue(item) {
      if (!item) return ''
      if (this.innerObj) {
        return item
      } else {
        return item[this.labelValue]
      }
    },
    // 当下拉框的值发生变化时触发
    handleChange(value) {
      console.log(value)
      console.log('handleChange-============================================')
      // todo 让强制写值 失效
      this.forceWrite = false
      this.$emit('input', value) // 将变化的值传递给父组件
    },
    handleFocus() {
      // 增加 focus 自动查询
      if (this.focusAutoLoad) {
        this.fetchDataFromApi()
      }
    },
    filterDataFromApi(query) {
      console.log('filter query2===============')
      //不暴露过滤方法给外面 如果有需要增加 但应该不满足自动创建label的需求这个地方需要改动 todo
      // this.filteredOptionList = this.localFilterMethod(query)
      const labelName = this.labelName
      this.filteredOptionList = this.options.filter(item => {
        let label = item[labelName] || ''
        // return label.indexOf(query) >= 0
        const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        return new RegExp(escapeRegexpString(query), 'i').test(label)
      })
    },
    // 如果是从接口获取数据，则在组件创建时请求数据
    fetchDataFromApi(param) {
      console.log(param)
      console.log('param')
      if (this.isApi) {
        // 使用适当的 HTTP 请求库（例如 axios）从接口获取数据
        // 这里使用了简化的 fetch API 作为示例
        if (!this.focusAutoLoad && !param) return
        this.uuidSingle += 1
        const fetchUid = this.uuidSingle
        // 这个地方可以是 内部请求消化，或者外部传进来函数处理
        // fetch(this.apiUrl)
        // this.innerFun()
        // this.innerFun()
        let _params = {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }

        _params[this.searchKeyWord + ''] = param
        request({
          url: `${HostName}${this.apiUrl}`,
          method: 'POST',
          data: _params
        })
          .then(({ result }) => {
            console.log('then', result)
            if (fetchUid !== this.uuidSingle) {
              this.loading = false
              return
            }
            if (result) {
              this.options = this.optionsFormatter && this.optionsFormatter(result.data)
              this.filteredOptionList = this.options
            }
            // this.options = data // 将获取到的数据赋值给选项
          })
          .catch(error => {
            console.error('Error fetching data from API', error)
          })
      } else {
        this.filterDataFromApi(param)
      }
    }
  },
  mounted() {
    // 在组件挂载时，如果是从接口获取数据，则请求数据 改成focus 请求数据
    // this.fetchDataFromApi()
  }
}
</script>
