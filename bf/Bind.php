<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>绑卡交易</title>
<style type="text/css">
<!--
.STYLE1 {
	font-size: 24px;
	font-weight: bold;
}
-->
</style>
<script src="Script/jquery-1.11.3.js" type="text/javascript"></script>
<script type="text/javascript"> 
$(document).ready(function(){	
	var wait=60;
	var Timestamp;
	function time(o) {	
		if(wait ==0){
			o.value="获取验证码"; 
			o.removeAttribute("disabled");
			wait=60; 
		   return;
		}
		if (wait == 60) {
			Timestamp = "TI" + Date.parse(new Date()); 
			$("#trans_id").val(Timestamp);
			o.setAttribute("disabled", true);  
			o.value="获取验证码"; 
			  htmlobj=$.ajax({ type:"POST",
  					url:"ACTION/ReadyBindAction.php",
					datatype: "xml",
					data:{  mobile: $.trim($("#mobile").val()),
                                                acc_no: $.trim($("#acc_no").val()),
                                                id_card: $.trim($("#id_card").val()),
                                                card_holder: $.trim($("#card_holder").val()),
                                                trans_id: $.trim($("#trans_id").val()),
                                                valid_date: $.trim($("#valid_date").val()),
                                                card_type: $.trim($("#card_type").val()),                                                
                                                cvv: $.trim($("#cvv").val())
                                              },
					success:function(data){
						var parsedJson = jQuery.parseJSON(data);
                                                if (parsedJson.resp_code == "0000") {
                                                    alert("短信发送成功！");
                                                    $("#unique_code").val(parsedJson.unique_code);                                                    
                                                } else {
                                                    alert("短信发送失败【 "+parsedJson.resp_msg+" 】");
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
            if($.trim($("#acc_no").val()) == "")
		{	alert("请输入银行卡号！");
			return false;
		}
		if($.trim($("#id_card").val()) == "")
		{
			alert("请输入身份证号！");
			return false;
		}
		if($.trim($("#mobile").val()) == "")
		{
			alert("请输入手机号！");
			return false;
		}		
		if($.trim($("#card_holder").val()) == "")
		{
			alert("请输入姓名！");
			return false;
		}
                if($.trim($(this).val())=="102"){
                    if($.trim($("#valid_date").val()) == ""){
                                alert("请输入卡有效期！");
                                return false;
                        }
                    if($.trim($("#cvv").val()) == ""){
                                alert("请输安全码！");
                                return false;
                        }
                }
                time(this);
            });
	$("#R01").submit(function(e){
  		if($.trim($("#sms_code").val()) == "")
		{
			alert("请输入验证码！");
			return false;
		}  		
	});
        
        
        $("#card_type").change(function(){
            
            if($.trim($(this).val())=="102"){                
                if(!($("#ValidDateRow").length>0)){
                    $("#MobleRow").after("<tr id=\"ValidDateRow\">"
                            +"<td align=\"right\" bgcolor=\"#FFFFFF\">卡有效期：</td>"
                            +"<td bgcolor=\"#FFFFFF\"><input name=\"valid_date\" type=\"text\" id=\"valid_date\" size=\"5\" maxlength=\"4\" /></td>"
                            +"</tr>"
                            +"<tr id=\"CvvRow\">"
                            +"<td align=\"right\" bgcolor=\"#FFFFFF\">卡安全码：</td>"
                            +"<td bgcolor=\"#FFFFFF\"><input name=\"cvv\" type=\"text\" id=\"cvv\" size=\"4\" maxlength=\"3\" /></td>"
                            +"</tr>");
                }
            }else{
                if($("#ValidDateRow").length>0){
                    $("#ValidDateRow").remove();
                    $("#CvvRow").remove();
                }
            }
        })
	
});
</script>
    </head>
    <body>
       <div style="margin:0 auto; width:500px;">
           <form name="R01" id="R01" method="post" action="ACTION/BindAction.php"> 
            <table width="500" height="325" border="0" cellpadding="1" cellspacing="1" bgcolor="#33CCFF">
              <tr>
                <td height="84" colspan="2" align="center" bgcolor="#FFFFFF"><span class="STYLE1">快捷支付API 绑定类交易-DEMO</span></td>
              </tr>

              <tr>
                <td width="108" align="right" bgcolor="#FFFFFF">卡类型：</td>
                <td width="392" bgcolor="#FFFFFF">
                    <select name="card_type" id="card_type">
                        <option value="101" selected="selected">借记卡</option>
                        <option value="102">信用卡</option>
                    </select>
                </td>
              </tr>
              
              
              <tr>
                <td align="right" bgcolor="#FFFFFF">银行卡号：</td>
                <td bgcolor="#FFFFFF"><input name="acc_no" type="text" id="acc_no" size="20" maxlength="20" /></td>
              </tr>
              <tr>
                <td align="right" bgcolor="#FFFFFF">身份证号：</td>
                <td bgcolor="#FFFFFF"><input name="id_card" type="text" id="id_card" size="18" maxlength="18" /></td>
              </tr>
              <tr>
                <td align="right" bgcolor="#FFFFFF">姓名：</td>
                <td bgcolor="#FFFFFF"><input name="card_holder" type="text" id="card_holder" size="10" maxlength="10" /></td>
              </tr>
              <tr id="MobleRow">
                <td align="right" bgcolor="#FFFFFF">手机号：</td>
                <td bgcolor="#FFFFFF"><input name="mobile" type="text" id="mobile" size="11" maxlength="11" /></td>
              </tr>
              
              
              <tr>
                <td align="right" bgcolor="#FFFFFF">短信验证码：</td>
                <td bgcolor="#FFFFFF"><input name="sms_code" type="text" id="sms_code" size="6" maxlength="6" />
                <input id="btn" name="btn" type="button" value="获取验证码" /></td>
              </tr>

              <tr>
                <td colspan="2" align="center" bgcolor="#FFFFFF">
                    <input name="unique_code" type="hidden" id="unique_code" value="" />
                    <input name="txn_sub_type" type="hidden" id="txn_sub_type" value="12" size="5" maxlength="5" />
                <input type="submit" name="Submit" value="申 请 绑 定" /></td>
                </tr>

            </table>
            </form>
        </div>
    </body>
</html>
