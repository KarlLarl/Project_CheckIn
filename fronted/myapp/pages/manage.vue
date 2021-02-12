<template>
  <div class='container' align='center'>
    <div class="card">
            <div class="card-body">
              <div class="row" align='center'>
                  <div class="col-sm">
                      <div class="card">
                          <div class="card-body">
                              <v-btn
                                class="ma-2"
                                color="primary"
                                @click="getLocation1()"
                                large
                                >
                                Check-in
                            </v-btn>
                          </div>
                      </div>
                  </div>

                  <div class="col-sm">
                      <div class="card">
                          <div class="card-body">
                              <v-btn
                                class="ma-2"
                                color="error"
                                @click="getLocation2()"
                                large
                                >
                                Check-out
                            </v-btn>
                          </div>
                      </div>
                  </div>

                  <div class="col-sm">
                      <div class="card">
                          <div class="card-body">
                              <nuxt-link to="/leave">
                                <v-btn
                                    class="ma-2"
                                    color="warning"
                                    large
                                    >
                                    Leave
                                </v-btn>
                              </nuxt-link>
                          </div>
                      </div>
                  </div>

                  <div class="col-sm">
                      <div class="card">
                          <div class="card-body">
                              <nuxt-link to="/event_ot">
                                <v-btn
                                    class="ma-2"
                                    color="info"
                                    large
                                    >
                                    EVENT OT
                                </v-btn>
                              </nuxt-link>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
    <div id='demo1'></div>
    <div id='demo2'></div>
  </div>
  
</template>


<script>
import axios from 'axios'
import {mapActions, mapState} from 'vuex'
export default {
  mounted(){
    this.loader();
    this.check_login();
  },
  computed:{
    ...mapState({
      id: state => state.login.data_array[0].id,
      time: state => state.login.time_date[0].time,
      date:state => state.login.time_date[0].date
    })
  },
  methods:{
    ...mapActions(
      'login', ['set_time_date2'],
    ),
    check_login(){
        if (JSON.parse(localStorage.getItem('store')) == ''){
          location.href = '/login'
        }else{
          
        }
      },
    loader(){

      const asiaTime = new Date().toLocaleString({timeZone: "Asia/Bangkok"});
      const h = new Date(asiaTime).getHours();
      const m = new Date(asiaTime).getMinutes();
      const s = new Date(asiaTime).getSeconds();

      const day = new Date(asiaTime).getDate();
      const month = new Date(asiaTime).getMonth() + 1;
      const year = new Date(asiaTime).getFullYear();

      const time_check = String(h + '.' + m);
      const date_check = String(year + '-' + month + '-' + day);

      this.set_time_date2({
        time:time_check,
        date:date_check
      })
    },
    getLocation1() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition1);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.1";
        y.innerHTML = "Geolocation is not supported by this browser.2";
      }
    },
    getLocation2() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition2);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.1";
        y.innerHTML = "Geolocation is not supported by this browser.2";
      }
    },
    showPosition1(position) {
      const kaow1 = 18.787207;
      const kaow2 = 98.966513;

      const artisan1 = 18.785958;//ปัจจุบัน
      const artisan2 = 98.967189;//ปัจจุบัน

      const x = document.getElementById("demo1")
      const y = document.getElementById('demo2')
      console.log(x);
      console.log(y);

      const x1 = x.innerHTML = position.coords.latitude;
      const y1 = y.innerHTML = position.coords.longitude;

      const area1 = (this.calcCrow(kaow1, kaow2, artisan1, artisan2).toFixed(1));//artisan area
      const area2 = (this.calcCrow(x1, y1, artisan1, artisan2).toFixed(1));//area ?

      if (area2 > area1){
        console.log('not area');
        console.log('area1 : ',area1);
        console.log('area2 : ',area2);
        console.log('x1: ',x1 , 'y1: ', y1);   

        Swal.fire(
              'you not live area',
              '',
              'error'
            )

      }else if (area2 <= area1){
        console.log('ok');
        console.log('area1 : ',area1);
        console.log('area2 : ',area2);
        console.log('x1: ',x1 , 'y1: ', y1);

        axios.post('http://127.0.0.1:5000/check_in',{
          uid:this.id,
          time:this.time,
          date:this.date
        }).then(response => {
          if (response.data == 'insert success'){
            Swal.fire(
              'check-in success',
              '',
              'success'
            )
          }else if (response.data == 'who'){
            Swal.fire(
              'you not check-in repeatedly',
              '',
              'error'
            )
          }
        })

        //document.getElementById("btn1").type='submit';
        //document.getElementById("btn2").type='submit';                                   
      }
    },
    showPosition2(position) {
      const kaow1 = 18.787207;
      const kaow2 = 98.966513;

      const artisan1 = 18.785958;//ปัจจุบัน
      const artisan2 = 98.967189;//ปัจจุบัน

      const x = document.getElementById("demo1")
      const y = document.getElementById('demo2')
      console.log(x);
      console.log(y);

      const x1 = x.innerHTML = position.coords.latitude;
      const y1 = y.innerHTML = position.coords.longitude;

      const area1 = (this.calcCrow(kaow1, kaow2, artisan1, artisan2).toFixed(1));//artisan area
      const area2 = (this.calcCrow(x1, y1, artisan1, artisan2).toFixed(1));//area ?

      if (area2 > area1){
        console.log('not area');
        console.log('area1 : ',area1);
        console.log('area2 : ',area2);
        console.log('x1: ',x1 , 'y1: ', y1);   

        Swal.fire(
              'you not live area',
              '',
              'error'
            )

      }else if (area2 <= area1){
        console.log('ok');
        console.log('area1 : ',area1);
        console.log('area2 : ',area2);
        console.log('x1: ',x1 , 'y1: ', y1);

        axios.post('http://127.0.0.1:5000/check_out',{
          uid:this.id,
          time:this.time,
          date:this.date
        }).then(response => {
          if (response.data == 'insert success'){
            Swal.fire(
              'check-out success',
              '',
              'success'
            )
          }else if (response.data == 'who'){
            Swal.fire(
              'you not check-out repeatedly',
              '',
              'error'
            )
          }
        })

        //document.getElementById("btn1").type='submit';
        //document.getElementById("btn2").type='submit';                                   
      }
    },
    calcCrow(lat1, lon1, lat2, lon2){
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var lat1 = this.toRad(lat1);
      var lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d;
    },

    toRad(Value){
      return Value * Math.PI / 180;
    }
  },
  data(){
    return{
      uid:null
    }
  },
}
</script>