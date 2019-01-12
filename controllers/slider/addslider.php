<?php  

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/settings.php';

$r_required = array('settings_value');
$c_required = array();

if (count($_POST)) {

	foreach ($r_required as $v_r_r) {
		if ( empty(trim($_POST[$v_r_r])) || !isset($_POST[$v_r_r])) {
			array_push($c_required, $v_r_r);
		}
	}

	if (count($c_required) > 0) {
		echo json_encode(
			array('type' => 0, 'message' => 'Unable to add slider', 'msg_code' => '0001', 'fields' => $c_required)
		);
		exit();
	}

} else {
	echo json_encode(
		array('type' => 0, 'message' => 'Not a valid request', 'msg_code' => '0001')
	);
	exit();
}


$database = new Database();
$db = $database->getConnection();
$slider = new Settings($db);

$sn = 'slider';

$slider->settings_name = $sn;
$slider->settings_value = $_POST['settings_value'];
$slider->date_added = date('Y-m-d H:i:s');
$slider->date_published = date('Y-m-d H:i:s');
$slider->status = 1;
$slider->remarks = '';

if ($slider->add_settings($sn)) {
	echo json_encode(
		array('type' => 1, 'message' => 'Slider added', 'msg_code' => '0001')
	);
} else {
	echo json_encode(
		array('type' => 0, 'message' => 'Unable to add slider', 'msg_code' => '00012')
	);
}

?>