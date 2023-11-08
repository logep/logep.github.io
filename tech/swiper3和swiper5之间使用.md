vue2  这个是正确使用方法 用的swiper的5的版本
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

这个是用swiper3版本的引入css样式的方式
import 'swiper/dist/css/swiper.css'



swiper3 一排显示三个  完整显示三个
要在 Swiper 3 中配置一排显示三个完整显示的幻灯片，你可以使用 `slidesPerView` 和 `spaceBetween` 选项来实现。以下是一个示例配置：
  slidesPerView: 3, // 设置每行显示的幻灯片数量
  slidesPerGroup: 3, // 控制滑动组的数量，与 slidesPerView 相同
  spaceBetween: 10, // 设置幻灯片之间的间隔

  
```javascript
new Swiper('.swiper-container', {
  slidesPerView: 3, // 设置每行显示的幻灯片数量
  spaceBetween: 0, // 设置幻灯片之间的间隔，如果希望完全显示三个幻灯片，可以将间隔设置为 0
  // 其他选项配置
})
```

在上面的配置中，`slidesPerView` 选项被设置为 3，这表示每行显示三个幻灯片。 `spaceBetween` 选项被设置为 0，以确保三个幻灯片完全显示在一行中。

你还可以根据需要添加其他选项，例如自动播放、导航按钮等，以满足你的具体需求。

确保将这个配置代码放在 Vue 组件的 `mounted` 钩子或在适当的生命周期阶段初始化 Swiper。
如果你设置了 `spaceBetween` 为 10，同时滚动到最后一个幻灯片时，它可能显示不完整的原因是因为 `spaceBetween` 的间隔在最后一个幻灯片的右侧也会生效，导致最后一个幻灯片被部分遮挡。为了解决这个问题，你可以考虑使用 `slidesPerGroup` 选项来控制滑动组的数量，以确保最后一个幻灯片能够完整显示。以下是一个示例配置：

```javascript
new Swiper('.swiper-container', {
  slidesPerView: 3, // 设置每行显示的幻灯片数量
  slidesPerGroup: 3, // 控制滑动组的数量，与 slidesPerView 相同
  spaceBetween: 10, // 设置幻灯片之间的间隔
  // 其他选项配置
})
```

通过将 `slidesPerGroup` 设置为与 `slidesPerView` 相同的值，确保每次滑动时都会滚动完整的行，从而避免最后一个幻灯片显示不完整的问题。

这个配置将每次滚动三个幻灯片，并且 `spaceBetween` 选项设置为 10，确保每行之间有 10 像素的间隔，而最后一个幻灯片也能完整显示。








如果你想在使用Swiper 3插件的Vue项目中使用npm来引入Swiper 3及其插件，你可以按照以下步骤操作：

1. 安装Swiper 3及其插件:

   在你的Vue项目目录中，使用npm安装Swiper 3及其插件，你需要安装Swiper 3核心库和特定的插件，例如Swiper的Autoplay插件。

   ```bash
   npm install swiper@3 --save
   npm install swiper@3/dist/js/swiper.jquery.min.js --save
   ```

   上述命令会安装Swiper 3核心库和jQuery版本，以及Autoplay插件。你可以根据你的项目需求安装其他插件。

2. 在Vue组件中引入Swiper和插件:

   打开你的Vue组件，通常是一个`.vue`文件。在该组件的`<script>`部分，使用`import`语句引入Swiper库和插件。

   ```javascript
   import Swiper from 'swiper'
   import 'swiper/dist/css/swiper.css' // 导入Swiper的CSS样式

   // 引入Swiper的Autoplay插件
   import 'swiper/dist/js/swiper.jquery.min.js'

   export default {
     mounted() {
       // 在组件的生命周期钩子中初始化Swiper
       new Swiper('.swiper-container', {
         // Swiper的选项配置
       })
     }
   }
   ```

   请确保在引入Swiper之前，你已经通过`import`语句引入了Swiper的CSS样式文件。

3. 在模板中创建Swiper容器:

   在你的Vue组件的模板部分，创建一个容器元素，它将用作Swiper的容器。

   ```vue
   <template>
     <div>
       <div class="swiper-container">
         <div class="swiper-wrapper">
           <!-- 插入你的Swiper幻灯片内容 -->
         </div>
       </div>
     </div>
   </template>
   ```

   在上面的代码中，我们创建了一个具有`swiper-container`类的`<div>`元素，它将用于初始化Swiper。

4. 配置Swiper选项:

   根据你的需要，你可以在Swiper初始化时配置选项，例如指定幻灯片的数量、自动播放、导航按钮等。

   ```javascript
   new Swiper('.swiper-container', {
     slidesPerView: 2, // 设置每个滑块的数量
     spaceBetween: 20, // 设置滑块之间的间隔
     autoplay: 3000, // 自动播放，每个幻灯片3秒切换
     navigation: {
       nextEl: '.swiper-button-next',
       prevEl: '.swiper-button-prev',
     },
   })
   ```

   这是一个简单的示例，你可以根据Swiper 3的文档自定义选项。

通过按照上述步骤，在Vue项目中引入Swiper 3及其插件，你可以开始使用Swiper来创建幻灯片。确保根据你的项目需求安装和配置适当的插件和选项。













