import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import illustration45 from "../components/img/illustration45.svg"
import illustration59 from "../components/img/illustration59.svg"
import { Box } from '@mui/material'

const MainContainer = styled.div`
  background: #1E1E1E;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  display: flex;
  justify-content: center;
`
const HeaderBlock = styled.div`
  flex-direction: column;
  width: 170px;
  z-index: 1;
`
const HeaderContainer = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
`

const Layout = () => {

  return (
    <>
    <div style={{ backgroundImage: `url(${illustration45})`, position:"absolute", width: "560px", height: "554px", right: "0",  backgroundPosition: "158px -90px", backgroundRepeat: "no-repeat"}}>
      </div>
    <MainContainer>
      <Box sx={{width: "90%"}}>
    <HeaderContainer>
      <HeaderBlock>
      <h1>Steklolux</h1>
      <h3 style={{textAlign: "right"}}>облік замовлень</h3>
      </HeaderBlock>
         </HeaderContainer>
      <main style={{height: "88vh",display: "flex", justifyContent: "center",alignItems:"center", zIndex: 2}}>
        <div style={{ zIndex: 1, width:"100%"}}>
        <Outlet></Outlet>
        </div>
      </main>
      </Box>
      </MainContainer>
      <div style={{ backgroundImage: `url(${illustration59})`, position:"absolute", width: "765px", height: "766px", left: "0", bottom: "0",  backgroundPosition: "-250px 305px", backgroundRepeat: "no-repeat"}}>
      </div>
    </>
  );
};

export default Layout;
