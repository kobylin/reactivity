<?php
$users = array(
    1 => array(
        'username' => 'Ivan',
        'email' => 'ivan@gmail.com',
    ),
    2 => array(
        'username' => 'Petr',
        'email' => 'petr@yandex.com',
    ),
    3 => array(
        'username' => 'Andrew',
        'email' => 'andrew@yahoo.com',
    ),

);
$id = @$_GET['id'];
if(isset($users[$id])){
    echo json_encode(
        array('data' => $users[$id])
    );
} else {
    echo json_encode(
        array('data' => null)
    );
}
