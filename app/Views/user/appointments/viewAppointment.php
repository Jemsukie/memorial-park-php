<div class="container mt-2 container-form d-flex justify-content-center">
    <h1>Edit ID: <?= $appointment_data['id'] ?></h1>
    <form class="mt-3 mb-5" action="<?= base_url('User/updateAppointment') ?>" method="post">

        <div class="form-group mt-2">
            <label for="input-schedule">Schedule</label>
            <input type="datetime-local" class="form-control" id="input-schedule" placeholder="Enter Schedule" name="schedule" value="<?= $appointment_data['schedule'] ?>" required>
            <select class="form-select" id="input-app-type" name="appType" aria-label="Default select example" required>
                <option value="0">Select Type</option>
                <?php $appTypes = [
                    'One', 'Two', 'Three'
                ];
                ?>
                <?php foreach ($appTypes as $appType) : ?>
                    <option value="<?= $appType ?>" <?= $appType === $appointment_data['type'] ? 'selected' : '' ?>><?= $appType ?></option>
                <?php endforeach ?>
            </select>
        </div>
        <div class="form-group mt-2">
            <input type="hidden" class="form-control" id="input-id" placeholder="Enter ID" name="id" value="<?= $appointment_data['id'] ?>">
        </div>

        <div class="d-flex">
            <button type="submit" id="submit" class="btn w-50 btn-primary mx-1">Submit</button>
            <a type="button" href="<?= base_url('User/appointments') ?>" class="btn w-50 btn-danger mx-1">Back</a>
        </div>

    </form>

</div>

<script>
    const selectable = document.querySelector('#input-app-type')
    const submit = document.querySelector('#submit')
    const submitDisable = (val) => {
        submit.disabled = val
    }
    selectable.addEventListener('change', (e) => {
        if (e.target.value == 0) {
            submitDisable(true)
        } else {
            submitDisable(false)
        }

    })
</script>