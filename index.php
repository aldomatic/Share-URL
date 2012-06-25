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
    <html>
        <head>
            <meta charset="utf-8"/>
            <title>Mobile Share URL</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
			<meta name="apple-mobile-web-app-capable" content="yes">
			<meta name="apple-mobile-web-app-status-bar-style" content="black" />
			<link rel="apple-touch-startup-image" href="http://mobilelicio.us/ot/share-url/imgs/surl_loading.jpg" />
			<link rel="apple-touch-icon-precomposed" sizes="114x114" href="http://mobilelicio.us/ot/share-url/imgs/iphone4Home.png" /> 
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
		
		<div data-role="header">
		<a href="#" data-icon="monster-home" data-iconpos="notext" data-ajax="false" id="homeBtn" class="header-button">Home</a>
		<img src="imgs/logo.png" />
		<a href="#" data-icon="monster-search" data-iconpos="notext" data-ajax="false" id="searchNaviButton" class="header-button ui-btn-right">Search</a>
		</div>
		
		
			<div data-role="content">
			
				<div id="searchProject">
					<div class="input"><input type="test" id="projNum" placeholder="Search" /><span class="ui-icon-delete"></span>
</div>
					<a href="#" id="searchBtn" data-role="button" data-theme="e">Search</a>				
				</div>
				<div id="loader"><span><img src="imgs/ajax-loader.gif" />Retrieving Projects...</span></div>
				<div id="ideasWrap">
					

				<div>
			</div><!-- /content -->
		</div>
        </body>
    </html>
EOT;
    echo $template;
}		
// Returns ides in json format
$app->get('/all', 'getAll'); 
	function getAll(){
		$client = new couchClient("http://onetech.iriscouch.com", "shareurl");	
		$result = $client->getView('getall','getAll');
		echo json_encode($result);

	}
	
// Returns ides in json format
$app->get('/one/:project/', 'getOne'); 
	function getOne($project){
		$client = new couchClient("http://onetech.iriscouch.com", "shareurl");	
		$doc = $client->getDoc($project);
		echo json_encode($doc);
	}	
	
// Add	
$app->get('/add/:id/:c/:cnt/:tc1/:tc2/:tc3/:tc4/:tc5', 'addNew');	
	function addNew($id, $c, $cnt, $tc1, $tc2, $tc3, $tc4, $tc5){		
		$client = new couchClient("http://onetech.iriscouch.com", "shareurl");	
		$doc = new stdClass();
		$doc->_id = $id;
		$doc->created = $c;
		$doc->control = $cnt;
		$doc->tc1 = $tc1;
		$doc->tc2 = $tc2;
		$doc->tc3 = $tc3;
		$doc->tc4 = $tc4;
		$doc->tc5 = $tc5;
		$client->storeDoc($doc);
		//echo "Doc recorded. id = ".$update->id." and revision = ".$update->rev."<br>\n";
	}

// Update	
$app->get('/update/:id/:c/:cnt/:tc1/:tc2/:tc3/:tc4/:tc5', 'updateDoc');	
	function updateDoc($id, $c, $cnt, $tc1, $tc2, $tc3, $tc4, $tc5){		
		$client = new couchClient("http://onetech.iriscouch.com", "shareurl");	
		$doc = $client->getDoc($id);
		$doc->created = $c;
		$doc->control = $cnt;
		$doc->tc1 = $tc1;
		$doc->tc2 = $tc2;
		$doc->tc3 = $tc3;
		$doc->tc4 = $tc4;
		$doc->tc5 = $tc5;
		$update = $client->storeDoc($doc);
		//echo "Doc recorded. id = ".$update->id." and revision = ".$update->rev."<br>\n";
	}
	

$app->run();