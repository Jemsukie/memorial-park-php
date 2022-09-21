<?php if($pagination_link): ?>
<div>
    <?php $pagination_link->setPath('memo/Admin/appointments/'. $roles) ?>
    <?= $pagination_link->links() ?>
</div>
<?php endif ?>