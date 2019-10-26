import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() { 
    return (
      <div>
        header area
        <Link to="/">home</Link>
        <Link to="/login">login</Link>
      </div>
    );
  }
}
 
export default Header;