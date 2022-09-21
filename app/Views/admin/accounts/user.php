<div class="container mt-2">
    <h2><?= ucwords($roles) ?></h2>
    <?php if(!$user_data): ?>
        <p>No records yet</p>
    <?php else: ?>
        <table class="table table-dark table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($user_data as $data): ?>
                <tr>
                    <th scope="row"><?= $data['id'] ?></th>
                    <td scope="col"><?= $data['email'] ?></td>
                    <td scope="col"><?= $data['firstName'] ?> <?= $data['lastName'] ?></td>
                    <td scope="col">
                        <button type="button" class="btn btn-success">Make Admin</button>
                        <button type="button" class="btn btn-danger">Delete</button>
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