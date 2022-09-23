<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="btn" id="sidebarToggle"><span class="navbar-toggler-icon mx-2"></span></button>
    <a class="navbar-brand" href="<?= base_url('Home/') ?>">
        <?= end($links)['name'] === 'Logout' ? 'Home' : '' ?>
    </a>
    <h6 class="text-white ms-auto me-5"><?= session()->get('name') ? 'Hi ' . session()->get('name') . '!' : ''?></h6>
    
</nav>
<?= isset($news) ? $news : '' ?>

<?php include('flash.php') ?>