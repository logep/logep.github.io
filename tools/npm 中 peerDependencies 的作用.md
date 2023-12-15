> 本文原文地址 [www.cnblogs.com](https://www.cnblogs.com/fitzlovecode/p/peerDependencies.html) 目录

*   [npm 中 peerDependencies 的作用](#npm中peerdependencies的作用)

npm 中 peerDependencies 的作用[#](#npm中peerdependencies的作用)
=======================================================

peerDependencies 一般是给插件使用的, 它的作用有以下几点:

1.  要求项目拥有 peerDependencies 所指定的环境依赖, 完成子环境要求父环境具有某些依赖包
2.  提升项目 (插件) 依赖
3.  减少重复安装依赖

例如: 我的项目叫 `项目A` , 其内部安装了一个插件叫 `插件B` , `插件B` 的`package.json` 如下:

```
    // 插件B package.json
    {
        "peerDependencies": {
            "vue": ">=2.6.4"
        }
    }


```

则需要我的 `项目A` 安装有依赖 `vue@2.6.4` , 即 `项目A` 的 `package.json` 或`node_modules` 要是这样:

```
    // 项目A package.json
    {
        "dependencies": {
            "vue": "^2.6.4",
            "插件B": "^1.0.0"
        }
    }


```

```
# 项目A 的目录结构
+---项目A
|
|
+---node_modules
    +---vue
    |       package.json
    |
    +---插件B
            package.json


```

第一点解释完成。

那疑问在于, 既然 `插件B` 需要 `vue@>=2.6.4` , 为什么不将其放在 `dependencies` 中呢? 因为这样的话整个 `项目A` 的文件结构将是这样:

```
# 项目A 的目录结构
+---项目A
|
|
+---node_modules
|
|
+---插件B
        package.json
        +---vue
            package.json


```

这样的意思是 `插件B` 的开发用到了 `vue@>=2.6.4` , **而真正需要的意思是: `插件B` 要在 `vue@>=2.6.4` 的环境中使用** , 那么第二点解释完成

还有这样情况, 项目 A 依赖了 vue@2.6.5, 而插件 B 的开发需要用到 vue@>=2.6.4, 此时项目 A 的 `package.json` 或 `node_modules` 将是这样:

```
    // 项目A package.json
    {
        "dependencies": {
            "vue": "^2.6.5",
            "插件B": "^1.0.0"
        }
    }


```

```
    // 插件B package.json
    {
        "dependencies": {
            "vue": "^2.6.4",
        }
    }


```

```
# 项目A 的目录结构
+---项目A
|
|
+---node_modules
    +---vue
    |       package.json
    |
    +---插件B
        package.json
        +---vue
            package.json


```

这样的话 `项目A` 会重复安装两次不同版本的 `vue` , 但是可以发现: `插件B` 对 `vue` 的依赖版本刚好在 `项目A` 的范围内, 于是我们如果设置了 `插件B` 的 `package.json` 为这样:

```
    // 插件B package.json
    {
        "peerDependencies": {
            "vue": ">=2.6.4",
        }
    }


```

那么 `插件B` 将不会安装 `vue` 而是使用 `项目A(父环境)` 中的 `vue` , 从而减少重复安装依赖的情况, 最后 `项目A` 与 `插件B` 的 `package.json` 或 `node_modules` 将是这样:

```
    // 项目A package.json
    {
        "dependencies": {
            "vue": "^2.6.5",
            "插件B": "^1.0.0"
        }
    }


```

```
    // 插件B package.json
    {
        "peerDependencies": {
            "vue": ">=2.6.4"
        }
    }


```

```
# 项目A 的目录结构
+---项目A
|
|
+---node_modules
    +---vue
    |       package.json
    |
    +---插件B
            package.json


```

第三点解释完成, 本文结束

到这其实对 `peerDependencies` 还是不怎么了解, 暂且写下本文记录着先, 有错请指出!
