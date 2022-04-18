import { useState,Suspense } from 'react'

import getData from '../../request';
import { debounce, throttle } from 'lodash'

import { QQItem } from './qqItem';
import ReactLoading from 'react-loading';

import {SearchQQItem} from "./SearchQQItem";
import './index.scss'

import { unstable_createResource as createResource } from "react-cache";

const mock = {
  qq: 131,
  name: 'string1',
  qlogo: "http:\/\/qlogo2.store.qq.com\/qzone\/774740085\/774740085\/100"
}


// 请求链接
const QUERYQQ = "https://api.uomg.com/api/qq.info";

function SearchQQ() {
  const [qqnum, setQQnum] = useState("");
  let [loading, setLoading] = useState(false);
  let [qqInfo,setQqInfo] = useState(mock);
  let getQQDetail = debounce( async(qq: number):<QQItem | void> => {
    console.log("dasdas")
    if (loading) return
    setLoading(true)
    let { code, name, qlogo } = await getData(QUERYQQ, {
      qq
    })
    // if (code !== 1) {
    //   // return new Error("error")
    // };
    // let result = {
    //   qq, name, qlogo
    // }
    // qqlist.push(result);
    setLoading(false)
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
        <Suspense fallback={<div>loading...</div>}>
          <ul className='search-list'>
          <SearchQQItem qqInfo={qqInfo}></SearchQQItem>
          </ul>
        </Suspense>
      </div>
    </div>
  )
}

export default SearchQQ;