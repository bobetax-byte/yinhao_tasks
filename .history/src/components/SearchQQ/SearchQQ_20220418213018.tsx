import { useState,Suspense } from 'react'

import getData, {getInfo} from '../../request';
import { debounce, throttle } from 'lodash'

import { QQItem } from './qqItem';
import ReactLoading from 'react-loading';

import {SearchQQItem} from "./SearchQQItem";
import './index.scss'

import { unstable_createResource as createResource } from "react-cache";

import toast from 'react-hot-toast';
import { any } from 'prop-types';

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
  let getQQDetail = debounce(async (qq: number) => {
    console.log("dasdas")
    if (loading) return
    setLoading(true)
    toast.error("msg");
    let { code, name, qlogo, msg } = await getInfo(QUERYQQ, { qq });
    debugger
    setLoading(false)
    if (code !== 1) {
      toast.error(msg);
      return
    };
    let result = {
      qq, name, qlogo
    }
    setQqInfo(result);
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
        <div className='search-list'>
          <SearchQQItem qqInfo={qqInfo}></SearchQQItem>
        </div>
      </div>
    </div>
  )
}

export default SearchQQ;