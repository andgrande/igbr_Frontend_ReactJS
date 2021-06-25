import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    /* background: radial-gradient(#b27a7d, #893939); */
    background: radial-gradient(ellipse at top, #b27a7d, transparent),
        radial-gradient(ellipse at bottom, #893939, transparent);
    height: 100vh;
    width: 100vw;
`;

export const Login = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 1em;
`;

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const LoginArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    animation: ${appear} 1.5s;

    padding: 1em 0;
    margin: 7em 0;
    border-radius: 0.5em;
    width: 30em;
    height: 25em;
    background: var(--dark-background);
    color: var(--light);

    h4 {
        margin-bottom: 1em;
    }

    input {
        margin-top: 1em;
        width: 75%;
        height: 4em;
        border-radius: 0.5em;
        padding: 0 1em;

        &:first-child {
            margin-top: 2em;
        }
    }
`;
