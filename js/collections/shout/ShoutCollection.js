define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmobinit',
  'models/shout/ShoutModel'
], function($,_,Backbone,StackMob,ShoutModel){

  var ShoutCollection = StackMob.Collection.extend({
 	model: ShoutModel
  });

  return ShoutCollection;

});