<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  /*
  $receiving_email_address = 'contact@example.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );


  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  echo $contact->send(); */

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require '../assets/vendor/PHPMailer/src/Exception.php';
  require '../assets/vendor/PHPMailer/src/PHPMailer.php';
  require '../assets/vendor/PHPMailer/src/SMTP.php';

  $mail = new PHPMailer(true);

  try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Change this if using another SMTP service
    $mail->SMTPAuth = true;
    $mail->Username = 'amanjain4269@gmail.com'; // Your email address
    $mail->Password = 'jlcwpximdmxvsewg'; // Your email password or App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use TLS encryption
    $mail->Port = 587;

    // Sender and Recipient
    $mail->setFrom($_POST['email'], $_POST['name']);
    $mail->addAddress('rooparti99@gmail.com'); // Your receiving email

    // Email Content
    $mail->isHTML(true);
    $mail->Subject = 'Contact Enquiry via Website';
    $mail->Body = "
        <h2>Contact Form Details</h2>
        <p><strong>Name:</strong> {$_POST['name']}</p>
        <p><strong>Company Name:</strong> {$_POST['company-name']}</p>
        <p><strong>Email:</strong> {$_POST['email']}</p>
        <p><strong>Subject:</strong> {$_POST['subject']}</p>
        <p><strong>Message:</strong> {$_POST['message']}</p>
    ";

    // Send Email
    $mail->send();
    echo 'OK';
} catch (Exception $e) {
    echo "Error: {$mail->ErrorInfo}";
}

?>
