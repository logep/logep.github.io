```

import cloud from '@lafjs/cloud'
const apiKey = 'your apikey'

export default async function (ctx: FunctionContext) {
  const { ChatGPTAPI } = await import('chatgpt')
  const { body, response } = ctx

  // get chatgpt api
  let api = cloud.shared.get('api')
  if (!api) {
    api = new ChatGPTAPI({ apiKey })
    cloud.shared.set('api', api)
  }

  // set stream response type
  response.setHeader('Content-Type', 'application/octet-stream');

  // send message
  const res = await api.sendMessage(body.message, {
    onProgress: (partialResponse) => {
      if (partialResponse?.delta != undefined)
        response.write(partialResponse.delta)
    },
    parentMessageId: body.parentMessageId || ''
  })

  response.end("--!" + res.id)
}

```
