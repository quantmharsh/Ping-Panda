import React from 'react'

type Props = {
    avatarSrc:string ,
    avatarAlt:string,
    username:string,
    timestamp:string ,
    badgeText?:string ,
    badgeColor?:string,
    title:string ,
    content:{
        [key:string]:string
    }

}

const DiscordMessage = ({avatarSrc,avatarAlt,username,timestamp,badgeText,badgeColor="#43b581 ",title,content}: Props) => {
  return (
    <div>DiscordMessage</div>
  )
}

export default DiscordMessage