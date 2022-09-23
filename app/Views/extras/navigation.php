<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="btn" id="sidebarToggle"><span class="navbar-toggler-icon mx-2"></span></button>
    <a class="navbar-brand" href="<?= base_url('Home/') ?>">Home</a>
</nav>
<?= isset($news) ? $news : '' ?>

<?php include('flash.php') ?>