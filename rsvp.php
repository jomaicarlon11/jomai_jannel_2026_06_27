<?php
    include("_dbconfig.php");
    header('Content-Type: application/json');

    $message = [
        "resp0nse_status" => "success!!!",
        "resp0nse_message" => "",
        "sql_debugger" => "",
    ];

    // For debugging: Uncomment this to check the raw POST data sent
    // echo json_encode($_POST);

    $SQL = "";
    $array_datasss = [];

    try{
        if (
            isset($_POST['rsvp_name'])
            && isset($_POST['rsvp_email'])
            && isset($_POST['rsvp_guests_count'])
            && isset($_POST['rsvp_attending_events'])
            && isset($_POST['rsvp_inv_code'])
            && isset($_POST['rsvp_message'])
            ) 
        {
            $array_datasss = [ '_XXX_rsvp_inv_code' => $_POST["rsvp_inv_code"], ];
            $stat3m3nt = $pdo_db_connection->prepare("SELECT COUNT(*) AS 'count' FROM ".$pdo_database_name.".invitation_codes WHERE inv_code = :_XXX_rsvp_inv_code ;"); $stat3m3nt->execute($array_datasss);
            $c0unt_invitation_code = $stat3m3nt->fetch(PDO::FETCH_ASSOC)['count'];

            if (!filter_var($_POST['rsvp_email'], FILTER_VALIDATE_EMAIL)){
                $message["resp0nse_status"] = "validation!!!";
                $message["resp0nse_message"] = "The Email Address is invalid format.";
            }

            else if($c0unt_invitation_code < 1){
                $message["resp0nse_status"] = "validation!!!";
                $message["resp0nse_message"] = "Invitation code is invalid.";
            } 
            
            else{
                
                $array_datasss = [
                    '_XXX_name' => strtoupper($_POST['rsvp_name']),
                    '_XXX_email' => strtoupper($_POST['rsvp_email']),
                    '_XXX_guests_count' => strtoupper($_POST['rsvp_guests_count']),
                    '_XXX_attending_events' => strtoupper($_POST['rsvp_attending_events']),
                    '_XXX_rsvp_inv_code' => strtoupper($_POST['rsvp_inv_code']),
                    '_XXX_message' => strtoupper($_POST['rsvp_message']),
                ];

                $SQL =" INSERT INTO ".$pdo_database_name.".rsvp (";
                $SQL.=" name";
                $SQL.=" ,email";
                $SQL.=" ,guests_count";
                $SQL.=" ,attending_events";
                $SQL.=" ,inv_code";
                $SQL.=" ,message";
                $SQL.=" ) VALUES (";
                $SQL.=" :_XXX_name";
                $SQL.=" ,:_XXX_email";
                $SQL.=" ,:_XXX_guests_count";
                $SQL.=" ,:_XXX_attending_events";
                $SQL.=" ,:_XXX_rsvp_inv_code";
                $SQL.=" ,:_XXX_message";
                $SQL.=" );";

                if ($pdo_db_connection->prepare($SQL)->execute($array_datasss)) {
                    $message["sql_debugger"] = build_debug_SQL($SQL, $array_datasss);

                    if ($send_email_rsvp = s3nding_email_rsvp(strtoupper($_POST['rsvp_email']), strtoupper($_POST['rsvp_name'])) != "SENT!!!"){
                        $message["resp0nse_status"] = "error!!!";
                        $message["resp0nse_message"] = "Sending Email Error||".$send_email_rsvp;
                    }
                } 
                
                else {

                    $message["resp0nse_status"] = "error!!!";
                    $message["resp0nse_message"] = "Execute query failed";
                    $message["sql_debugger"] = build_debug_SQL($SQL, $array_datasss);
                }
            }
            
        } 
        
        else {
            $message["resp0nse_status"] = "error!!!";
            $message["resp0nse_message"] = "Failed to ISSET";
        }
    }

    catch (Exception $e) {
        $message["resp0nse_status"] = "error!!!";
        $message["resp0nse_message"] = $e->getMessage();
        $message["sql_debugger"] = build_debug_SQL($SQL, $array_datasss);
    }

    
    // Comment this for debugging mode
    $message["sql_debugger"] = "";
    echo json_encode($message);
?>