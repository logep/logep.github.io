在Vue框架中，如果一个方法不存在但却被使用，Vue默认是不会在编译阶段报错的，因为Vue在模板编译的时候不会对方法的存在性进行检查。

如果你希望在开发阶段能够更早地发现类似的错误，可以考虑使用 TypeScript 来进行 Vue 项目的开发。TypeScript 具有静态类型检查功能，它可以在编译阶段检测出一些常见的错误，包括不存在的方法调用。

以下是一些配置步骤：

1. **安装 TypeScript：**

   ```bash
   npm install --save-dev typescript
   ```

2. **创建 `tsconfig.json` 文件：**

   在项目根目录下创建一个 `tsconfig.json` 文件。你可以运行以下命令来初始化：

   ```bash
   npx tsc --init
   ```

   然后修改 `tsconfig.json` 文件，确保 `strict` 选项为 `true`：

   ```json
   {
     "compilerOptions": {
       // 其他配置项...
       "strict": true
     }
   }
   ```

3. **将 `.vue` 文件交给 `vue-tsc` 处理：**

   在 `tsconfig.json` 文件中的 `include` 配置项中添加对 `.vue` 文件的处理：

   ```json
   {
     "include": [
       "src/**/*.ts",
       "src/**/*.d.ts",
       "src/**/*.tsx",
       "src/**/*.vue"
     ]
   }
   ```

4. **在组件中使用 TypeScript：**

   将你的 Vue 单文件组件（`.vue` 文件）的 `<script>` 部分改为 `.ts` 或 `.tsx`，并声明你的组件方法和属性的类型：

   ```typescript
   <script lang="ts">
   import { Component, Vue } from 'vue';

   @Component
   export default class YourComponent extends Vue {
     editiew(): void {
       // your method implementation
     }
   }
   </script>
   ```

   这样，如果在模板中调用不存在的方法，TypeScript 将会在编译时报错。这样的配置可以帮助你更早地发现潜在的问题。
