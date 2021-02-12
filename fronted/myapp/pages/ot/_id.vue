<template>
  <div class='container'>
    <div class="card">
      <div class="card-body">
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="date" label="Date" type='text' readonly/>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="time_start" label="Time Start" type='text' readonly/>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="time_stop" label="Time Stop" type='text' readonly/>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="ot_name" label="OT Name" type='text' readonly/>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-text-field v-model="result_time" label="Result time" type='text' readonly/>
          </v-col>
        </v-row>

        <div align='right'>
          <v-btn class="ma-2" color="info" @click="add_data()" large>
            Save
          </v-btn>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'
export default {
  mounted(){
    this.get_data();
    this.check_login();    
  },
  computed:{
    ...mapState({
      data_array: state => state.login.data_array[0]
    })
  },
  methods:{
    check_login(){
        if (JSON.parse(localStorage.getItem('store')) == ''){
          location.href = '/login'
        }else{
          
        }
      },
    get_data(){
      axios.get('http://127.0.0.1:5000/search_data_ot/' + this.id).then(response => {
        this.date = response.data[0].date,
        this.time_start = response.data[0].time_start,
        this.time_stop = response.data[0].time_stop,
        this.ot_id = this.id;
        this.ot_name = response.data[0].ot_name,
        this.result_time = (parseFloat(this.time_stop * 3600) - parseFloat(this.time_start * 3600)) / 3600;
      })
    },
    get_time(){
      const asiaTime = new Date().toLocaleString({timeZone: "Asia/Bangkok"});
      const h = new Date(asiaTime).getHours();
      const m = new Date(asiaTime).getMinutes();
      const s = new Date(asiaTime).getSeconds();
      const time_check = h + '.' + m;
      //console.log(d)
      return time_check;
    },
    add_data(){
      axios.post('http://127.0.0.1:5000/save_ot', {
        uid:this.data_array.id,
        date:this.date,
        time:this.get_time(),
        time_start:this.time_start,
        time_stop:this.time_stop,
        ot_id:this.ot_id,
        ot_name:this.ot_name,
        sum_time_ot:this.result_time
      }).then(response => {
        if (response.data == 'error1'){
          Swal.fire(
              'You have done this OT.',
              '',
              'error'
            )
        }else if (response.data == 'error2'){
          Swal.fire(
              'Error',
              '',
              'error'
            )
        }else if (response.data == 'success'){
          Swal.fire(
              'Save OT Success',
              '',
              'success'
            )
        }
      })
    }
  },
  data(){
    return{
      id:this.$route.params.id,
      date:null,
      time_start:null,
      time_stop:null,
      ot_id:null,
      ot_name:null,
      result_time:null
    }
  }
}
</script>