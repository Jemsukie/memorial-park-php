<div>
    <form class="my-3" action="<?= base_url('/'. $addr) ?>" method="post">

        <div class="row">
            <div class="col-md-6 col-lg-4">
                <div class="check-box-field">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="flexFirstName">
                        <label class="form-check-label" for="flexFirstName">
                            First Name
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="flexMiddleName">
                        <label class="form-check-label" for="flexMiddleName">
                            Middle Name
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="flexLastName">
                        <label class="form-check-label" for="flexLastName">
                            Last Name
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="flexDateBorn">
                        <label class="form-check-label" for="flexDateBorn">
                            Date Born
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="flexDateDied">
                        <label class="form-check-label" for="flexDateDied">
                            Date Died
                        </label>
                    </div>
                </div>
                <div class="radio-field">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="sortBy" id="flexAsc" value='ASC' <?= $filter['sortBy'] === 'ASC' ? 'checked' : '' ?>>
                        <label class="form-check-label" for="flexAsc">
                            Ascending
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="sortBy" id="flexDesc" value='DESC' <?= $filter['sortBy'] === 'DESC' ? 'checked' : '' ?>>
                        <label class="form-check-label" for="flexDesc">
                            Descending
                        </label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-2">Refresh Filter</button>
            </div>
            <div class="col-md-6 col-lg-8">
                <div class="row">
                    <div class="col-md-6 col-lg-4" data-flex="flexFirstName" style="display: none">
                        <div class="form-group mt-2">
                            <label for="input-firstName">First Name</label>
                            <input type="text" class="form-control" id="input-firstName" placeholder="First Name" name="firstName" value="<?= $filter['firstName'] ?>">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-flex="flexMiddleName" style="display: none">
                        <div class="form-group mt-2">
                            <label for="input-middleName">Middle Name</label>
                            <input type="text" class="form-control" id="input-middleName" placeholder="Middle Name" name="middleName" value="<?= $filter['middleName'] ?>">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-flex="flexLastName" style="display: none">
                        <div class="form-group mt-2">
                            <label for="input-lastName">Last Name</label>
                            <input type="text" class="form-control" id="input-lastName" placeholder="Last Name" name="lastName" value="<?= $filter['lastName'] ?>">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-flex="flexDateBorn" style="display: none">
                        <div class="form-group mt-2">
                            <label for="input-dateBorn">Date Born</label>
                            <input type="date" class="form-control" id="input-dateBorn" placeholder="Date Born" name="dateBorn" value="<?= $filter['dateBorn'] ?>">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4" data-flex="flexDateDied" style="display: none">
                        <div class="form-group mt-2">
                            <label for="input-dateDied">Date Died</label>
                            <input type="date" class="form-control" id="input-email" placeholder="Date Died" name="dateDied" value="<?= $filter['dateDied'] ?>">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </form>
</div>

<script>
    const checkField = document.querySelector('.check-box-field').querySelectorAll('input[type="checkbox"]')
    const filters = JSON.parse(`<?= json_encode($filter)?>`)

    const tickBox = (item, val = '') => {
        const field = document.querySelector(`div[data-flex="${item}"]`)
        const inputField = field.querySelector('input')
        
        inputField.value = val
        field.style.display = field.style.display === 'none' ? '' : 'none'
    }
    Object.keys(filters)
    .filter(f => f !== 'sortBy')
    .forEach((f, idx) => {
        if(filters[f] !== ''){
            const item = checkField[idx].id
            const itemId = document.querySelector(`#${item}`)
            itemId.checked = true
            tickBox(item, filters[f])
        }
    })

    checkField.forEach((ch) => {
        ch.addEventListener('change', (e) => {
            tickBox(ch.id)
        })
    })
</script>