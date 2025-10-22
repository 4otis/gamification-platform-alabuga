// shared/hooks/useAvatar.js
import { useState, useEffect } from 'react';
import { avatarComposer } from '../../avatar/avatarComposer';
import defaultAvatar from "../../../assets/defaultavatar.png";


export function Avatar ({items}){
  return (
    <div>
      <div style={{position:"absolute"}}>
        {items.map( (item, index)=>(
          <p key={index}>{item.file_path}</p>
        ))}
      </div>
      <img
        src={defaultAvatar}
      />
    </div>
    
  )
};