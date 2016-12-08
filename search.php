<?php
    $con=mysql_connect("remi.ee.ethz.ch","biwiproposals","UnCZM.BS");
    if (!$con)
    {
        die('Could not connect: ' . mysql_error());
    }

    $db=mysql_select_db("biwiproposals",$con);
    if (!$db)
    {
        die('Did not find the database: ' . mysql_error());
    }

    if (isset($_GET['seq_id']) and isset($_GET['fr_id']) and isset($_GET['technique']))
    {
    	$seq_id=$_GET['seq_id'];
        $fr_id=$_GET['fr_id'];
        $tech_id=$_GET['technique'];
        if($tech_id=='gt')
        	$query=mysql_query("select Mask from davis_{$tech_id} where (SequenceID LIKE '{$seq_id}') and (FrameID LIKE '{$fr_id}')");
        else
            $query=mysql_query("select Mask, J, F, T from davis_{$tech_id} where (SequenceID LIKE '{$seq_id}') and (FrameID LIKE '{$fr_id}')");
    	if($row=mysql_fetch_assoc($query))
            echo json_encode($row);
    }
    mysql_close($con);
?>
