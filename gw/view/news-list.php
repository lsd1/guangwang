<?php include 'header2.php'; ?>
<section id="morenews" >
    <div class="container">
        <div class="row">
            <img width="100%" src="<?php echo ROOTPATH ;?>assets/img/新闻动态.jpg">
        </div>
    </div>
    <div class="container more-con">
        <div class="row ">
            <?php
            foreach($news as $v){
            ?>
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="point"></div>
                <div class="more more-time"><div class="time"><?php echo date('Y.m.d',$v['updateTime']);?></div></div>
                <div class="more more-bg">
                    <div class="more more-media">
                        <div class="more-img"><img src="<?php echo ROOTPATH ;?>assets/img/<?php echo $v['image'];?>"></div>
                        <div class="more-content"><h4 class="more-content-h4"><?php echo $v['title'];?></h4>
                            <p class="more-content-p"><?php echo $v['detail'];?></p>
                            <a class="more-a" href="<?php echo ROOTPATH ;?>index.php?act=detail&op=index&id=<?php echo $v['id'];?>">查看详情</a>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            }
            ?>
        </div>
</section>
<?php include 'footer.php' ;?>
