import { QQItemProps,QQDetailInfo } from '../../qq';

import loadingSVG from '../../loading.svg'
import listEmpty from '../../list-empty.svg'
import './index.scss';

export function SearchQQItem(props: QQItemProps) {
  const { qqInfo, isLoading = false, isEmpty = false } = props
  if (isLoading) {
    return (
      <div className="search-item">
        <img className='placeholder-img animation' src={loadingSVG} alt="" />
      </div>
    )
  }
  if (isEmpty) {
    return (
      <div className="search-item">
        <img className='placeholder-img' src={listEmpty} alt="" />
      </div>
    )
  }
  return (
    <div className="search-item">
      <img className='logo' src={qqInfo.qlogo} alt={ qqInfo.name} />
      <div className="desc">
        <h4>{qqInfo.name}</h4>
        <span>{qqInfo.qq}</span>
      </div>
    </div>
  )
}