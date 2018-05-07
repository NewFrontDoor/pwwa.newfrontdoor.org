/* eslint-disable */
import React, { Component } from 'react';

import Iframe from 'react-iframe';


class UpcomingEvents extends Component {
  render() {
    return (
      <section>
          <div className="col-md-4 col-xs-12">  <div className="region region-content-2-3">

          <div className="block block-block">

          <h2 >Upcoming Events</h2>

          <div className="content" style={{marginTop:0}}>
          <Iframe url="https://summerleas.elvanto.com.au/calendar_embed/?c[]=9f425cbf-05c1-11e6-8c36-063ef7799403&amp;ca[]=services&events=1&upcoming[count]=3&upcoming[timeframe]=m&max=5" marginWidth="0" width="100%" height="300px" position="relative" />
          <p>For a full calendar, <a href="#" title="View full calendar">click here</a>.</p>  </div>
          </div>  </div>
          </div>

      </section>
    );
  }
}

export default UpcomingEvents;
