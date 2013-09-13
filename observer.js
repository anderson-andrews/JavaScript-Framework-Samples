//Simple Namespace setup
var Core = {Util:{}};

(function(o) {
  var observer = function(name) {
    var exposed = {};
    var watchList = {};
    var actionList = {};

    exposed.name = name;

    var executeAction = function(trig, id, actionName, announcer) {
      var actions = Core.Lists.Actions;
      var processedAction = $$helpers.processAction(actionName);
      var action;
      var params;
      if (processedAction === "__announce__") {
        triggerWatchers(trig, id);
      } else {
        action = actions[processedAction];
        params = {
          "viewId" : id,
          "trigger" : trig,
          "announcer" : announcer,
          "obeserver" : exposed.name
        };
        action.run(params);
        if ($log)
          $log.debug(processedAction + " action was executed");
      }
    };

    var triggerActions = function(trig, id) {
      var alId = id + "__" + trig;
      var execute = actionList[alId];
      if (execute) {
        if ($isA(execute) === "array") {
          for (var i = 0; i < execute.length; i++) {
            executeAction(trig, id, execute[i]);
          }
        } else {
          executeAction(trig, id, execute);
        }
      }
    };

    var triggerWatchers = function(trig, triggerViewId) {
      var listData = watchList[trig];
      if (listData) {
        var views = Core.Lists.ActiveViews;
        var listObj;
        for (var l = 0; l < listData.length; l++) {
          listObj = listData[l];
          executeAction(trig, views[listObj["id"]].id, listObj["action"], triggerViewId);
        }
      }
    };

    exposed.registerActions = function(on, view, action) {
      var id = view.id;
      var alId = id + "__" + on;
      if (!actionList[alId]) {
        actionList[alId] = undefined;
      }
      actionList[alId] = action;
    };

    exposed.registerWatchers = function(on, view, action) {
      if (!watchList[on]) {
        watchList[on] = [];
      }
      watchList[on].push({
        "id" : view.id,
        "action" : action
      });
    };

    exposed.trigger = function(trig, id) {
      triggerActions(trig, id);
    };

    exposed.observers = watchList;
    exposed.actions = actionList;

    return exposed;
  };

  var observerTrigger = function() {
    var otList = {};
    var exposed = {};
    var observers = Core.Lists.Observers;
    var obs;

    exposed.addKey = function(key) {
      if (!otList[key]) {
        otList[key] = [];
      }
    };

    exposed.addObserver = function(key, observerName) {
      obs = otList[key];
      if ($jq.inArray(observerName, obs) === -1) {
        obs.push(observerName);
      }
    };

    exposed.triggerObservers = function(key, trigger) {
      obs = otList[key];
      for (var i = 0; i < obs.length; i++) {
        observers[obs[i]].trigger(trigger, key);
      }
    };

    return exposed;
  };
  //Add observer to namespace
  o.Observer = observer;

  //Add trigger to namespace
  o.ObserverTrigger = new observerTrigger;
})(Core.Util);
