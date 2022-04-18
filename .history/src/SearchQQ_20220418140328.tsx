import { useState } from 'react'

import postData from './request';
import {debounce} from 'lodash'

interface QQItem {
  qq: number,
  name: string,
  qlogo?: string|null
}

// 请求链接
const QUERYQQ = "https://api.uomg.com/api/qq.info";

function SearchQQ() {
  const [qqnum, setQQnum] = useState(""); 
  const [qqlist, setQQlist] = useState([]);
  let getQQDetail = async (qq:number):Promise<QQItem> =>{
    let {code,name,qlogo} = await postData(QUERYQQ, {
      qq
    })
    if()
    return {
      qq: 1,
      name: '2',
    }
  };

  function handleInputChange(e:any) {
    console.log(e);
    const { value } = e.target;
    // value 只接受number
    let result = value.replace(/\D/g, "")
    // TODO 防抖
    setQQnum(result)
    getQQDetail(result);
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
              <li key={item.qq} className="search-item">{ item.qq}</li>
            )
          })
        }
        </ul>
      </div>
    </div>
  )
}

export default SearchQQ;