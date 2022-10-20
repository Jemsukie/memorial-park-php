<div class="container mt-2">
    <h1>ID: <?= $deceased_data['id'] ?></h1>

    <div class="container mt-2">

        <div class="row px-5">
            <div class="col-md-6 px-5">
                <h3 class="text-center">Image</h3>
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <?php
                            $imgArray = json_decode($deceased_data['imageFile']);
                        ?>
                        <?php if(count($imgArray) > 0): ?>
                        <?php foreach ($imgArray as $key => $img) : ?>
                            <div class="carousel-item <?= $key === 0 ? 'active' : '' ?>">
                                <img class="img-fluid img-thumbnail" src="<?= base_url('/assets/uploads/' . $img) ?>" class="rounded" alt="No image">
                            </div>
                        <?php endforeach ?>
                        <?php else: ?>
                            <img class="img-fluid img-thumbnail" class="rounded" alt="No image">
                        <?php endif ?>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class="col-md-6 px-5">
                <a type="button" href="<?= base_url('User/deceaseds') ?>" class="btn btn-danger">Back</a>
                <?php include('mapModal.php') ?>

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

                
            </div>
        </div>


    </div>

</div>