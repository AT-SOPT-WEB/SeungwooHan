/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const GlobalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* 1rem = 10px */
    scroll-behavior: smooth;
  }

  body {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    background-color: #fefefe;
    color: #333;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  input,
  textarea {
    font-family: inherit;
    outline: none;
    border: none;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
    display: block;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  strong {
    font-weight: bold;
  }
`;

export default GlobalStyle;
