<?php
	require_once("phpmail.php");
	if( isset($_POST['price']) ){
		$email_admin = "p_e_a_c_e@mail.ru";
		// $email_admin = "soc.taxi.35@gmail.com";

		$from = "“LP Templates”";
		$email_from = "robot@LpTemplates.ru";

		$deafult = array("name"=>"Имя","phone"=>"Телефон", "email"=>"E-mail", "kit" => "Набор");

		$fields = array();

		foreach ($deafult  as $key => $value){
			if( isset($_POST[$key]) ){
				$fields[$value] = $_POST[$key];
			}
		}

		$i = 1;
		while( isset($_POST[''.$i]) ){
			$fields[$_POST[$i."-name"]] = $_POST[''.$i];
			$i++;
		}

		$subject = $_POST["subject"];

		$title = "Поступила заявка с сайта ".$from.":\n";

		$message = "<div><h3 style=\"color: #333;\">".$title."</h3>";

		foreach ($fields  as $key => $value){
			$message .= "<div><p><b>".$key.": </b>".$value."</p></div>";
		}
		$message .= "</div>";
		send_mime_mail("Сайт ".$from,$email_from,$name,$email_admin,'UTF-8','UTF-8',$subject,$message,true);

		$mrh_login = "LPTemplates";
		$mrh_pass1 = "qwerty123";
		$shp_add = "Add";
		$shp_template = $_POST['template'];
		$shp_email = $_POST['email'];
		if($_POST['kit']) {
			if(strripos($_POST['kit'],'ключевиков')) {
				$shp_add .= "key";
			}
			if(strripos($_POST['kit'],'продаж')) {
				$shp_add .= "script";
			}
			if(strripos($_POST['kit'],'кит')) {
				$shp_add .= "kit";
			}
		}
		$inv_desc = $_POST['1-name'].": ".$_POST['1'];
		$out_summ = $_POST['price'];
		$email = $_POST['email'];
		$inv_id = 0;
		$culture = "ru";
		$encoding = "utf-8";
		$crc  = md5("$mrh_login:$out_summ:$inv_id:$mrh_pass1:Shp_add=$shp_add:Shp_email=$shp_email:Shp_template=$shp_template");
		header("Location: https://auth.robokassa.ru/Merchant/Index.aspx?MrchLogin=$mrh_login&OutSum=$out_summ&InvId=$inv_id&Desc=$inv_desc&Email=$email&Culture=$culture&Encoding=$encoding&Shp_add=$shp_add&Shp_email=$shp_email&Shp_template=$shp_template&SignatureValue=$crc&IsTest=1");
	} elseif($_REQUEST["OutSum"]) {

		$mrh_pass2 = "qwerty321";  
		$out_summ = $_REQUEST["OutSum"];
		$inv_id = $_REQUEST["InvId"];
		$shp_add = $_REQUEST["Shp_add"];
		$shp_template = $_REQUEST["Shp_template"];
		$shp_email = $_REQUEST["Shp_email"];
		$crc = $_REQUEST["SignatureValue"];

		// HTTP parameters: $out_summ, $inv_id, $crc
		$crc = strtoupper($crc);   // force uppercase

		// build own CRC
		$my_crc = strtoupper(md5("$out_summ:$inv_id:$mrh_pass2:Shp_add=$shp_add:Shp_email=$shp_email:Shp_template=$shp_template"));

		if (strtoupper($my_crc) == strtoupper($crc))
		{	
			$email_admin = $shp_email;
			// $email_admin = "soc.taxi.35@gmail.com";

			$from = "“LP Templates”";
			$email_from = "robot@LpTemplates.ru";
			$subject = "Заказ шаблона";
			$message = "<div>";
			$message .= "<div><p>Благодарим Вас за совершение покупки в нашем интернет-магазине. Надеемся, полученные материалы станут для Вас отличным помощником в создании эффективного и работающего сайта. Желаем прибыли Вашему бизнесу!</p></div>";
			$message .= "<div><p>В случае возникновения каких-либо вопросов, касающихся настройки и установки шаблонов, Вы можете обратится в службу технической поддержки: support@lptemplates.ru</p></div>";
			$message .= "<div><p>С уважением, команда LPTemplates.</p></div>";
			$message .="</div>";
			$files = array();
			array_push($files, dirname(__FILE__)."/".$shp_template.".zip");
			if(strripos($_REQUEST["Shp_add"],'key')) {
				array_push($files, dirname(__FILE__)."/key.docx");
			}
			if(strripos($_REQUEST["Shp_add"],'script')) {
				array_push($files, dirname(__FILE__)."/script.doc");
			}
			if(strripos($_REQUEST["Shp_add"],'kit')) {
				array_push($files, dirname(__FILE__)."/kit.doc");
			}
			XMail("Сайт ".$from,$email_from,$name,$email_admin,'UTF-8','UTF-8',$subject,$message,$files,true);
			echo "OK" . $inv_id;
			exit();
		}
		
	}
?>