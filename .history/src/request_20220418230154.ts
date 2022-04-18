import qs from 'qs'

import { QQItem } from "./components/SearchQQ/qqItem";

// Example POST method implementation:
async function getData(url = '', data = {}) {
  // Default options are marked with *
  let requestUrl = url +'?'+qs.stringify(data)
  const response = await fetch(requestUrl, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // params: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

interface requestBody {
  code: number,
  msg?: string,
  qq?: number,
  name?: string,
  qlogo ?:string
}

export async function getInfo(url = '', data:any = {}) {
  const { qq = 0 } = data;
  let random = Math.random()
  return new Promise((resolve) => {
    let result: requestBody;
    if (random < 0.5) {
      result = {
        code: 1321,
        msg: "服务器异常"
      }
    }
    result = {
      code:1,
      qq,
      qlogo: `http:\/\/qlogo2.store.qq.com\/qzone\/${qq}\/${qq}\/100`,
      name: `姓名${(Math.random() * 1000).toFixed(0)}`
    };
    console.log(random)
    setTimeout(() => {
      resolve(result)
    },1000)
  })
  
}

export default getData

