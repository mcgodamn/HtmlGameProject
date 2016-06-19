
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Login</title>
</head>
<body>
		<?php
            session_start();
    		if (($_SESSION['status']==0)) {
                print("<h1>登入</h1><form method = 'post' autocomplete = 'on' action='login.php'>ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='id'/><br>Passwords:<input type='password' name='password'/><br><input type='submit' name = 'submit' value='登入'' /></form>");
    		}
    		if (isset($_POST["submit"])) {
    			$id=$_POST["id"];
    			$database=mysqli_connect( 'localhost','root', '' ,'dwp');
    			$query=mysqli_query($database,"SELECT password,skill FROM member WHERE ID='".$id."'");
    			$pass = mysqli_fetch_array($query,MYSQLI_ASSOC);    			
    			if(($pass["password"]==$_POST["password"])&&($_POST["password"]!="")){
    				$_SESSION['account']=$_POST['id'];
                    $_SESSION['skill']=$pass["skill"];
					$_SESSION['status']=1;
                    print("Successful! Go homepage.");
                    header("Refresh:3; url=index.php");			
    			}
    			else{
                    $_SESSION['status']=0;
    				print"<p style='color:red;'>id or password is not correct!</p>";
    				header("Refresh:1; url=login.php");
    			}
    		}
    	?>
</body>
</html>