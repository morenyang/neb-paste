/**
 * Created by morenyang on 2018/6/7.
 */
import React from 'react'
import style from './style.scss'

const footer = (...props) => (
  <footer className={style.footer}>
    © {new Date().getUTCFullYear()}&nbsp;<a href="http://yangteng.me" target="_blank">Moren YANG</a>. This project is under MIT license. ackn. <a
    href="https://nebulas.io/">nebulas.</a>
  </footer>
);

export default footer
