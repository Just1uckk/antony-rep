import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import illustration45 from "../components/img/illustration45.svg"
import illustration59 from "../components/img/illustration59.svg"
import { Box, Button } from '@mui/material'
import { signOut } from "firebase/auth";
import { auth } from "../components/Firebase";

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
const FooterContainer = styled.footer`
  z-index: 1;
  height: 5vh;
  display: flex;
  flex-direction: row;
  padding: 20px 0px 20px 0px;
  align-items: center;
`
const FooterColumn = styled.div`
  width: ${props => props.width ? props.width : "10%"};
  align-items: end;
  display: flex;
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
      <main style={{height: "85vh",display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2}}>
        <div style={{ zIndex: 1, width:"100%"}}>
        <Outlet></Outlet>
        </div>
      </main>
      <FooterContainer>
        <FooterColumn>
          <Box
          sx={{backgroundColor:"white",zIndex: 1, borderRadius:"4px"}}
          >
          <Button
          size="small"
          variant="outlined"
          style={{zIndex: 1}}
          onClick={()=>{signOut(auth)}}
          >Вийти</Button>
          </Box>
          </FooterColumn>
      </FooterContainer>
      </Box>
      </MainContainer>
      <div style={{ backgroundImage: `url(${illustration59})`, position:"absolute", width: "765px", height: "766px", left: "0", bottom: "0",  backgroundPosition: "-250px 305px", backgroundRepeat: "no-repeat"}}>
      </div>
    </>
  );
};

export default Layout;
