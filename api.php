<?php
// teapot_api
// wOyZkLcYQ0M9qhBo


function database($text, $col, $t){
	// db.exesfull.com

	$conn = new mysqli('localhost', 'teapot_api', 'wOyZkLcYQ0M9qhBo', 'teapot_shop');
	if ($conn->connect_error) {
		die($dbname." Connection failed: " . $conn->connect_error);
	}
	$conn->set_charset("utf8mb4_general_ci");
    if (($t == '')&&($col == '')){
        $conn->query($text);
    }else{    
        $result = $conn->query($text);
        if ($result->num_rows > 0) {
            if ($t == ''){
                while($row = $result->fetch_assoc()) {
                    return($row[$col]);
                }
            }else{
                return $result;
            }
        } else {
            return '';
        }
    }
	$conn->close();
}

function select_teapots(){
    $cat = addslashes(!empty($_REQUEST['cat']) ? $_REQUEST['cat'] : '');
    if ($cat == 'all'){
        $pars = '';
    }else if ($cat == 'new'){
        $pars = 'ORDER BY `date` DESC';
    }else if ($cat == 'low'){
        $pars = 'ORDER BY `price` ASC';
    }else if ($cat == 'high'){
        $pars = 'ORDER BY `price` DESC';
    }
    $arr = [];
    $sql = 'SELECT * FROM `teapots` WHERE `status` = "true" '.$pars;
    $g = database($sql, '*', $t='+');
	while($row=mysqli_fetch_array($g)){
        $arr[] = array('id'=> $row[0], 'title' => $row[1], 'img'=> $row[3], 'price'=>$row[4]);
    }
    return json_encode($arr);
}

function admin_select_teapots(){
    $cat = addslashes(!empty($_REQUEST['cat']) ? $_REQUEST['cat'] : '');
  
    $arr = [];
    $sql = 'SELECT * FROM `teapots` WHERE `status` = "true" '.$pars;
    $g = database($sql, '*', $t='+');
	while($row=mysqli_fetch_array($g)){
        $arr[] = array('id'=> $row[0], 'title' => $row[1], 'img'=> $row[3], 'price'=>$row[4], 'date'=>$row[5]);
    }
    return json_encode($arr);
}

function admin_get_teapot_data(){
    $item_id = addslashes(!empty($_REQUEST['item_id']) ? $_REQUEST['item_id'] : '');
  
    $sql = 'SELECT * FROM `teapots` WHERE `ID` = "'.$item_id.'"';
    $g = database($sql, '*', $t='+');
	$row=mysqli_fetch_array($g);
    $arr = array('id'=> $row[0], 'title' => $row[1], 'desc' => $row[2], 'img'=> $row[3], 'price'=>$row[4], 'date'=>$row[5]);
    return json_encode($arr);
}

function admin_api_data_save(){
    $item_id = addslashes(!empty($_REQUEST['item_id']) ? $_REQUEST['item_id'] : '');
    $title = addslashes(!empty($_REQUEST['title']) ? $_REQUEST['title'] : '');
    $desc = addslashes(!empty($_REQUEST['desc']) ? $_REQUEST['desc'] : '');
    $price = addslashes(!empty($_REQUEST['price']) ? $_REQUEST['price'] : '');
    $img = addslashes(!empty($_REQUEST['img']) ? $_REQUEST['img'] : '');

    $sql = 'UPDATE `teapots` SET `title`="'.$title.'",`description`="'.$desc.'",`img`="'.$img.'",`price`="'.$price.'" WHERE `ID` = "'.$item_id.'"';
    $a = database($sql, '', $t='+');
    return 'ok';
}

function admin_api_data_create(){
    $title = addslashes(!empty($_REQUEST['title']) ? $_REQUEST['title'] : 'Чайник');
    $desc = addslashes(!empty($_REQUEST['desc']) ? $_REQUEST['desc'] : '');
    $price = addslashes(!empty($_REQUEST['price']) ? $_REQUEST['price'] : '0');
    $img = addslashes(!empty($_REQUEST['img']) ? $_REQUEST['img'] : 'https://other.exesfull.com/projects/teapot_shop/favicon.ico');
    $date = date('Y-m-d H:i:s');

    $sql = 'INSERT INTO `teapots`(`ID`, `title`, `description`, `img`, `price`, `date`, `status`) SELECT (SELECT MAX(`ID`) FROM `teapots` WHERE 1)+1 AS `ID`,
			"'.$title.'" AS `title`, "'.$desc.'" AS `description`, "'.$img.'" AS `img`, "'.$price.'" AS `price`, "'.$date.'" AS `date`, "true" AS `status`';
    $a = database($sql, '', $t='+');
    return 'ok';
}

function admin_api_delete(){
    $item_id = addslashes(!empty($_REQUEST['item_id']) ? $_REQUEST['item_id'] : '');
    $sql = 'DELETE FROM `teapots` WHERE `ID` = "'.$item_id.'"';
    $a = database($sql, '', $t='+');
    return 'ok';
}

function api_start(){
    $api = addslashes(!empty($_REQUEST['api']) ? $_REQUEST['api'] : '');
    if ($api == 'select_teapots'){
        return select_teapots();
    }else if ($api == 'admin_select_teapots'){
        return admin_select_teapots();    
    }else if ($api == 'admin_get_teapot_data'){
        return admin_get_teapot_data();       
    }else if ($api == 'admin_api_data_save'){
        return admin_api_data_save();       
    }else if ($api == 'admin_api_data_create'){
        return admin_api_data_create();       
    }else if ($api == 'admin_api_delete'){
        return admin_api_delete();     
    }else{
        return 'error_api';
    }
}
echo(api_start());
?>