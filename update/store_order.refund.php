<?php defined('InShopNC') or exit('Access Invalid!');?>
<style>
    dl dt{
        width:26% !important;
        padding-left: 45px !important;
        text-align: left !important;
    }
    dl dd {
        width:55% !important;
    }
</style>
<div class="eject_con">
  <div id="warning"></div>
  <form method="post" id="seller_add_refund_form" onsubmit="ajaxpost('seller_add_refund_form', '', '', 'onerror');" action="index.php?act=member_refund&op=seller_add_refund&order_id=<?php echo  $goods['order_id']; ?>&goods_id=<?php echo $goods['rec_id'] ?>">
      <input type="hidden" name="form_submit" value="ok" />
      <input type="hidden" name="refund_type" value="1" />
      <dl>
          <dt><i class="required">*</i>退款原因：</dt>
          <dd>
              <select class="select w150" name="reason_id" required="required">
                  <option value="">请选择退款原因</option>
                  <?php if (is_array($output['reason_list']) && !empty($output['reason_list'])) { ?>
                      <?php foreach ($output['reason_list'] as $key => $val) { ?>
                          <option value="<?php echo $val['reason_id'];?>"><?php echo $val['reason_info'];?></option>
                      <?php } ?>
                  <?php } ?>
                  <option value="0">其他</option>
              </select>
              <span class="error"></span> </dd>
      </dl>
      <dl>
          <dt><i class="required">*</i>需要退款金额：</dt>
          <dd>
              <input type="text" required="required" class="text w50" name="refund_amount" value="<?php echo $output['goods']['goods_pay_price']; ?>" /><em class="add-on"><i class="icon-renminbi"></i></em>（最多 <strong class="green" title="可退金额由系统根据订单商品实际成交额和已退款金额自动计算得出"><?php echo $output['goods']['goods_pay_price']; ?></strong> 元） <span class="error"></span>
              <p class="hint"><?php echo '退款金额不能超过可退金额。';?></p>
          </dd>
      </dl>
      <dl>
          <dt><i class="required">*</i>退款说明：</dt>
          <dd>
              <textarea name="buyer_message" required="required" rows="3" class="textarea w200"></textarea>
              <br />
              <span class="error"></span> </dd>
      </dl>
    <dl class="bottom">
      <dt>&nbsp;</dt>
      <dd>
        <input type="submit" class="submit" id="confirm_button" value="<?php echo $lang['nc_ok'];?>" />
      </dd>
    </dl>
  </form>
</div>
<script type="text/javascript">
$(function(){
        $('#cancel_button').click(function(){
            closeDialog();
         });
       $("input[name='state_info']").click(function(){
        if ($(this).attr('flag') == 'other_reason')
        {
            $('#other_reason').show();
        }
        else
        {
            $('#other_reason').hide();
        }
    });
});
    function closeDialog() {
        DialogManager.close('seller_order_cancel_order');
    }
</script> 
