<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>SKILL management</title>
</head>
<body>
	<?php
		session_start();
		$database=mysqli_connect( 'localhost','root', '' ,'dwp');
		$id=$_SESSION['account'];

		if(isset($_POST["correctT"])){
			$query=mysqli_query($database,"UPDATE member SET skill2=1 WHERE ID='".$id."'");
			print("Successful!");
            header("Refresh:3; url=skill.php");

		}
		
		elseif(isset($_POST["correctH"])){
			$query=mysqli_query($database,"UPDATE member SET skill3=1 WHERE ID='".$id."'");
			print("Successful!");
            header("Refresh:3; url=skill.php");
		}
		else{
			if(!isset($_POST["purchase"])){
			print("<form method = 'post' action='shop.php'>");
			$query=mysqli_query($database,"SELECT skill2 FROM member WHERE ID='".$id."'");
			$pass = mysqli_fetch_array($query,MYSQLI_ASSOC);
			if($pass["skill2"]==0){
				print("<input type='radio' name='want' value='three-way'><div><img src='handshake.jpg'/>three-way handshake(搶先預購只要$50!!) </div>");
			}


			$query=mysqli_query($database,"SELECT skill3 FROM member WHERE ID='".$id."'");
			$pass = mysqli_fetch_array($query,MYSQLI_ASSOC);
			if($pass["skill3"]==0){
				print("<hr><input type='radio' name='want' value='hello'><div><img src='hello_world.png'/>Hello world!(搶先預購只要$50!!) </div>");
			}

			print("<br><input type='submit' name = 'purchase' value='購買' /></form>");
		}
		if(isset($_POST["purchase"])){
			if(isset($_POST['want'])){
				if($_POST['want']=='three-way'){
				print("<form method = 'post' action='shop.php'>您選購的是three-way handshake<img src='handshake.jpg'/><br>共$50 <input type='submit' name = 'correctT' value='確認無誤，立即購買' /></form><a href='shop.php'><button>重新選購</button></a>");
			}
			elseif($_POST['want']=='hello'){
				print("<form method = 'post' action='shop.php'>您選購的是Hello world!<img src='hello_world.png'/><br>共$50 <input type='submit' name = 'correctH' value='確認無誤，立即購買' /></form><a href='shop.php'><button>重新選購</button></a>");
			}
			}
			
			else{
				print("沒有選購產品<br><a href='index.php'><button>回首頁</button></a>");
			}

			}
		}


		
		
		
	?>

</body>
</html>