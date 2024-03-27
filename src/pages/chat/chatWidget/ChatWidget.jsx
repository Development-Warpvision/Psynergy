import React from 'react'

const ChatWidget = ({data}) => {
  return (
    <div>
        {data.map((x)=>x.name)}
    </div>
  )
}

export default ChatWidget