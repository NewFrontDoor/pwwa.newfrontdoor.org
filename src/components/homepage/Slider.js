/* eslint-disable */
import React, { Component } from 'react';
import _ from 'lodash';

class Slider extends Component {
  constructor(){
    super();
    this.state = {slides: [{"src": "https://summerleaschurch.org/sites/summerleaschurch.org/files/styles/image_full_width/public/community%20web%20slider.jpg?itok=wztd4SUb",
                        "alt": "Welcome to Summerleas Christian Church",
                        "caption": null},
                        {"src": "https://summerleaschurch.org/sites/summerleaschurch.org/files/styles/image_full_width/public/gc-slider.jpg?itok=7POEz39Z",
                        "alt": "",
                        "caption":
                          {"header": "Gospel Communities",
                           "description": "Community @ Summerleas",
                           "linkText" : "Find out More",
                           "href": "#"
                          }},
                        {"src": "https://summerleaschurch.org/sites/summerleaschurch.org/files/styles/image_full_width/public/church_builder_home_page.jpg?itok=8LyAhO4V",
                        "alt": "",
                        "caption": null},
                        {"src": "https://summerleaschurch.org/sites/summerleaschurch.org/files/styles/image_full_width/public/website%20slider%20Messy%20church.jpg?itok=mQslZKxf",
                        "alt": "",
                        "caption": null}
                      ]
                    }
  }

  render() {

  var slideshow = _.map(this.state.slides, (slide) => {

    if(slide.caption !== null){
      return (
            <li key={_.uniqueId()}>
                <figure>
                    <img className="img-responsive img-full-width" src={slide.src} width="1440" height="600" />
                    <figcaption className="overlay overlay-30 text-center">
                      <div className="highlighted-slider-2-content">
                        <h1 className="slider-title">{slide.caption.header}</h1>
                        <p className="slider-description">{slide.caption.description}</p>
                        <a href={slide.caption.href} className="btn btn-default">{slide.caption.linkText}</a>
                      </div>
                  </figcaption>
                </figure>
              </li>
          );
    }

    else{
      return (
            <li key={_.uniqueId()}>
              <figure>
                <a href="#">
                <img className="img-responsive img-full-width" src={slide.src} width="1440" height="600" alt={slide.alt} title={slide.alt} />    </a>
              </figure>
              </li>
          );
    }



  });
    return (
      <section>
      <div id="highlighted-2-region" className="highlighted region-0 block-0 bg-color-grayLight1 text-color-light" >
                <div className="region region-highlighted-2">
                  <div id="block-views-front-page-slider-block" className="block block-views">
                    <div className="content">
                      <div className="view view-front-page-slider view-id-front_page_slider view-display-id-block">
                        <div className="view-content">
                          <div className="highlighted-slider-2">
                          <div className="flex-bullet-slider">
                            <ul className="slides">
                              {slideshow}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </section>
    );
  }
}

export default Slider;
