<template>
  <div class='container' align='center'>
    <div class="card">
              <div class="card-body">

                  <v-alert
                    v-model="alert"
                    dismissible
                    color="cyan"
                    border="left"
                    elevation="2"
                    colored-border
                    icon="mdi-alert-circle"
                  >
                    {{string_alert}}
                  </v-alert>

                  <v-container>
                    <v-row>
                    <v-col cols="12" lg="6">
                        <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            v-model="start"
                            label="Date Start"
                            hint="MM/DD/YYYY format"
                            persistent-hint
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date1" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" lg="6">
                        <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            v-model="stop"
                            label="Date Stop"
                            hint="MM/DD/YYYY format"
                            persistent-hint
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    </v-row>
                </v-container>

                 <v-select v-model="type_select" :items="items" label="Select" solo></v-select>

                <v-textarea
                    label="Note"
                    auto-grow
                    outlined
                    rows="10"
                    row-height="15"
                    v-model='note'
                ></v-textarea>

                <div align='right'>
                    <v-btn
                        class="ma-2"
                        color="warning"
                        @click="login()"
                        large>
                        Leave
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
      mounted() {
        this.check_login();
        this.check_leaves();
      },
    data: vm => ({
      alert: true,
      check_day_leave:null,
      string_alert:null,

      date1: new Date().toLocaleString().substr("en-US", {timeZone: "Asia/Shanghai"}),
      date2: new Date().toLocaleString().substr("en-US", {timeZone: "Asia/Shanghai"}),
      menu1: false,
      menu2: false,
      items:['ลากิจ', 'ลาป่วย'],
      uid:null,
      type_select:null,
      note:null

    }),

    computed: {
      start () {
        return this.formatDate(this.date1)
      },

      stop () {
        return this.formatDate(this.date2)
      },
      ...mapState({
          id: state => state.login.data_array[0].id
      })
    },

    methods: {
      check_login(){
        if (JSON.parse(localStorage.getItem('store')) == ''){
          location.href = '/login'
        }else{
          //console.log(localStorage.getItem('store'))
        }
      },
      check_leaves(){
        axios.post('http://127.0.0.1:5000/check_day_leave', {
          uid:JSON.parse(localStorage.getItem('store')).id
        }).then(response =>{
          if (response.data.result3 == 'you dont not leave'){
            this.string_alert = 'You dont leave';
          }else{
            this.string_alert = 'You can leave: ' + response.data.result3 + ' day';
          }
        })
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      login(){
        const date1 = new Date(this.date1); 
        const date2 = new Date(this.date2); 
        const Difference_In_Time = date2.getTime() - date1.getTime(); 
        const date_leave = Difference_In_Time / 86400000;

        const asiaTime = new Date().toLocaleString({timeZone: "Asia/Bangkok"});
        const h = new Date(asiaTime).getHours();
        const m = new Date(asiaTime).getMinutes();
        const s = new Date(asiaTime).getSeconds();

        const day = new Date(asiaTime).getDate();
        const month = new Date(asiaTime).getMonth() + 1;
        const year = new Date(asiaTime).getFullYear();

        const time_check = String(h + '.' + m);
        const date_check = String(year + '-' + month + '-' + day);


        axios.post('http://127.0.0.1:5000/leave',{
            uid: this.id,
            start: this.start,
            stop: this.stop,
            type_select:this.type_select,
            note:this.note,
            date_leave:date_leave
        }).then(response => {
          if (response.data == 'error1'){
            Swal.fire(
              'You dont can leave',
              '',
              'error'
            )
          }else if (response.data == 'success'){
            Swal.fire(
              'You leave success',
              '',
              'success'
            )
          }
        })
      }
    }
  }
</script>