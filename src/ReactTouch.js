var React = require('react');

var Router = require('./routing/Router');

var ReactTouch = {
  start: function(componentClass, domNode, routes, useHistory) {
    var EventPluginHub = require('react/lib/EventPluginHub');
    var TapEventPlugin = require('./thirdparty/TapEventPlugin');

    EventPluginHub.injection.injectEventPluginsByName({
      TapEventPlugin: TapEventPlugin
    });

    React.initializeTouchEvents(true);

    Router.start(componentClass, domNode, routes, useHistory);
  }
};

module.exports = ReactTouch;
