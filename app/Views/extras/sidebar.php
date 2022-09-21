<div class="bg-dark" id="sidebar-wrapper">
    <div class="sidebar-heading border-bottom bg-dark text-white"><?= $title ?></div>
        <div class="list-group list-group-flush">
            <?php foreach($links as $link): ?>
                <?php if($link['name'] === 'Logout'): ?>
                    <a class="list-group-item list-group-item-action list-group-item-dark p-3" onclick="signout()" href="#"><?= $link['name'] ?></a>    
                <?php else: ?>  
                    <a class="list-group-item list-group-item-action list-group-item-dark p-3" href="<?= base_url($link['link']) ?>"><?= $link['name'] ?></a>    
                <?php endif ?>
            <?php  endforeach ?>
        </div>

    <div>
        <?php if(end($links)['name'] === 'Logout'): ?>
            <?php include('signout.php') ?>
        <?php endif ?>
        
        <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white-50">
            <div class="container text-center">
                <small>Copyright &copy; Capstone Project 2022</small>
            </div>
        </footer>
    </div>
</div>

