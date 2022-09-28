<div class="container mt-2">
    <h2><?= ucwords($title) ?></h2>

    <?php include('createModal.php') ?>

    <?php if(!$announcement_data): ?>
    <p>No records yet</p>
    <?php else: ?>
        <table class="responsive table table-dark table-striped">
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
                <td scope="row" data-label="ID"><?= $data['id'] ?></td>
                <td scope="col" data-label="Message">
                    <?php if(strlen($data['message']) > 50): ?>
                    <?php
                            $maxLength = 50;
                            $data['message'] = substr($data['message'], 0, $maxLength);
                        ?>
                    <?= $data['message'] ?>
                    <?php else: ?>
                    <?= $data['message'] ?>
                    <?php endif ?>
                </td>
                <td scope="col" data-label="Actions">
                    <button type="button" class="btn btn-success" onClick="viewAnnouncements(<?= $data['id'] ?>)">Edit</button>
                    <button type="button" class="btn btn-danger" onClick="deleteAnnouncements(<?= $data['id'] ?>)">Delete</button>
                </td>
            </tr>
            <?php endforeach ?>
        </tbody>

    </table>
    <?php endif ?>

    <?php if($pagination_link): ?>
    <div>
        <?php 
                $pagination_link->setPath('memo/Admin/announcements/');
            ?>
        <?= $pagination_link->links() ?>
    </div>
    <script>
    function viewAnnouncements(id) {
        const confirm = window.confirm('Browse this record?')
        if (confirm) {
            window.location.href = "<?= base_url('Admin/viewAnnouncements') ?>" + `/${id}`
        }
        return false
    }

    function deleteAnnouncements(id) {
        const confirm = window.confirm('Are you sure to delete this record?')

        if (confirm) {
            window.location.href = "<?= base_url('Admin/deleteAnnouncements') ?>" + `/${id}`
        }
        return false
    }
    </script>
    <?php endif ?>
</div>