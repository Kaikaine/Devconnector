import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Postform from "./PostForm";
import Spinner from "../common/Spinner";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <Postform />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
