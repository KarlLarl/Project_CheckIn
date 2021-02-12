<template>
  <div class="container">
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
            <v-btn class="" color="info" @click="get_history()" large>
              Search
            </v-btn>
          </div>
        </div>

        <canvas id="myChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'
export default {
  mounted(){
    //this.get_history();
    this.check_login();
  },
  methods:{
    get_history(){
      axios.post('http://127.0.0.1:5000/search_graph/',{
        uid:JSON.parse(localStorage.getItem('store')).id,
        search_month:this.search_month,
        search_year:this.search_year,
        search_day_start:this.search_day_start,
        search_day_stop:this.search_day_stop,

      }).then(response => {
        //console.log(response.data)
        var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: ['Check-in', 'Check-out', 'Leave', 'Late'],
                  datasets: [{
                      label: '# History Chart Graph',
                      data: [response.data[0].date_in, response.data[0].date_out, response.data[0].date_leave, response.data[0].date_late],
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
    check_login(){
        if (JSON.parse(localStorage.getItem('store')) == ''){
          location.href = '/login'
        }else{
          
        }
      },
    search(){

    }
  },
  computed:{
    ...mapState({
      //data_array: state => state.login.data_array,
      //id: state => state.login.data_array[0].id
    })
  },
  data(){
    return{
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
    }
  }
}
</script>