
require.config({
  baseUrl: "/js/",
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    jquery: 'libs/jquery/jquery-1.8.2',
    'jquery.mobile-config': 'libs/jqm/jquery.mobile-config',
    'jquery.mobile': 'libs/jqm/jquery.mobile-1.3.0',
    underscore: 'libs/underscore/underscore-1.4.4',
    backbone: 'libs/backbone/backbone-0.9.2-min',
    stackmob: 'libs/stackmob/stackmob-js-0.8.1',
    stackmobinit: 'stackmob-init',
    templates: '../templates',
    app: 'app'
  },
  shim: {
      stackmob: {
        deps: ['jquery'],
        exports: "StackMob"

      },    
      stackmobinit: {
        deps: ['jquery','underscore','backbone','stackmob'],
        exports: "StackMob2"

      },
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      'jquery.mobile-config': ['jquery'],
      'jquery.mobile': ['jquery','jquery.mobile-config']
    }
});

require([
  'jquery',
  'underscore', 
  'backbone',
    'app',
  'stackmob',
  'jquery.mobile'
], function( $,_,Backbone, App ){
    $(function(){
      App.initialize();
    });
});