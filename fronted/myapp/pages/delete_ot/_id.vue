<template>
    <div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted(){
        this.delete_data();
    },
    methods:{
        delete_data(){
            Swal.fire({
            title: 'Are you sure?',
            text: "You want delete ot ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                axios.post('http://127.0.0.1:5000/delete_ot', {
                id:this.id
                }).then(response => {
                    console.log(response)
                });
                location.href = '/add_ot';
            }else{
                location.href = '/add_ot';
            }
            })
        }
    },
    data(){
        return{
            id:this.$route.params.id
        }
    }
}
</script>