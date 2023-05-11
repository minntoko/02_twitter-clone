import { ChatBubbleOutlineRounded, FavoriteBorder, FileUploadOutlined, Repeat, VerifiedUser } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import './Post.css'

function Post({ displayName, userName, verified, text, avatar, image }) {
  return (
    <div className='post'>
      <div className='post__avatar'>
        <Avatar src={avatar} />
      </div>
      <div className='post__content'>
        <div className='post__header'>
          <h3>{displayName}</h3>
          <span className='post__special'>
            {verified ? <VerifiedUser className='post__badge' /> : null}
            @{userName}
          </span>
        </div>
        <div className='post__body'>
          <div className='post__description'>
            <p>{text}</p>
          </div>
          {image && <div className='post__img'>
            <img src={image} />
          </div>}
        </div>
        <div className='post__footer'>
          <ChatBubbleOutlineRounded fontSize='small' />
          <Repeat fontSize='small' />
          <FavoriteBorder fontSize='small' />
          <FileUploadOutlined fontSize='small' />
        </div>
      </div>
    </div>
  )
}

export default Post