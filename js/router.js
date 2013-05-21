// Filename: router.js
define([
  'jquery',
  'stackmobinit',
  'libs/app/util',
  'views/shout/ShoutView',
  'views/shout/ShoutDetailView',
  'views/whisper/WhisperView',
  'views/justsaying/JustSayingView',
  'views/signup/SignupView',
  'views/login/LoginView',
  'views/home/LogoutButtonView',
  'views/home/LoginButtonView',
  'collections/shout/ShoutCollection',
  'collections/whisper/WhisperCollection'

], function($, StackMob, Util, ShoutView, ShoutDetailView, WhisperView, JustSayingView, SignupView, LoginView, LogoutButtonView,LoginButtonView,ShoutCollection, WhisperCollection) {
  
  var AppRouter = Backbone.Router.extend({
    routes:{
        "":"shout",
        "shout":"shout",
        "shoutdetail/:id":"shoutdetail",
        "whisper":"whisper",
        "justsaying":"justsaying",
        "justsaying/:id":"justsaying",
        "login":"login",
        "logout":"logout",
        "signup":"signup"
    },

    initialize: function(options) {
      this.collection = options.collection;
      this.whisperCollection = options.whisperCollection;

      // Handle back button throughout the application
      $('.back').live('click', function(event) {
        window.history.back();

        return false;
      });
      this.firstPage = true;
    },

    shout:function(e) {
      this.changePage(new ShoutView({collection: this.collection}),'shout','Shouts');
    },

    shoutdetail:function(e) {
      model = this.collection.get(e);
      this.changePage(new ShoutDetailView({collection: this.collection, model: model}),'shoutdetail','Shouts','slide');
    },

    whisper:function(e) {
      this.changePage(new WhisperView({whisperCollection: this.whisperCollection}),'whisper','Whispers');
    },

    justsaying:function(e) {
      var username = e;
      this.changePage(new JustSayingView({collection: this.collection, whisperCollection: this.whisperCollection ,router: this,username: username}),'justsaying','Just Saying');
    },

    login:function(e) {
     this.changePage(new LoginView({collection: this.collection,router: this, whisperCollection: this.whisperCollection}),'loginView','Login','flip');
    },

    logout:function(e) {
      this.whisperCollection.reset();
    },

    signup:function(e) {
      this.changePage(new SignupView({collection: this.collection,router: this}),'signup', 'Signup','flip');
    },

    changePage:function (view,className,navLabel,transition) { 
      var page = $("." + className);


      if(transition === 'undefined') {
        var transition = $.mobile.defaultPageTransition;
      }
      
      // We don't want to slide the first page
      if (this.firstPage) {
          transition = 'none';
          this.firstPage = false;
      }

      if(className === "shoutdetail") {
        page.remove();
        page.html('');
      }

      // check if page exists in DOM
      if (!page.html()){
        view.render();
        $('body').append($(view.el));  
        page = view.el;      
      }

      // Go to new page
      $.mobile.changePage($(page), {changeHash:false, transition: transition, reverse: false});
   
      // set selected tab bar item
      Util(page).setNavBar(navLabel);
      
      var index = ['whisper','shout','justsaying'].indexOf(className);
 
    
      // Update the login/logout button in header for specific pages
      if(index >= 0) {

        var loginStatus = StackMob.isLoggedIn();
        // Add login/logout button
        if(loginStatus) {
          $('.login').remove();
          var content = $(page).find(":jqmData(role='header')");
          var logoutView = new LogoutButtonView();
          
          content.append(logoutView.render().el);
        } else {
          var content = $(page).find(":jqmData(role='header')");
          var loginButton = new LoginButtonView();
          content.append(loginButton.render().el);
        } 

        $('#shoutView').trigger('create');
        $('#justSayingView').trigger('create');
        $('#whisperView').trigger('create');
      }
    }, 

  });
  
  var initialize = function(){

    var shoutCollection = new ShoutCollection();
    shoutCollection.fetch({async: false});

    var q = new StackMob.Collection.Query();
    q.setExpand(1);
    var shoutCollection = new ShoutCollection();
    shoutCollection.query(q);

    var wq = new StackMob.Collection.Query();
    wq.setExpand(1);
    var whisperCollection = new WhisperCollection();
    whisperCollection.query(wq);
    
    var app_router = new AppRouter({collection: shoutCollection, whisperCollection: whisperCollection});

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});