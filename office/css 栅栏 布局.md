> 本文原文地址 [zhuanlan.zhihu.com](https://zhuanlan.zhihu.com/p/487624607)

> 库存译文，原文翻译于 2021/03/02，译文以 CC BY-NC-SA 4.0 协议公开。  
> 如果译文侵权，麻烦提供著作权所有人证明并联系本人，本人会在第一时间删除。  
> 本文仅供学习、研究用。

> 原文地址：[Responsive CSS Grid: The Ultimate Layout Freedom](https://link.zhihu.com/?target=https%3A//medium.muz.li/understanding-css-grid-ce92b7aa67cb)  
> 原文作者：[Christine Vallaure](https://link.zhihu.com/?target=https%3A//medium.com/%40christinevallaure)  
> 译者：[霜羽 Hoarfroster](https://link.zhihu.com/?target=https%3A//github.com/PassionPenguin)  
> 校对者：[zenblo](https://link.zhihu.com/?target=https%3A//github.com/zenblo)、[Chorer](https://link.zhihu.com/?target=https%3A//github.com/Chorer)、[lsvih](https://link.zhihu.com/?target=https%3A//github.com/lsvih)

![](https://pic1.zhimg.com/v2-f60234ead69f7017045b2c8c251e9f64_r.jpg)

CSS 栅格布局（Grid）是一种全新的在 Web 上创建二维布局的方法。我们仅需几行 CSS，就可以创建一个之前不用 JavaScript 根本不可能实现的栅格布局。我们不需要任何插件或复杂的安装步骤，不需要繁琐的附加文件，同时也不需要局限于 12 列的栅格布局（译者注：指 Bootstrap 提供的 12 栅格系统）。

我们可以使用什么栅格？
-----------

简而言之：我们实际上可以使用**几乎所有能够想到的栅格布局**，并且还不限于此。我们可以自由地选择不同栅格的尺寸、大小和位置。你可以在[栅格示例](https://link.zhihu.com/?target=https%3A//gridbyexample.com/examples/)中找到最常见的带有标记的栅格的概述。

### 让我们从构建示例的 HTML 标记开始吧！

一个类名为 `container` 的 `div` 元素容纳了 5 个子 `div` 元素，或称之为项目（当然，可以比 5 个更多或者更少）。如果你愿意，我们可以直接从 [CodePen 中的 HTML 和 CSS 标记](https://link.zhihu.com/?target=https%3A//codepen.io/chrisvall/pen/YJJdxQ)代码入手。

```
<div class="container">
    <div class="item color-1">item-1</div>
    <div class="item color-2">item-2</div>
    <div class="item color-3">item-3</div>
    <div class="item color-4">item-4</div>
    <div class="item color-5">item-5</div>
</div>
```

![](https://pic2.zhimg.com/v2-4938e5d9fc1610c3a4b7ea95cb332101_r.jpg)

### 基础：在 CSS 中设置栅格和行列

在 CSS 中，我们可以通过 `display: grid` 定义将 `.container` 类的元素变为栅格布局。通过使用 `grid-template-columns`，我们划分了所需的列（本例中将划分 5 列，每列设置为 250px）。通过使用 `grid-template-rows`，我们可以设置行的高度（如果需要的话），本例中是 150px。完成以上步骤之后，我们就实现了第一个栅格布局！

```
.container {
    display: grid;
    grid-template-columns: 250px 250px 250px 250px 250px;
    grid-template-rows: 150px;
}

/* 缩写：
 grid-template-columns: repeat(5, 250px); */
```

![](https://pic3.zhimg.com/v2-338d1345226725621099d0c6d312c5e2_r.jpg)

### 设置间隔

我们可以使用 `grip-gap` 来设置每一项之间的间隔，也可以使用 `column-gap` 和 `row-gap` 分别设置水平和垂直的间隔。顺便提一句，我们可以使用所有通用单位，例如使用 `px` 用于设置固定的间隔，或使用 `％` 来设置自适应的间隔。

```
.container {
    display: grid;
    grid-template-columns: repeat(5, 250px);
    grid-template-rows: 150px;
    grid-gap: 30px;
}
```

![](https://pic2.zhimg.com/v2-582b041ac432f86792ca214f91d1ff0d_r.jpg)

译者注：在 Chrome 91，Safari 14.0.2，Firefox 86.0a1 均未有此现象，估摸为原文笔误或版本不同

### 使用 `fr` 自动填充剩余空间

这可是每一个设计师的梦想！我们可以使用 **分数单位**（Fractional Units）或简写 `fr`，根据我们自己的想法分配可用空间！例如，在这里，我们将屏幕空间划分为 6 个部分。 第一列占用空间的 1/6 = 1fr，第二列 3/6 = 3fr，第三列 2/6 = 2fr。当然，我们也可以根据需要添加 `grid-gap`。

```
.container {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
}
```

![](https://pic3.zhimg.com/v2-79a90a3b70e166ebecad5a7f0a49ce76_r.jpg)

现在所有的行都是自适应的！

### 混合使用 `px` 和 `fr` 构建自适应而又固定的列

`px` 和 `fr` 的按需同时使用可以让栅格适应可用的空间，这非常好用！

```
.container {
    display: grid;
    grid-template-columns: 300px 3fr 2fr;
}
```

![](https://pic2.zhimg.com/v2-df773adb0eff1561153d4d3c67c6f7c5_r.jpg)

### 排序上的绝对自由

私以为，最棒的是在栅格中，我们可以自由设置每一项所占用的尺寸！我们可以用 `grid-column-start` 设置起点，并用 `grid-column-end` 设置终点，或采用缩写方式 `grid-column: startpoint / endpoint;`：

```
.container {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
}

.item-1 {
    grid-column: 1 / 4;
}

.item-5 {
    grid-column: 3 / 4;
}
```

![](https://pic4.zhimg.com/v2-52d5b4f9c57f14efc6719a9ee830cb97_r.jpg)

别被栅格线所迷惑，它们总是在第一项的开始！

### 同样适用于垂直或全区域的分布！

在这方面 CSS Grid 耀眼十足，表现出了对比 Bootstrap 和 Co 的优越性 —— 借助 `grid-row`，每一项都可以定义任意的位置及宽度。正如我们将在下一个示例中看到的那样，这对于适应不同屏幕尺寸和设备具有绝对优势：

```
.container {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
}

.item-2 {
    grid-row: 1 / 3;
}

.item-1 {
    grid-column: 1 / 4;
    grid-row: 3 / 4;
}
```

![](https://pic1.zhimg.com/v2-583a51fe2badbfb64dbf9dee2bfaed98_r.jpg)

### 想要适应不同的屏幕尺寸和设备？当然没问题！

CSS Grid 与常规栅格相比也具有明显的优势，根据屏幕大小，我们不仅可以通过媒体查询从自适应值切换到固定值，还可以调整整个项目的位置！

```
.container {
    display: grid;
    grid-template-columns: 250px 3fr 2fr;
}

.item-1 {
    grid-column: 1 / 4;
}

.item-2 {
    grid-row: 2 / 4;
}

@media only screen and (max-width: 720px) {
    .container {
        grid-template-columns: 1fr 1fr;
    }

    .item-1 {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
    }

    .item-2 {
        grid-row: 1 / 1;
    }
}
```

![](https://pic3.zhimg.com/v2-754a01006f8a42b950ce348153fb86fe_r.jpg)

浏览器支持
-----

现在，所有现代浏览器（Safari、Chrome、Firefox、Edge）都原生地支持 CSS Grid。凭借 87.85% 的全球支持率（译者注：截止至 2022 年 3 月 25 日，支持率为 94.69%），CSS Grid 已经成为 Boostrap 和 Co 的替代品。

![](https://pic4.zhimg.com/v2-0541c55b1d771168a52ed67c6bb30197_r.jpg)

CSS 栅格的实践案例
-----------

*   [christinevallaure.com,](https://link.zhihu.com/?target=http%3A//www.christinevallaure.com/)，UX/UI 设计
*   [moonlearning.io](https://link.zhihu.com/?target=https%3A//moonlearning.io/)，UX/UI 在线课程
*   [Slack](https://link.zhihu.com/?target=https%3A//slack.com/intl/de-de/)，企业网站
*   [Medium](https://link.zhihu.com/?target=https%3A//medium.com/)，原文发布的地方
*   [Skyler Hughes](https://link.zhihu.com/?target=https%3A//photo.skylerhughes.com/)，摄影网站
*   [Max Böck](https://link.zhihu.com/?target=https%3A//mxb.at/)，前端开发者网站
*   [Design+Code](https://link.zhihu.com/?target=https%3A//designcode.io/)，Web 设计师站点
*   [Hi Agency, Deck](https://link.zhihu.com/?target=http%3A//www.hi.agency/deck/)，模版页面

在你开始使用 Grid 之前
--------------

我想你可能还会喜欢我在 [moonlearning.io](https://link.zhihu.com/?target=https%3A//moonlearning.io/) 或[完整的设计移交到开发课程](https://link.zhihu.com/?target=https%3A//www.udemy.com/course/design-handoff/%3FreferralCode%3D1296BF141742FFA166C2) 上发布的其它文章和课程（有关如何使用 Grid 的更多信息！）。
