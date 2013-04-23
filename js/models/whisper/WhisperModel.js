define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmobinit'
], function($,_,Backbone,StackMob) {

  var WhisperModel = StackMob.Model.extend({
      schemaName: "whisper"
 	});

  return WhisperModel;

});

