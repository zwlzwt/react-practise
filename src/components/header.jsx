var React = require('react');
var ReactDom = require('react-dom');

var Header = React.createClass({
  render: function() {
    return (
      <div className = "header">
        <Logo/>
        <ListPage/>
        <LogOut/>
      </div>
    );
  }
});

var Logo = React.createClass({
  render: function() {
    return <div className = "logo"><a href = "#">一课</a></div>;
  }
});

var ListPage = React.createClass({
  render: function() {
    return (
      <ul className = "list-page">
        <li>文章</li>
        <li>约见</li>
        <li>用户</li>
        <li>权限</li>
      </ul>
    );
  }
});

var LogOut = React.createClass({
  render: function() {
    return (
      <ul className = "log">
        <li>登出</li>
      </ul>
    );
  }
});

module.exports = ReactDom.render(
  <Header/>,
  document.getElementById('header')
);
