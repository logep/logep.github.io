下面是一个基于 Vue 2 的简单示例，演示如何在前端实现获取短信验证码并每隔一分钟发一次：

```vue
<template>
  <div>
    <button :disabled="countdown > 0" @click="sendVerificationCode">
      {{ countdown > 0 ? `${countdown}秒后重新发送` : '获取验证码' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 0,
      timer: null
    }
  },
  methods: {
    sendVerificationCode() {
      // 模拟发送验证码请求
      // 发送成功后开始倒计时
      this.startCountdown()
    },
    startCountdown() {
      // 设置倒计时为60秒
      this.countdown = 60

      // 启动定时器，每秒减少一秒，直到倒计时结束
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    }
  },
  beforeDestroy() {
    // 在组件销毁之前清除定时器，避免内存泄漏
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
```

在这个示例中：

- 点击按钮触发 `sendVerificationCode` 方法，模拟发送验证码请求。
- 发送成功后调用 `startCountdown` 方法开始倒计时。
- `startCountdown` 方法设置 `countdown` 变量为 60，表示倒计时60秒。
- 启动一个定时器，每秒减少 `countdown` 的值，直到倒计时结束。
- 倒计时结束后清除定时器，避免内存泄漏。

这个示例可以直接在 Vue 2 的项目中使用，用于获取短信验证码并每隔一分钟发一次。
