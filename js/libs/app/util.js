define([
  'jquery',
  'views/home/LogoutButtonView',
  'views/home/LoginButtonView'
], function($,LogoutButtonView,LoginButtonView){
  $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };

  $.fn.setNavBar = function(navlabel) {
      var navbar = this.find(":jqmData(role='navbar')").find("li");
      $(navbar).each(function( index ) {
        if($(this).text() === navlabel) {
          var link = $(this).find("a");
          $(link).addClass('ui-btn-active');
        }
      //console.log( index + ": " + $(this).text() );
      });
  };

  $.fn.setLoginLogoutButton = function(el,view) {

    $.mobile.loading( 'show', {
            text: "Logging out!",
            textVisible: true,
            theme: "b"
    });
  
    var user = new StackMob.User({username: StackMob.getLoggedInUser()});
    user.logout({
      success: function() {
        $('a#logoutBtn').remove();
        var content = el.find(":jqmData(role='header')");
        var loginButton = new LoginButtonView();

        $.mobile.loading('hide');
        content.append(loginButton.render().el).trigger('create');

        if(view === 'whisper') {
          var whisperListView = $('#whisperListView');
          whisperListView.empty();
          whisperListView.append('<li>Login to see your Whispers</li>');

          $('#whisperListView').listview('refresh');
        }
      },
      error: function(error) {
        console.log(error);
        $.mobile.loading('hide');
      }
    }); 
  };

  return $;
});
