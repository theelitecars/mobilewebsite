<?php

$text = '<script>Harmful</script>';

$a = stripslashes($text);
$b = strip_tags($text);
$c = htmlentities($text, ENT_QUOTES, 'UTF-8');

echo $a . '<br/>';
echo $b . '<br/>';
echo $c . '<br/>';

echo filter_var('joelaposaga#$$$@gmail.com', FILTER_VALIDATE_EMAIL) . '<br/>';

$s = preg_match('/^[+-]?\d+$/', '+0547sss709549');

if (!$s) {
	echo 'Not Valid';
} else {
	echo 'Valid';
}

?>