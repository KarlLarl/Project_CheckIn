<template>
    <div class='container'>
        <div class="card">
            <div class="card-body">
                <v-row>
                    <v-col cols="12" md="12">
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
                                v-model="date"
                                label="Date"
                                hint="MM/DD/YYYY format"
                                persistent-hint
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="time_start" label="Time Start" type='text' readonly/>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-menu
                            ref="menu"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="time"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="time_stop"
                                label="Time Stop"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                            v-if="menu2"
                            v-model="time_stop"
                            full-width
                            @click:minute="$refs.menu.save(time)"
                            ></v-time-picker>
                        </v-menu>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field v-model="ot_name" label="OT Name" type='text'/>
                    </v-col>
                </v-row>

                <div align='right'>
                    <v-btn
                      class="ma-2"
                      color="info"
                      @click="add()"
                      large
                    >
                      Add OT
                    </v-btn>
                </div>
            </div>
        </div>

        <br>

        <div class="card">
            <div class="card-body">
                <template>
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Date</th>
                            <th class="text-left">Time Start</th>
                            <th class="text-left">Time Stop</th>
                            <th class="text-left">OT Name</th>
                            <th class="text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.date }}</td>
                        <td>{{ item.time_start }}</td>
                        <td>{{ item.time_stop }}</td>
                        <td>{{ item.ot_name }}</td>
                        <td>
                            <nuxt-link :to="{path:'/edit_ot/' + item.id}">
                                <v-btn class="ma-2" color="warning">Edit</v-btn>
                            </nuxt-link>

                            <nuxt-link :to="{path:'/delete_ot/' + item.id}">
                                <v-btn class="ma-2" color="error">Delete</v-btn>
                            </nuxt-link>
                        </td>
                        </tr>
                    </tbody>

                    </template>
                </v-simple-table>
                </template>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'
export default {
    mounted(){
        this.check_login();
        this.get_data();
    },
    computed:{
      ...mapState({
        data_array: state => state.login.data_array
      })
    },
    methods:{
        get_data(){
            axios.get('http://127.0.0.1:5000/show_add_ot').then(response => {
                this.items = response.data
            })
        },
        add(){
            axios.post('http://127.0.0.1:5000/add_ot_controller',{
                date:this.date,
                time:this.time,
                time_start:this.time_start,
                time_stop:this.time_stop,
                ot_name:this.ot_name
            }).then(response =>{
                if (response.data == 'success'){
                    Swal.fire(
                    'Add OT Success',
                    '',
                    'success'
                    );
                }else if (response.data == 'error'){
                    Swal.fire(
                    'Error',
                    '',
                    'error'
                    )
                }
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

        check_login(){
            if (JSON.parse(localStorage.getItem('store')) == ''){
            location.href = '/login'
            }else if (JSON.parse(localStorage.getItem('store')).user_role != 'admin'){
            location.href = '/'
            }
        }

    },
    data(){
        return{
            menu1:false,
            menu2:false,
            date:null,
            items:[],

            time:this.get_time(),
            time_start:'18.00',
            time_stop:null,
            ot_name:null,
            
        }
    }
}
</script>