```
按钮触发
 onPreview(row) {

      this.thumList = this.List(row)
     
      if (this.thumList.length) {
        this.$nextTick(() => {
          this.$refs.imagePreview.clickHandler()
       
        })
      }


<el-image
      ref="imagePreview"
      :src="thumList[0]"
      style="width: 0;height:0;"
      @click="handleClickStop"
      :preview-src-list="thumList"
    >
    </el-image>
handleClickStop() {
    
 
      this.$nextTick(() => {
        let domImageView = document.querySelector('.el-image-viewer__mask') // 获取遮罩层dom
        if (!domImageView) {
          return
        }
        domImageView.addEventListener('click', () => {

          document.querySelector('.el-image-viewer__close').click()
        })
      })
    },
```
