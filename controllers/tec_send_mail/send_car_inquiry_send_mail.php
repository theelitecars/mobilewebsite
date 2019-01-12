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
$excempt = array("message");

/* Validate & Sanitize Individually */

function pre_clean ($inputFields) {

	$inputFields = trim($inputFields);
	$inputFields = strip_tags($inputFields);
	$inputFields = htmlentities($inputFields, ENT_QUOTES, 'UTF-8');

	return $inputFields;

}

function validateName ($inputName) {
	$inputName = pre_clean($inputName);
	$inputName = filter_var($inputName, FILTER_SANITIZE_STRING);

	return $inputName;
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

$interested_in = validateName($inputData['interested_in']);
$slug = validateName($inputData['slug']);
$your_name = validateName($inputData['your_name']);
$email_address = validateEmail($inputData['email_address']);
$mobile_number = validateMobileNumber($inputData['mobile_number']);
$message = validateMessage($inputData['message']);

if (strlen($interested_in) <= 2) {
	array_push( $errors, array("input_field" => "interested_in","msg_code" => 2) );
	$isValid = false;
}

if (strlen($slug) <= 2) {
	array_push( $errors, array("input_field" => "slug","msg_code" => 2) );
	$isValid = false;
}

if (strlen($your_name) <= 2) {
	array_push( $errors, array("input_field" => "your_name","msg_code" => 2,) );
	$isValid = false;
} else {
	if (!preg_match('/^[a-zA-Z ]*$/', $your_name)) {
		array_push( $errors, array("input_field" => "your_name","msg_code" => 2,) );
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
		$mail->setFrom($email_address, $your_name);   
		$mail->addAddress('developer@theelitecars.com', 'The Elite Cars');
		$mail->addReplyTo($email_address, $your_name);

		$body = 'The Elite Cars - Inquiry <br/><br/>';
		$body .= '<strong>Interested In:</strong> ' . $interested_in . '<br/>';
		$body .= '<strong>Name:</strong> ' . $your_name . '<br/>';
		$body .= '<strong>Email Address:</strong> ' . $email_address . '<br/>';
		$body .= '<strong>Mobile Number:</strong> ' . $mobile_number . '<br/>';
		$body .= '<strong>URL:</strong> https://theelitecars.com/listings/' . $slug . '/<br/>';
		$body .= '<strong>Message:</strong><br/>' . $message . '<br/><br/>';
		$body .= 'This message is from https://m.theelitecars.com';

		$text_body = 'The Elite Cars - Inquiry \n\n';
		$text_body .= 'Interested In: ' . $interested_in . '\n';
		$text_body .= 'Name: ' . $your_name . '\n';
		$text_body .= 'Email Address: ' . $email_address . '\n';
		$text_body .= 'Mobile Number: ' . $mobile_number . '\n';
		$text_body .= 'URL: https://theelitecars.com/listings/' . $slug . '/\n';
		$text_body .= 'Message:\n' . $message . '\n\n';
		$text_body .= 'This message is from https://m.theelitecars.com';

		//Content
		$mail->isHTML(true);                                
		$mail->Subject = 'The Elite Cars - Inquiry';
		$mail->Body    = $body;
		$mail->AltBody = $text_body;

		$mail->send();

		echo json_encode(array("message" => "Message succesfully sent", "msg_code" => 0));

	} catch (Exception $e) {

		/*echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;*/
		echo json_encode(array("message" => "Message failed to send. Please try again", "msg_code" => 3));

	}

}