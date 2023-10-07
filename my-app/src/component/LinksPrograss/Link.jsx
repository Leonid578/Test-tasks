import React from "react";
import {
  TestOne,
  TestTwo,
  TestThree,
  TestFoure,
  TestFive,
  List,
  Item,
} from "./Link.styled";

const Link = () => {
  return (
    <>
      <Item>
        <List>
          <TestOne href="/calculator">text1</TestOne>
        </List>
        <List>
          <TestTwo href="/TestTwo">text2</TestTwo>
        </List>
        <List>
          <TestThree href="/TestThree">text3</TestThree>
        </List>
        <List>
          <TestFoure href="/TestFoure">text4</TestFoure>
        </List>
        <List>
          <TestFive href="/TestFive">text5</TestFive>
        </List>
      </Item>
    </>
  );
};

export default Link;
