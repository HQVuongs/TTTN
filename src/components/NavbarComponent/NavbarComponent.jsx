import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd'
import { WrapperPriceText } from '../CardComponent/style'

const NavbarComponent = () => {
  const onChange = () => {}
  const renderContent = (type, options) => {
    switch(type) {
      case 'text':
        return options.map((option) => {
          return (
            <WrapperTextValue>{option}</WrapperTextValue>
          )
        })

      case 'checkbox':
        return (
            <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column' }} onChange={onChange}>
                {options.map((option) => {
                    return(
                      <Checkbox style={{ marginLeft: 0}} value={option.value}>{option.lable}</Checkbox>
                    )
                } )}
            </Checkbox.Group>)
      case 'star':              
          return options.map((option) => {
            return(
              <div style={{ display: 'flex', gap: '5px'}}>
                <Rate style={{ fontSize: '12px'}} disabled defaultValue={option} />
                <span>{`từ ${option} sao`}</span>
              </div>
            )
          } )
      case 'price':              
      return options.map((option) => {
        return(
            <WrapperTextPrice>{option}</WrapperTextPrice>
        )
      } )        
        
      default:
        return{}
    }
  }

  return (
    <div>
        <WrapperLableText>Lable</WrapperLableText>
        <WrapperContent>
          {renderContent('text', ['Dao', 'Keo', 'Tu lanh'] )}
        </WrapperContent>
    </div>
  )
}

export default NavbarComponent
