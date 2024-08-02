import React from 'react'
import { Badge, Col } from 'antd'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined

  } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
const HeaderComponent = () => {
  return (
    <div>
    <WrapperHeader>
        <Col span={5}>
            <WrapperTextHeader>FOCOSHOP</WrapperTextHeader>
        </Col>
        <Col span={13}>
        <ButtonInputSearch
        size="large"
        bordered={false}
        textButton="Tìm kiếm"
        placeholder="Nhập thông tin tìm kiếm"
        // onSearch={onSearch}

            />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
            <WrapperHeaderAccount>
                <UserOutlined style={{ fontSize: '20px' }} />
                <div>
                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                    <div>
                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                    </div>
                </div>
            </WrapperHeaderAccount>
            <div>
                <Badge count={4} size="small" style={{ backgroundColor: 'rgb(0,128,0)'}}>
                    <ShoppingCartOutlined style={{ fontSize: '20px', color: '#fff' }} />
                    <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
                </Badge>
            </div>
        </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
