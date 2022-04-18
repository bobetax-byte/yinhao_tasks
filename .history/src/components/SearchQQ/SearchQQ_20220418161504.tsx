import { useState } from 'react'

import getData from '../../request';
import {debounce, throttle} from 'lodash'

interface QQItem {
  qq: number,
  name: string,
  qlogo?: string
}

const mock = [{
  qq: 131,
  name: 'string1',
},{
  qq: 132,
  name: 'string2',
},{
  qq: 133,
  name: 'string3',
},{
  qq: 134,
  name: 'string4',
},{
  qq: 135,
  name: 'string4',
},]

// 请求链接
const QUERYQQ = "https://api.uomg.com/api/qq.info";

function SearchQQ() {
  const [qqnum, setQQnum] = useState("");
  let [qqlist, updateQQlist] = useState([]);
  updateQQlist(mock => [...mock]);
  let getQQDetail = debounce(async (qq: number): Promise<QQItem | void> => {
    console.log("dasdas")
    // let { code, name, qlogo } = await getData(QUERYQQ, {
    //   qq
    // })
    // if (code !== 1) {
    //   // return new Error("error")
    // };
    // let result = {
    //   qq, name, qlogo
    // }
    // qqlist.push(result);
  },1000)

  function handleInputChange(e:any) {
    const { value } = e.target;
    // value 只接受number
    let result = value.replace(/\D/g, "")
    // TODO 防抖
    setQQnum(result)
    getQQDetail(result)
  }
  return (
    <div className="search-qq-container">
      <h3 className="search-qq-title">QQ号查询</h3>
      <div className="search-info">
        <span>QQ</span>
        <input type="text" value={qqnum} onChange={handleInputChange} />
      </div>
      <div className="search-result">
        <ul className='search-list'>{
          qqlist.map((item:QQItem) => {
            return (
              <li key={item.qq} className="search-item">
                <h4>{item.name}</h4>
                <div className="desc">
                  <img src={item.qlogo} alt={ item.name} />
                  <span>{item.qq}</span>
                </div>
              </li>
            )
          })
        }
        </ul>
      </div>
    </div>
  )
}

export default SearchQQ;