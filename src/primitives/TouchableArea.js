/** @jsx React.DOM */

var React = require('react');

var TouchableArea = React.createClass({
  getInitialState: function() {
    return {
      cumulativeScroll: {x:0, y:0},
      gestureStart: {x:0, y:0},
      isMouseWheeling: false,
    };
  },

  getDefaultProps: function() {
    return {
      component: React.DOM.div,
      touchable: true
    };
  },

  handleWheel: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    if (e.timeStamp) {
      this.state.lastTimeStamp = e.timeStamp;
    }

    var self = this;
    var timeStamp = e.timeStamp || this.state.lastTimeStamp;
    var scrollDeltaX, scrollDeltaY;
    if (!this.state.isMouseWheeling) {
      this.state.isMouseWheeling = true;
      this.state.cumulativeScroll.x = 0;
      this.state.cumulativeScroll.y = 0;

      // Start a scroll event
      this.props.scroller.doTouchStart([{
        pageX: 0,
        pageY: 0,
      }], e.timeStamp);
      return;
    }

    // Convert the scrollwheel values to a scroll value
    scrollDeltaX = e.deltaX / 2;
    scrollDeltaY = -e.deltaY / 2;

    // If the scroller is constrained to an x axis, convert y scroll to allow single-axis scroll
    // wheels to scroll constrained content.
    if (this.props.scrollAxis === 'x') {
      scrollDeltaX = scrollDeltaY;
      scrollDeltaY = 0;
    }

    this.state.cumulativeScroll.x = Math.round(this.state.cumulativeScroll.x + scrollDeltaX);
    this.state.cumulativeScroll.y = Math.round(this.state.cumulativeScroll.y + scrollDeltaY);

    var pageX = -this.state.gestureStart.x + this.state.cumulativeScroll.x;
    var pageY = this.state.gestureStart.y + this.state.cumulativeScroll.y;

    this.props.scroller.doTouchMove([{pageX: pageX, pageY: pageY}], timeStamp);

    //_updateScroll(_gestureStart.x + _cumulativeScroll.x, _gestureStart.y + _cumulativeScroll.y, event.timeStamp, event);

    // End scrolling state
    if (this.state._scrollWheelEndDebouncer) {
      clearTimeout(this.state._scrollWheelEndDebouncer);
    }
    this.state._scrollWheelEndDebouncer = setTimeout(function () {
      self.props.scroller.doTouchEnd(timeStamp);
      //_releaseInputCapture();
      self.state.isMouseWheeling = false;
    }, 300);
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
        onWheel={this.handleWheel}
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
