import { useState } from 'react'

interface QQItem {
  id: number,
  name: string
}

function SearchQQ() {
  const [qqnum, setQQnum] = useState(0); 
  const [qqlist, setQQlist] = useState([]);
  let getQQDetail = async (target: object):Promise<QQItem> =>{
    // let result = await 
    console.log(`target->${target}`)
    return {
      id: 1,
      name:'2'
    }
  };
  return (
    <div className="search-qq-container">
      <h3 className="search-qq-title">QQ号查询</h3>
      <div className="search-info">
        <span>QQ</span>
        <input type="text" value={qqnum} onKeyUp={(value:Object) => getQQDetail(value)} />
      </div>
      <div className="search-result">
        <ul className='search-list'>{
          qqlist.map((item:QQItem) => {
            return (
              <li key={item.id} className="search-item">{ item.id}</li>
            )
          })
        }
        </ul>
      </div>
    </div>
  )
}

export SearchQQ;