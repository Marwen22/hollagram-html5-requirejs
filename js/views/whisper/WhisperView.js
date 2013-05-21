define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'views/whisper/WhisperListView',
  'text!templates/home/homeTemplate.html',
  'libs/app/util'
], function($,_,Backbone, Stackmob, WhisperListView, HomeTemplate,Util){

  var WhisperView = Backbone.View.extend({
      className: "whisper",   
      events: {   
        "click .logout": "logout"
      },

      initialize: function() {
        this.whisperCollection = this.options.whisperCollection;
      },

      render:function (e) {
        var                el = this.$el,
            whisperCollection = this.whisperCollection;
        
        el.append(HomeTemplate);
        el.attr("id","whisperView");
        
        var content = el.find(":jqmData(role='content')");
        content.empty();

        var listView = new WhisperListView({whisperCollection: whisperCollection});
        content.append(listView.render().el);

        return this;
      },

      logout: function(e) {
        Util(this.$el).setLoginLogoutButton(this.$el,"whisper");

        return this;
      }
    });

  return WhisperView;
  
});