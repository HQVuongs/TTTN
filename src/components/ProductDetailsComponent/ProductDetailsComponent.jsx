import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/text.png'
import imageProductSmall from '../../assets/images/imgsmall.png'    
import { WrapperStyleColImage, WrapperStyleImageSmall } from './style'
const ProductDetailsComponent = () => {
  return (
        <Row style={{ padding: '16px', background: '#fff'}}>
            <Col span={10}>
                <Image src={imageProduct} alt="image product" preview={false} />
                <Row style={{ paddingTop: '5px', justifyContent: 'space-between'}}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14}>cot 14</Col>
        </Row>
  )
}

export default ProductDetailsComponent
