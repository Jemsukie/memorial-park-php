<div class="container mt-2 container-form d-flex justify-content-center">
    <h1>Edit ID: <?= $announcement_data['id'] ?></h1>

    <form class="mt-3 mb-5" action="<?= base_url('Admin/updateAnnouncements') ?>" method="post">

        <div class="form-group mt-2">
            <label for="input-message">Message</label>
            <textarea class="form-control" id="input-message" rows="3" placeholder="Enter Message" name="message"
                required><?= $announcement_data['message'] ?></textarea>

            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'message') : '' ?></span>
            <input type="hidden" name="id" value="<?= $announcement_data['id'] ?>">
        </div>

        <div class="d-flex">
            <button type="submit" class="mx-1 btn btn-primary w-50 mt-2">Submit</button>
            <a class="mx-1 btn btn-danger w-50 mt-2" href="<?= base_url('Admin/announcements') ?>">Cancel</a>
        </div>
    </form>
</div>