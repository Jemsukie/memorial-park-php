<div class="container mt-2">
    <h2><?= ucwords($roles) ?></h2>
    <?php if(!$user_data): ?>
    <p>No records yet</p>
    <?php else: ?>
        <table class="responsive table table-dark table-striped">
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
                <td scope="row" data-label="ID"><?= $data['id'] ?></td>
                <td scope="col" data-label="Email"><?= $data['email'] ?></td>
                <td scope="col" data-label="Name"><?= $data['firstName'] ?> <?= $data['lastName'] ?></td>
                <td scope="col" data-label="Actions">
                    <button type="button" class="btn btn-success" onClick="makeAdmin(<?= $data['id'] ?>)">Make
                        Admin</button>
                    <button type="button" class="btn btn-danger"
                        onClick="deleteUser(<?= $data['id'] ?>)">Delete</button>
                </td>
            </tr>
            <?php endforeach ?>
        </tbody>

    </table>

    <?php include('pagination.php') ?>
    <script>
    function makeAdmin(id) {
        const confirm = window.confirm('Are you sure to make this an Admin?')

        if (confirm) {
            window.location.href = "<?= base_url('Admin/makeAdmin') ?>" + `/${id}`
        }
        return false
    }

    function deleteUser(id) {
        const confirm = window.confirm('Are you sure to delete this User?')

        if (confirm) {
            window.location.href = "<?= base_url('Admin/deleteUser') ?>" + `/${id}`
        }
        return false
    }
    </script>
    <?php endif ?>
</div>