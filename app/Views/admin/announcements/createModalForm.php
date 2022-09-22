<form class="mt-3 mb-5" action="<?= base_url('Admin/createAnnouncements') ?>" method="post">

    <div class="form-group mt-2">
        <label for="input-message">Message</label>
        <textarea class="form-control" id="input-message" rows="3" placeholder="Enter Message" name="message" required></textarea>

        <span class="text-danger"><?= isset($validation) ? display_error($validation, 'message') : '' ?></span>
    </div>

    <button type="submit" class="mx-1 btn btn-primary w-100 mt-2">Submit</button>
</form>