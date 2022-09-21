<div class="container mt-2">
    <?php include('modal.php') ?>

    <?php if(!$appointment_data): ?>
        <p>No records yet</p>
    <?php else: ?>
        <table class="table table-dark table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Schedule</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($appointment_data as $data): ?>
                <tr>
                    <td scope="col"><?= $data['schedule'] ?></td>
                    <td scope="col">
                        <button type="button" class="btn btn-danger">Cancel</button>
                    </td>
                </tr>
                <?php endforeach ?>
            </tbody>

        </table>
    <?php endif ?>
    
    <?php include('pagination.php') ?>
</div>