<form class="mt-3 mb-5" action="<?= base_url('User/createAppointment') ?>" method="post">

        <div class="form-group mt-2">
            <label for="input-schedule">Schedule</label>
            <input type="datetime-local" class="form-control" id="input-schedule" placeholder="Enter Schedule" name="schedule"
                required>
        </div>

        <button type="submit" class="mx-1 btn btn-primary w-100 mt-2">Submit</button>
    </form>