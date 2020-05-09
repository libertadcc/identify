import React from 'react';
import './footer.scss';

function Footer () {
  return (
    <div className="container-footer">
      <div className="content-footer">
        <p>Libertad Chapinal - 2020</p>
        <div className="icons-footer">
          <a href="https://www.twitter.com/LibertadChC" target="_blank"><i className="fab fa-twitter"></i></a>
          <a href="https://github.com/libertadcc" target="_blank"><i className="fab fa-github"></i></a>
          <a href="https://github.com/libertadcc" target="_blank"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;