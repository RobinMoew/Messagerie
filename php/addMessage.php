<?php
include_once('co.php');

$pseudo = $_POST['pseudo'];
$message = $_POST['message'];

$sql = $co->prepare('INSERT INTO Message (message, pseudo) VALUES (?, ?)');
$sql->bind_param('ss', $message, $pseudo);
$sql->execute();
$sql->close();
$co->close();
?>