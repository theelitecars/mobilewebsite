<?php

class InputValidation
{
	public $isValid = true;
	public $errors = array();

	protected function pre_clean ($inputFields = '') {
		$inputFields = trim($inputFields);
		$inputFields = strip_tags($inputFields);
		$inputFields = htmlentities($inputFields, ENT_QUOTES, 'UTF-8');

		return $inputFields;
	}

	public function validateText ($inputText = '') {
		$inputText = $this->pre_clean($inputText);
		$inputText = filter_var($inputText, FILTER_SANITIZE_STRING);

		return $inputText;
	}

	public function validateEmail ($inputEmail = '') {
		$inputEmail = $this->pre_clean($inputEmail);
		$inputEmail = filter_var($inputEmail, FILTER_SANITIZE_EMAIL);

		return $inputEmail;
	}

	public function checkInputName($inputName, $fieldName) {
	
		if (strlen($inputName) <= 2) {
			array_push( $this->errors, array("input_field" => $fieldName,"msg_code" => 2) );
			$this->isValid = false;
		} else {
			if (!preg_match('/^[a-zA-Z ]*$/', $inputName)) {
				array_push( $this->errors, array("input_field" => $fieldName,"msg_code" => 2) );
				$this->isValid = false;
			}
		}
	}

	public function checkInputEmail($inputEmail, $fieldName) {
		if (strlen($inputEmail) <= 6) {
			array_push( $this->errors, array("input_field" => $fieldName,"msg_code" => 2) );
			$this->isValid = false;
		} else {
			if (!filter_var($inputEmail, FILTER_VALIDATE_EMAIL)) {
				array_push( $this->errors, array("input_field" => $fieldName,"msg_code" => 2) );
				$this->isValid = false;
			}
		}
	}

	public function getIsValid () {
		return $this->isValid;
	}

	public function getErrors () {
		return $this->errors;
	}
}
