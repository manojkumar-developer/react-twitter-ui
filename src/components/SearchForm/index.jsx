/*
   
Search Form

*/
/** ****************************** Import packages ****************************** **/

import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

/** ****************************** Import components ********* ****************** **/
import Autocomplete from "../AutoComplete";

/** ****************************** Import APIS ********************************* **/
import { usersFetch } from "../../actions/users";
import { tweetsFetch } from "../../actions/tweets";

class SearchFrom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
  }

  handleUserSearch = search => {
    const { dispatch } = this.props;
    dispatch(usersFetch({search}));
  }

  handleGetTweets = name => {
    const { dispatch } = this.props;
    dispatch(tweetsFetch({name}));
  }

  componentWillReceiveProps = nextProps => {
    if(nextProps && nextProps.usersList){
      this.setState({
        suggestions : nextProps.usersList
      })
    }
  }

  render() {
    const { suggestions } = this.state;
    return (
      <div>
        <h4 className="center">Search Users</h4>
        <Autocomplete
          suggestions={suggestions}
          handleChange={e=>this.handleUserSearch(e)}
          fetchTweetData={e=>this.handleGetTweets(e)}
        />        
      </div>
    );
  }
}


const stateToProps = ({ users }) => {
   const usersList = [];
   const entities = users.entities;
   if(entities && entities.length !== 0){
    Object.keys(entities).map(function(item){
      return usersList.push(entities[item].screen_name)
     })
   }
   return  {
    usersList,
    error: users.error,
    isLoading: users.isLoading
   };
}

SearchFrom.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(stateToProps)(SearchFrom);

