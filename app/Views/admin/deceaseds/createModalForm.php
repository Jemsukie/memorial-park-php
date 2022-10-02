<form class="mt-3 mb-5" action="<?= base_url('Admin/createDeceased') ?>" method="post" enctype="multipart/form-data">

    <div class="form-group mt-2">
        <label for="input-firstName">First Name</label>
        <input type="text" class="form-control" id="input-firstName" placeholder="Enter First Name" name="firstName" required>
    </div>

    <div class="form-group mt-2">
        <label for="input-lastName">Last Name</label>
        <input type="text" class="form-control" id="input-lastName" placeholder="Enter Last Name" name="lastName" required>
    </div>

    <div class="form-group mt-2">
        <label for="input-dateBorn">Born</label>
        <input type="date" class="form-control" id="input-dateBorn" placeholder="Enter Date Born" name="dateBorn" required>
    </div>

    <div class="form-group mt-2">
        <label for="input-dateDied">Died</label>
        <input type="date" class="form-control" id="input-dateDied" placeholder="Enter Date Born" name="dateDied" required>
    </div>

    <div class="form-group mt-2">
        <label for="input-latitude">Latitude</label>
        <input type="number" class="form-control" id="input-latitude" placeholder="Enter Latitude" name="latitude" step="0.0000000001" required>
    </div>

    <div class="form-group mt-2">
        <label for="input-longitude">Longitude</label>
        <input type="number" class="form-control" id="input-longitude" placeholder="Enter Longitude" name="longitude" step="0.0000000001" required>
    </div>

    <div class="form-group mt-2">
        <label for="input-imageFile">Image</label>
        <input type="file" class="form-control" id="input-imageFile" placeholder="Enter Image" name="imageFile">
    </div>

    <button type="submit" class="mx-1 btn btn-primary w-100 mt-2">Submit</button>
</form>