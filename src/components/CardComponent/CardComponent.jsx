import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import { StarOutlined } from '@ant-design/icons'

const CardComponent = () => {
  return (
    <WrapperCardStyle
        hoverable
        headStyle={{ width: '200px', height: '200px' }}
        style={{ width: 200 }}
        bodyStyle={{ padding: '10px'}}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <StyleNameProduct>Dao katana</StyleNameProduct>
        <WrapperReportText>
            <span style={{ marginRight: '4px'}}>
                <span>4.96</span><StarOutlined style={{ fontSize: '12px', color: 'yellow' }} />
            </span>
            <span> | Đã bán 1000</span>
        </WrapperReportText>
        <WrapperPriceText>
            1.000.000 đ
            <WrapperDiscountText>
                -5%
            </WrapperDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent
