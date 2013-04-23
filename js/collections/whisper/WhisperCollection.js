define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmobinit',
  'models/whisper/WhisperModel'
], function($,_,Backbone,StackMob,WhisperModel){

  var WhisperCollection = StackMob.Collection.extend({
 	model: WhisperModel
  });

  return WhisperCollection;

});