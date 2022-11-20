<form class="mt-3 mb-5" action="<?= base_url('User/createAppointment') ?>" method="post">

    <div class="form-group mt-2">
        <label for="input-schedule">Schedule</label>
        <input type="datetime-local" class="form-control" id="input-schedule" placeholder="Enter Schedule" name="schedule" required>
        <select class="form-select" id="input-app-type" name="appType" aria-label="Default select example" required>
            <option value="0" selected>Select Type</option>
            <?php $appTypes = [
                'One', 'Two', 'Three'
            ];
            ?>

            <?php foreach ($appTypes as $appType) : ?>
                <option value="<?= $appType ?>"><?= $appType ?></option>
            <?php endforeach ?>
        </select>
    </div>

    <button type="submit" id="submit" class="mx-1 btn btn-primary w-100 mt-2">Submit</button>
</form>

<script>
    const selectable = document.querySelector('#input-app-type')
    const submit = document.querySelector('#submit')
    const submitDisable = (val) => {
        submit.disabled = val
    }
    submitDisable(true)
    selectable.addEventListener('change', (e) => {
        if (e.target.value == 0) {
            submitDisable(true)
        } else {
            submitDisable(false)
        }

    })
</script>