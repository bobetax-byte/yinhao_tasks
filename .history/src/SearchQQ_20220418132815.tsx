import { useState } from 'react'

interface QQItem {
  id: number,
  name: string
}

function SearchQQ() {
  const [state, setState] = useState(0); 
  const [qqlist, setQQlist] = useState([]);
  return (
    <div className="search-qq-container">
      <h3 className="search-qq-title">QQ查找</h3>
      <div className="search-info">
        <input type="text" />
        <div className="button">查找</div>
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