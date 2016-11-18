<?php
$url = "http://127.0.0.1/liveMusic/www/imagens/bubbles.jpg";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url); 
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$output = curl_exec($ch);
curl_close($ch);
echo base64_encode($output);
?>

<img src="data:image/png;base64,<?php echo base64_encode($output);?>">