[object HTMLDivElement] 打印
cloneNode(true) 怎么把这个方法返回的对象变成 dom


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

    const outerHTML = this.dom.outerHTML
    return outerHTML
  },

  writeIframe(content) {
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
