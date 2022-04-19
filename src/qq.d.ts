// all interface

// QQ详情信息接口
interface QQDetailInfo {
  code ?:  number,
  msg ?: string,
  qq  ?: number | string,
  name  ?: string,
  qlogo ?:string
}

// QQ详情信息接口
interface QQItemProps {
  isEmpty ?: boolean,
  isLoading ?: boolean,
  qqInfo : QQDetailInfo,
}

export {
  QQDetailInfo,
  QQItemProps
}