  filters: {
    numberToThousands2(val) {
      // if (isNaN(value)) {
      //   return value
      // }
      // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      if (Number.isNaN(Number(val))) return ''
      let numStr = `${Number(val)}`
      let signStr = ''
      if (numStr[0] === '-') {
        signStr = '-'
        numStr = numStr.slice(1)
      }
      const [intStr, floatStr] = numStr.split('.')
      console.log(signStr, intStr, floatStr)
      const intArr = []
      let step = intStr.length % 3
      step = step === 0 ? 3 : step
      for (let i = 0; i < Math.ceil(intStr.length / 3); i++) {
        intArr.push(i === 0 ? intStr.slice(0, step) : intStr.slice(step - 3, step))
        step += 3
      }
      return `${signStr}${intArr.join(',')}${floatStr ? `.${floatStr}` : ''}`
    }
