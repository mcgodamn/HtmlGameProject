<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>index</title>
	<script src="game.js"></script>
	<script type="text/javascript">
		
		function format	(){
			getContent( "account.php" );
		}

		function getContent( url )
      {
         // attempt to create XMLHttpRequest object and make the request
         try
         {
            asyncRequest = new XMLHttpRequest(); 

            
            asyncRequest.addEventListener(
               "readystatechange", stateChange, false); 
            asyncRequest.open( "GET", url, true ); 
            asyncRequest.send( null ); 
         } 
         catch ( exception )
         {
            alert( "Request failed." );
         }
      } 
      function stateChange()
      {
         if ( asyncRequest.readyState == 4 && asyncRequest.status == 200 )
         {
            document.getElementById( "user" ).innerHTML = 
               asyncRequest.responseText; 
         } 
      }

		window.addEventListener( "load", format, false );
	</script>
	<style type = "text/css">
					body {
						background: gray;
						overflow:scroll;
						overflow-x:hidden;
					}
					div.bg {
						width: 1200px;
						height: 720px;
						background: url("background.png");
					}
					td {
						position: relative;
						top: 30px;
					}
					.ab2 {
						position: fixed;
						top: 200px;
						left: 360px;
						z-index: 2;
					}
					.ab1 {
						position: fixed;
						top: 200px;
						left: 360px;
						z-index: 1;
					}
					.ab0 {
						position: fixed;
						top: 200px;
						left: 360px;
						z-index: 0;
					}
	</style>
</head>
<body onload="ini()">
<!-- <button onclick="test()">test</button> -->
<script type="text/javascript">
/*---------這裡--------------------------------------------------------------------*/
	var image="";
	var usingSkill=0;
	<?php
		session_start();
		$database=mysqli_connect( 'localhost','root', '' ,'dwp');
		if(isset($_SESSION['account'])){
			$id=$_SESSION['account'];
			$query=mysqli_query($database,"SELECT usingSkill FROM member WHERE ID='".$id."'");
			$pass = mysqli_fetch_array($query,MYSQLI_ASSOC);			
			print("usingSkill=".$pass["usingSkill"].";");
			$query=mysqli_query($database,"SELECT image FROM member WHERE ID='".$id."'");
			$pass = mysqli_fetch_array($query,MYSQLI_ASSOC);			
			print("image='".$pass["image"]."';");			
		}
	?>

	
	if(usingSkill==1){
		document.addEventListener('keydown', skill, false);
		document.addEventListener('keyup', skill1, false);
	} 
	
	function skill(){ 
		var myevent = event ? event : window.event;
		if(myevent.keyCode == 66){
			document.getElementById('test').src=image;
			document.getElementById('test').width=150;
			document.getElementById('test').height=100;
		}
	}
	function skill1(){
		var myevent = event ? event : window.event;
		if(myevent.keyCode == 66){
			document.getElementById('test').src='explosion.jpg';
		}
	}
/*---------這裡--------------------------------------------------------------------*/
</script>

<table width="100%" border="0">
	<tr>
		<td height="300" id="user"></td>
	</tr>
    <tr>    	
        <td align="center">
        	<canvas id="canv" width="1200" height="720" class="ab2"></canvas>
        	<canvas id="canv2" width="1200" height="720" class="ab1"></canvas>
            <div class="bg ab0">
                <div id="player1" >
                    <img id="test" style="z-index: 2;" src="playerRM.png"	 alt="fuck">
                </div>
                <div id="player2"  style="z-index: 2;">
                	<img id="test2" src="playerLM.png" alt="fucku">
                </div>
            </div>
        </td>
    </tr>
</table>
</body>
</html>