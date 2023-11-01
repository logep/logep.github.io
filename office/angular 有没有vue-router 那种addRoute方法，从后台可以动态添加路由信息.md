在 Angular 中，路由配置通常是静态的，路由信息在应用启动时被预定义，不提供内置的像 Vue Router 的 `addRoute` 方法来动态添加路由信息。Angular 路由通常使用 `RouterModule.forRoot` 来定义应用的初始路由配置。

然而，你可以通过使用 Angular 提供的动态组件加载和 `RouterModule.forChild` 方法，以某种方式实现动态路由的效果。以下是一个简单的示例：

```typescript
import { NgModule, Component, Compiler, Injector, ReflectiveInjector, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dynamic-component',
  template: '<h2>Dynamic Route</h2>'
})
class DynamicComponent { }

@NgModule({
  declarations: [DynamicComponent]
})
export class DynamicModule { }

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <button (click)="addRoute()">Add Dynamic Route</button>
  `
})
export class AppComponent {
  constructor(private compiler: Compiler, private injector: Injector, private viewContainerRef: ViewContainerRef) { }

  addRoute() {
    const dynamicComponent = Component({
      template: '<h2>Dynamic Route</h2>'
    })(DynamicComponent);

    const dynamicModule = NgModule({
      declarations: [dynamicComponent],
      imports: [RouterModule.forChild([
        { path: 'dynamic', component: dynamicComponent }
      ])]
    })(DynamicModule);

    const moduleFactory = this.compiler.compileModuleAndAllComponentsSync(dynamicModule);
    const ngModuleRef = moduleFactory.create(this.injector);

    const factory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    this.viewContainerRef.createComponent(factory);
  }
}
```

在上述示例中，我们创建了一个 `DynamicComponent`，然后通过编程方式定义动态模块 `DynamicModule`，以及动态路由配置。当点击按钮时，我们使用 `Component` 和 `NgModule` 装饰器创建了动态组件和模块，并将它们添加到应用中。这样，就能实现动态添加路由的效果。

请注意，这只是一个示例，实际中可能需要更复杂的实现，具体取决于你的项目需求。 Angular 不像 Vue 提供了直接的 `addRoute` 方法，但你可以通过编程方式创建组件、模块和路由来实现类似的效果。
