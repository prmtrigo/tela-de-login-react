import {createGlobalStyle} from "styled-components";
import 'typeface-poppins';
const GlobalStyle = createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
    width: 100vw;
    height: 100vh;
    background-color:rgb(247, 247, 247);
    font-family: 'Poppins', sans-serif
    }
`;

export default GlobalStyle;
