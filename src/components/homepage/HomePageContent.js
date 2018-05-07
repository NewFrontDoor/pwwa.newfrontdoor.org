/* eslint-disable */
import React, { Component } from 'react';

import LatestSermon from './LatestSermon';
import WhereToFindUs from './WhereToFindUs';
import UpcomingEvents from './UpcomingEvents';

class HomePageContent extends Component {
  render() {
    return (
      <section>
        <div className="content-2 bg-color-white text-color-default" >
          <div className="container">
            <div className="row">
              <LatestSermon />
              <WhereToFindUs />
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HomePageContent;
