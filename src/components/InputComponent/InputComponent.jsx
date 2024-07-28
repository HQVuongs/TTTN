import { Input } from 'antd'
import React from 'react'

// tạo ra cái này để tái xử dụng lại sau này

const InputComponent = ({size, placeholder, bordered, style, ...rests}) => {
  return (
    <Input 
        size={size}  
        placeholder={placeholder} 
        bordered={bordered} 
        style={style}
        {...rests} 
    />
  )
}

export default InputComponent
