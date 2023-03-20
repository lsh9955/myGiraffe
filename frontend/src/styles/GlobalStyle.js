import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "./Font.css";

const GlobalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;
        font-family: 'Pretendard Regular', 'sans-serif';
    }

    h1 {
        font-family: 'Pretendard Bold', 'sans-serif';
        font-size: 4rem;
    }
    h2 {
        font-family: 'Pretendard Bold', 'sans-serif';
        font-size: 3.2rem;
    }
    h3 {
        font-family: 'Pretendard Bold', 'sans-serif';
        font-size: 2.4rem;
    }
    h4 {
        font-family: 'Pretendard Bold', 'sans-serif';
        font-size: 2rem;
    }

    p {
        font-size: 1.6rem;
    }

    ol, ul{
        list-style: none;
        font-size: 1.6rem;
    }

    button {
        background: none;
        color: inherit;
        border: none;
        cursor: pointer;
        outline: inherit;
    }

    // body{
    //     line-height: 1;
    //     font-family: 'Pretendard';
    //     margin-bottom: 100px;
    //     scrollbar-width: none; /* Firefox */
    // }
    `;

export default GlobalStyles;
