var reactiveStorage = new ReactiveStorage();

autorun(function() {
    console.log('First', reactiveStorage.get('username'));
    console.log('Second', reactiveStorage.get('userid'));
});

autorun(function() {
    console.log('Second', reactiveStorage.get('username'));
});

reactiveStorage.set('username', 'Ivan');

//make ajax example
//
//if will be time make reactive .find(function(){smth_reactive})

