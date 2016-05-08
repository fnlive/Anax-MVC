<!doctype html>
<html lang='en' class='no-js'>
<head>
<meta charset='utf-8' />
<title><?=isset($title) ? $title : 'Template for testprograms in JavaScript'?></title>
<link rel="stylesheet/less" type="text/css" href="style.less">
<script src="../../js/less.min.js"></script>
<script src="../../js/modernizr.js"></script>
<?php
echo ($_SERVER['SERVER_NAME']=='localhost') ?
'<script src="http://localhost:35729/livereload.js"></script>' : '';
?>
</head>
<body>
