import React from 'react'

function SidebarOption({ text, Icon }) {
  return (
    <div>
      <Icon />
      <h2>{ text }</h2>
    </div>
  )
}

export default SidebarOption