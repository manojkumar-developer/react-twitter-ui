import React, { Component } from "react";
import { connect } from "react-redux";

import Tweet from "../components/Tweet";

class Dashboard extends Component {
  render() {
    const { tweetList } = this.props;
    const count = Object.keys(tweetList).length;
    return (
      <div>
        <h3 className="center">Timeline Feeds</h3>
          {
            count !== 0 ? 
         (<ul className="dashbord-list">
          {Object.keys(tweetList).map(key => {
            const tweetData = tweetList[key];
            return (
              <li key={tweetData.id}>
               <Tweet data={tweetData} />
            </li>
            )
          })
          }
        </ul>) : (<p>Need to select user or No records</p>)
        }
      </div>
    );
  }
}

//destructuring tweets from state
function mapStateToProps({ tweets }) {
  const tweetList = tweets.entities;
  if(tweetList && tweetList.length){
    Object.keys(tweetList).sort(
      //sorting from the newest to the oldest tweet
      //If compareFunction(a, b) is greater than 0, sort b to an index lower than a, i.e. b comes first.
      (a, b) => tweetList[b].created_at - tweetList[a].created_at
    )
  }
  return {
    tweetList
  };
}

export default connect(mapStateToProps)(Dashboard);
