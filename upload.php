
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>upload</title>
</head>
<body>
<?php
	session_start();

	if (isset($_POST["uploadimg"])) {
			$database=mysqli_connect( 'localhost','root', '' ,'dwp');
			$img=$_POST["image"];
			mysqli_query($database,"UPDATE member SET image='".$img."' WHERE id='".$_SESSION['account']."'");
    		print("Successful! Go homepage.");
            header("Refresh:3; url=index.php");
                
    		
		}
		else{
			print("<h1>Hello~ ");
			print($_SESSION['account']);
			print("</h1><form method = 'post' action='upload.php'><p>請輸入圖片網址</p>url:<input type='url' name='image'/><br><input type='submit' name = 'uploadimg' value='確認送出'' /></form>");
		}
?>

</body>
</html>