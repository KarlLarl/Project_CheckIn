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
                      <v-text-field v-model="f_name" label="Firstname" type='text' readonly/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="l_name" label="Lastname" type='text' readonly/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="email" label="Email" type='text' readonly/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="user_role" label="User role" type='text' readonly/>
                    </v-col>
                </v-row>
            </div>
        </div>

        <br>

        <div class="">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm">
                  <v-select v-model='search_day_start' :items="items1" label="Day Start" solo></v-select>
                </div>

                <div class="col-sm">
                  <v-select v-model='search_day_stop' :items="items2" label="Day Stop" solo></v-select>
                </div>

                <div class="col-sm">
                  <v-select v-model='search_month' :items="items3" label="Month" solo></v-select>
                </div>

                <div class="col-sm">
                  <v-select v-model='search_year' :items="items4" label="Year" solo></v-select>
                </div>

                <div class="col-sm">
                  <v-btn class="" color="info" @click="get_check_in()" large>
                    Search
                  </v-btn>
                </div>

              </div>

              <!--<div align='right'>
                <v-btn class="mb-2" color="info" @click="get_check_in()" large>
                  Search
                </v-btn>

                <nuxt-link :to="{path:'/export_query/' + this.id}">
                  <v-btn class="mb-2" color="success" large>
                    Export File
                  </v-btn>
                </nuxt-link>
              </div>-->

            </div>
          </div>
        </div>

        <canvas id="myChart"></canvas>

    </div>
</template>

<script>
import axios from 'axios'
import {mapActions, mapState} from 'vuex'
export default {
    mounted(){
        this.get_data();
        //this.get_check_in();
        this.chart_js();
        this.check_login();
    },
    computed:{
      ...mapState({
        data_array: state => state.login.data_array,
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
            axios.get('http://127.0.0.1:5000/view/' + this.id).then(response =>{
                    this.uid = response.data[0].id,
                    this.f_name = response.data[0].f_name,
                    this.l_name = response.data[0].l_name,
                    this.email = response.data[0].email,
                    this.user_role = response.data[0].user_role
                })
        },
        get_check_in(){
          axios.post('http://127.0.0.1:5000/search_graph/', {
            uid:this.id,
            search_month:this.search_month,
            search_year:this.search_year,
            search_day_start:this.search_day_start,
            search_day_stop:this.search_day_stop,
          }).then(response => {
            this.date_check = response.data[0];
            
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: ['Check-in', 'Check-out', 'Leave', 'Late'],
                  datasets: [{
                      label: '# History Chart Graph',
                      data: [this.date_check.date_in, this.date_check.date_out, this.date_check.date_leave, this.date_check.date_late],
                      backgroundColor: [
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                      ],
                      borderColor: [
                          'rgba(75, 192, 192, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(153, 102, 255, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });
          })
        },
        chart_js(){
          
              }
    },
    data(){
        return{
            id:this.$route.params.id,
            search_month:null,
            search_year:null,
            search_day_start:null,
            search_day_stop:null,

            items1:[
              '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15','16', '17', '18', 
              '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
            ],
            
            items2:[
              '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15','16', '17', '18', 
              '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
            ],

            items3:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],

            items4:['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],

            uid:null,
            f_name:null,
            l_name:null,
            email:null,
            user_role:null,
            date_check:null
            
        }
    }
}
</script>