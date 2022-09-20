<div class="bg-dark" id="sidebar-wrapper">
    <div class="sidebar-heading border-bottom bg-dark text-white"><?= $title ?></div>
        <div class="list-group list-group-flush">
            <?php  foreach($links as $link): ?>
                <a class="list-group-item list-group-item-action list-group-item-dark p-3" href="<?= base_url($link['link']) ?>"><?= $link['name'] ?></a>    
            <?php  endforeach ?>
        </div>

    <div>
        <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white-50">
            <div class="container text-center">
                <small>Copyright &copy; Capstone Project 2022</small>
            </div>
        </footer>
    </div>
</div>