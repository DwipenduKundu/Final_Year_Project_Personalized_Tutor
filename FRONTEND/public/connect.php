<?php
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password =$_POST['password'];
    //connction of database
    $conn =new mysqli('page-2.html','root','','try');
    if($conn->connect_error){
        die('connection Failed : '.$conn->connect_error);
    }else{
        $stmt = $conn ->prepare("insert into signup(username,email,password) values(?,?,?)")
        $stmt->blind_param("sss",$username,$email,$password);
        $stmt->execute();
        echo "submitted...";
        $stmt->close();
        $stmt->close();
    }
?>