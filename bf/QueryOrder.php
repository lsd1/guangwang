<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>快捷支付-订单查询</title>
</head>
<body>
<form action="Action/QueryOrderAction.php" method="post">
    <table width="600" border="0" align="center" cellpadding="1" cellspacing="1" bgcolor="#009900">
      <tr>
        <td height="93" colspan="2" align="center" bgcolor="#FFFFFF"><span class="STYLE1">快捷支付-订单查询</span></td>
      </tr>
      <tr>
        <td height="25" align="right" bgcolor="#FFFFFF"><span class="STYLE2">订单号：</span></td>
        <td height="25" bgcolor="#FFFFFF"><input name="orig_trans_id" type="text" id="orig_trans_id" /></td>
      </tr>
      <tr>
        <td height="53" colspan="2" align="center" bgcolor="#FFFFFF"><label>
          <input type="submit" name="Submit" value="提  交" />
        </label></td>
      </tr>
    </table>
</form>

</body>
</html>