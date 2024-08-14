import React, { useState } from 'react'
import { Badge, Button, Col, Popover } from 'antd'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined

  } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from "../../services/UserService"
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';


const HeaderComponent = () => {

    const  navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [pending, setPending] = useState(false)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setPending(false)
    }
    const content = (
        <div>
          <WrapperContentPopup onClick = {handleLogout}>Đăng xuất</WrapperContentPopup>
          <WrapperContentPopup>Thông tin người dùng</WrapperContentPopup>
        </div>
      );
  return (
    <div>
    <WrapperHeader>
        <Col span={5}>
            <WrapperTextHeader>FOCOSHOP</WrapperTextHeader>
        </Col>
        <Col span={13}>
        <ButtonInputSearch
        size="large"
        textButton="Tìm kiếm"
        placeholder="Nhập thông tin tìm kiếm"
        // onSearch={onSearch}

            />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
        <Loading isPending={pending}>
            <WrapperHeaderAccount>
                <UserOutlined style={{ fontSize: '20px' }} />
                {user?.name ? (
                    <>
                    
                    <Popover content={content} trigger="hover">
                    <div style={{ cursor: 'pointer'}}>Xin chào, {user.name}</div>
                    </Popover>
                    </>

                ) : (
                    <div onClick={handleNavigateLogin} style={{ cursor: 'pointer'}}>
                        <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                        <div>
                        <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                        <CaretDownOutlined />
                        </div>
                    </div>
                )}

            </WrapperHeaderAccount>
        </Loading>
            <div>
                <Badge count={4} size="small" style={{ backgroundColor: 'rgb(0,128,0)'}}>
                    <ShoppingCartOutlined style={{ fontSize: '20px', color: '#fff' }} />
                    <WrapperTextHeaderSmall style={{ cursor: 'pointer'}}>Giỏ Hàng</WrapperTextHeaderSmall>
                </Badge>
            </div>
        </Col>
    </WrapperHeader>
    </div>
  )
}

export default HeaderComponent
