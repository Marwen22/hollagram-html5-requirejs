define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmobinit'
], function($,_,Backbone,StackMob) {

  var ShoutModel = StackMob.Model.extend({
      schemaName: "shout"
 	});

  return ShoutModel;

});

