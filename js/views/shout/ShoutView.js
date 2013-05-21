define([
  'jquery',
  'text!templates/home/homeTemplate.html',
  'views/shout/ShoutListView',
  'views/home/LogoutButtonView',
  'views/home/LoginButtonView',
  'libs/app/util',
  'stackmobinit'
], function($, HomeTemplate, ShoutListView, LogoutButtonView,LoginButtonView, Util, StackMob){
  
  var ShoutView = Backbone.View.extend({
      className: "shout",   
      
      events: {   
        "click .logout": "logout"
      },

      initialize: function(options) {
        this.collection = this.options.collection;
      },

      render: function() {
        var el = this.$el;
        
        el.append(HomeTemplate);
        el.attr("id","shoutView");

        // add Shout List to content area
        var content = el.find(":jqmData(role='content')");
        content.empty();

        var listView = new ShoutListView({collection: this.collection});
        content.append(listView.render().el);

        return this;
      },

      logout: function(e) {
        Util(this.$el).setLoginLogoutButton(this.$el,"shout");
        return this;
      }

  });

  return ShoutView;
  
});