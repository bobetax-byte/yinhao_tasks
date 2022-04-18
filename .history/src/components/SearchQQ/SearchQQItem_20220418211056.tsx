import { QQItem } from "./qqItem";

export function SearchQQItem(props: any) {
  const {qqInfo} = props
  return (
    <div key={qqInfo.qq} className="search-item">
      <img src={qqInfo.qlogo} alt={ qqInfo.name} />
      <div className="desc">
        <h4>{qqInfo.name}</h4>
        <span>{qqInfo.qq}</span>
      </div>
    </div>
  )
}