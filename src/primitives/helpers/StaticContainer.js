/** @jsx React.DOM */

var React = require('react');

var StaticContainer = React.createClass({
  getDefaultProps: function() {
    return {shouldUpdate: false};
  },

  shouldComponentUpdate: function(nextProps) {
    return nextProps.shouldUpdate || (this.props.staticKey !== nextProps.staticKey);
  },

  render: function() {
    return this.props.children;
  }
});

module.exports = StaticContainer;