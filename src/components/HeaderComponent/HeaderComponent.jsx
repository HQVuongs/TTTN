import React from 'react'
import { Col } from 'antd'
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
        <Col span={6}>
            <WrapperTextHeader>FOCOSHOP</WrapperTextHeader>
        </Col>
        <Col span={12}>
        <ButtonInputSearch
        size="large"
        textButton="Tìm kiếm"
        placeholder="Nhập thông tin tìm kiếm"
        // onSearch={onSearch}

            />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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
                <ShoppingCartOutlined style={{ fontSize: '20px', color: '#fff' }} />
                <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
            </div>
        </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
