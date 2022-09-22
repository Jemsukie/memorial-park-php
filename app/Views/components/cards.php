<div class="container">
    <div class="row d-flex justify-content-center">
        <?php foreach($cards as $card): ?>
        <div class="col-lg-3 col-md-6 m-3">
            <!-- small box -->
            <div class="small-box bg-light border border-dark">
                <div class="inner p-3">
                    <h3><?= $card['number'] ?></h3>

                    <p><i class="fa fa-<?= $card['icon'] ?>"></i> <?= $card['title'] ?></p>

                    <?php if(isset($card['link'])): ?>
                    <a href="<?= $card['link'] ?>" class="btn btn-primary">More info <i class="fas fa-arrow-circle-right"></i></a>
                    <?php endif ?>
                </div>

            </div>
        </div>
        <?php endforeach ?>
    </div>
</div>