/** @jsx React.DOM */

var React = require('react');

var TouchableArea = React.createClass({
  getDefaultProps: function() {
    return {
      component: React.DOM.div,
      touchable: true
    };
  },

  handleMouseStart: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    // TODO: what’s the best way to handle this with React?
    // The problem is if your mouse gets away from the target element it will
    // no longer receive the mousemove or mouseup events so we need to capture
    // these events at the document level.
    document.body.addEventListener('mousemove', this.handleMouseMove, false);
    document.body.addEventListener('mouseup', this.handleMouseEnd, false);

    this.props.scroller.doTouchStart([e], e.timeStamp);
    e.preventDefault();
  },

  handleMouseMove: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchMove([e], e.timeStamp);
    e.preventDefault();
  },

  handleMouseEnd: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    document.body.removeEventListener('mousemove', this.handleMouseMove);
    document.body.removeEventListener('mouseup', this.handleMouseEnd);

    this.props.scroller.doTouchEnd(e.timeStamp);
    e.preventDefault();
  },

  handleTouchStart: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  },

  handleTouchMove: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  },

  handleTouchEnd: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchEnd(e.timeStamp);
    e.preventDefault();
  },

  render: function() {
    var component = this.props.component;
    return this.transferPropsTo(
      <component
        onMouseDown={this.handleMouseStart}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchEnd}>
        {this.props.children}
      </component>
    );
  }
});

module.exports = TouchableArea;