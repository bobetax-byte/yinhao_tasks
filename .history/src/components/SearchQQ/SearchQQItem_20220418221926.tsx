import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

export function SearchQQItem(props: any) {
  const { qqInfo,loading } = props
  if (loading) {
    return (
      <div className="search-item">
        <FontAwesomeIcon icon={["far", "spinner"]} />
      </div>
    )
  }
  return (
    <div className="search-item">
      <img src={qqInfo.qlogo} alt={ qqInfo.name} />
      <div className="desc">
        <h4>{qqInfo.name}</h4>
        <span>{qqInfo.qq}</span>
      </div>
    </div>
  )
}