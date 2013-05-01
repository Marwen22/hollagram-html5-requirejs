define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'models/shout/ShoutModel',
  'models/whisper/WhisperModel',
  'text!templates/home/homeTemplate.html',
  'text!templates/justsaying/justSayingTemplate.html',
  'router',
  'libs/app/util'
], function($,_,Backbone, Stackmob,ShoutModel, WhisperModel, HomeTemplate, JustSayingTemplate, Router, Util){

  var JustSayingView = Backbone.View.extend({
      className: "justsaying",   
      events: {  
        "click #addBtn": "save",
        "click .logout": "logout"
      },

      initialize: function() {
        this.collection = this.options.collection;
        this.whisperCollection = this.options.whisperCollection;
        this.router = this.options.router;
      },

      render: function() {
        var el = this.$el;

        el.empty();
        el.append(HomeTemplate);
        el.attr("id","justSayingView");

        var content = el.find(":jqmData(role='content')");
        content.empty();
        content.append(JustSayingTemplate);
        
        return this;
      },

      save: function(e) {
        var collection = this.collection,
            whisperCollection = this.whisperCollection,
                  item = Util('#addForm').serializeObject();        
        
        e.preventDefault();

        var loginStatus = StackMob.isLoggedIn();

        if(!loginStatus) {
            this.router.navigate("#login", {trigger: true});
        } else {
          
          if(item.description === ''){
            console.log('error no description');
            $.mobile.loading('hide');
          
          } else {
            $('#addBtn').attr('disabled',true);

            if(item.username === ''){
              var loadingMsg = "Shouting it out";
              var shout = new ShoutModel(item); 

              shout.create({
                  success: function(model){
                    collection.add(model);

                    model.save('user',StackMob.getLoggedInUser());
                    $.mobile.loading('hide');
                    $('#addBtn').attr('disabled',false);
                    $('input.description').val('');
                    $('input.url').val('');
                    $('input.username').val('');
                                  
                  },
                  error: function(error){
                    console.log(error);
                    $.mobile.loading('hide');
                    $('#addBtn').attr('disabled',false);
                  }
              });
            } else {
              var loadingMsg = "Whispering softly!";
              var whisper = new WhisperModel({"description": item.description, "url" : item.url});
              whisper.create({
                success: function(model){
                  whisperCollection.add(model);
              
                  model.appendAndSave("user", [item.username,StackMob.getLoggedInUser()], {
                    success: function(){
                      
                      $.mobile.loading('hide');
                      $('#addBtn').attr('disabled',false);
                      $('input.description').val('');
                      $('input.url').val('');
                      $('input.username').val('');
                      $('#whisperListView').listview('refresh');
                      $('#whisperView').trigger('create');
                    },
                    error: function(error) {
                      console.log(error);
                      $('#addBtn').attr('disabled',false);
                      $.mobile.loading('hide');
                    }
                  })
                }
              });
            }    

            $.mobile.loading( 'show', {
              text: loadingMsg,
              textVisible: true,
              theme: "b"
            });    
          }
        }

        return this;
      },
      
      logout: function(e) {
        Util(this.$el).setLoginLogoutButton(this.$el,"justsaying"); 
        return this;
      }
    });

  return JustSayingView;
  
});