<script>
    function signout(){
        if(confirm("Are you sure you wanna logout?")){
            window.location.href = "<?= base_url($link['link']) ?>";
        }
        return false;
    }
</script>