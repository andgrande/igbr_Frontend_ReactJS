import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #b27a7d;
        --semi-light: #d4a4a7;
        --light: #fae0e2;
        --trial-light: #F2F3E6;
        --bege: #FDF0E5;
        --orange: #ff9000;
        --green: #00c4a2;

        --text-title: #232129;
        --trial-text-title: #343a40;
        --text-body: #3e3b47;

        --shape: ;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }

        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar {
      // Width of vertical scroll bar
      width: 6px;
      // Height of horizontal scroll bar
      height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #c2c9d2;
  }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    strong {
      font-weight: 600;
    }

    h1, h2, h3 {
      font-family: 'DM Serif Display', serif;
      font-weight: 400;
      font-size: 2.5rem;
    }

    h4, h5, h6 {
      font-family: 'DM Serif Display', serif;
      font-weight: 400;
      font-size: 2rem;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
