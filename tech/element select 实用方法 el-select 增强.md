element select 实用方法
element里的封装处理逻辑梳理
  this.selectedLabel = this.selected.currentLabel; //显示的是select的label
  options.vue里的逻辑
 currentLabel() { return this.label || (this.isObject ? '' : this.value);},
  currentValue() { return this.value || this.label || '';  },

  itemSelected() {if (!this.select.multiple) {return this.isEqual(this.value, this.select.value);} else { return this.contains(this.select.value, this.value);},    针对多个或者单个选中的逻辑
value	选项的值	string/number/object
label	选项的标签，若不设置则默认与 value 相同  string/number
value-key	作为 value 唯一标识的键名，绑定值为对象类型时必填
value / v-model	绑定值	boolean / string / number

// 默认进入selected 之后   通过getOption（value） 方法获取 options的 selected  并给 input的 currentLabel 和currentValue 赋值
而 getOptions 是直接  从 cachedOptions里获取值    而cachedOptions的值 是在option.vue里组件初始化赋值的
setSelected() {if (!this.multiple) {let option = this.getOption(this.value);if (option.created) {this.createdLabel = option.currentLabel;this.createdSelected = true;} else {this.createdSelected = false;}this.selectedLabel = option.currentLabel;this.selected = option; if (this.filterable) this.query = this.selectedLabel;return;}

 如果用 value 来显示  label 是不是也好些
  value 如果用的是 object 是不是处理起来会更好些
  都在后台处理数据更方便
  value如果是 object 用 getValueByPath（value-key） 这个方法 来获取相等

   <el-option :label="显示值1">显示值2</el-option>

  option里如果没有写slot  就用currentLabel
   <slot>
      <span>{{ currentLabel }}</span>
    </slot>
               testValue
               如果设置 了filterable  this.query 默认就是 this.selectedLabel,默认给了个值和下拉框不匹配 就会显示 无匹配数据
  testValue2: 441,// 而初始化的时候如果是多选必须是数组 因为 走的下面这个逻辑 indexOf 就会报错
     if (!this.isObject) {return arr && arr.indexOf(target) > -1;}
     bug:  这个用indexOf 判断 会有问题 第二个问题 如果testValue2 是数字类型 执行 indexOf会报错 所以多选
     最好传 数组类型
     在select.vue里 created里判断 multiple
 created() {
      if (this.multiple && !Array.isArray(this.value)) {
        this.$emit('input', []); 把不符合规范的数据替换成了空数组
      }
     this.selectedLabel = this.selected.currentLabel;

value用对象做，或者自己用对象里的属性值做拼接都差不多处理(如果是单选 后端一般返回单个值不是对象)
valueKey 默认值是value 有value值得可以直接处理
1.测试固定数据下拉 （单选）
2.测试固定数据下拉 （多选）（选中的值竟然是逗号隔开的数据）
3.测试动态数据下拉 （多选）
4.测试动态数据下拉 （单选）


   testList: [
        { value: 44, id: 44, companyName: '测试1', label: '测试1' },
        { value: 441, id: 441, companyName: '测试2', label: '测试2' }
      ],
      testValue: '12',
      testValueObj: { value: 44 },
      testValueArr: [{ value: 44 }],
      testValue2: [44], // 而初始化的时候如果是多选必须是数组



<el-select
v-model="testValue"
remote
filterable
  :remote-method="testFun"
clearable
placeholder="请选择输入"
  >
  <el-option v-for="item in testList" :key="item.value" :label="item.companyName" :value="item.id" />
  </el-select>
  <el-select v-model="testValue2" multiple clearable placeholder="多选">
  <el-option
v-for="item in [
{ value: 44, label: '测试1' },
{ value: 441, label: '测试2' }
]"
:key="item.value"
:label="item.label"
:value="item.value"
  />
  </el-select>
  <el-input :value="JSON.stringify(testValueArr)" />
  <el-select valueKey="value" v-model="testValueArr" multiple clearable placeholder="对象选择">
  <el-option
v-for="item in [
{ value: 44, label: '测试1' },
{ value: 441, label: '测试2' }
]"
:key="item.value"
:label="item.label"
:value="item"
  />
  </el-select>
  <el-input :value="JSON.stringify(testValueObj)" />
  <el-select valueKey="value" v-model="testValueObj" clearable placeholder="对象选择">
  <el-option
v-for="item in [
{ value: 44, label: '测试1' },
{ value: 441, label: '测试2' }
]"
:key="item.value"
:label="item.label"
:value="item"
  />
  </el-select>
  <el-select v-model="testValue" clearable placeholder="请选择输入">
  <el-option
v-for="item in [
{ value: 44, label: '测试1' },
{ value: 441, label: '测试2' }
]"
:key="item.value"
:label="item.label"
:value="item.value"
  />
  </el-select>
