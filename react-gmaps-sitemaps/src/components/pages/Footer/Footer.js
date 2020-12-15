import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaYoutube, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdTonality } from "react-icons/md";

function Footer() {
  return (
    <div className="footer-container">
      {/* <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join our exclusive mailing list to receive our latest updates.
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section> */}
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/about">About</Link>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Jack-Tilley/"
            >
              Creator
            </a>
            <Link to="/features">Features</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/contact">Contact</Link>
            <Link to="/features">Features</Link>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Jack-Tilley/"
            >
              Creator
            </a>
            <Link to="/">Other Contact</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          {/* <div className="footer-link-items">
            <h2>Videos</h2>
            <Link to="/">Submit Video</Link>
            <Link to="/">Ambassadors</Link>
            <Link to="/">Agency</Link>
            <Link to="/">Influencer</Link>
          </div> */}
          <div className="footer-link-items">
            <h2>Documentation</h2>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Jack-Tilley/sitemaps"
            >
              Github
            </a>
            <a target="_blank" rel="noreferrer" href="https://reactjs.org/">
              React JS
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.django-rest-framework.org/"
            >
              Django-rest-framework
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://developers.google.com/maps/documentation/javascript/overview"
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              <MdTonality className="navbar-icon" />
              mapd.it
            </Link>
          </div>
          <small className="website-rights">mapd.it © 2020</small>
          <div className="social-icons">
            <a
              className="social-icon-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Jack-Tilley/sitemaps"
            >
              <FaGithub />
            </a>
            <a
              className="social-icon-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Jack-Tilley/sitemaps"
            >
              <FaTwitter />
            </a>
            <a
              className="social-icon-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Jack-Tilley/sitemaps"
            >
              <FaYoutube />
            </a>
            <a
              className="social-icon-link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Jack-Tilley/sitemaps"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
