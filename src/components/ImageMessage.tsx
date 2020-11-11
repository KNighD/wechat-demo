import React from 'react'
import { IImageMessage } from '../data'

interface Props {
  data: IImageMessage
}

const ImageMessage = ({ data }: Props) => {
  return (
    <img
      style={{ height: data.height, maxHeight: 100 }}
      src={data.content}
      alt=""
    />
  )
}

export default ImageMessage
