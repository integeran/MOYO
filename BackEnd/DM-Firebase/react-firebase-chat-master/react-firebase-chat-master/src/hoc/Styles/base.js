import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`

  ${reset}

  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  
  html {
    font-size: 62.5%;
  }

  body {
    line-height: normal;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0.8rem;
  }

  ::-webkit-scrollbar-track {
    background: rgba(51,51,51, 0.2);
  }

  ::-webkit-scrollbar-thumb {
    background: #777; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #333; 
  }
`;

export default GlobalStyle;
