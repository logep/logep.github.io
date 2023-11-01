如果在 `vercel.json` 配置中使用了 `dest`，但在项目设置中使用的目录名为 `dist`，通常这不会引发问题，因为 `dest` 只是一个自定义的目录别名，你可以在配置中指定不同的目录别名。

在 `vercel.json` 中，你可以定义 `dest` 属性，以及它在部署时所指向的目录。例如：

```json
{
  "version": 2,
  "builds": [{ "src": "vue-app/", "use": "@vercel/node", "dest": "custom-dist" }],
  "routes": [{ "handle": "filesystem" }, { "src": "/vue-app/(.*)", "dest": "custom-dist/$1" }]
}
```

在上述配置中，`dest` 被定义为 `"custom-dist"`，而路由规则也使用了这个目录别名。然而，在 Vercel 项目设置中，你仍然需要指定实际的构建输出目录，这通常是 Vue.js 项目的 `dist` 目录。

所以，在项目设置中，你应该将输出目录设置为实际的 Vue.js 项目构建目录，例如：

- **构建命令**: `npm run build`
- **输出目录**: `dist`

这会告诉 Vercel 在构建完成后将 Vue.js 项目的产物输出到 `dist` 目录，并将它映射到 `custom-dist`，这样你的路由规则就能够正确指向构建后的文件。

总结，`dest` 在 `vercel.json` 中只是一个自定义目录别名，而实际的构建输出目录需要在项目设置中指定，通常是 Vue.js 项目的 `dist` 目录。
