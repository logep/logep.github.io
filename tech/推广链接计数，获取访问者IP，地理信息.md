```

##使用方式：
/**
 * 使用指南
 * 1. 去 https://ipgeolocation.io/ 网站获取一个免费的 apiKey
 * 2. 在 ipTolocation 函数中填入你的 apiKey
 * 3. 在 middleware 函数中 替换 middleware 为你的 aff-middleware 调用地址 形如 https://xxxx.laf.dev/aff-middleware
 * 4. aff-create 创建一个推广链接，该函数接受一个 query 参数，例如你的推广链接时 https://www.bilibili.com/ ，
 * https://mjt97c.laf.run/aff-create?link=https://www.bilibili.com/   创建一个包装过后的推广链接
 * https://mjt97c.laf.run/aff-middleware?id=64accd2ff34a17610116b363
 * 当用户访问包装过的推广链接，你可以获取有多少人访问了该链接，访问该链接的用户的 ip 地址，和 ip 地理信息
 */



# 用请求 执行一遍创建推广链接 aff-create
import cloud from '@lafjs/cloud'

export async function main(ctx: FunctionContext) {
  const db = cloud.mongo.db
  const middleware=''

  const res = await db.collection('aff_links').findOne({ link: ctx.query.link })
  if (res) {
    const ok = await db.collection('aff_links').deleteOne({ _id: res._id })
    if (ok.acknowledged) {
      const link = await db.collection('aff_links').insertOne({ link: ctx.query.link, count: 0 })
      if (link) {
        const afflink = middleware + '?id=' + link.insertedId
        await db.collection('aff_links').updateOne({ _id: link.insertedId }, { $set: { afflink: afflink } })
        console.log(afflink)
        return afflink
      } else {
        console.log("insert false")
        return false
      }
    } else {
      console.log("delete false")
      return false
    }
  } else {
    const link = await db.collection('aff_links').insertOne({ link: ctx.query.link, count: 0 })
    if (link) {
      const afflink = 'https://mjt97c.laf.run/aff-middleware' + '?id=' + link.insertedId
      await db.collection('aff_links').updateOne({ _id: link.insertedId }, { $set: { afflink: afflink } })
      console.log(afflink)
      return afflink
    } else {
      console.log("insert false")
      return false
    }
  }
}

## af-middleware


import cloud from '@lafjs/cloud'
import { ObjectId } from 'mongodb'
import { ipTolocation } from '@/ipTolocation'

export default async function (ctx: FunctionContext) {
  const db = cloud.mongo.db
  const ip = ctx.headers['x-real-ip']
  const location = await ipTolocation(ip)
  let origin_link: string
  const find = await db.collection('aff_links').findOne({ _id: new ObjectId(ctx.query.id) })
  if (find) {
    origin_link = find.link
    await db.collection('aff_links').updateOne({ _id: find._id }, { $inc: { count: 1 } })
    await db.collection('aff_ip').insertOne({ afflink_id: find._id, link: find.link, ip: ip, city: location.city, location: location })
    ctx.response.redirect(origin_link)
    return 'ok'
  } else {
    console.log("origin link not found")
    return false
  }
}



### iplocation


import cloud from '@lafjs/cloud'
const API_KEY = '';  // Replace with your API key

async function get_location(ip_address) {
  const response = await cloud.fetch.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip_address}`);
  const data = response.data;
  return data;
}


export async function ipTolocation (ip_address) {
  const location= await get_location(ip_address)
  
  return location
}
```
