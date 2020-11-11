import React, { useState } from 'react'

interface Props {
  src: string
  renderPlaceHolder: () => JSX.Element
  alt?: string
  imgClassName?: string
  imgStyle?: any
}

// 简单封装一个带默认占位的图片
export default function ImageWithPlaceHolder({
  src,
  renderPlaceHolder,
  alt = '',
  imgClassName = '',
  imgStyle,
}: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none', ...imgStyle }}
        className={imgClassName}
      />
      {!loaded && renderPlaceHolder()}
    </div>
  )
}
