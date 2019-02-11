<?php

if ($_SERVER['HTTP_HOST'] != 'localhost') {
    echo json_encode(array("message" => "Message failed to send. Please try again", "msg_code" => 1));
    exit();
}

header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");