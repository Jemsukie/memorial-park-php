<div>
    <div class="modal fade" id="announcementModal" tabindex="-1" aria-labelledby="announcementLabel" aria-hidden="false">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">ANNOUNCEMENT</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <?= isset($announcement_info) ? $announcement_info : '' ?>
                </div>
            </div>
        </div>
    </div>
    
    <script type="text/javascript">
        $(window).on('load', function() {
            $('#announcementModal').modal('show');
        });
    </script>
</div>