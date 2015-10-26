<?
	function send_mime_mail($name_from,$email_from,$name_to,$email_to,$data_charset,$send_charset,$subject,$body,$html = FALSE,$reply_to = FALSE) {
	  	$to = $email_to;
	  	$subject = mime_header_encode($subject, $data_charset, $send_charset);
	  	$from =  mime_header_encode($name_from, $data_charset, $send_charset).' <' . $email_from . '>';
	  	if($data_charset != $send_charset) {
	    	$body = iconv($data_charset, $send_charset, $body);
	  	}
	  	$headers = "From: $from\r\n";
	  	$type = ($html) ? 'html' : 'plain';
	  	$headers .= "Content-type: text/$type; charset=$send_charset\r\n";
	  	$headers .= "Mime-Version: 1.0\r\n";
	  	if ($reply_to) {
	  	    $headers .= "Reply-To: $reply_to";
	  	}
	  	return mail($to, $subject, $body, $headers);
	}
	function XMail( $name_from,$email_from,$name_to,$email_to,$data_charset,$send_charset,$subject,$body,$files,$html = FALSE,$reply_to = FALSE ) { 
		$to = $email_to;
	  	$subject = mime_header_encode($subject, $data_charset, $send_charset);
	  	$from =  mime_header_encode($name_from, $data_charset, $send_charset).' <' . $email_from . '>';
	  	if($data_charset != $send_charset) {
	    	$body = iconv($data_charset, $send_charset, $body);
	  	}
	    
	    $un        = strtoupper(uniqid(time())); 
	    $head      = "From: $from\n"; 
	    $head     .= "Subject: $subject\n"; 
	    $head     .= "X-Mailer: PHPMail Tool\n";  
	    $head     .= "Mime-Version: 1.0\n"; 
	    $head     .= "Content-Type:multipart/mixed;"; 
	    $head     .= "boundary=\"----------".$un."\"\n\n"; 
	    $zag       = "------------".$un."\nContent-Type:text/html;\n"; 
	    $zag      .= "Content-Transfer-Encoding: 8bit\n\n$body\n\n"; 
	    foreach ($files as $filename) {
	    	$f         = fopen($filename,"rb"); 
	    	$zag      .= "------------".$un."\n"; 
		    $zag      .= "Content-Type: application/octet-stream;"; 
		    $zag      .= "name=\"".basename($filename)."\"\n"; 
		    $zag      .= "Content-Transfer-Encoding:base64\n"; 
		    $zag      .= "Content-Disposition:attachment;"; 
		    $zag      .= "filename=\"".basename($filename)."\"\n\n"; 
		    $zag      .= chunk_split(base64_encode(fread($f,filesize($filename))))."\n"; 
		    fclose($f);
	    }   
	    return @mail("$to", "$subj", $zag, $head); 
	} 
	function mime_header_encode($str, $data_charset, $send_charset) {
	  	if($data_charset != $send_charset) {
	    	$str = iconv($data_charset, $send_charset, $str);
	  	}
	  	return '=?' . $send_charset . '?B?' . base64_encode($str) . '?=';
	}
?>