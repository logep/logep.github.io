
@media only print and (min-width: 1200px) {
   这里可以加样式前缀 免影响其他页面也有可能的打印样式 .el-col-lg-8 {
        width:33.33333%!important
    }
}

@media only print and (max-width: 767px) {
  这里可以加样式前缀 免影响其他页面也有可能的打印样式  .el-col-xs-24 {
        width:33.33333%!important
    }
}

@media only print and (min-width: 992px) {
  这里可以加样式前缀 免影响其他页面也有可能的打印样式  .el-col-md-12 {
        width:33.33333%!important
    }
}

@media only print and (min-width: 768px) {
 这里可以加样式前缀 免影响其他页面也有可能的打印样式   .el-col-sm-12 {
        width:33.33333%!important
    }
}

@media print {
    html {
        zoom:90%}

    * {
        -webkit-print-color-adjust: exact;
      
    }
}
