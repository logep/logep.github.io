给根元素增加   -webkit-print-color-adjust: exact; 即可解决
如果打印的表格不连续 或者断字比较严重
考虑使用 
  word-break: break-all;
  word-wrap: break-word;
  来解决

  如果需要给整个文档缩小或者放大 多少倍，用 zoom来控制
  如果需要隐藏或者显示某个元素  通过 print的css 来控制显隐
  @media print {
  html {
    zoom: 70%;
  }

  .no-print-hidden-law-web {
    display: block;
  }
}
