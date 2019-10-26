import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../../Components/Header';
import { getCommentList } from '../../store/actions/homeAction.js';

class Home extends Component {
  // 只在 客户端 渲染 时候执行 服务器端 不存在
  componentDidMount() {
    const { commentList } = this.props;
    if (!this.props.commentList.length) {
      this.props.getCommentList();
    }
  }
  render() {
    const { commentList } = this.props;
    console.log('commentList', commentList);
    return (
      <div>
        <Header />
        hotComment:
        <ul>
          {
            commentList.map((comment, i) => {
              return (
                <li key={i}>{ comment.content }</li>
              )
            })
          }
        </ul>
        <button onClick={() => {
          console.log('click');
        }}>click</button>
      </div>
    );
  }
}
Home.loadData = function(store) {
  // 服务端渲染 提前加载数据 redux-thunk support dispatch function
  return store.dispatch(getCommentList())
}
const mapStateToProps = (state) => {
  console.log('state', state);
  const { name, commentList } = state.home;
  return { name, commentList }
}
const mapDispatchToProps = (dispatch) => {
  // 客户端渲染
  return {
    getCommentList() {
      dispatch(getCommentList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);