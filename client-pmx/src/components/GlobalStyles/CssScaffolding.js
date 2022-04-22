import { css } from '@emotion/react';

export default function CssScaffolding() {
  return css`
    :root {
      --green: #4ab74e;
      --yellow: #fbcf4c;
      --orange: #e78b52;
      --grey: hsl(0, 0%, 66%);
      --dark: #363636;
      --w_yellow: hsl(45, 8%, 98%);
      --l_yellow: hsl(45, 96%, 78%);
      --l_orange: hsl(23deg 100% 85%);
      --l_grey: hsl(0, 0%, 92%);
      --d_yellow: hsl(40, 91%, 58%);
      --d_orange: #d1743d;
      --d_grey: #363636;

      --bg: var(--w_yellow);
      --primary: #485fc7;
      --primary_d: #283c96;
      --gutter: 2vw;
      --header-height: 56px;

      --shadow_d: 0.0625em;
      --shadow_b: 0.125em;
    }
    ${
      '' /* @font-face {
      font-family: 'Pangram';
      src: url('/fonts/Pangram-Bold.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Telegraf';
      src: url('/fonts/Telegraf-Regular.woff2') format('woff2');
    } */
    }
    html,
    body {
      height: 100%;
    }
    body,
    img,
    ul,
    ol,
    li,
    figure,
    figcaption,
    blockquote,
    dl,
    dd {
      margin: 0;
    }
    body {
      font-family: 'Pangram', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      font-weight: normal;
      min-height: 100vh;
      scroll-behavior: smooth;
      text-rendering: optimizeSpeed;

      line-height: 1.5;

      background-color: var(--bg);
      color: var(--dark);

      -webkit-tap-highlight-color: transparent;
    }
    ::-moz-selection {
      color: var(--dark);
      background: var(--l_yellow);
    }
    ::selection {
      color: var(--dark);
      background: var(--l_yellow);
    }
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
    a {
      color: inherit;
      text-decoration: none;
      transition: all 0.26s ease-in-out;
    }
    button {
      border: none;
      outline: 0;
      cursor: pointer;
      font-weight: normal;
      background-color: var(--l_grey);
      transition: background-color 0.16s ease-in-out;
    }
    input {
      border-radius: 0.4em;
      border: 1px solid transparent;
      border-color: #dbdbdb;
      box-shadow: inset 0 var(--shadow_d) var(--shadow_b) rgb(10 10 10 / 5%);
      outline: 0;

      &:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 var(--shadow_b) rgb(72 95 199 / 25%);
      }
      &[type='text'] {
        vertical-align: top;
        line-height: 1.5;
        padding: 0.2em 0.6em;
        max-width: 100%;
        width: 100%;
      }
    }
    img,
    svg {
      max-width: 100%;
      height: auto;
      display: block;
    }
    /* Remove list styles on ul, ol elements */
    /* Remove default padding */
    ul,
    ol {
      padding: 0;
      list-style: none;
    }
    /* Useful for animations with gsap */
    [data-hidden] {
      visibility: hidden;
    }
    h1,
    .h1,
    h2,
    .h2,
    h3,
    .h3,
    h4,
    .h4,
    h5,
    .h5,
    h6,
    .h6 {
      margin-top: 0;
      font-family: 'Telegraf', sans-serif;
    }
    p,
    .p {
      margin-top: 0;
    }
  `;
}
