在notepad++中 用正则 匹配 这个字符串 (../front/showSchoolPageByZY?zylx=&zyxl=B745DC513FFE4E03A7E12F3B5A937B43)  
在 Notepad++ 中使用正则表达式进行字符串匹配时，你可以使用 "查找" 功能来进行匹配。在 Notepad++ 中，可以按下快捷键 `Ctrl + F` 或者选择菜单中的 "搜索" > "查找"。

然后，在 "查找" 对话框中，选择 "正则表达式" 选项，并输入你的正则表达式模式。根据你提供的字符串，正则表达式可能如下：

```
\(.*\)
```

解释：
- `\(` 和 `\)`：用于匹配圆括号，由于圆括号在正则表达式中有特殊含义，所以需要使用 `\` 进行转义。
- `.*`：用于匹配任意字符（除了换行符）的重复，即匹配圆括号内的内容。

将上述正则表达式模式输入到 "查找" 对话框中后，点击 "查找下一个" 按钮（放大镜图标），Notepad++ 将会在文本中查找匹配的字符串。

请注意，正则表达式的匹配可能会受到输入文本的格式和内容影响，你可能需要根据具体情况进行调整。如果有其他特殊字符需要考虑，可以提供更多上下文信息，我将尽力帮助你完善正则表达式。

2. 
href="http://zsxxtp.hnedu.cn:80/jgzsxxpt/front/showSchoolInfo.do?XXDM=3843000012"  这个正则怎么匹配

解答：
要匹配给定的链接字符串 `href="http://zsxxtp.hnedu.cn:80/jgzsxxpt/front/showSchoolInfo.do?XXDM=3843000012"`，你可以使用以下正则表达式模式：

```regex
href="([^"]+)"
```

解释：
- `href="`：匹配字符串中的 `href="` 字符串字面量。
- `([^"]+)`：使用括号创建一个捕获组，它匹配任意非引号字符的连续序列。`[^"]` 表示除了引号外的任意字符。`+` 表示匹配一个或多个连续字符。

在 Notepad++ 中使用上述正则表达式进行匹配时，请确保在 "查找" 对话框中选择 "正则表达式" 选项，并将上述正则表达式模式输入到 "查找" 输入框中。然后点击 "查找下一个" 按钮（放大镜图标），Notepad++ 将会在文本中查找匹配的链接字符串。

如果你需要将链接中的具体 URL 提取出来，你可以使用捕获组，捕获组的内容可以在匹配结果中获取。在上述正则表达式中，链接的 URL 将会作为第一个捕获组的内容。
