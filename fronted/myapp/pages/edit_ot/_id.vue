<template>
    <div class='container'>
        <div class="card">
            <div class="card-body">
                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="date" label="Date" type='text'/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="time_start" label="Time Start" type='text' readonly/>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field v-model="time_stop" label="Time Stop" type='text'/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field v-model="ot_name" label="OT Name" type='text'/>
                    </v-col>
                </v-row>

                <div align='right'>
                    <v-btn class="ma-2" color="warning" @click="edit()" large>
                      Edit
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
    },
    methods:{
        get_data(){
            axios.get('http://127.0.0.1:5000/search_data_ot/' + this.id).then(response => {
                this.date = response.data[0].date,
                this.time_start = response.data[0].time_start,
                this.time_stop = response.data[0].time_stop,
                this.ot_name = response.data[0].ot_name
            })
        },
        edit(){
            axios.put('http://127.0.0.1:5000/edit_ot', {
                date:this.date,
                time_start:this.time_start,
                time_stop:this.time_stop,
                ot_name:this.ot_name,
                id:this.id
            }).then(response => {
                if (response.data == 'success'){
                    Swal.fire(
                    'Edit OT Success',
                    '',
                    'success'
                    )
                }else if (response.data == 'error'){
                    Swal.fire(
                    'Edit OT Error',
                    '',
                    'error'
                    );
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
            ot_name:null
        }
    }
}
</script>