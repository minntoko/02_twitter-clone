import { ChatBubbleOutlineRounded, FavoriteBorder, FileUploadOutlined, Repeat, VerifiedUser } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'

function Post() {
  return (
    <div className='post'>
      <div className='post__avatar'>
        <Avatar />
      </div>
      <div className='post__content'>
        <div className='post__header'>
          <h3>ITエンジニア</h3>
          <span className='post__special'>
            <VerifiedUser className='post__badge' />
            @itengineer
          </span>
        </div>
        <div className='post__body'>
          <div className='post__description'>
            <p>Reactを勉強中です。</p>
          </div>
          <div className='post_img'>
            <img src="https://source.unsplash.com/random" />
          </div>
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