<?php
    include('db.php');
    $userName = $_POST['ID'];
    $query = "SELECT Name from tbl_users_218 where name like '%yos%'";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die("DB query failed.");
    }
    $nameOf = mysqli_fetch_assoc($result);
    echo $nameOf['Name'];
    mysqli_close($connection);
?>