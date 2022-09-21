<div class="container mt-2">
    <h2><?= ucwords($title) ?></h2>

    <button type="button" class="btn btn-primary"><i class="fa fa-plus"></i> Add Record</button>

    <?php if(!$deceased_data): ?>
        <p>No records yet</p>
    <?php else: ?>
        <table class="table table-dark table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Born</th>
                    <th>Died</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($deceased_data as $data): ?>
                <tr>
                    <th scope="row"><?= $data['firstName'] ?> <?= $data['lastName'] ?></th>
                    <td scope="col"><?= $data['dateBorn'] ?></td>
                    <td scope="col"><?= $data['dateDied'] ?></td>
                    <td scope="col">
                        <button type="button" class="btn btn-success">View</button>
                    </td>
                </tr>
                <?php endforeach ?>
            </tbody>

        </table>
    <?php endif ?>
    
        <?php if($pagination_link): ?>
            <div>
            <?php 
                $pagination_link->setPath('memo/Admin/accounts/'. $roles);
            ?>
            <?= $pagination_link->links() ?>
            </div>
        <?php endif ?>
</div>