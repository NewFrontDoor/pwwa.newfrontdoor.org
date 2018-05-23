/* eslint-disable */
import React, { Component } from 'react';
import logo from '../assets/placeholderLogo.png';
import brochure from '../assets/WWA2018Brochure.pdf';

class Navigation extends Component {
  render() {
    return (
        <header className="header-1 region-0 block-0">
        <div className="container">
          <div className="row">

            <div id="logo-region" className="logo col-xs-12 col-md-3 text-center-sm">
                        <a href="/"><img src={logo} alt="Home" className="logo" /></a>
                      </div> {/* /logo-region */}

            <div id="menu-region" className="col-xs-12 col-md-9">
                <div className="region region-header">


      <div className="block block-tb-megamenu">
        <div className="content">
          <div  className="tb-megamenu tb-megamenu-main-menu">
            <ul  className="tb-megamenu-nav nav level-0 items-5">
              <li className="tb-megamenu-item level-1 mega col-md-12">
                <a style={{color: "#a3c95c", textAlign: "center"}} href={brochure} target="_blank">Click Here for the Information Brochure</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      </div>
    </div> {/* /menu-region */}
  </div> {/* /row */}
</div> {/* /container */}
</header>
    );
  }
}

export default Navigation;
