<?php $session = \Config\Services::session() ?>

<?php if($session->getFlashdata('success')):  ?>
<div class="container">
    <div id="flash_data" class="alert alert-success">
        <?= $session->getFlashdata("success") ?>
    </div>
</div>
<?php elseif($session->getFlashdata('fail')):  ?>
<div class="container">
    <div id="flash_data" class="alert alert-danger">
        <?= $session->getFlashdata('fail') ?>
    </div>
</div>
<?php endif ?>


<!-- This shows errors for validation -->
<?php if(isset($validation) && $validation !== []):?>
<div class="container">
    <div class="alert alert-danger">
            <?= $validation->listErrors() ?>
    </div>
</div>
<?php endif?>
<!-- This shows errors for validation -->