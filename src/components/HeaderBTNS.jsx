import React from 'react'

function HeaderBTNS({first='BTC', second='ETH', third='XTZ'}) {
  return (
    <div className='px-[10px] mx-[15px] font-thin flex gap-2 text-textColor border-r-textColor border-r-[1px] border-l-textColor border-l-[1px]'>
        <a href="#">{first}</a>
        <a href="#">{second}</a>
        <a href="#">{third}</a>
    </div>
  )
}

export default HeaderBTNS