<div class="container mt-2">
    <h2><?= ucwords($title) ?></h2>

    <button type="button" class="btn btn-primary"><i class="fa fa-plus"></i> Add Record</button>

    <?php if(!$appointment_data): ?>
        <p>No records yet</p>
    <?php else: ?>
        <table class="table table-dark table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Schedule</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($appointment_data as $data): ?>
                <tr>
                    <th scope="row"><?= $data['userId'] ?></th>
                    <th scope="row"><?= $data['user'] ?></th>
                    <td scope="col"><?= $data['schedule'] ?></td>
                    <td scope="col">
                        <button type="button" class="btn btn-info">Reschedule</button>
                        <button type="button" class="btn btn-danger">Cancel</button>
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