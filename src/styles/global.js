import { createGlobalStyle } from "styled-components";

import "react-perfect-scrollbar/dist/css/styles.css";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

    *{
        margin:0;
        padding:0;
        outline:0;
        box-sizing:border-box;

    }

    ul{
        list-style:none;
    }

    html,
    body {
    margin: 0;
    }

    select{
      color:rgba(255, 255, 255, 0.95) !important;
    }

    text{
      fill:rgba(255, 255, 255, 0.95) !important;
    }

    html,body,input,button, select, #App{
      font-family: 'Roboto', sans-serif !important;
    }

    :root{
      font-family: 'Roboto', sans-serif !important; 
    }

    #App {
    height: 100vh;
    }


    #page-wrap {
    text-align: center;
    overflow: auto;
    }

    .bm-item {
    display: inline-block;
    text-decoration: none;
    margin-bottom: 10px;
    color: #d1d1d1;
    transition: color 0.2s;
    }

    .bm-item:hover {
    color: white;
    }

    .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
    }

    .bm-burger-bars {
    background: #373a47;
    }

    .bm-cross-button {
    height: 24px;
    width: 24px;
    }

    .bm-cross {
    background: #bdc3c7;
    }

    .bm-menu {
    background: #373a47;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
    }

    .bm-morph-shape {
    fill: #373a47;
    }

    .bm-item-list {
    color: #b8b7ad;
    }

    .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
    }

    /* width */
::-webkit-scrollbar {
  width: 1%;
}

/* Track */
::-webkit-scrollbar-track {
  background: #151734;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1BFDBE;
  border-radius: 2px;
}


/* navbar menu */
.icone-li a{
  color: rgba(255, 255, 255, 0.95);
}

.m-auto{
  margin:0 auto;
}

}
`;
