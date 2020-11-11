import React from 'react'
import ContentLoader from 'react-content-loader'
import LazyLoad from 'react-lazyload'
import ImageWithPlaceHolder from './ImageWithPlaceHolder'

interface Props {
  avatar: string
}

const AvatarPlaceHolder = () => {
  return (
    <ContentLoader speed={2} width={36} height={36} viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="18" />
    </ContentLoader>
  )
}

const Avartar = ({ avatar }: Props) => {
  return (
    <LazyLoad height={36} scrollContainer=".message-list-container">
      <div className="avatar-wrap">
        <ImageWithPlaceHolder
          imgClassName="avatar"
          src={avatar}
          renderPlaceHolder={() => <AvatarPlaceHolder />}
        />
      </div>
    </LazyLoad>
  )
}

export default Avartar
