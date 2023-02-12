import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <Link to="#">about us</Link>
              </li>
              <li>
                <Link to="#">our services</Link>
              </li>
              <li>
                <Link to="#">privacy policy</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <Link to="#">
                <img
                  src="https://png.pngtree.com/png-clipart/20180515/ourmid/pngtree-facebook-logo-facebook-icon-png-image_3566127.png"
                  alt="img"
                  style={{ backgroundColor: "transparent" }}
                ></img>
              </Link>
              <Link to="#">
                <img src="https://png.pngtree.com/element_our/sm/20180626/sm_5b32227ca3eb9.jpg" alt=""></img>
              </Link>
              <Link to="#">
                <img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-instagram-icon-png-image_6315974.png" alt=""></img>
              </Link>
              <Link to="#">
                <img src="https://png.pngtree.com/element_our/png/20180827/linkedin-social-media-icon-png_71812.jpg" alt=""></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          color: "white",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          font: "25px",
          gap: "10px",
        }}
      >
        Made with
        <img
          src="https://spng.pngfind.com/pngs/s/8-84923_large-red-heart-png-clipart-love-heart-transparent.png"
          alt="img"
          width="15px"
          style={{ background: "transparent" }}
        />
        by MayankCreation
      </div>
    </footer>
  );
};

export default Footer;
