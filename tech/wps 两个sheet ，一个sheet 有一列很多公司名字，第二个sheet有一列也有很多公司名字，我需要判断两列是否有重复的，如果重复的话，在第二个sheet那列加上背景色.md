要在WPS中判断两个表格的列是否有重复的公司名字，并在第二个表格中标记重复的单元格，可以按照以下步骤进行操作：

1. 打开WPS表格，并加载两个包含公司名字的工作表（Sheet1和Sheet2）。

2. 在第二个工作表（Sheet2）中，选择你想要添加背景色的公司名字所在的列。

3. 在菜单栏中选择"开始"选项卡，在"样式"组中点击"条件格式"。

4. 在条件格式的下拉菜单中，选择"公式"。

5. 在弹出的对话框中，输入以下公式：
   ```
   =OR(COUNTIF(Sheet1!$A:$A, A1)>0, COUNTIF(Sheet2!$A:$A, A1)>0)
或者
   =COUNTIF(Sheet1!$A:$A, A1)>0
   ```
   这个公式将检查当前单元格在第一个工作表（Sheet1）的列A中是否有重复的。

6. 点击"设置格式"按钮，选择你想要的背景色，然后点击"确定"。

7. 点击"确定"来应用条件格式。

现在，如果第二个工作表（Sheet2）中的公司名字与第一个工作表（Sheet1）中的公司名字重复，对应的单元格将会被着色。

请注意，以上步骤假设公司名字所在的列分别为列A。如果实际情况中公司名字所在的列不同，请相应地修改公式中的列引用（例如，Sheet1!$A:$A和A1）以适应实际情况。
