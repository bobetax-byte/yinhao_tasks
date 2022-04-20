import { useState, useTransition } from 'react'
import { throttle } from 'lodash'
import toast, { Toaster } from 'react-hot-toast';
import getData from '../../request';

import { SearchQQItem } from "./SearchQQItem";
import { QQDetailInfo } from '../../qq';
import './index.scss'



function SearchQQ() {
  let [qqnum, setQQnum] = useState("");
  let [loading, setLoading] = useState(false);
  let [empty, setEmpty] = useState(false);
  let [qqInfo, setQqInfo] = useState<QQDetailInfo>({});
  let [isPending, startPending] = useTransition();
  
  // 获取QQ号的详情信息
  let getQQDetail = async (qq:string) => {
    if (loading) return
    setLoading(true)
    try {
      const { code, name = "", qlogo = "", msg = "服务器异常！" } = await getData(qq)
      setLoading(false)
      if (code !== 1) {
        // TODO not work
        toast.error(msg);
        setEmpty(true)
        return
      };
      // 清除所有的toast
      toast.dismiss();
      setEmpty(false)
      setQqInfo({
        qq,
        name,
        qlogo
      });
    } catch (error: any) {
      setEmpty(true)
      toast.error(error.message)
    }
    
  }

  // 用户输入响应
  function handleInputChange(e: any) {
    const { value } = e.target;
    // value 只接受number
    let result: string = value.replace(/\D/g, "")
    // 显示 value
    // 实时响应，优先级高
    setQQnum(result)
    // 渲染优先级低
    startPending(()=> useThrottle(result))
  }
  // TODO 防抖
  const useThrottle = throttle((value:string) => {
    getQQDetail(value)
  }, 1000)

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
            qqInfo.qq && <SearchQQItem qqInfo={qqInfo} isLoading={loading} isEmpty={empty}></SearchQQItem>
          }
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  )
}

export default SearchQQ;