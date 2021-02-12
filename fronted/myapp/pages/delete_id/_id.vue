<template>
    <div>
        
    </div>
</template>

<script>
import axios from 'axios'
import {mapActions, mapState} from 'vuex'
export default {
    mounted(){
        this.delete_data();
    },
    methods:{
        delete_data(){
            Swal.fire({
            title: 'Are you sure?',
            text: "You want delete user ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                axios.post('http://127.0.0.1:5000/post_delete_controller/', {
                id:this.id
                }).then(response => {
                    //console.log(response)
                });
                location.href = '/admin';
            }else{
                location.href = '/admin';
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