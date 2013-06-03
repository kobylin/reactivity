var reactiveStorage = new ReactiveStorage();

autorun(function() {
    console.log('First username', reactiveStorage.get('username'));
    console.log('First userid', reactiveStorage.get('userid'));
});

autorun(function() {
    console.log('Second username', reactiveStorage.get('username'));
});

reactiveStorage.set('username', 'Ivan');

//if will be time make reactive .find(function(){smth_reactive})

//add many other cases
//1. dom elements
//2. ajax
//3. more complexity
