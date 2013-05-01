define([
  'jquery',
  'underscore', 
  'backbone',
  'stackmob',
  'text!templates/login/loginTemplate.html',
  'libs/app/util'
], function($,_,Backbone, Stackmob,LoginTemplate,Util){
  
  var LoginView = Backbone.View.extend({
      className : 'loginView',
      events: {  
        "click #submitLogin": "login"
      },

      initialize: function() {
        this.collection = this.options.collection;
        this.whisperCollection = this.options.whisperCollection;
        this.router = this.options.router;
      },

      render: function() {
        var el = this.$el;

        el.empty();
        el.append(LoginTemplate);
        el.attr("data-role","dialog");
        el.attr("data-theme","b");      
             
        return this;
      },

      login: function(e) {
          var collection = this.collection,
          whisperCollection = this.whisperCollection,
                    item = Util('#loginForm').serializeObject(),
                  router = this.router;

          e.preventDefault();

          $.mobile.loading( 'show', {
            text: "Logging In!",
            textVisible: true,
            theme: "b"
          });

          $('#loginBtn').addClass('disabled');
          $('#loginBtn').attr('disabled',true);

          var user = new StackMob.User(item);
          user.login(false,{
            success: function(model){

              // This is a hack to persist the User Object for use later
              StackMob.LoggedInUserObject = model;
              
              $.mobile.loading('hide');
              router.navigate("#justsaying", {trigger: true},'justsaying');   
              whisperCollection.fetch({async:true}); 
              $('input.usernameLogin').val('');
              $('input.passwordLogin').val('');
                           
            },
            error: function(error){
              $.mobile.loading('hide');
            }
          });  

          return this;
        }
    });

  return LoginView;
  
});