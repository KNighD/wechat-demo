import React from 'react'
import ContentLoader from 'react-content-loader'
import LazyLoad from 'react-lazyload'
import { IImageMessage } from '../../data'
import ImageWithPlaceHolder from '../ImageWithPlaceHolder'

interface Props {
  data: IImageMessage
}

const ImageMessage = ({ data }: Props) => {
  // 预览图最高不超过 100 px
  const height = Math.min(data.height, 100)
  const width = (data.width / data.height) * height

  const PlaceHolder = () => {
    return (
      <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <rect x="0" y="0" width={width} height={height} />
      </ContentLoader>
    )
  }

  return (
    <LazyLoad once height={height} scrollContainer=".message-list-container">
      <ImageWithPlaceHolder
        imgStyle={{ height, width }}
        src={data.content}
        alt=""
        renderPlaceHolder={() => <PlaceHolder />}
      />
    </LazyLoad>
  )
}

export default ImageMessage
