import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Popover } from 'antd'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined

  } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from "../../services/UserService"
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';


const HeaderComponent = () => {

    const  navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [pending, setPending] = useState(false)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setPending(false)
    }

    useEffect(() => {
        setPending(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setPending(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
          <WrapperContentPopup onClick = {handleLogout}>Đăng xuất</WrapperContentPopup>
          <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
        </div>
      );
  return (
    <div>
    <WrapperHeader>
        <Col span={5}>
            <Link to="/" >
                <WrapperTextHeader link='/'>FOCOSHOP</WrapperTextHeader>
            </Link>
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
                {userAvatar ? (
                    <img src={userAvatar} alt='avatar' style={{
                        height: '30px',
                        width: '30px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }}/>
                ) : (
                <UserOutlined style={{ fontSize: '20px' }} />

                )}
                {user?.access_token ? (
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
