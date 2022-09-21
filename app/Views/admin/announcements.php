<div class="container mt-2">
    <h2><?= ucwords($title) ?></h2>

    <button type="button" class="btn btn-primary"><i class="fa fa-plus"></i> Add Record</button>

    <?php if(!$announcement_data): ?>
        <p>No records yet</p>
    <?php else: ?>
        <table class="table table-dark table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Message</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($announcement_data as $data): ?>
                <tr>
                    <th scope="row"><?= $data['id'] ?></th>
                    <td scope="col">
                        <?php if(strlen($data['message']) > 50): ?>
                        <?php
                            $maxLength = 50;
                            $data['message'] = substr($data['message'], 0, $maxLength);
                        ?>
                        <?= $data['message'] ?>
                        <?php endif ?>
                    </td>
                    <td scope="col">
                        <button type="button" class="btn btn-success">Edit</button>
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
                $pagination_link->setPath('memo/Admin/announcements/'. $roles);
            ?>
            <?= $pagination_link->links() ?>
            </div>
        <?php endif ?>
</div>