<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">Memo Park</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">

            <?php foreach($links as $link) : ?>
                <li class="nav-item">
                    <a class="nav-link" href="<?=  base_url($link['link']) ?>"><?=  $link['name'] ?></a>
                </li>
            <?php  endforeach ?>

            </ul>
        </div>


    </div>
</nav>