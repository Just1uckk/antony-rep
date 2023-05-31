import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { auth } from "../components/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { userLogined } from "../components/toolkitSlice";
import styled from "styled-components";
import { TextField } from "@mui/material";

const LoginContainer = styled.div`
  box-sizing: border-box;
  height: auto;
  max-width: 350px;
  border-radius: 5px;
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
`
const LoginBlock = styled.div`
  display: ${props => props.display ? props.display : ""};;
  margin: 15px;
`

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const notify = (e) => toast(e);
  const navigate = useNavigate();
  const rediredtToMainPage = async (data) => {
    if (data.operationType === "signIn") {
      await dispatch(userLogined(data.operationType));
      console.log(userLogined);
      return navigate("/");
    } else {
      return null;
    }
  };

  return (
    <div style={{display:"flex", justifyContent:"center",width: "100%"}}>
    <LoginContainer>
      <LoginBlock display = {"flex"}>
      <h2>Будь ласка авторизуйтеся</h2>
      </LoginBlock>
      <LoginBlock>
      <TextField
          fullWidth
          style={{backgroundColor: "white", borderRadius: 4}}
          id="outlined-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          value={email}
          variant="filled"
        placeholder="password"
        onChange={(e) => setEmail(e.target.value)}
        />
      </LoginBlock >
      <LoginBlock display = {"flex"}>
      <TextField
          fullWidth
          style={{backgroundColor: "white", borderRadius: 4}}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          variant="filled"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        />
      </LoginBlock>
      <LoginBlock display = {"flex"} style={{justifyContent: "flex-end"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
      <Button
      style={{display: "block", allignContent: "flex-end"}}
      variant="contained"
      size="large"
        onClick={async () => {
          try {
            let data = await signInWithEmailAndPassword(auth, email, password);
            notify("welcome to the club buddy");
            rediredtToMainPage(data);
          } catch (error) {
            notify(error.message);
          }
        }}
      > Увійти </Button>
      <p style={{marginTop: "20px"}}>Якщо в вас нема облікового запису :</p>
      <NavLink to={"/signup"} style={{color: "blue", display: "block", alignContent:"end"}}> Зареєструватия </NavLink>
      </div>
      </LoginBlock>
      <ToastContainer />
    </LoginContainer>
    </div>
  );
};

export default LoginPage;
