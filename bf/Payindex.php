<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>快捷支付交易</title>
<style type="text/css">
<!--
.STYLE1 {font-size: 24px;font-weight: bold;}
-->
</style>
<script src="Script/jquery-1.11.3.js" type="text/javascript"></script>
<script type="text/javascript">
    
    $(document).ready(function(){	
	var wait=60;
	var Timestamp;
	function time(o) {

		if(wait ===0){
			o.value="获取验证码"; 
			o.removeAttribute("disabled"); 
			wait=60;
		   return;
		}
		if (wait === 60) {
			Timestamp = "TI" + Date.parse(new Date()); 
			$("#trans_id").val(Timestamp);
			o.setAttribute("disabled", true);  
			o.value="获取验证码"; 
			  htmlobj=$.ajax({ type:"POST",
  					url:"ACTION/ReadyPayAction.php",
					datatype: "xml",
					data:{bind_id: $.trim($("#bind_id").val()),
                                                user_id:$.trim($("#user_id").val()),
                                                txn_amt: $.trim($("#txn_amt").val())
                                        },
					success:function(data){
						var parsedJson = jQuery.parseJSON(data);
                                                if (parsedJson.resp_code === "0000") {
                                                        $("#business_no").val(parsedJson.business_no);
                                                    alert("短信发送成功！"+$("#business_no").val());
                                                } else {
                                                    alert("短信发送失败!错误码："+ parsedJson.resp_code +"【 "+parsedJson.resp_msg+" 】");
                                                }						       
					},
            		//complete: function(XMLHttpRequest, textStatus){
               		//	alert("请求短信成功！");}, 
				    error: function(){
						alert("请求数据加密异常！");
            			}});
			wait = 59;
			setTimeout(function(){time(o);},1000);  
		} else {  
			o.value="重新发送(" + wait + ")"; 
			wait--; 
			setTimeout(function(){time(o);},1000); 
		} 
	}
	$("#btn").click(function(){
            if($.trim($("#bind_id").val()) === ""){
                alert("请输入绑定标识！");
                return;
            }
            if($.trim($("#user_id").val()) === ""){
                alert("请输入平台用户ID！需和绑定时一致");
                return;
            }
            if($.trim($("#txn_amt").val()) === ""){
                alert("请输入交易金额！");
                return;
            }
            time(this);
        });
	$("#R01").submit(function(e){
  		if($.trim($("#sms_code").val()) === "")
		{
			alert("请输入验证码！");
			return false;
		}		
	});
	
});
</script>
</head>

<body style="margin:0">
<div style="margin:0 auto; width:500px;">
<table width="500" height="225" border="0" cellpadding="1" cellspacing="1" bgcolor="#33CCFF">
  <tr>
    <td height="84" colspan="2" align="center" bgcolor="#FFFFFF"><span class="STYLE1">快捷支付API支付交易-DEMO</span></td>
  </tr>
  <form name="R01" id="R01" method="post" action="ACTION/PayAction.php"> 
  
  <tr>
    <td width="108" align="right" bgcolor="#FFFFFF">绑定标识号：</td>
    <td width="392" bgcolor="#FFFFFF"><input name="bind_id" type="text" id="bind_id" size="30" /></td>
  </tr>
    <tr>
    <td width="108" align="right" bgcolor="#FFFFFF">平台用户ID：</td>
    <td width="392" bgcolor="#FFFFFF"><input name="user_id" type="text" id="user_id" size="30" maxlength="30" />(绑定时一致)</td>
  </tr>
  <tr>
    <td align="right" bgcolor="#FFFFFF">短信验证码：</td>
    <td bgcolor="#FFFFFF"><input name="sms_code" type="text" id="sms_code" size="6" maxlength="6" />
    <input id="btn" name="btn" type="button" value="获取验证码" /></td>
  </tr>
  <tr>
    <td align="right" bgcolor="#FFFFFF">交易金额：</td>
    <td bgcolor="#FFFFFF"><input name="txn_amt" type="text" id="txn_amt" value="0.01" size="5" maxlength="5" />
        <input name="business_no" type="hidden" id="business_no" value=""/>（元）</td>
  </tr>
  <tr>
    <td colspan="2" align="center" bgcolor="#FFFFFF"> 
    <input type="submit" name="Submit" value="确认支付" /></td>
    </tr>
	</form>
</table>

</div>
</body>
</html>
