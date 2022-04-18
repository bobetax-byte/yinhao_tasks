import loadingSVG from '../../loading.svg'
import './index.scss';

export function SearchQQItem(props: any) {
  const { qqInfo,loading } = props
  if (loading) {
    return (
      <div className="search-item">
        <img className='loading' src={loadingSVG} alt="" />
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