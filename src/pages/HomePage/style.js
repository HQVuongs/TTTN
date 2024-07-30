import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    border-bottom: 1px solid red;
    height: 44px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: rgb(255,69,0);
        span {
            color: #fff;    
        }
    }
    width: 100%;
    text-align: center;
`
export const WrapperProduct = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    flex-wrap: wrap;
`