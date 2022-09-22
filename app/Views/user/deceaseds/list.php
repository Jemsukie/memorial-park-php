<div class="container mt-2">
    <h2><?= ucwords($title) ?></h2>

    <div>
        <form class="my-3" action="<?php echo base_url('/User')?>" method="post">
            <button type="submit" class="btn btn-primary mt-2">Filter</button>
            <div class="row">
                <div class="col">
                    <div class="form-group mt-2">
                        <label for="input-firstName">First Name</label>
                        <input type="text" class="form-control" id="input-firstName" placeholder="First Name"
                            name="firstName" value="<?= $filter['firstName']?>">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group mt-2">
                        <label for="input-lastName">Last Name</label>
                        <input type="text" class="form-control" id="input-lastName" placeholder="Last Name"
                            name="lastName" value="<?= $filter['lastName']?>">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group mt-2">
                        <label for="input-dateBorn">Date Born</label>
                        <input type="date" class="form-control" id="input-dateBorn" placeholder="Date Born"
                            name="dateBorn" value="<?= $filter['dateBorn']?>">
                    </div>
                </div>
                <div class="col">
                    <div class="form-group mt-2">
                        <label for="input-dateDied">Date Died</label>
                        <input type="date" class="form-control" id="input-email" placeholder="Date Died"
                            name="dateDied" value="<?= $filter['dateDied']?>">
                    </div>
                </div>
            </div>
        </form>
    </div>

    <?php if(!$deceased_data): ?>
        <p>No records yet</p>
    <?php else: ?>
    
    <table class="table table-dark table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Name</th>
                <th>Born</th>
                <th>Died</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($deceased_data as $data): ?>
            <tr>
                <th scope="row"><?= $data['firstName'] ?> <?= $data['lastName'] ?></th>
                <td scope="col"><?= $data['dateBorn'] ?></td>
                <td scope="col"><?= $data['dateDied'] ?></td>
                <td scope="col">
                    <button type="button" class="btn btn-success" onClick="viewDeceased(<?= $data['id'] ?>)">View</button>
                </td>
            </tr>
            <?php endforeach ?>
        </tbody>

    </table>
    <?php endif ?>

    <?php if(isset($pagination_link)): ?>
    <div>
        <?php 
                $pagination_link->setPath('memo/User/deceaseds/');
            ?>
        <?= $pagination_link->links() ?>
    </div>
    <?php endif ?>

    <script>
    function viewDeceased(id) {
        const confirm = window.confirm('Browse this record?')
        if (confirm) {
            window.location.href = "<?= base_url('User/viewDeceased') ?>" + `/${id}`
        }
        return false
    }
    </script>
</div>