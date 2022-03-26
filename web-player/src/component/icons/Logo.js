import { Link } from "react-router-dom";
import * as React from "react";
import styles from './Logo.module.css';

function SvgLogo(props) {
  return (
    <Link className={styles.link} to="/">
      <svg
        className={styles.logo}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1134 340"
        width="1em"
        height="1em"
        {...props}
      >
      </svg>
    </Link>
  );
}

export default SvgLogo;
