
// 防止pc端disable状态下，placeholder样式问题
input::-webkit-input-placeholder{
  -webkit-text-fill-color: #c0c4cc;
  color:#c0c4cc;
  }
  textarea::-webkit-input-placeholder{
  -webkit-text-fill-color: #c0c4cc;
  color:#c0c4cc;
  }
  input:disabled,
textarea:disabled {
-webkit-text-fill-color: #5b5b5b;
-webkit-opacity: 1;
color: #5b5b5b;
}
