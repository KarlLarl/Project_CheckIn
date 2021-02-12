<template>
  <div class='container' align='center'>
    <div class="card">
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="card-body">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="email" :rules="emailRules" label="Email" type='text' required autofocus/>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="password" :rules="passwordRules" label="Password" type='password' required/>
                    </v-col>
                  </v-row>

                  <div align='right'>
                    <v-btn
                      class="ma-2"
                      color="info"
                      @click="login()"
                      large
                    >
                      Login
                    </v-btn>
                  </div>

                </v-container>
              </div>
      </v-form>
    </div>
  </div>
</template>


<script>
import {mapState, mapActions} from 'vuex'
import axios from 'axios'

  export default {
    mounted(){
      //this.check_login();
    },
    computed: {
      ...mapState({
        data_array: state => state.login.data_array
      })
    },
    methods: {
      ...mapActions(
        'login', ['set_state2']
      ),
      login(){
        if (this.email == null){
          Swal.fire(
                'Email is required',
                '',
                'error'
                )
        }else if (this.password == null){
          Swal.fire(
                'Password is required',
                '',
                'error'
                )
        }else {
          axios.post('http://127.0.0.1:5000/login',{
            email:this.email,
            password:this.password
          }).then(response => {
            if (response.data.data_uid.email == this.email){
              localStorage.setItem('store', JSON.stringify(response.data.data_uid))
              location.href = '/';
              //console.log(JSON.parse(localStorage.getItem('store')))
            }else if (response.data.data_uid == 'who'){
              Swal.fire(
                'Email or Password wrong',
                '',
                'error'
                )
            }
          })
        }
      },
      check_login(){
        if (JSON.parse(localStorage.getItem('store')) != ''){
          location.href = '/'
        }else{
          
        }
      },
    },
    data () {
      return {
        valid: true,
          
        email:null,
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        password:null,
        passwordRules: [
          v => !!v || 'Password is required',
        ],
      }
    },
  }
</script>