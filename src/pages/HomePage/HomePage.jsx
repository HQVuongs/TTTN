import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.png'
import slider2 from '../../assets/images/slider2.png'
import slider3 from '../../assets/images/slider3.png'
import CardComponent from '../../components/CardComponent/CardComponent'

const HomePage = () => {
  const arr = ['Dao', 'Keo', 'Tu lanh']
  return (
    <>
        <div style={{ padding: '0 120px' }}>
      <WrapperTypeProduct>
      {arr.map((item) => {
        return (
          <TypeProduct name={item} key={item} />
        )
      })}
      </WrapperTypeProduct>
      </div>
      <div id="container" style={{backgroundColor: '#efefef', padding: '0 120px', height: 'fit-content', width: '100%' }}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <WrapperProduct>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProduct>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
              border: '1px solid rgb(255,140,0)', color: 'rgb(255,140,0)',
              width: '200px', height: '38', borerRadius: '4px'
            }}
            styleTextButton={{ fontWeight: 500 }} />
          </div>
      </div>
    </>
    
  )
}

export default HomePage

