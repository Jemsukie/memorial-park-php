<div class="container mt-2 container-form d-flex justify-content-center">
    <h1>Sign Up</h1>
    <form class="mt-3 mb-5" action="<?= base_url('/Auth/saveCheck')?>" method="post">
        <div class="form-group mt-2">
            <label for="input-email">Email address</label>
            <input type="email" class="form-control" id="input-email" aria-describedby="emailHelp"
                placeholder="Enter email" name="email" required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'email') : '' ?></span>
        </div>
        <div class="form-group mt-2">
            <label for="input-firstName">First Name</label>
            <input type="text" class="form-control" id="input-firstName" aria-describedby="emailHelp"
                placeholder="Enter first name" name="firstName" required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'firstName') : '' ?></span>
        </div>
        <div class="form-group mt-2">
            <label for="input-lastName">Last Name</label>
            <input type="text" class="form-control" id="input-lastName" aria-describedby="emailHelp"
                placeholder="Enter last name" name="lastName" required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'lastName') : '' ?></span>
        </div>
        <div class="form-group mt-2">
            <label for="input-password">Password</label>
            <input type="password" class="form-control" id="input-password" placeholder="Password" name="password" required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'password') : '' ?></span>
        </div>
        <div class="form-group mt-2">
            <label for="input-confirmPassword">Confirm Password</label>
            <input type="password" class="form-control" id="input-password" placeholder="Confirm Password" name="confirmPassword" required>
            <span class="text-danger"><?= isset($validation) ? display_error($validation, 'confirmPassword') : '' ?></span>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-2">Submit</button>
        <p>Already have an account? <a href="<?= base_url('Auth/login') ?>">Login</a> here</p>
        
    </form>
</div>