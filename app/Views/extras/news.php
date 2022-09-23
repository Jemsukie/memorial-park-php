<marquee class="scroll-text text-dark">
    <?php foreach($announcement_data as $data): ?>
        <?= '<b>Announcement:</b> ' . $data . ' | ' ?>
    <?php endforeach ?>
</marquee>