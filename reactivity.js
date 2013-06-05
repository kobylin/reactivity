$(function() {
    autorun(function() {
        console.log('First username', reactiveStorage.get('username'));
        console.log('First userid', reactiveStorage.get('userid'));
    });

    autorun(function() {
        console.log('Second username', reactiveStorage.get('username'));
    });

    reactiveStorage.set('username', 'Ivan');
    reactiveStorage.set('users', [{
        username: 'Ivan'
    }]);

    //example with dynamyc array -> dynamic list
    var $users = $('#users');
    autorun(function() {
        _.each(reactiveStorage.get('users'), function(user) {
            $users.html(template('#user', user));
        });
    });

    autorun(function(){
        $.get('api.php', {id: reactiveStorage.get('userid')}, function(response){
            console.log('Ajax loaded', response.data);
            $('#userFromAjax .user').html(template('#user', response.data));
            
        }, 'json');
    });

    $('a').click(function(){
        reactiveStorage.set('userid', $(this).attr('value'));    
    });

});
