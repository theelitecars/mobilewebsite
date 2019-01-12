<?php  

class Settings
{
	private $conn;
	private $table_name = 'settings';

	public $settings_id;
	public $settings_name;
	public $settings_value;
	public $date_added;
	public $date_published;
	public $status;
	public $remarks;

	public function __construct($db) {
		$this->conn = $db;
	}

	function get_settings($sn) {

		if (!$sn) {
			echo json_encode(
				array('type' => 1, 'message' => 'No products found.', 'msg_code' => '0002')
			);
			exit();
		} else {
			$query = 'SELECT * FROM ' . $this->table_name . ' WHERE settings_name="'. $sn .'" AND status="1"';

			$stmt = $this->conn->prepare($query);
			$stmt->execute();

			return $stmt;
		}
	}

	function add_settings($sn) {
		if (!$sn) {
			echo json_encode(
				array('type' => 0, 'message' => 'Unable to add slider', 'msg_code' => '0001')
			);
			exit();
		} else {
			$query = 'INSERT INTO ' . $this->table_name . ' SET settings_name=:settings_name, settings_value=:settings_value, date_added=:date_added, date_published=:date_published, status=:status, remarks=:remarks';

			$stmt = $this->conn->prepare($query);

			$this->settings_name = htmlspecialchars(strip_tags($this->settings_name));
			$this->settings_value = htmlspecialchars(strip_tags($this->settings_value));
			$this->date_added = htmlspecialchars(strip_tags($this->date_added));
			$this->date_published = htmlspecialchars(strip_tags($this->date_published));
			$this->status = htmlspecialchars(strip_tags($this->status));
			$this->remarks = htmlspecialchars(strip_tags($this->remarks));

			$stmt->bindParam(':settings_name', $this->settings_name);
			$stmt->bindParam(':settings_value', $this->settings_value);
			$stmt->bindParam(':date_added', $this->date_added);
			$stmt->bindParam(':date_published', $this->date_published);
			$stmt->bindParam(':status', $this->status);
			$stmt->bindParam(':remarks', $this->remarks);

			if ($stmt->execute()) {
				return true;
			}

			return false;
		}
	}
}

?>