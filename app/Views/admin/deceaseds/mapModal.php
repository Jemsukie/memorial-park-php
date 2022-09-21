<!-- Button trigger modal -->
<div class="d-flex justify-content-center">
    <button type="button" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#mapModal">
        View
    </button>
</div>

<!-- Modal -->
<div class="modal fade" id="mapModal" tabindex="-1" aria-labelledby="mapModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="mapModalLabel">Location</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <?= $map ?>
            </div>
        </div>
    </div>
</div>