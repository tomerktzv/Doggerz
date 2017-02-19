<?php
    include('db.php');
    $userName = $_POST['ID'];
    $query = "SELECT Name FROM tbl_users_218 where ID =" . $userName;
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die("DB query failed.");
    }
    $nameOf = mysqli_fetch_assoc($result);
    echo $nameOf['Name'];
    mysqli_close($connection);
?>