
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>e-Campus</title>
</head>
<body>
	<?php
		print("<h1>Sign Up</h1><form method = 'post' action='signUp.php'>ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='id'/><br>Passwords:<input type='password' name='password'/><br><input type='submit' name = 'signUp' value='確認送出'' /></form>");
		if (isset($_POST["signUp"])) {
			$database=mysqli_connect( 'localhost','root', '' ,'dwp');
			$id=$_POST["id"];
			$query=mysqli_query($database,"SELECT id FROM member WHERE ID='".$id."'");
			$pass = mysqli_fetch_array($query,MYSQLI_ASSOC);
			if($pass["id"]==$_POST["id"]){
    				print("<p style='color:red;'>This id has been signed up!</p>");			
    		}
    		else{
    			
    			mysqli_query($database,"INSERT INTO member(id,password) VALUE('".$_POST["id"]."','".$_POST["password"]."')");
    			print("Successful! Go homepage.");
                header("Refresh:3; url=index.php");
                
    		}
		}
	?>
</body>
</html>