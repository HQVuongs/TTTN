import { Button } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
const ButtonInputSearch = (props) => {
    const {
          size, placeholder, textButton,
          bordered, backgroundColorInput = '#fff',
          backgroundColorButton='#FF7F50',
          colorButton = '#fff'
    } = props
  return (
    <div style={{ display: 'flex'}}>
      <InputComponent 
          size={size}  
          placeholder={placeholder} 
          bordered={bordered} 
          style={{ backgroundColor: backgroundColorInput, borderRadius: '0px'}} 
          {...props}
      />
      <ButtonComponent
          size={size}
          styleButton={{ background: backgroundColorButton, border: !bordered && 'none', borderRadius: '0px'}}
          icon={<SearchOutlined  color={colorButton} />}
          textButton={textButton}
          styleTextButton={{ color: colorButton }}
      />
    </div>
  )
}

export default ButtonInputSearch
