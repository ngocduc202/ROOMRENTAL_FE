import React, { memo } from 'react'

const Button = ({ text, textColor, bgColor, icAfter, onClick, fullWith, px }) => {
  return (
    <button
      type='button'
      className={`py-2 ${px ? px : 'px-2'} ${textColor} ${bgColor} ${fullWith && 'w-full'} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      <span>{text}</span>
      <span> {icAfter && icAfter}</span>

    </button>
  )
}

export default memo(Button)