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
                <td scope="col"><?= date('M d\, Y h:i A', strtotime($data['schedule'])) ?></td>
                <td scope="col">
                    <button type="button" class="btn btn-danger"
                        onClick="cancelAppointment(<?= $data['id'] ?>)">Cancel</button>
                </td>
            </tr>
            <?php endforeach ?>
        </tbody>

    </table>
    <script>
        function cancelAppointment(id) {
            const confirm = window.confirm('Cancel this appointment?')
            if (confirm) {
                window.location.href = "<?= base_url('Admin/cancelAppointment') ?>" + `/${id}`
            }
            return false
        }
    </script>
    <?php include('pagination.php') ?>
    <?php endif ?>
</div>