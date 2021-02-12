<template>
  <div class='container' align='center'>
      <div class="card">
            <div class="card-body">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="f_name" :rules="f_nameRules" label="First name" type='text' required autofocus/>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field v-model="l_name" :rules="l_nameRules" label="Last name" type='text' required/>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="email" :rules="emailRules" label="Email" type='email' required/>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="password" :rules="passwordRules" label="Password" type='password' required/>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="confirm_password" :rules="confirm_passwordRules" label="Confirm password" type='password' required/>
                    </v-col>
                  </v-row>

                  <v-select v-model="user_role" :items="items" label="User role" solo></v-select>

                  <div align='right'>
                    <v-btn
                      class="ma-2"
                      color="info"
                      @click="register()"
                      large
                    >
                      Register
                    </v-btn>
                  </div>
                </v-container>
              </v-form>
            </div>
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
      register(){
        if (this.f_name == null){
          Swal.fire(
              'Firstname is required',
              '',
              'error'
              )
        }else if (this.l_name == null){
          Swal.fire(
              'Lastname is required',
              '',
              'error'
              )
        }else if (this.email == null){
          Swal.fire(
              'Email required',
              '',
              'error'
              )
        }else if (this.password == null){
          Swal.fire(
              'Password is required',
              '',
              'error'
              )
        }else if (this.confirm_password == null){
          Swal.fire(
              'Confirm password is required',
              '',
              'error'
              )
        }else if (this.password.length < 8){
          Swal.fire(
              'Password must be more than 8 characters',
              '',
              'error'
              )
        }else if (this.confirm_password.length < 8){
          Swal.fire(
              'Confirm Password must be more than 8 characters',
              '',
              'error'
              )
        }else if (this.user_role == null){
          Swal.fire(
              'Please Select User role',
              '',
              'error'
              )
        }else{
          axios.post('http://127.0.0.1:5000/register',{
            f_name:this.f_name,
            l_name:this.l_name,
            email:this.email,
            password:this.password,
            confirm_password:this.confirm_password,
            user_role:this.user_role
          }).then(response => {
            if (response.data == 'insert success'){
              location.href = "/login";
            }else if (response.data = 'password not math'){
              Swal.fire(
              'Password not math',
              '',
              'error'
              )
            }else{
              Swal.fire(
              'Register fail',
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
      }
    },
    data () {
      return {
          valid: true,
          
          f_name:null,
          f_nameRules: [
            v => !!v || 'Firstname is required',
          ],

          l_name:null,
          l_nameRules: [
            v => !!v || 'Lastname is required',
          ],

          email:null,
          emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],

          password:null,
          passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Password must be more than 8 characters',
          ],
      
          confirm_password:null,
          confirm_passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 8) || 'Confirm Password must be more than 8 characters',
          ],
        
        
        user_role:null,
        items: ['Intern', 'Part-time', 'Full-time'],  
      }
    },
  }
</script>