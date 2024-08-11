const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authorization = require("../midllewares/auth");
const nodemailer = require("nodemailer");
const sendMail = require("../utils/mailer");


const getHTML = (data) =>{
  return `<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en" style="padding:0;Margin:0">
      <head>
        <meta charset="UTF-8">
          <meta content="width=device-width, initial-scale=1" name="viewport">
            <meta name="x-apple-disable-message-reformatting">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta content="telephone=no" name="format-detection">
                  <title>New email template 2024-08-04</title><!--[if (mso 16)]>
                  <style type="text/css">
                    a {text - decoration: none;}
                  </style>
                  <![endif]--><!--[if gte mso 9]><style>sup {font - size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
                  <xml>
                    <o:OfficeDocumentSettings>
                      <o:AllowPNG></o:AllowPNG>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                  </xml>
                  <![endif]--><!--[if !mso]><!-- -->
                  <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
                    <style type="text/css">
                      #outlook a {
                        padding:0;
}
                      .ExternalClass {
                        width:100%;
}
                      .ExternalClass,
                      .ExternalClass p,
                      .ExternalClass span,
                      .ExternalClass font,
                      .ExternalClass td,
                      .ExternalClass div {
                        line - height:100%;
}
                      .es-button {
                        mso - style - priority:100!important;
                      text-decoration:none!important;
}
                      a[x-apple-data-detectors] {
                        color:inherit!important;
                      text-decoration:none!important;
                      font-size:inherit!important;
                      font-family:inherit!important;
                      font-weight:inherit!important;
                      line-height:inherit!important;
}
                      .es-desk-hidden {
                        display:none;
                      float:left;
                      overflow:hidden;
                      width:0;
                      max-height:0;
                      line-height:0;
                      mso-hide:all;
}
                      @media only screen and (max-width:600px) {p, ul li, ol li, a {line - height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a {line - height:120%!important } h1 {font - size:40px!important; text-align:center } h2 {font - size:26px!important; text-align:center } h3 {font - size:20px!important; text-align:center } h1 a {text - align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {font - size:40px!important } h2 a {text - align:center } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {font - size:26px!important } h3 a {text - align:center } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {font - size:20px!important } .es-menu td a {font - size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a {font - size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a {font - size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a {font - size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a {font - size:11px!important } *[class="gmail-fix"] {display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 {text - align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 {text - align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 {text - align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img {display:inline!important } .es-button-border {display:inline-block!important } a.es-button, button.es-button {font - size:18px!important; display:inline-block!important } .es-btn-fw {border - width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right {width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header {width:100%!important; max-width:600px!important } .es-adapt-td {display:block!important; width:100%!important } .adapt-img {width:100%!important; height:auto!important } .es-m-p0 {padding:0px!important } .es-m-p0r {padding - right:0px!important } .es-m-p0l {padding - left:0px!important } .es-m-p0t {padding - top:0px!important } .es-m-p0b {padding - bottom:0!important } .es-m-p20b {padding - bottom:20px!important } .es-mobile-hidden, .es-hidden {display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden {width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden {display:table-row!important } table.es-desk-hidden {display:table!important } td.es-desk-menu-hidden {display:table-cell!important } .es-menu td {width:1%!important } table.es-table-not-adapt, .esd-block-html table {width:auto!important } table.es-social {display:inline-block!important } table.es-social td {display:inline-block!important } .es-desk-hidden {display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
                      @media screen and (max-width:384px) {.mail - message - content {width:414px!important } }
                    </style>
                  </head>
                  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                    <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F7F7F7"><!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                        <v:fill type="tile" color="#f7f7f7"></v:fill>
                      </v:background>
                      <![endif]-->
                      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F7F7F7">
                        <tr style="border-collapse:collapse">
                          <td valign="top" style="padding:0;Margin:0">
                            <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                              <tr style="border-collapse:collapse">
                                <td class="es-adaptive" align="center" style="padding:0;Margin:0">
                                  <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3d5ca3;width:600px" cellspacing="0" cellpadding="0" bgcolor="#3d5ca3" align="center" role="none">
                                    <tr style="border-collapse:collapse">
                                      <td style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#3d5ca3" bgcolor="#3d5ca3" align="left"><!--[if mso]><table style="width:560px" cellpadding="0"
                                        cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
                                          <table class="es-left" cellspacing="0" cellpadding="0" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                            <tr style="border-collapse:collapse">
                                              <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">
                                                <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                  <tr style="border-collapse:collapse">
                                                    <td align="left" style="padding:0;Margin:0"><h4 style="Margin:0;line-height:30px;mso-line-height-rule:exactly;font-family:georgia, times, 'times new roman', serif;font-size:25px;color:#ffffff"><strong>Accounting</strong></h4></td>
                                                  </tr>
                                                </table></td>
                                            </tr>
                                          </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
                                            <table class="es-right" cellspacing="0" cellpadding="0" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                              <tr style="border-collapse:collapse">
                                                <td align="left" style="padding:0;Margin:0;width:270px">
                                                  <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                    <tr style="border-collapse:collapse">
                                                      <td align="center" style="padding:20px;Margin:0;font-size:0">
                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                          <tr style="border-collapse:collapse">
                                                            <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td>
                                                          </tr>
                                                        </table></td>
                                                    </tr>
                                                  </table></td>
                                              </tr>
                                            </table><!--[if mso]></td></tr></table><![endif]--></td>
                                    </tr>
                                  </table></td>
                              </tr>
                            </table>
                            <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0">
                                  <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fafafa;width:600px" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center" role="none">
                                    <tr style="border-collapse:collapse">
                                      <td style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:40px;background-repeat:no-repeat" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                          <tr style="border-collapse:collapse">
                                            <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr style="border-collapse:collapse">
                                                  <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:20px"><h1 style="Margin:0;line-height:60px;mso-line-height-rule:exactly;font-family:lora, georgia, 'times new roman', serif;font-size:50px;font-style:normal;font-weight:normal;color:#333333"><em>Welcome</em></h1></td>
                                                </tr>
                                                <tr style="border-collapse:collapse">
                                                  <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333">We're happy to have you with us.</h4></td>
                                                </tr>
                                              </table></td>
                                          </tr>
                                        </table></td>
                                    </tr>
                                  </table></td>
                              </tr>
                            </table>
                            <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0">
                                  <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                    <tr style="border-collapse:collapse">
                                      <td style="Margin:0;padding-bottom:5px;padding-left:20px;padding-right:20px;padding-top:30px;background-color:#ffffff;background-repeat:no-repeat" bgcolor="#ffffff" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                          <tr style="border-collapse:collapse">
                                            <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr style="border-collapse:collapse">
                                                  <td align="left" style="padding:0;Margin:0">
                                                    <ul>
                                                      <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;margin-left:0;color:#333333;font-size:14px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">UserID : ${data.userID} &nbsp;</p></li>
                                                      <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;margin-left:0;color:#333333;font-size:14px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Password : ${data.password} &nbsp;</p></li>
                                                    </ul></td>
                                                </tr>
                                              </table></td>
                                          </tr>
                                        </table></td>
                                    </tr>
                                    <tr style="border-collapse:collapse">
                                      <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                          <tr style="border-collapse:collapse">
                                            <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr style="border-collapse:collapse">
                                                  <td align="center" style="padding:0;Margin:0;font-size:0">
                                                    <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                      <tr style="border-collapse:collapse">
                                                        <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td>
                                                      </tr>
                                                    </table></td>
                                                </tr>
                                              </table></td>
                                          </tr>
                                        </table></td>
                                    </tr>
                                    <tr style="border-collapse:collapse">
                                      <td align="left" style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                          <tr style="border-collapse:collapse">
                                            <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr style="border-collapse:collapse">
                                                  <td align="center" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:4px;width:auto"><a href="https://cs.seemarise.com/" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#3D5CA3;font-size:16px;display:inline-block;background:#FFFFFF;border-radius:4px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;padding:10px 15px 10px 15px;mso-padding-alt:0;mso-border-alt:10px solid #FFFFFF">Login</a></span></td>
                                                </tr>
                                              </table></td>
                                          </tr>
                                        </table></td>
                                    </tr>
                                  </table></td>
                              </tr>
                            </table>
                            <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0">
                                  <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                    <tr style="border-collapse:collapse">
                                      <td style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px;background-color:#f7c052" bgcolor="#f7c052" align="left"><!--[if mso]><table style="width:580px" cellpadding="0"
                                        cellspacing="0"><tr><td style="width:200px" valign="top"><![endif]-->
                                          <table class="es-left" cellspacing="0" cellpadding="0" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                            <tr style="border-collapse:collapse">
                                              <td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:180px">
                                                <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                  <tr style="border-collapse:collapse">
                                                    <td align="center" style="padding:20px;Margin:0;font-size:0">
                                                      <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tr style="border-collapse:collapse">
                                                          <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td>
                                                        </tr>
                                                      </table></td>
                                                  </tr>
                                                </table></td>
                                              <td class="es-hidden" style="padding:0;Margin:0;width:20px"></td>
                                            </tr>
                                          </table><!--[if mso]></td><td style="width:180px" valign="top"><![endif]-->
                                            <table class="es-left" cellspacing="0" cellpadding="0" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                              <tr style="border-collapse:collapse">
                                                <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:180px">
                                                  <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                    <tr style="border-collapse:collapse">
                                                      <td align="center" style="padding:20px;Margin:0;font-size:0">
                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                          <tr style="border-collapse:collapse">
                                                            <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td>
                                                          </tr>
                                                        </table></td>
                                                    </tr>
                                                  </table></td>
                                              </tr>
                                            </table><!--[if mso]></td><td style="width:20px"></td><td style="width:180px" valign="top"><![endif]-->
                                            <table class="es-right" cellspacing="0" cellpadding="0" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                              <tr style="border-collapse:collapse">
                                                <td align="center" style="padding:0;Margin:0;width:180px">
                                                  <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                    <tr style="border-collapse:collapse">
                                                      <td align="center" style="padding:20px;Margin:0;font-size:0">
                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                          <tr style="border-collapse:collapse">
                                                            <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td>
                                                          </tr>
                                                        </table></td>
                                                    </tr>
                                                  </table></td>
                                              </tr>
                                            </table><!--[if mso]></td></tr></table><![endif]--></td>
                                    </tr>
                                  </table></td>
                              </tr>
                            </table>
                            <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                              <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0">
                                  <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                                    <tr style="border-collapse:collapse">
                                      <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-right:10px;padding-top:20px"><!--[if mso]><table style="width:580px" cellpadding="0"
                                        cellspacing="0"><tr><td style="width:190px" valign="top"><![endif]-->
                                          <table class="es-left" cellspacing="0" cellpadding="0" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                            <tr style="border-collapse:collapse">
                                              <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:190px">
                                                <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                  <tr style="border-collapse:collapse">
                                                    <td class="es-m-txt-c" esdev-links-color="#666666" align="right" style="padding:0;Margin:0;padding-top:5px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#666666">Follow us:</h4></td>
                                                  </tr>
                                                </table></td>
                                            </tr>
                                          </table><!--[if mso]></td><td style="width:20px"></td><td style="width:370px" valign="top"><![endif]-->
                                            <table cellspacing="0" cellpadding="0" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tr style="border-collapse:collapse">
                                                <td align="left" style="padding:0;Margin:0;width:370px">
                                                  <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                    <tr style="border-collapse:collapse">
                                                      <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;font-size:0">
                                                        <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                          <tr style="border-collapse:collapse">
                                                            <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><img title="Facebook" src="https://eonbbuj.stripocdn.email/content/assets/img/social-icons/rounded-gray/facebook-rounded-gray.png" alt="Fb" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                                            <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><img title="Twitter" src="https://eonbbuj.stripocdn.email/content/assets/img/social-icons/rounded-gray/twitter-rounded-gray.png" alt="Tw" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                                            <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><img title="Instagram" src="https://eonbbuj.stripocdn.email/content/assets/img/social-icons/rounded-gray/instagram-rounded-gray.png" alt="Inst" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                                            <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><img title="Youtube" src="https://eonbbuj.stripocdn.email/content/assets/img/social-icons/rounded-gray/youtube-rounded-gray.png" alt="Yt" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                                            <td valign="top" align="center" style="padding:0;Margin:0;padding-right:15px"><img title="Linkedin" src="https://eonbbuj.stripocdn.email/content/assets/img/social-icons/rounded-gray/linkedin-rounded-gray.png" alt="In" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                                            <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img title="Pinterest" src="https://eonbbuj.stripocdn.email/content/assets/img/social-icons/rounded-gray/pinterest-rounded-gray.png" alt="P" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                                                          </tr>
                                                        </table></td>
                                                    </tr>
                                                  </table></td>
                                              </tr>
                                            </table><!--[if mso]></td></tr></table><![endif]--></td>
                                    </tr>
                                    <tr style="border-collapse:collapse">
                                      <td align="left" style="Margin:0;padding-top:5px;padding-bottom:10px;padding-left:10px;padding-right:10px">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                          <tr style="border-collapse:collapse">
                                            <td valign="top" align="center" style="padding:0;Margin:0;width:580px">
                                              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr style="border-collapse:collapse">
                                                  <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"><h5 style="Margin:0;line-height:14px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#666666">Contact us: <a target="_blank" href="tel:123456789" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px">123456789</a> | <a target="_blank" href="mailto:your@mail.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px">your@mail.com</a></h5></td>
                                                </tr>
                                                <tr style="border-collapse:collapse">
                                                  <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#666666;font-size:12px">This daily newsletter was sent to <a target="_blank" href="mailto:info@name.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px">info@edu.com</a> from company name because you subscribed.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#666666;font-size:12px">If you would not like to receive this email <a target="_blank" class="unsubscribe" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px">unsubscribe here</a>.</p></td>
                                                </tr>
                                              </table></td>
                                          </tr>
                                        </table></td>
                                    </tr>
                                  </table></td>
                              </tr>
                            </table></td>
                        </tr>
                      </table>
                    </div>
                  </body>
                </html>`;
}

const userController = (router) => {
  router.route("/user/create")
    // .all(async (req, res, next) => {

    //   try {
    //     const token = req.headers.authorization.split(" ")[1];
    //     const isLoggedIN = await authorization.adminAuthorization(token);
    //     if (isLoggedIN) next();
    //     else {
    //       res.json({
    //         success: false,
    //         message: "User must be admin",
    //       });
    //     }
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }

    // })
    .post(async (req, res, next) => {
      var email = req.body.email.toLowerCase();

      const existingUser = await User.find({
        $or: [{ userID: req.body.userID }, { email: email }],
      });
      //console.log(existingUser);
      if (existingUser.length) {
        res.json({
          success: false,
          message: "User Id/Email Already registered"
        });
      } else {

        bcrypt.genSalt(10, function (err, Salt) {
          bcrypt.hash(req.body.password, Salt, async function (err, hash) {
            if (err) {
              return //console.log("Cannot encrypt");
            }

            const user = await User.create({
              name: req.body.name,
              userID: req.body.userID,
              email: email,
              role: req.body.role,
              password: hash,
            });
            const message = {
              from: '"Accounting Admin" <no-reply@seemarise.com>', // sender address
              to: email, // list of receivers
              subject: "User Registration - Accounting", // Subject line
              text: "No plain text available", // plain text body
              html: getHTML({ userID: req.body.userID, password: req.body.password }), // html body
            }
            sendMail(message,(res)=>{

            });
            res.json(user);
          });
        });
      }
    });

  router.route("/login").post(async (req, res, next) => {
    const { userID, password } = req.body;
    const user = await User.findOne({ userID: userID });
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) res.status(500);
      if (isMatch) {
        try {
          token = jwt.sign(
            {
              userID: userID,
              password: password,
            },
            process.env.SECRET_KEY
          );
        } catch (err) { }
        res.json({
          success: true,
          data: { token: token, user: { id: user._id, name: user.name, email: user.email } },
        });
      } else {
        res.json({
          success: false,
          data: {},
        });
      }
    });
  });

  router
    .route("/change-password")
    .all(async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const isLoggedIN = await authorization.authorization(token);

        if (isLoggedIN) next();
        else {
          res.json({
            success: false,
            message: "User must be logged in",
          });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    })
    .post(async (req, res, next) => {
      const {user, password} = req.body;
      try {
        bcrypt.genSalt(10, function (err, Salt) {
          bcrypt.hash(password, Salt, async function (err, hash) {
            if (err) {
              return //console.log("Cannot encrypt", err);
            }

            const loggedUser = await User.findOneAndUpdate({_id:user},{
              password: hash,
            });
            var token;
            try {
              token = jwt.sign(
                {
                  userID: loggedUser.userID,
                  password: password,
                },
                process.env.SECRET_KEY
              );
            } catch (err) { }
            res.json({
              success: true,
              token : token,
              message: "Password Changed",
            });
            
            
          });
        });
      } catch {
        //console.log("error");
        res.json({
          success: false,
          message: "Server Error",
        });
      }

    });






};

module.exports = userController;
