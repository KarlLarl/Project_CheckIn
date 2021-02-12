<template>
    <div class='container'>
        <div class="card">
            <div class="card-body">
                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="uid" label="User ID" type='text' readonly/>
                    </v-col>
                  </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="f_name" label="Firstname" type='text'/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="l_name" label="Lastname" type='text'/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="email" label="Email" type='text'/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="user_role" label="User role" type='text'/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="fix_leave" label="Fix leave" type='number'/>
                    </v-col>
                </v-row>

                <div align='right'>
                  <v-btn
                    class="ma-2"
                    color="warning"
                    @click="put_edit()"
                    large
                  >
                    Edit
                  </v-btn>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapActions, mapState} from 'vuex'
export default {
    mounted(){
        this.get_data();
        this.check_login();
    },
    computed:{
      ...mapState({
        data_array: state => state.login.data_array
      })
    },
    methods:{
      check_login(){
        if (JSON.parse(localStorage.getItem('store')) == ''){
          location.href = '/login'
        }else if (JSON.parse(localStorage.getItem('store')).user_role != 'admin'){
          location.href = '/'
        }
      },
        get_data(){
          axios.get('http://127.0.0.1:5000/get_edit/' + this.id).then(response =>{
                  this.uid = response.data[0].id,
                  this.f_name = response.data[0].f_name,
                  this.l_name = response.data[0].l_name,
                  this.email = response.data[0].email,
                  this.user_role = response.data[0].user_role,
                  this.fix_leave = response.data[0].fix_leave
                })
        },
        put_edit(){
            axios.put('http://127.0.0.1:5000/post_edit/', {
              f_name:this.f_name,
              l_name:this.l_name,
              email:this.email,
              user_role:this.user_role,
              fix_leave:this.fix_leave,
              id:this.id
            }).then(response => {
              if (response.data == 'success'){
                Swal.fire(
                'Edit Data Success',
                '',
                'success'
                )
              }else if (response.data == 'failed'){
                Swal.fire(
                'Edit Data Failed',
                '',
                'error'
                )
              }
            })
        }
    },
    data(){
        return{
            id:this.$route.params.id,
            uid:null,
            f_name:null,
            l_name:null,
            email:null,
            user_role:null,
            fix_leave:null
        }
    }
}
</script>