```
import cloud from '@lafjs/cloud'

export default async function (ctx: FunctionContext) {
  cloud.shared.delete('chatgpt_api')
}

=====

import cloud from '@lafjs/cloud'
export async function main(ctx: FunctionContext) {
  const { ChatGPTAPI } = await import('chatgpt')

  // post 请求传入 parentMessageId和 question，前端保留上一次的parentMessageId，前端保留上一次的
  const parentMessageId = ctx.body.parentMessageId
  const question = ctx.body.question

  // 从缓存中获取 api ，api 保存到缓存后，可以自动保留上下文
  let api = cloud.shared.get('chatgpt_api')
  if (!api) {
    api = new ChatGPTAPI({
      apiKey: process.env.CHAT_GPT_API_KEY
    })
    cloud.shared.set('chatgpt_api', api)
  }

  if (parentMessageId){
    // 传入 parentMessageId 追踪上下文
    res = await api.sendMessage(question, {
      parentMessageId: parentMessageId
    })
  }else{
    // 传入 parentMessageId 追踪上下文
    res = await api.sendMessage(question)
  }
  
  console.log(res.text)

  // 返回全部的值，里面包括 parentMessageId
  return res
}

=======

import cloud from '@lafjs/cloud'
export async function main(ctx: FunctionContext) {

  // 引入 chatgpt 依赖 ，文档地址：https://www.npmjs.com/package/chatgpt
  const { ChatGPTAPI } = await import('chatgpt')

  // 新建 ChatGPTAPI 实例，需要去环境变量配置 Key
  const api = new ChatGPTAPI({ apiKey: process.env.CHAT_GPT_API_KEY })

  // 第一次提问 
  let res = await api.sendMessage('“鸡你太美”指的是中国大陆哪位男艺人？给你个提示，他喜欢唱、跳、篮球、Rap')
  console.log("第一次问答结果",res)

  // 传入第一次问答结果的 res.id 作为第二次的 parentMessageId 追踪上下文
  res = await api.sendMessage('不对，他姓蔡，请重新回答', {
    parentMessageId: res.id
  })
  console.log("第二次问答结果",res)

  // 返回第二次问答的答案
  return res.text
}

```
