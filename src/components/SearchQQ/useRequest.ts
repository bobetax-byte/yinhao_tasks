import { QQDetailInfo } from "@/qq";
// import axios from "axios";
import { useState, useEffect } from "react";

import { getInfo } from '@/request'

export default function useGetRequest(requestUrl: string) {
  let [isLoading, setIsLoading] = useState(false);
  // let [isInit, setIsInit] = useState(false);
  let [isError, setError] = useState(false);
  const [url, setUrl] = useState(requestUrl)
  const [result, setResult] = useState<QQDetailInfo>({});
  useEffect(() => {
    const fetchData = async () => {
      setError(true);
      setIsLoading(true);
      try {
        // const result: QQDetailInfo = await axios.get(url);
        const result: QQDetailInfo = await getInfo(url);
        setResult(result);
        setError(false)
      } catch (error) {
        setError(true)
      };
      setIsLoading(false);
      // setIsInit(false)
    };
    fetchData()
  }, [url]);
  const doFetch = (url: string) => {
    setUrl(url)
  }
  return { result, isLoading, isError, doFetch }
}