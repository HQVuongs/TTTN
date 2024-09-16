import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
// import logo from '../../assets/images/logo.png'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContent } from '../../content'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/Loading'

const DetailsOrderPage = () => {
  const params = useParams()

  const location = useLocation()
  const { state } = location
  const { id } = params


  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)
    return res.data
  }

  const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder , 
    enabled: !!id
})
  const { isPending, data } = queryOrder

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[data])
  return (
   <Loading isPending={isPending}>
     <div style={{width: '100%', height: '100vh', background: '#f5f5fa'}}>
      <div style={{ width: '1270px', margin: '0 auto'}}>
        <h2 style={{textAlign: "center", fontWeight: "bold"}}>Chi tiết đơn hàng</h2>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info'>Người nhận: {data?.shippingAddress?.fullName}</div>
              <div className='address-info'><span>Địa chỉ: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}</div>
              <div className='phone-info'><span>Điện thoại: </span> {data?.shippingAddress?.phone}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info'><span className='name-delivery'>{orderContent.delivery[data?.deliveryMethod]}</span></div>
              <div className='delivery-fee'><span>Phí giao hàng: </span> {convertPrice(data?.shippingPrice)}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{orderContent.payment[data?.paymentMethod]}</div>
              <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: "15px"}}>
            <div style={{width: '670px'}}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
          </div>
          {data?.orderItems?.map((order) => {
            return (
              <WrapperProduct>
                <WrapperNameProduct>
                  <img src={order?.image} alt='img'
                    style={{
                      width: '70px', 
                      height: '70px', 
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px'
                    }}
                  />
                  <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    marginLeft: '10px',
                    height: '70px',
                  }}>{order?.name}</div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>{order?.discount ? convertPrice(order?.amount* order?.price * order?.discount / 100) : '0 VND'}</WrapperItem>
                
                
              </WrapperProduct>
            )
          })}
          
          <WrapperAllPrice>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
            <WrapperItem><WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
          </WrapperAllPrice>
      </WrapperStyleContent>
      </div>
    </div>
   </Loading>
  )
}

export default DetailsOrderPage