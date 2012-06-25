<?php
require 'Slim/Slim.php';
$app = new Slim();

require_once 'lib/couch.php';
require_once 'lib/couchClient.php';
require_once 'lib/couchDocument.php';

$app->get('/', 'renderTemp');
    
	function renderTemp(){
		$template = <<<EOT
<!DOCTYPE html>
    <html style="background:none;">
        <head>
            <meta charset="utf-8"/>
            <title>Share URL - Add</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
			<link rel="stylesheet" href="css/jquery.mobile-1.0.min.css" type="text/css">
			<link rel="stylesheet" href="css/main.css" type="text/css">
			<link href='http://fonts.googleapis.com/css?family=Francois+One' rel='stylesheet' type='text/css'>
			<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
			<script type="text/javascript" src="js/jquery.mobile-1.0.min.js"></script>
			<script type="text/javascript" src="js/app.js"></script>
			<script type="text/javascript" src="js/jquery.limit-1.2.source.js"></script>
			<script type="text/javascript" src="js/date.format.js"></script>
        </head>
        <body>
		<div data-role="page">
				<div data-role="content">
<h2>Add New Project</h2>				
				<div id="update" style="border:none;">				
				<p style="color:333;padding:0;margin:0 0 20px 0;">Add a new project with URLs to share with marketing. Note: Not all projects will not always have so many test cases so just leave the ones not used blank.</p>
				<form>
					<label>BaseCamp Project Number:</label><br />
					<input type="text" id="pn" placeholder="" data-role="none"value="Project #" class="default-value"/>
					
					<label>Control URL:</label><br />
					<input type="text" id="cntrl" placeholder="" data-role="none" value="none" class="default-value"/>
					
					<label>Test Case 1 URL:</label><br />
					<input type="text" id="tc1" placeholder="" data-role="none" value="none" class="default-value" />
					
					<label>Test Case 2 URL:</label><br />
					<input type="text" id="tc2" placeholder="" data-role="none" value="none" class="default-value" />
					
					<label>Test Case 3 URL:</label><br />
					<input type="text" id="tc3" placeholder="" data-role="none" value="none" class="default-value" />
					
					<label>Test Case 4 URL:</label><br />
					<input type="text" id="tc4" placeholder="" data-role="none" value="none" class="default-value"/>
					
					<label>Test Case 5 URL:</label><br />
					<input type="text" id="tc5" placeholder="" data-role="none" value="none" class="default-value" />
				</form>					
					<a href="#" id="updateBtn" data-role="button" data-theme="e">Add Project</a>					
				</div>
			</div><!-- /content -->
		</div>
        </body>
    </html>
EOT;
    echo $template;
}
$app->run();