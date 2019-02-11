<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';
require_once 'inc/cors.php';
require 'inc/validation.php';

$mail = new PHPMailer(true);
$sanitize = new InputValidation;

$inputData = json_decode(file_get_contents('php://input'), true);

if (!isset($inputData)) {
	echo "Not Allowed";
	exit();
}

$full_name = $sanitize->validateText($inputData['full_name']);
$email_address = $sanitize->validateEmail($inputData['email_address']);
$friends_email_address = $sanitize->validateEmail($inputData['friends_email_address']);
$message = $sanitize->validateText($inputData['message']);

$image_one = ( isset($inputData['car_details']['gallery_images'][2]) ? $inputData['car_details']['gallery_images'][2] : '');
$image_two = ( isset($inputData['car_details']['gallery_images'][5]) ? $inputData['car_details']['gallery_images'][5] : '');
$image_three = ( isset($inputData['car_details']['gallery_images'][8]) ? $inputData['car_details']['gallery_images'][8] : '');
$car_name = ( isset($inputData['car_details']['title']['rendered']) ? $inputData['car_details']['title']['rendered'] :'' );
$stock_no = ( isset($inputData['car_details']['post_meta_fields']['stock-no'][0]) ? $inputData['car_details']['post_meta_fields']['stock-no'][0] :'' );
$car_price = ( isset($inputData['car_details']['post_meta_fields']['car_price'][0]) ? $inputData['car_details']['post_meta_fields']['car_price'][0] :0 );
$sale_price = ( isset($inputData['car_details']['post_meta_fields']['sale_price'][0]) ? $inputData['car_details']['post_meta_fields']['sale_price'][0] :0 );
$mileage = ( isset($inputData['car_details']['post_meta_fields']['kilometers'][0]) ? $inputData['car_details']['post_meta_fields']['kilometers'][0] :'' );
$motors_trim = ( isset($inputData['car_details']['post_meta_fields']['motors-trim'][0]) ? $inputData['car_details']['post_meta_fields']['motors-trim'][0] :'' );
$exterior_color = ( isset($inputData['car_details']['post_meta_fields']['exterior-color'][0]) ? $inputData['car_details']['post_meta_fields']['exterior-color'][0] :'' );
$engine = ( isset($inputData['car_details']['post_meta_fields']['engine'][0]) ? $inputData['car_details']['post_meta_fields']['engine'][0] :'' );
$interior_color = ( isset($inputData['car_details']['post_meta_fields']['interior-color'][0]) ? $inputData['car_details']['post_meta_fields']['interior-color'][0] :'' );
$body_type = ( isset($inputData['car_details']['post_meta_fields']['body-type'][0]) ? $inputData['car_details']['post_meta_fields']['body-type'][0] :'' );
$doors = ( isset($inputData['car_details']['post_meta_fields']['doors'][0]) ? $inputData['car_details']['post_meta_fields']['doors'][0] :'' );
$transmission = ( isset($inputData['car_details']['post_meta_fields']['transmission'][0]) ? $inputData['car_details']['post_meta_fields']['transmission'][0] :'' );
$no_of_cylinders = ( isset($inputData['car_details']['post_meta_fields']['no-of-cylinders'][0]) ? $inputData['car_details']['post_meta_fields']['no-of-cylinders'][0] :'' );
$fuel_type = ( isset($inputData['car_details']['post_meta_fields']['fuel-type'][0]) ? $inputData['car_details']['post_meta_fields']['fuel-type'][0] :'' );
$warranty = ( isset($inputData['car_details']['post_meta_fields']['warranty'][0]) ? $inputData['car_details']['post_meta_fields']['warranty'][0] :'' );
$horsepower = ( isset($inputData['car_details']['post_meta_fields']['horsepower'][0]) ? $inputData['car_details']['post_meta_fields']['horsepower'][0] :'' );
$slug = ( isset($inputData['car_details']['slug']) ? $inputData['car_details']['slug'] :'' );

$sanitize->checkInputName($full_name, 'full_name');
$sanitize->checkInputEmail($email_address, 'email_address');
$sanitize->checkInputEmail($friends_email_address, 'friends_email_address');

if (!$sanitize->getIsValid()) {
	echo json_encode($sanitize->getErrors());
	exit();
} else {

	try {

		$mail->SMTPDebug = 0;
		$mail->isSMTP();
		$mail->Host = 'smtp.gmail.com';
		$mail->SMTPAuth = true;
		$mail->Username = 'joelaposaga@gmail.com';
		$mail->Password = 'tibaaalssmknssoz';
		$mail->SMTPSecure = 'tls';
		$mail->Port = 587;                                		

		$mail->setFrom($email_address, $full_name);
		$mail->addAddress($friends_email_address);     			
		$mail->addReplyTo($email_address, $full_name);

		$body = $message . '<br/><br/>';
		$body .= '<table width="500" border="0" cellspacing="0" cellpadding="0" style="border:0;border-collapse: collapse;"><tr><td align="center" style="border:0;padding: 0;margin:0;"><table border="0" cellspacing="0" cellpadding="0" style="border:0;border-collapse: collapse;"><tr><td style="width:500px;border:0;padding: 0;margin:0;"><table border="0" cellspacing="0" cellpadding="0" style="border:0;border-collapse: collapse;" width="100%"><tr><td colspan="2"><table border="0" cellspacing="0" cellpadding="10" style="border:0;border-collapse: collapse;background-color: #212223;" width="100%"><tr><td align="center"><a href="https://theelitecars.com/" target="_blank"><img src="https://theelitecars.com/wp-content/themes/theelitecars/img/elite-logo-2.png" width="150" height="51" style="width: 100%;max-width: 150px;height: auto;"></a></td></tr></table></td></tr><tr><td valign="top"><table border="0" cellspacing="0" cellpadding="0" style="border:0;border-collapse: collapse;" width="100%"><tr><td height="10"></td></tr><tr><td align="center"><img src="'.$image_one.'" width="225" height="150" style="max-width: 225px;width: 100%;height: auto;"></td></tr><tr><td height="10"></td></tr><tr><td align="center"><img src="'.$image_two.'" width="225" height="150" style="max-width: 225px;width: 100%;height: auto;"></td></tr><tr><td height="10"></td></tr><tr><td align="center"><img src="'.$image_three.'" width="225" height="150" style="max-width: 225px;width: 100%;height: auto;"></td></tr></table></td><td valign="top"><table border="0" cellspacing="0" cellpadding="10" style="border:0;border-collapse: collapse;" width="100%"><tr><td align="center"><table border="0" cellspacing="0" cellpadding="0" style="border:0;border-collapse: collapse;" width="100%"><tr><td align="center"><h1 style="font-family: Arial, Helvetica, sans-serif; font-size: 18px;margin: 0;">'.$car_name.'</h1></td></tr><tr><td align="center"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">Stock No. '.$stock_no.'</span></td></tr></table></td></tr><tr><td align="center"><table border="0" cellspacing="0" cellpadding="0" style="border:0;border-collapse: collapse;" width="100%"><tr><td align="center"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px;margin: 0;text-decoration: line-through;color: #9a9a9a;">'.($sale_price ? 'AED '.number_format($car_price) : '').'</span></td></tr><tr><td align="center"><h2 style="font-family: Arial, Helvetica, sans-serif; font-size: 20px;margin: 0;">AED '.($sale_price ? number_format($sale_price) : number_format($car_price)).'</h2></td></tr><tr><td align="center"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">Including VAT</span></td></tr></table></td></tr><tr><td align="center"><table border="0" cellspacing="0" cellpadding="0" style="border:0;border-collapse: collapse;" width="100%"><tr><td align="center"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px;font-weight: 600;">'.$mileage.' KM</span></td><td align="center"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px;font-weight: 600;">'.$exterior_color.'</span></td><td align="center"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 16px;font-weight: 600;">'.$horsepower.' HP</span></td></tr></table></td></tr><tr><td align="center"><table border="0" cellspacing="0" cellpadding="5" style="border:0;border-collapse: collapse;" width="100%"><tr><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;font-weight: 600;">Motors Trim</span></td><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">'.$motors_trim.'</span></td></tr><tr><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;font-weight: 600;">Engine</span></td><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">'.$engine.'</span></td></tr><tr><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;font-weight: 600;">Interior Color</span></td><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">'.$interior_color.'</span></td></tr><tr><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;font-weight: 600;">Body Type</span></td><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">'.$body_type.'</span></td></tr><tr><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;font-weight: 600;">Doors</span></td><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">'.$doors.'</span></td></tr><tr><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;font-weight: 600;">Transmission</span></td><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">'.$transmission.'</span></td></tr><tr><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;font-weight: 600;">No. of Cylinders</span></td><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">'.$no_of_cylinders.'</span></td></tr><tr><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;font-weight: 600;">Fuel Type</span></td><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">'.$fuel_type.'</span></td></tr><tr><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;font-weight: 600;">Warranty</span></td><td align="left"><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">'.$warranty.'</span></td></tr></table></td></tr><tr><td align="center"><table border="0" cellspacing="0" cellpadding="0" style="border:0;border-collapse: collapse;" width="100%"><tr><td align="center"><div style="font-family: Arial, Helvetica, sans-serif;font-size: 18px;font-weight: 600;">CALL US:&nbsp;&nbsp;<a href="tel:+97143212290" style="font-family: Arial, Helvetica, sans-serif;font-size: 18px;font-weight: 600;color: #000000;">+9714 321 2290</a></div></td></tr></table></td></tr><tr><td align="center"><table border="0" cellspacing="0" cellpadding="0" style="border:0;border-collapse: collapse;" width="100%"><tr><td align="center"><a href="https://theelitecars.com/listings/'.$slug.'" target="_blank"><img src="image/button.png" style="width: 100%;max-width: 170px;" width="170" height="44"></a></td></tr></table></td></tr></table></td></tr><tr><td height="15"></td></tr><tr><td colspan="2"><table border="0" cellspacing="0" cellpadding="10" style="border:0;border-collapse: collapse;background-color: #C5323F;" width="100%"><tr><td align="center"><span style="font-family: Arial, Helvetica, sans-serif;font-size: 12px;color: #fff;">@ Copyright 2019, All Rights Reserved, <a href="https://theelitecars.com/" target="_blank" style="font-family: Arial, Helvetica, sans-serif;font-size: 12px;color: #fff;">The Elite Cars LLC</a></span></td></tr></table></td></tr></table></td></tr></table></td></tr></table>';
		$body .= '<br/><br/>This message is from https://m.theelitecars.com';

		$mail->isHTML(true);                                
		$mail->Subject = $full_name . ' wants you to check this vehicle out';
		$mail->Body    = $body;

		$mail->send();

		echo json_encode(array("message" => "Message succesfully sent", "msg_code" => 0));

	} catch (Exception $e) {

		echo json_encode(array("message" => "Message failed to send. Please try again", "msg_code" => 1));

	}

}

