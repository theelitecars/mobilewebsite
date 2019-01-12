<?php  

/**
 * Database Connection
 */
class Database
{
	private $host = 'localhost';
	private $db_name = 'tec_mobile_website';
	private $username = 'root';
	private $password = '';
	public $conn;
	
	public function getConnection() {
		$this->conn = null;

		try {
			$this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
			$this->conn->exec('set name utf8');
		} catch(PDOException $exception) {
			echo 'Connection error: ' . $exception->getMessage();
		}

		return $this->conn;
	}
}

?>