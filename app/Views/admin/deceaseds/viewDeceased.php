<div class="container mt-2">
    <h1>Update Deceased ID: <?= $deceased_data['id'] ?></h1>


    <div class="row px-5">
        <div class="col-md-6 px-5">
            <div class="text-center">
                <h3>Image</h3>
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <?php
                            $imgArray = json_decode($deceased_data['imageFile']);
                        ?>
                        <?php if(count($imgArray) > 0): ?>
                        <?php foreach ($imgArray as $key => $img) : ?>
                            <div class="carousel-item <?= $key === 0 ? 'active' : '' ?>">
                                <img class="img-fluid img-thumbnail" src="<?= base_url('/assets/uploads/' . $img) ?>" class="rounded" alt="No image">
                                <button class="mx-1 btn btn-danger w-50 mt-2" onclick="deleteImage(<?= $deceased_data['id'] ?>, <?= $key ?>)">Delete</button>
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
        </div>
        <div class="col-md-6 px-5"><?php include('mapModal.php') ?>
            <form class="mt-3 mb-5" action="<?= base_url('Admin/updateDeceased') ?>" method="post" enctype="multipart/form-data">

                <div class="form-group mt-2">
                    <label for="input-firstName">First Name</label>
                    <input type="text" class="form-control" id="input-firstName" placeholder="Enter First Name" name="firstName" value="<?= $deceased_data['firstName'] ?>" required>
                    <span class="text-danger"><?= isset($validation) ? display_error($validation, 'firstName') : '' ?></span>
                </div>

                <div class="form-group mt-2">
                    <label for="input-middleName">Middle Name</label>
                    <input type="text" class="form-control" id="input-middleName" placeholder="Enter Middle Name" name="middleName" value="<?= $deceased_data['middleName'] ?>" required>
                    <span class="text-danger"><?= isset($validation) ? display_error($validation, 'middleName') : '' ?></span>
                </div>

                <div class="form-group mt-2">
                    <label for="input-lastName">Last Name</label>
                    <input type="text" class="form-control" id="input-lastName" placeholder="Enter Last Name" name="lastName" value="<?= $deceased_data['lastName'] ?>" required>
                    <span class="text-danger"><?= isset($validation) ? display_error($validation, 'lastName') : '' ?></span>
                </div>

                <div class="form-group mt-2">
                    <label for="input-dateBorn">Born</label>
                    <input type="date" class="form-control" id="input-dateBorn" placeholder="Enter Date Born" name="dateBorn" value="<?= $deceased_data['dateBorn'] ?>" required>
                    <span class="text-danger"><?= isset($validation) ? display_error($validation, 'dateBorn') : '' ?></span>
                </div>

                <div class="form-group mt-2">
                    <label for="input-dateDied">Died</label>
                    <input type="date" class="form-control" id="input-dateDied" placeholder="Enter Date Born" name="dateDied" value="<?= $deceased_data['dateDied'] ?>" required>
                    <span class="text-danger"><?= isset($validation) ? display_error($validation, 'dateDied') : '' ?></span>
                </div>

                <div class="form-group mt-2">
                    <label for="input-latitude">Latitude</label>
                    <input type="number" class="form-control" id="input-latitude" placeholder="Enter Latitude" name="latitude" step="0.0000000001" value="<?= $deceased_data['latitude'] ?>" required>
                    <span class="text-danger"><?= isset($validation) ? display_error($validation, 'latitude') : '' ?></span>
                </div>

                <div class="form-group mt-2">
                    <label for="input-longitude">Longitude</label>
                    <input type="number" class="form-control" id="input-longitude" placeholder="Enter Longitude" name="longitude" step="0.0000000001" value="<?= $deceased_data['longitude'] ?>" required>
                    <span class="text-danger"><?= isset($validation) ? display_error($validation, 'longitude') : '' ?></span>
                </div>

                <?php if (count($imgArray) < 3) : ?>
                    <div class="form-group mt-2">
                        <label for="input-imageFile">Add Image</label>
                        <input type="file" class="form-control" id="input-imageFile" placeholder="Enter Image" name="imageFile">
                    </div>
                <?php endif ?>

                <div class="form-group mt-2">
                    <input type="hidden" class="form-control" id="input-id" name="id" value="<?= $deceased_data['id'] ?>" required>
                </div>

                <div class="d-flex">
                    <button type="submit" class="mx-1 btn btn-primary w-50 mt-2">Submit</button>
                    <a class="mx-1 btn btn-danger w-50 mt-2" href="<?= base_url('Admin/deceaseds') ?>">Cancel</a>
                </div>
            </form>
        </div>
    </div>

</div>

<script>
    function deleteImage(id, key) {
        const confirm = window.confirm('Are you sure to delete this image?')
        if (confirm) {
            window.location.href = "<?= base_url('Admin/deleteImage') ?>" + `/${id}/${key}`
        }
        return false
    }
</script>