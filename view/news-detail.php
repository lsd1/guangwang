<?php include 'header2.php' ?>
<section id="morenews-content" >
    <div class="container">
        <div class="row">
            <img width="100%" src="<?php echo ROOTPATH ;?>assets/img/新闻动态.jpg">
        </div>
    </div>
    <div class="container">
        <?php
        foreach($detail as $v){
        ?>
        <div class="row morenews-con">
            <h3>  <?php echo $v['title']?></h3>
            <h5>时间：  <?php echo date('Y-m-d H:i:s',$v['updateTime'])?></h5>
            <?php echo $v['content'];?>
        </div>
        <?php
        }
        ?>
    </div>
</section>
<?php include 'footer.php' ?>
