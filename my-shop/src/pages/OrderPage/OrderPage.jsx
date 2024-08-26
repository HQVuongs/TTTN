import { Form } from 'antd';
import React from 'react'
import InputComponent from '../../components/InputComponent/InputComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import Loading from '../../components/LoadingComponent/Loading';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';

const OrderPage = () => {
  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3 style={{ fontWeight: 'bold' }}>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <h4>Phí giao hàng</h4>
            <WrapperStyleHeaderDilivery>
              {/* Placeholder cho StepComponent */}
              <div style={{ height: '40px', background: '#ddd' }}></div>
            </WrapperStyleHeaderDilivery>
            <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <CustomCheckbox />
                <span> Tất cả (0 sản phẩm)</span>
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              <WrapperItemOrder>
                <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CustomCheckbox />
                  <div style={{ width: '77px', height: '79px', background: '#eee' }}></div>
                  <div style={{ width: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Tên sản phẩm
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>0 ₫</span>
                  <WrapperCountOrder>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                      <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                    <WrapperInputNumber value={1} size="small" />
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                      <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                  </WrapperCountOrder>
                  <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>0 ₫</span>
                  <DeleteOutlined style={{ cursor: 'pointer' }} />
                </div>
              </WrapperItemOrder>
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: 'bold' }}>Không có địa chỉ</span>
                  <span style={{ color: '#9255FD', cursor: 'pointer' }}>Thay đổi</span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 ₫</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 ₫</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0 ₫</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>0 ₫</span>
                  <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '320px',
                border: 'none',
                borderRadius: '4px',
              }}
              textbutton={'Mua hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent title="Cập nhật thông tin giao hàng" open={false} onCancel={() => {}} onOk={() => {}}>
        <Loading isLoading={false}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            autoComplete="on"
            form={null}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <InputComponent />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <InputComponent />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <InputComponent />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  );
}

export default OrderPage

