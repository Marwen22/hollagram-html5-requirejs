define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/shout/shoutTemplate.html'
], function($,_,Backbone, Stackmob, ShoutTemplate){

  var ShoutListView = Backbone.View.extend({   
      tagName: 'ul',

      initialize: function() {
        this.collection = this.options.collection;
        this.collection.bind('all', this.render,this);
        this.template = _.template(ShoutTemplate);
      },

      render:function (e) {
        var el = this.$el,
          template = this.template;
        
        el.attr("data-role","listview");
        el.attr("data-theme","c");
        el.attr("id","shoutListView");
        el.empty();
 
        this.collection.each(function(model){
            el.append(template(model.toJSON()));
        });

        if(this.collection.length === 0) {  
          el.append('<li>No Shouts</li>');      
        }

        $('#shoutListView').listview('refresh');

        return this;
      }

    });

  return ShoutListView;
  
});