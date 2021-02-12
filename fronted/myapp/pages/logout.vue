<template>
    <div>
        
    </div>
</template>

<script>

import {mapActions, mapState} from 'vuex'

export default {
    mounted(){
        this.logout();
        this.check_login();
    },
    computed:{
        ...mapState({
            data_array: state => state.login.data_array
        })
    },
    methods:{
        ...mapActions('login', ['set_logout2']),
        logout(){
            //localStorage.clear('store');
            localStorage.removeItem('store');
            localStorage.setItem('store', JSON.stringify(''))
            //this.set_logout2();
            location.href = '/';
        },
        check_login(){
        if (JSON.parse(localStorage.getItem('store')) == ''){
          location.href = '/login'
        }else{
          
        }
      }
    }
}
</script>