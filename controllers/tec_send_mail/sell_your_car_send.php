<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

$mail = new PHPMailer(true);

$inputData = json_decode(file_get_contents('php://input'), true);

if (!isset($inputData)) {
	echo "Not Allowed";
	exit();
}

$isValid = true;
$errors = array();
$excempt = array("message", "car_engine", "car_mileage");

/* Validate & Sanitize Individually */

function pre_clean ($inputFields) {

	$inputFields = trim($inputFields);
	$inputFields = strip_tags($inputFields);
	$inputFields = htmlentities($inputFields, ENT_QUOTES, 'UTF-8');

	return $inputFields;

}

function validateText ($inputText) {
	$inputName = pre_clean($inputText);
	$inputName = filter_var($inputText, FILTER_SANITIZE_STRING);

	return $inputName;
}

function validateNumber ($inputNumber) {
	$inputNumber = pre_clean($inputNumber);
	$inputNumber = filter_var($inputNumber, FILTER_SANITIZE_NUMBER_INT);

	return $inputNumber;
}

function validateEmail ($inputEmail) {
	$inputEmail = pre_clean($inputEmail);
	$inputEmail = filter_var($inputEmail, FILTER_SANITIZE_EMAIL);

	return $inputEmail;
}

function validateMobileNumber ($inputMobileNumber) {
	$inputMobileNumber = pre_clean($inputMobileNumber);
	$inputMobileNumber = filter_var($inputMobileNumber, FILTER_SANITIZE_NUMBER_FLOAT);

	return $inputMobileNumber;
}

function validateMessage ($inputMessage) {
	$inputMessage = pre_clean($inputMessage);
	$inputMessage = filter_var($inputMessage, FILTER_SANITIZE_STRING);

	return $inputMessage;
}

/* Validate & Sanitize Individually */

foreach ($inputData as $i_key => $i_value) {
	if (!in_array($i_key, $excempt)) {
		if (!$i_value) {
			array_push( $errors, array("input_field" => $i_key,"err_message" => 1) );
			$isValid = false;
		}
	}
}


$car_make = validateText($inputData['car_make']);
$car_model = validateText($inputData['car_model']);
$car_year = validateNumber($inputData['car_year']);
$car_mileage = validateNumber($inputData['car_mileage']);
$car_specification = validateText($inputData['car_specification']);
$car_condition = validateText($inputData['car_condition']);
$car_service_history = validateText($inputData['car_service_history']);
$car_body_type = validateText($inputData['car_body_type']);
$car_option = validateText($inputData['car_option']);
$car_engine = (isset($inputData['car_engine']) ? validateText($inputData['car_engine']):"");

$token = (isset($inputData['token']) ? $inputData['token'] :"");

$first_name = validateText($inputData['first_name']);
$last_name = validateText($inputData['last_name']);
$email_address = validateEmail($inputData['email_address']);
$mobile_number = validateMobileNumber($inputData['mobile_number']);
$appointment_date = date('Y-m-d', strtotime(validateText($inputData["appointment_date"])));
$appointment_time = validateText($inputData["appointment_time"]);
$message = (isset($inputData['message']) ? validateMessage($inputData['message']) : "");


if (strlen($car_make) <= 2) {
	array_push( $errors, array("input_field" => "car_make", "msg_code" => 2) );
	$isValid = false;
}

if (strlen($car_model) <= 2) {
	array_push( $errors, array("input_field" => "car_model", "msg_code" => 2) );
	$isValid = false;
}

if (strlen($car_year) < 4) {
	array_push( $errors, array("input_field" => "car_year", "msg_code" => 2) );
	$isValid = false;
}

if ($car_mileage < 0) {
	array_push( $errors, array("input_field" => "car_mileage", "msg_code" => 2) );
	$isValid = false;
}

if (strlen($car_specification) <= 2) {
	array_push( $errors, array("input_field" => "car_specification", "msg_code" => 2) );
	$isValid = false;
}

if (strlen($car_condition) <= 2) {
	array_push( $errors, array("input_field" => "car_condition", "msg_code" => 2) );
	$isValid = false;
}

if (strlen($car_service_history) <= 2) {
	array_push( $errors, array("input_field" => "car_service_history", "msg_code" => 2) );
	$isValid = false;
}

if (strlen($car_body_type) <= 2) {
	array_push( $errors, array("input_field" => "car_body_type", "msg_code" => 2) );
	$isValid = false;
}

if (strlen($car_option) <= 2) {
	array_push( $errors, array("input_field" => "car_option", "msg_code" => 2) );
	$isValid = false;
}




if (strlen($first_name) <= 2) {
	array_push( $errors, array("input_field" => "first_name","msg_code" => 2,) );
	$isValid = false;
} else {
	if (!preg_match('/^[a-zA-Z ]*$/', $first_name)) {
		array_push( $errors, array("input_field" => "first_name","msg_code" => 2,) );
		$isValid = false;
	}
}

if (strlen($last_name) <= 2) {
	array_push( $errors, array("input_field" => "last_name","msg_code" => 2,) );
	$isValid = false;
} else {
	if (!preg_match('/^[a-zA-Z ]*$/', $last_name)) {
		array_push( $errors, array("input_field" => "last_name","msg_code" => 2,) );
		$isValid = false;
	}
}

if (strlen($email_address) <= 6) {
	array_push( $errors, array("input_field" => "email_address","msg_code" => 2) );
	$isValid = false;
} else {
	if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
		array_push( $errors, array("input_field" => "email_address","msg_code" => 2) );
		$isValid = false;
	}
}

if (strlen($mobile_number) <= 5) {
	array_push( $errors, array("input_field" => "mobile_number","msg_code" => 2) );
	$isValid = false;
} else {
	if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
		array_push( $errors, array("input_field" => "mobile_number","msg_code" => 2) );
		$isValid = false;
	}
}

if (strlen($appointment_date) < 1) {
	array_push( $errors, array("input_field" => "appointment_date", "msg_code" => 2) );
	$isValid = false;
}

if (strlen($appointment_time) < 1) {
	array_push( $errors, array("input_field" => "appointment_time", "msg_code" => 2) );
	$isValid = false;
}


if (!$isValid) {
	echo json_encode($errors);
	exit();
} else {

	$mail = new PHPMailer(true);

	try {
		//Server settings
		$mail->SMTPDebug = 0;
		$mail->isSMTP();
		$mail->Host = 'smtp.gmail.com';
		$mail->SMTPAuth = true;
		$mail->Username = 'joelaposaga@gmail.com';
		$mail->Password = 'tibaaalssmknssoz';
		$mail->SMTPSecure = 'tls';
		$mail->Port = 587;                                		

		//Recipients
		$mail->setFrom($email_address, $first_name . " " . $last_name);   
		$mail->addAddress('developer@theelitecars.com', 'The Elite Cars');
		$mail->addReplyTo($email_address, $first_name . " " . $last_name);

		$body = 'The Elite Cars - Car Trade For Cash Booking Appointment <br/><br/>';
		$body .= '----- Vehicle Details -----<br/>';
		$body .= '<strong>Make:</strong> ' . $car_make . '<br/>';
		$body .= '<strong>Model:</strong> ' . $car_model . '<br/>';
		$body .= '<strong>Vehicle Year:</strong> ' . $car_year . '<br/>';
		$body .= '<strong>Mileage:</strong> ' . $car_mileage . '<br/>';
		$body .= '<strong>Specification:</strong> ' . $car_specification . '<br/>';
		$body .= '<strong>Car Condition:</strong> ' . $car_condition . '<br/>';
		$body .= '<strong>Service History:</strong> ' . $car_service_history . '<br/>';
		$body .= '<strong>Body Type:</strong> ' . $car_body_type . '<br/>';
		$body .= '<strong>Car Option:</strong>' . $car_option . '<br/>';
		$body .= '<strong>Engine:</strong> ' . $car_engine . '<br/><br/>';

		$body .= '----- Booking Details -----<br/>';
		$body .= '<strong>First Name:</strong> ' . $first_name . '<br/>';
		$body .= '<strong>Last Name:</strong> ' . $last_name . '<br/>';
		$body .= '<strong>Email Address:</strong> ' . $email_address . '<br/>';
		$body .= '<strong>Mobile Number:</strong> ' . $mobile_number . '<br/>';
		$body .= '<strong>Booking ID:</strong> ' . $token . '<br/>';
		$body .= '<strong>Appointment Date:</strong> ' . $appointment_date . '<br/>';
		$body .= '<strong>Appointment Time:</strong> ' . $appointment_time . '<br/>';
		$body .= '<strong>Message:</strong><br/>' . $message . '<br/><br/>';
		
		$body .= 'This message is from https://m.theelitecars.com';


		$text_body = 'The Elite Cars - Car Trade For Cash Booking Appointment \n\n';
		$text_body .= '----- Vehicle Details -----\n';
		$text_body .= 'Make: ' . $car_make . '\n';
		$text_body .= 'Model: ' . $car_model . '\n';
		$text_body .= 'Vehicle Year: ' . $car_year . '\n';
		$text_body .= 'Mileage: ' . $car_mileage . '\n';
		$text_body .= 'Specification: ' . $car_specification . '\n';
		$text_body .= 'Car Condition: ' . $car_condition . '\n';
		$text_body .= 'Service History: ' . $car_service_history . '\n';
		$text_body .= 'Body Type: ' . $car_body_type . '\n';
		$text_body .= 'Car Option: ' . $car_option . '\n';
		$text_body .= 'Engine: ' . $car_engine . '\n\n';

		$text_body .= '----- Booking Details -----\n';
		$text_body .= 'First Name: ' . $first_name . '\n';
		$text_body .= 'Last Name: ' . $last_name . '\n';
		$text_body .= 'Email Address: ' . $email_address . '\n';
		$text_body .= 'Mobile Number: ' . $mobile_number . '\n';
		$text_body .= 'Booking ID: ' . $token . '\n';
		$text_body .= 'Appointment Date: ' . $appointment_date . '\n';
		$text_body .= 'Appointment Time: ' . $appointment_time . '\n';
		$text_body .= 'Message: ' . $message . '\n\n';
		
		$text_body .= 'This message is from https://m.theelitecars.com';

		//Content
		$mail->isHTML(true);                                
		$mail->Subject = 'The Elite Cars - Inquiry';
		$mail->Body    = $body;
		$mail->AltBody = $text_body;

		$mail->send();

		echo json_encode(array("message" => "Message succesfully sent", "msg_code" => 0));

	} catch (Exception $e) {
		echo json_encode(array("message" => "Message failed to send. Please try again", "msg_code" => 3));

	}

}