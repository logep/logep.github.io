[object HTMLDivElement] 打印
cloneNode(true) 怎么把这个方法返回的对象变成 dom

//打印 el table 高度问题解决   把元素控制台打印出来 然后可以看到那些元素 是有height:100% 全部去掉即可
如
    const class0 = doc.getElementsByClassName('el-form')
    const class5 = doc.getElementsByClassName('el-table')

// 还有el-form表单 粘在一起了是什么问题

//表头打印表格
https://blog.csdn.net/CHHHKXJH24/article/details/125920805
import ElTable from './components/el-table.js'
Vue.component('el-table',ElTable)
<script>
    import { Table } from 'element-ui';
    export default {
        extends: Table,
        mounted() {
            this.$nextTick(function () {
                let thead = this.$el.querySelector('.el-table__header-wrapper thead');
                let theadNew = thead.cloneNode(true);
                this.$el.querySelector('.el-table__body-wrapper table').appendChild(theadNew);
            })
        },
    }
</script>
<style scoped>
    .el-table >>> .el-table__body-wrapper thead {
        display: none;
    }
    @media print {
        .el-table >>> .el-table__header-wrapper {
            display: none;
        }
        .el-table >>> .el-table__body-wrapper thead {
            display: table-header-group;
        }
    }
</style>



// 打印类属性、方法定义
// xyl66
const Print = function(dom, options) {
  if (!(this instanceof Print)) return new Print(dom, options)

  this.options = this.extend(
    {
      noPrint: '.no-print'
    },
    options
  )
  this.dom = dom
  this.writeIframe()
}
Print.prototype = {
  extend(obj, obj2) {
    for (const k in obj2) {
      obj[k] = obj2[k]
    }
    return obj
  },

  getStyle() {
    let str = ''
    // eslint-disable-next-line prefer-const
    let styles = document.querySelectorAll('style,link')
    for (let i = 0; i < styles.length; i++) {
      str += styles[i].outerHTML
    }
    str += `<style>${this.options.noPrint ? this.options.noPrint : '.no-print'}{display:none;}</style>`

    return str
  },

  getHtml(doc) {
    console.log(doc)
    console.log('==--------------------------------------------')
    const inputs = doc.querySelectorAll('input')
    const textareas = doc.querySelectorAll('textarea')
    const selects = doc.querySelectorAll('select')

    for (let k = 0; k < inputs.length; k++) {
      if (inputs[k].type === 'checkbox' || inputs[k].type === 'radio') {
        if (inputs[k].checked === true) {
          inputs[k].setAttribute('checked', 'checked')
        } else {
          inputs[k].removeAttribute('checked')
        }
      } else if (inputs[k].type === 'text') {
        inputs[k].setAttribute('value', inputs[k].value)
      } else {
        inputs[k].setAttribute('value', inputs[k].value)
      }
    }

    for (let j = 0; j < textareas.length; j++) {
      const formLabel = textareas[j].closest('.z-textarea')
      // 如果相关联，则获取 label 元素的文本值
      if (formLabel && textareas[j].value) {
        formLabel.innerHTML = textareas[j].value
      }
    }

    for (let k3 = 0; k3 < selects.length; k3++) {
      if (selects[k3].type === 'select-one') {
        const child = selects[k3].children
        for (const i in child) {
          if (child[i].tagName === 'OPTION') {
            if (child[i].selected === true) {
              child[i].setAttribute('selected', 'selected')
            } else {
              child[i].removeAttribute('selected')
            }
          }
        }
      }
    }

// 去除el table的相关
 const class1 = doc.getElementsByClassName('el-table__body')
    const class2 = doc.getElementsByClassName('el-table__header')
    const class3 = doc.getElementsByClassName('el-table__footer')
    const class4 = doc.getElementsByClassName('el-table__empty-block')

    for (let i = 0; i < class1.length; i++) {
      class1[i].setAttribute('style', 'width:100%')
      const col = class1[i].querySelector('colgroup')
      if (col && col.parentNode) {
        col.parentNode.removeChild(col)
      }
      const td = class1[i].querySelectorAll('td')
      for (let i = 0; i < td.length; i++) {
        td[i].querySelector('div') && td[i].querySelector('div').removeAttribute('style')
      }
    }
    for (let i = 0; i < class2.length; i++) {
      class2[i].setAttribute('style', 'width:100%')
      const col = class2[i].querySelector('colgroup')

      if (col && col.parentNode) {
        col.parentNode.removeChild(col)
      }
      const th = class2[i].querySelectorAll('th')
      for (let i = 0; i < th.length; i++) {
        th[i].querySelector('div') && th[i].querySelector('div').removeAttribute('style')
      }
    }
    for (let i = 0; i < class3.length; i++) {
      class3[i].setAttribute('style', 'width:100%')
      const col = class3[i].querySelector('colgroup')

      if (col && col.parentNode) {
        col.parentNode.removeChild(col)
      }
      const th = class3[i].querySelectorAll('th')
      for (let i = 0; i < th.length; i++) {
        th[i].querySelector('div') && th[i].querySelector('div').removeAttribute('style')
      }
    }
    for (let i = 0; i < class4.length; i++) {
      class4[i].setAttribute('style', 'width:100%')
    }
  },
   writeIframe(dom) {
      const iframe = document.createElement('iframe')
      let contentB = document.querySelector('body')
      iframe.style.width = '100%'
      contentB.appendChild(iframe)
      const con = dom.cloneNode(true)
      this.getHtml(con)
      let doc = iframe.contentDocument
      doc.write(this.getStyle())
      // doc.write('<div></div>')
      doc.close()
      iframe.onload = () => {
        iframe.contentDocument.body.appendChild(con)
        this.toPrint(iframe.contentWindow)
      }
    },

// 这个方法写的有问题
  writeIframe2(content) {
    const iframe = document.createElement('iframe')
    iframe.id = 'myIframe'
    iframe.style.width = '100%'
    document.body.appendChild(iframe)
    const con = this.dom.cloneNode(true)
    this.getHtml(con)
    const contentDocument = iframe.contentWindow.document
    const container = contentDocument.createElement('div')
    container.innerHTML = this.getStyle()
    contentDocument.body.appendChild(container)
    contentDocument.body.appendChild(con)
    // eslint-disable-next-line no-underscore-dangle
    const _this = this
    iframe.onload = function() {
      _this.toPrint(iframe.contentWindow)
      setTimeout(function() {
        document.body.removeChild(iframe)
      }, 100)
    }
  },

  toPrint(frameWindow) {
    try {
      setTimeout(function() {
        frameWindow.focus()
        try {
          if (!frameWindow.document.execCommand('print', false, null)) {
            frameWindow.print()
          }
        } catch (e) {
          frameWindow.print()
        }
        frameWindow.close()
      }, 10)
    } catch (err) {
      console.log('err', err)
    }
  }
}
export default Print
