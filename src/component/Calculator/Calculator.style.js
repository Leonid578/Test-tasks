import styled from "styled-components";
// import { NavLink } from "react-router-dom";

export const Container = styled.div`
  // display: block;
  display: flex;
  flex-wrap: wrap;
  height: 540px;
  width: 240px;
  background: black;
  // justify-content:center;
  border-radius: 18px;
  color: white;
`;

export const Display = styled.div`
  display: block;
  height: 50px;
  width: 240px;
  background: rgb(112, 111, 111);
  justify-content: center;
  border-radius: 10px;
  margin: 50px 20px 20px;
  padding: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  height: 50px;
  width: 240px;
  // font-size: 18px;
  border: none;
  // outline: none;
  // cursor: pointer;
  background-color: black;
  flex-wrap: wrap;
`;

export const Button = styled.div`
display:block;
  min-width: 60px;
  height: 60px;
  font-size: 18px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #eee;
  margin: 5px 0;
  border-radius:50%;
`;

export const Zero = styled(Button)`
  width: 120px;
  // height: 60px;
  // font-size: 18px;
  // border: none;
  // outline: none;
  // cursor: pointer;
  // background-color: #eee;
  border-radius:40px;
`;
