import React from 'react'
import TyProduct from '../../components/TyProduct/TyProduct'
import { WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.png'
import slider2 from '../../assets/images/slider2.png'
import slider3 from '../../assets/images/slider3.png'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'

const HomePage = () => {
  const arr = ['Dao', 'Keo', 'Tu lanh']
  return (
    <>
        <div style={{ padding: '0 120px' }}>
      <WrapperTypeProduct>
      {arr.map((item) => {
        return (
          <TyProduct name={item} key={item} />
        )
      })}
      </WrapperTypeProduct>
      </div>
      <div id="container" style={{backgroundColor: '#f6f6f6', padding: '0 120px', height: '1000px' }}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px'}}>
            <CardComponent />
          </div>
          <NavbarComponent />
      </div>
    </>
    
  )
}

export default HomePage

