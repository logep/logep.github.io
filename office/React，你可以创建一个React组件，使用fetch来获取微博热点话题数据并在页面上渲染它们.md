要将你的原始Node.js脚本转换为React，你可以创建一个React组件，使用`fetch`来获取微博热点话题数据并在页面上渲染它们。以下是一个示例React组件的代码：

```jsx
import React, { Component } from 'react';

class HotTopics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotTopics: [],
    };
  }

  componentDidMount() {
    this.getHotTopics();
  }

  async getHotTopics() {
    try {
      const response = await fetch('https://weibo.com/ajax/side/hotSearch');
      const data = await response.json();
      const hotTopics = data.data.realtime;
      this.setState({ hotTopics });
    } catch (error) {
      console.error('Failed to get hot topics:', error);
    }
  }

  render() {
    return (
      <div>
        <h1>微博热点话题</h1>
        <ul>
          {this.state.hotTopics.map((topic) => (
            <li key={topic.id}>
              <a href={`https://s.weibo.com/weibo?q=${topic.word}`} target="_blank" rel="noopener noreferrer">
                {topic.word}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HotTopics;
```

这个React组件将获取微博热点话题的数据，并在`componentDidMount`生命周期方法中调用`getHotTopics`函数来加载数据。然后，它会使用`map`方法将热点话题渲染为列表项，并为每个话题生成一个链接。

你可以将此组件集成到你的React应用程序中，确保将其正确渲染到页面上。不要忘记在React应用程序中导入和使用这个组件。
