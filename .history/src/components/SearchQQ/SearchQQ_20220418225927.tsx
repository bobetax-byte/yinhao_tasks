import { useState,Suspense } from 'react'
import getData, {getInfo} from '../../request';
import { throttle } from 'lodash'

import {SearchQQItem} from "./SearchQQItem";
import './index.scss'

import toast from 'react-hot-toast';

const mock = {
  qq: 131,
  name: 'string1',
  qlogo: "http:\/\/qlogo2.store.qq.com\/qzone\/774740085\/774740085\/100"
}

function debounce(fn:Function, delay:number) {
  // 记录上一次的延时器
  var timer:any = null;
  var delay = delay || 200;
  return function() {
   var args = arguments;
   var that = this;
   // 清除上一次延时器
   clearTimeout(timer)
   timer = setTimeout(function() {
     fn.apply(that,args)
   }, delay);
  }
 }

// 请求链接
const QUERYQQ = "https://api.uomg.com/api/qq.info";

function SearchQQ() {
  const [qqnum, setQQnum] = useState("");
  let [loading, setLoading] = useState(false);
  let [qqInfo,setQqInfo] = useState({});
  let getQQDetail = debounce(async (qq: string) => {
      if (loading) return
      setLoading(true)
      let { code, name, qlogo, msg } = await getInfo(QUERYQQ, { qq });
      setLoading(false)
      console.log("dasdas")
    if (code !== 1) {
        // TODO not work
        toast.error(msg);
        return
      };
      setQqInfo({
        qq, name, qlogo
      });
  }, 3000)

  function handleInputChange(e:any) {
    const { value } = e.target;
    // value 只接受number
    let result:string = value.replace(/\D/g, "")
    // 显示 value
    setQQnum(result)
    // TODO 防抖
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
          {
            qqInfo.qq && <SearchQQItem qqInfo={qqInfo} loading={loading}></SearchQQItem>
          }
        </div>
      </div>
    </div>
  )
}

export default SearchQQ;