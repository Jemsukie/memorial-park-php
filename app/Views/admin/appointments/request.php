<div class="container mt-2">
    <h2><?= ucwords($title) ?></h2>

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
                    <button type="button" class="btn btn-success"
                        onClick="approveAppointment(<?= $data['id'] ?>)">Approve</button>
                    <button type="button" class="btn btn-danger"
                        onClick="cancelAppointment(<?= $data['id'] ?>)">Reject</button>
                </td>
            </tr>
            <?php endforeach ?>
        </tbody>

    </table>

    <?php include('pagination.php') ?>
    <script>
        function approveAppointment(id) {
            const confirm = window.confirm('Approve this request?')
            if (confirm) {
                window.location.href = "<?= base_url('Admin/approveAppointment') ?>" + `/${id}`
            }
            return false
        }

        function cancelAppointment(id) {
            const confirm = window.confirm('Reject this request?')
            if (confirm) {
                window.location.href = "<?= base_url('Admin/cancelAppointment') ?>" + `/${id}`
            }
            return false
        }
    </script>
    <?php endif ?>
</div>