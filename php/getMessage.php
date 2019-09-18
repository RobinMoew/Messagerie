<?php
include_once('connexion.php');

$sql = $co->prepare('SELECT pseudo, message FROM Message');
$sql->execute();

$bdd_pseudo = null;
$bdd_message = null;
$sql->bind_result($bdd_pseudo, $bdd_message);

$result = $sql->get_result();
$output = $result->fetch_all(MYSQLI_ASSOC);

$sql->close();
$co->close();

echo json_encode($output);
?>