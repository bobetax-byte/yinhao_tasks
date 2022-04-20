import { useEffect, useState, useTransition } from 'react'
import { debounce, throttle } from 'lodash'
import toast, { Toaster } from 'react-hot-toast';

import { SearchQQItem } from "./SearchQQItem";
import { QQDetailInfo } from '../../qq';
import './index.scss'

import useRequest from './useRequest';

// 请求链接
const QUERYQQ: string = "https://api.uomg.com/api/qq.info";

function SearchQQ() {
  let [qqnum, setQQnum] = useState("");
  let [searchQQNum, setSearchQQNum] = useState("");
  let [isEmpty, setEmpty] = useState(false);
  let [qqInfo, setQqInfo] = useState<QQDetailInfo>({});
  let [isPending, startPending] = useTransition();
  let { result, isLoading, isError, doFetch } = useRequest(`QUERYQQ?qq=${searchQQNum}`);
  
  useEffect(() => {
    if(!searchQQNum) return
    const { code = 0, name = "", qlogo = "", msg = "" } = result;
    console.log("useEffect,request called",result,searchQQNum)
    toast.dismiss();
    if (code !== 1 || isError) {
      toast.error(msg);
      setEmpty(true)
      return
    };
    // 清除所有的toast
    setEmpty(false)
    setQqInfo({
      qq:searchQQNum,
      name,
      qlogo
    });
  },[searchQQNum])

  // 获取QQ号的详情信息
  // let getQQDetail = async (qq: string) => {
  //   if (loading) return
  //   setLoading(true)
  //   const { code = 0, name = "", qlogo = "", msg = "" } = await getData(qq) || {}
  //   setLoading(false)
  //   if (code !== 1) {
  //     // TODO not work
  //     toast.error(msg);
  //     setEmpty(true)
  //     return
  //   };
  //   // 清除所有的toast
  //   toast.dismiss();
  //   setEmpty(false)
  //   setQqInfo({
  //     qq,
  //     name,
  //     qlogo
  //   });
  // }

  // 用户输入响应
  function handleInputChange(e: any) {
    const { value } = e.target;
    // value 只接受number
    let formatValue: string = value.replace(/\D/g, "")
    // 显示 value
    // 实时响应，优先级高
    setQQnum(formatValue)
    // 渲染优先级低
    startPending(() => useThrottle(formatValue))
  }
  // TODO 防抖
  const useThrottle = throttle((formatValue: string) => {
    console.log(`formatValue->`, formatValue)
    if (!isLoading) {
      setSearchQQNum(formatValue)
      console.log("formatValue2",formatValue)
      doFetch(`QUERYQQ?qq=${formatValue}`)
    }
  }, 10000)

  return (
    <div className="search-qq-container">
      <h3 className="search-qq-title">QQ号查询</h3>
      <div className="search-info">
        <span>QQ</span>
        <input type="text" placeholder='请输入QQ号' value={qqnum} onChange={handleInputChange} />
      </div>
      <div className="search-result">
        <div className='search-list'>
          {
            qqInfo.qq && <SearchQQItem qqInfo={qqInfo} isLoading={isLoading} isEmpty={isEmpty}></SearchQQItem>
          }
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  )
}

export default SearchQQ;