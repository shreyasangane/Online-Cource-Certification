import React, {Component} from 'react';
import {Grid,Cell} from 'react-mdl';
import '../css/HomePageOcc.css';
//src="https://clspt-uploads-prd.s3.us-east-1.amazonaws.com/unsigned/review-of-udemy-7bfde57ef3c89330c839936349c9f8fd.png"

class Home extends Component {
    render (){
        return(
                <div style={{width: '100%', margin: 'auto'}}>
        <Grid className="landing-grid">
          <Cell col={12}>
            <img
              src="https://clspt-uploads-prd.s3.us-east-1.amazonaws.com/unsigned/review-of-udemy-7bfde57ef3c89330c839936349c9f8fd.png"
              alt="Image alternative"
              className="avatar-img"
              />
              
            <div className="banner-text">
              <h1>Learn Online with OCC</h1>

            <hr/>

          <p>HTML/CSS | Bootstrap | JavaScript | React | React Native | NodeJS | Express | MongoDB</p>

        <div className="social-links">

          {/* LinkedIn */}
          <a href="http://google.com" rel="noopener noreferrer" target="_blank">
            <i className="fa fa-linkedin-square" aria-hidden="true" />
          </a>

          {/* Github */}
          <a href="http://google.com" rel="noopener noreferrer" target="_blank">
            <i className="fa fa-github-square" aria-hidden="true" />
          </a>

          {/* Freecodecamp */}
          <a href="http://google.com" rel="noopener noreferrer" target="_blank">
            <i className="fa fa-free-code-camp" aria-hidden="true" />
          </a>

          {/* Youtube */}
          <a href="http://google.com" rel="noopener noreferrer" target="_blank">
            <i className="fa fa-youtube-square" aria-hidden="true" />
          </a>

        </div>
            </div>
          </Cell>
        </Grid>
      </div>
    )
  }
}
export default Home;