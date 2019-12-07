import React, { Component } from 'react';

class NotFound extends Component {
  render() { 
    console.log(this.props);
    if (this.props.staticContext) {
      this.props.staticContext.notFound = true
    }
    return (
      <div>
        404
      </div>
    );
  }
}
 
export default NotFound;