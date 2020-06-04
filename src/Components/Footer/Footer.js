import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <div>
      <footer class="footer">
        <hr class="divider"></hr>
        <p class="footer-text"> &copy; 2020 Color Vault - All Rights Reserved.</p>
        <p class="footer-text"> Version 1.0.0</p>
        <a href="https://github.com/Chase00/ColorVaultClient" target="_blank"><img class="footer-icons" src="/images/github.png" alt="github link"></img></a>
        <a href="https://chasekuhn.com" target="_blank"><img class="footer-icons" src="/images/link.png" alt="portfolio link"></img></a>
      </footer>
    </div>
  )
}

export default Footer;