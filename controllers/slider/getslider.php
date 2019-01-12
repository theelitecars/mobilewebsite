<?php  

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/settings.php';

$database = new Database();
$db = $database->getConnection();

$slider = new Settings($db);

$sn = 'slider';
$stmt = $slider->get_settings($sn);
$num = $stmt->rowCount();

if ($num > 0) {
	$slider_arr = array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		extract($row);

		$slider_item = array(
			'settings_id' => $settings_id,
			'settings_name' => $settings_name,
			'settings_value' => $settings_value,
			'date_added' => $date_added,
			'date_published' => $date_published,
			'status' => $status,
			'remarks' => $remarks,
		);

		array_push($slider_arr, $slider_item);
	}

	echo json_encode($slider_arr);
} else {
	echo json_encode(
		array('type' => 1, 'message' => 'No products found.', 'msg_code' => '0001')
	);
}

?>