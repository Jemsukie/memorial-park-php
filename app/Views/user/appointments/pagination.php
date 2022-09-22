<?php if($pagination_link): ?>
<div>
    <?php $pagination_link->setPath('memo/User/appointments/'. $status) ?>
    <?= $pagination_link->links() ?>
</div>
<?php endif ?>