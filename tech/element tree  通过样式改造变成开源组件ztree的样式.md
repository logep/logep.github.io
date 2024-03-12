<style lang="scss" scoped>
::v-deep {
  .el-tree__drop-indicator {
    height: 3px;
  }
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: transparent !important;
  }
  .el-tree--highlight-current .el-tree-node.is-current > .span-text-slot > .custom-tree-node {
    background-color: #99fffd !important;
  }
  .el-tree-node:focus > .el-tree-node__content,
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: transparent !important;
  }

  .el-tree-node.is-current > .el-tree-node__content > .span-text-slot > .custom-tree-node {
    background-color: #99fffd !important;
  }
  .el-tree-node.is-current > .el-tree-node__content > .span-text-slot > .custom-tree-node {
    background-color: #99fffd !important;
  }

  .el-tree-node__content > .el-tree-node__expand-icon {
    padding: 0 0 0 6px;
  }

  .el-tree-node__label {
    font-size: 12px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 8px;
  }
  .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .el-icon-caret-right:before {
    background: url('~@/assets/tree.png') no-repeat -74px -18px;
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    font-size: 16px;
  }
  // 已经展开且有子节点
  .el-tree-node__expand-icon.expanded.z-icon-caret-right:before {
    background: url('~@/assets/tree.png') no-repeat -92px -18px;
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    font-size: 16px;
  }

  .el-tree-node__expand-icon.is-leaf {
    content: '';
    display: block;
    width: 16px;
    height: 18px;
    font-size: 16px;
  }
  // 没有子节点
  .el-tree-node__expand-icon.is-leaf::before {
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    font-size: 16px;
    background: url('~@/assets/tree.png') no-repeat -56px -18px;
  }
  // 文字长度超出容器宽度换行显示
  .el-tree-node__content {
    height: auto;
    line-height: 18px;
    &:hover {
      background: none;
    }
  }

  .el-tree > .el-tree-node .el-tree-node__children {
    overflow: initial;
    background: url('~@/assets/line_conn.gif') 6px 0 repeat-y;
    margin: 0;
  }
  .el-tree .el-tree-node .el-tree-node__children .el-tree-node__children {
    overflow: initial;
    background: url('~@/assets/line_conn.gif') 24px 0 repeat-y;
    margin: 0;
  }
  .el-tree > .el-tree-node:nth-last-child(2) > .el-tree-node__children {
    background: none;
  }
  .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node:last-child .el-tree-node__children {
    background: none;
  }
}
</style>
