<marquee class="scroll-text text-dark">
    <?php if(isset($announcement_data)): ?>
        <?php foreach($announcement_data as $data): ?>
            <?= '<b>Announcement:</b> ' . $data . ' | ' ?>
        <?php endforeach ?>
    <?php endif ?>
</marquee>