<div class="container mt-2 container-form d-flex justify-content-center">
    <h1>ID: <?= $deceased_data['id'] ?></h1>

    <div class="container mt-2">
        
        <a type="button" href="<?= base_url('User/deceaseds') ?>" class="btn btn-danger">Back</a>

        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th><?= $deceased_data['id'] ?></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="col">First Name</td>
                    <td scope="col"><?= $deceased_data['firstName'] ?></td>
                </tr>
                <tr>
                    <td scope="col">Last Name</td>
                    <td scope="col"><?= $deceased_data['lastName'] ?></td>
                </tr>
                <tr>
                    <td scope="col">Born</td>
                    <td scope="col"><?= date('D M d\, Y', strtotime($deceased_data['dateBorn'])) ?></td>
                </tr>
                <tr>
                    <td scope="col">Died</td>
                    <td scope="col"><?= date('D M d\, Y', strtotime($deceased_data['dateDied'])) ?></td>
                </tr>
                <tr>
                    <td scope="col">Latitude</td>
                    <td scope="col"><?= $deceased_data['latitude'] ?></td>
                </tr>
                <tr>
                    <td scope="col">Longitude</td>
                    <td scope="col"><?= $deceased_data['longitude'] ?></td>
                </tr>
            </tbody>
        </table>
        
    <?php include('mapModal.php') ?>
    </div>

</div>