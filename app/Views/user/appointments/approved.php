<div class="container mt-2">
    <?php include('createModal.php') ?>

    <?php if(!$appointment_data): ?>
        <p>No records yet</p>
    <?php else: ?>
        <table class="responsive table table-dark table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Schedule</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($appointment_data as $data): ?>
                <tr>
                    <td scope="col" data-label="Schedule"><?= date('M d\, Y h:i A', strtotime($data['schedule'])) ?></td>
                    <td scope="col" data-label="Actions">
                        <button type="button" class="btn btn-danger" onClick="cancelAppointment(<?= $data['id'] ?>)" >Cancel</button>
                    </td>
                </tr>
                <?php endforeach ?>
            </tbody>

        </table>
    <?php endif ?>
    
    <?php include('pagination.php') ?>
    <script>
    function cancelAppointment(id) {
        const confirm = window.confirm('Cancel this appointment?')
        if (confirm) {
            window.location.href = "<?= base_url('User/cancelAppointment') ?>" + `/${id}`
        }
        return false
    }
    </script>
</div>