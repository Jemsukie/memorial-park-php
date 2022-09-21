<form class="mt-3 mb-5" action="<?= base_url('Admin/createDeceased') ?>" method="post">

        <div class="form-group mt-2">
            <label for="input-firstName">First Name</label>
            <input type="text" class="form-control" id="input-firstName" placeholder="Enter First Name" name="firstName"
                required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'firstName') : '' ?></span>
        </div>

        <div class="form-group mt-2">
            <label for="input-lastName">Last Name</label>
            <input type="text" class="form-control" id="input-lastName" placeholder="Enter Last Name" name="lastName"
                required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'lastName') : '' ?></span>
        </div>

        <div class="form-group mt-2">
            <label for="input-dateBorn">Born</label>
            <input type="date" class="form-control" id="input-dateBorn" placeholder="Enter Date Born" name="dateBorn"
                required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'dateBorn') : '' ?></span>
        </div>

        <div class="form-group mt-2">
            <label for="input-dateDied">Died</label>
            <input type="date" class="form-control" id="input-dateDied" placeholder="Enter Date Born" name="dateDied"
                required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'dateDied') : '' ?></span>
        </div>

        <div class="form-group mt-2">
            <label for="input-latitude">Latitude</label>
            <input type="number" class="form-control" id="input-latitude" placeholder="Enter Latitude" name="latitude"
                step="0.0000000001" required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'latitude') : '' ?></span>
        </div>

        <div class="form-group mt-2">
            <label for="input-longitude">Longitude</label>
            <input type="number" class="form-control" id="input-longitude" placeholder="Enter Longitude" name="longitude"
                step="0.0000000001" required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'longitude') : '' ?></span>
        </div>

        <button type="submit" class="mx-1 btn btn-primary w-100 mt-2">Submit</button>
    </form>