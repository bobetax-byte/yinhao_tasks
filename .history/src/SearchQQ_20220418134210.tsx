import { useState } from 'react'

interface QQItem {
  id: number,
  name: string
}

function SearchQQ() {
  const [qqnum, setQQnum] = useState(); 
  const [qqlist, setQQlist] = useState([]);
  let getQQDetail = async (target: object):Promise<QQItem> =>{
    // let result = await 
    console.log(`target->${target}`)
    return {
      id: 1,
      name:'2'
    }
  };

  function handleInputChange(e:any) {
    console.log(e);
    const { value } = e.target;
    // value 只接受number
    setQQnum(value)
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
              <li key={item.id} className="search-item">{ item.id}</li>
            )
          })
        }
        </ul>
      </div>
    </div>
  )
}

export default SearchQQ;