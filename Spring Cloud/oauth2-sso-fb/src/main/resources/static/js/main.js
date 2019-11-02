if (window.location.hash == '#_=_'){
  history.replaceState? history.replaceState(null, null, window.location.href.split('#')[0]) : window.location.hash = '';
}

$.get( "/user", function(data) {

    $("#user").html(data.userAuthentication.details.name);
        $(".unauthenticated").hide()
        $(".authenticated").show()
    })
    .done(function() {

    })
    .fail(function() {

    })
    .always(function() {

});

var logout = function() {
    $.post("/logout", function() {
      $("#user").html('');
      $(".unauthenticated").show();
      $(".authenticated").hide();
    })

    .done(function() {
         window.location.href = 'http://localhost:8088';
        })
    .fail(function() {

    })
    .always(function() {

    });

    return true;
}

$.ajaxSetup({
    beforeSend : function(xhr, settings) {
      if (settings.type == 'POST' || settings.type == 'PUT'
          || settings.type == 'DELETE') {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/
            .test(settings.url))) {
          // Only send the token to relative URLs i.e. locally.
          xhr.setRequestHeader("X-XSRF-TOKEN",
              Cookies.get('XSRF-TOKEN'));
        }
      }
    }
});
