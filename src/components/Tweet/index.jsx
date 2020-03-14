import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../../utils/helpers";
import { Link, withRouter } from "react-router-dom";

//importing icons from react-icons
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/tweet/${id}`);
  };

  handleLike = e => {
    e.preventDefault();

    const { dispatch, tweet, authedUser } = this.props;

    //dispatching the action creator
    // dispatch(
    //   handleToggleTweet({
    //     id: tweet.id,
    //     hasLiked: tweet.hasLiked,
    //     authedUser
    //   })
    // );

    //
  };

  renderExtendedEntites = mediaList => {
    return Object.keys(mediaList).map(item=>{
      const currentItem = mediaList[item];
      if(currentItem.type === "photo"){
        return (<img src={`${currentItem.media_url_https}?format=jpg&name=small`} width="100%"/>)
      }      
    })

  }

  render() {
    const { tweet } = this.props;
    if (tweet === null) {
      return <p>This tweet doesn't exist</p>;
    }
    const {
      name,
      user,
      created_at,
      text,
      hasLiked,
      likes,
      replies,
      id,
      parent,
      profile_banner_url,
      extended_entities
    } = tweet;
  
    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img src={user.profile_image_url_https} alt={`Avatar of ${user.screen_name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{user.name}<b>@{user.screen_name}</b></span>
            <div>{formatDate(created_at)} </div>
            {extended_entities && extended_entities.media ? this.renderExtendedEntites(extended_entities.media) : null}         
            {parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>

          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            {/* show number only if it's not zero */}
            <span>{replies !== 0 && replies} </span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes} </span>
          </div>
        </div>
      </Link>
    );
  }
}

//id comes from the props passed by a parent component
function mapStateToProps({ tweets }, { data }) {
  const tweet = data;//getting the specific tweet by its id
  //const parentTweet = tweet ? tweets[tweet.replyingTo] : null; //check if the specific tweet is a reply to another one. If so, get information about that parent tweet
return {
    tweet
  };
}

//using withRouter because this component is not being rendered by react router, so to have access to history props, we need to use withRouter
export default withRouter(connect(mapStateToProps)(Tweet));
