<?php if($pagination_link): ?>
<div>
    <?php $pagination_link->setPath('memo/User/appointments/'. $roles) ?>
    <?= $pagination_link->links() ?>
</div>
<?php endif ?>