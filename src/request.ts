import axios from 'axios';
import { QQDetailInfo } from './qq'

// 请求链接
const QUERYQQ: string = "https://api.uomg.com/api/qq.info";

function getData(qq: string):Promise<QQDetailInfo>{
  return new Promise(async(resolve,reject) => {
    try {
      let { data }:{data:QQDetailInfo} = await axios.get(`${QUERYQQ}?qq=${qq}`);
      console.log(data)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
export async function getInfo(url = '', data: any = {}): Promise<QQDetailInfo> {
  const { qq = '0' } = data;
  let random = Math.random()
  return new Promise((resolve) => {
    let result: QQDetailInfo;
    if (random < 0.5) {
      result = {
        code: Math.floor(Math.random() * 1000),
        msg: "服务器异常"
      }
    } else {
      result = {
        code: 1,
        qq,
        qlogo: `http:\/\/qlogo2.store.qq.com\/qzone\/${qq}\/${qq}\/100`,
        name: `姓名${(Math.random() * 1000).toFixed(0)}`
      };
    }
    setTimeout(() => {
      console.log(result)
      resolve(result)
    }, 1000)
  })

}

export default getData

export {getData}

