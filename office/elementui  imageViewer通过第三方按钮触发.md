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

## 第二种写法
```
        <el-image
                  v-for="item in srcList"
                  :key="item"
                  style="width: 100px; height: 100px;margin-right: 10px"
                  :src="item"
                  @click="onPreview(item)"
                  fit="none"
                ></el-image>

// 这个放到某个角落
  <el-image
      ref="imagePreview"
      :initialIndex="initialIndex"
      :src="clickImg"
      style="width: 0;height:0;"
      :preview-src-list="thumbnailFileList"
    />

 onPreview(row) {
      this.thumbnailFileList = []//这段很重要
      this.$nextTick(() => {
        this.thumbnailFileList = this.srcList.map(item => item)
        this.clickImg = row
        this.initialIndex = this.thumbnailFileList.indexOf(this.clickImg)
        this.$nextTick(() => {
          this.$refs.imagePreview.clickHandler()
        })
      })
  
    },
```
