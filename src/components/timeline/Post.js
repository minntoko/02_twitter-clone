import { ChatBubbleOutlineRounded, FavoriteBorder, FileUploadOutlined, Repeat, VerifiedUser } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import './Post.css'

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
            @it_engineer
          </span>
        </div>
        <div className='post__body'>
          <div className='post__description'>
            <p>Reactを勉強中です。</p>
          </div>
          <div className='post__img'>
            <img src="https://images.unsplash.com/photo-1533986690673-c50390c01cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" />
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