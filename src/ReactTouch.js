var React = require('react');

var Router = require('./routing/Router');

var ReactTouch = {
  start: function(componentClass, domNode, routes, useHistory) {
    React.initializeTouchEvents(true);
    
    var EventPluginHub = require('react/lib/EventPluginHub');
    var ResponderEventPlugin = require('./thirdparty/ResponderEventPlugin');
    var TapEventPlugin = require('./thirdparty/TapEventPlugin');

    EventPluginHub.injection.injectEventPluginsByName({
      ResponderEventPlugin: ResponderEventPlugin,
      TapEventPlugin: TapEventPlugin
    });

    Router.start(componentClass, domNode, routes, useHistory);
  }
};

module.exports = ReactTouch;
