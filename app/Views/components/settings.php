<div class="container mt-2">
    <h2><?= ucwords($title) ?></h2>

    <div class="row">
        <div class="col-lg-6 d-flex justify-content-center container-form mx-auto">
            <form class="mt-3 mb-5" action="<?= base_url($scope . '/updateInfo') ?>" method="post">
                <div class="form-group mt-2">
                    <label for="input-email">Email address</label>
                    <input type="email" class="form-control" id="input-email" aria-describedby="emailHelp"
                        placeholder="Edit email" value="<?=  $user_data['email'] ?>" name="email" required>
                </div>
                <div class="form-group mt-2">
                    <label for="input-firstName">First Name</label>
                    <input type="text" class="form-control" id="input-firstName" aria-describedby="emailHelp"
                        placeholder="Edit first name" value="<?=  $user_data['firstName'] ?>" name="firstName" required>
                </div>
                <div class="form-group mt-2">
                    <label for="input-lastName">Last Name</label>
                    <input type="text" class="form-control" id="input-lastName" aria-describedby="emailHelp"
                        placeholder="Edit last name" value="<?=  $user_data['lastName'] ?>" name="lastName" required>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-2">Update Info</button>

            </form>
        </div>
        <div class="col-lg-6 d-flex justify-content-center container-form mx-auto">
            <form class="mt-3 mb-5" action="<?= base_url($scope . '/updatePassword') ?>" method="post">
                <div class="form-group mt-2">
                    <label for="input-old-password">Old Password</label>
                    <input type="password" class="form-control" id="input-old-password" placeholder="Old Password"
                        name="oldPassword" required>
                </div>
                <div class="form-group mt-2">
                    <label for="input-password">Password</label>
                    <input type="password" class="form-control" id="input-password" placeholder="Password"
                        name="password" required>
                </div>
                <div class="form-group mt-2">
                    <label for="input-confirmPassword">Confirm Password</label>
                    <input type="password" class="form-control" id="input-password" placeholder="Confirm Password"
                        name="confirmPassword" required>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-2">Change Password</button>

            </form>
        </div>
    </div>


</div>