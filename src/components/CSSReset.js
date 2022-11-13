import { createGlobalStyle } from "styled-components";

export const CSSReset = createGlobalStyle`
  /* Reset */
  /* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } */
  /* NextJS */
  html {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }
  body {
    font-family: sans-serif;
    background-color: #121212;
    color: #fff;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
