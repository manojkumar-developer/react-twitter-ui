import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import LoadingBar from "react-redux-loading"; //importing the loading bar given by react-redux-loading

import Dashboard from "./Dashboard";
// import TweetPage from "./TweetPage";
import SearchFrom from "../components/SearchForm";

import headerImage from "./header.png"
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <Router>
        {/* using a fragment so we don't add another element (div) to the DOM */}
        <Fragment>
          <LoadingBar />
          <div className="container">
          <div className="row">
            <div className="col-3">
              <image src={headerImage} className="header-style" />
            </div>
            <div className="col-6">
              {this.props.loading === true ? null : (
                <div>
                  <Route path="/" exact component={Dashboard} />
                  {/* <Route path="/tweet/:id" component={TweetPage} /> */}
                </div>
              )}
            </div>
            <div className="col-3">
                <SearchFrom />
            </div>
          </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
