<template>
    <div class='container'>
        <div class="card">
            <div class="card-body">
                <template>
                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">User ID</th>
                            <th class="text-left">Firstname</th>
                            <th class="text-left">Lastname</th>
                            <th class="text-left">User role</th>
                            <th class='text-left'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                                <td>{{ item.id }}</td>
                                <td>{{ item.f_name }}</td>
                                <td>{{ item.l_name }}</td>
                                <td>{{ item.user_role }}</td>
                                <td>
                        
                                    
                                    <nuxt-link :to="{path:'/view/' + item.id}">
                                        <v-btn 
                                            class="ma-2"
                                            color="info"
                                            >
                                            View
                                        </v-btn>
                                    </nuxt-link>
                                    

                                    <nuxt-link :to="{path:'/edit/' + item.id}">
                                        <v-btn
                                            class="ma-2"
                                            color="warning"
                                            >
                                            Edit
                                        </v-btn>
                                    </nuxt-link>

                                    <nuxt-link :to="{path:'/delete_id/' + item.id}">
                                        <v-btn
                                            class="ma-2"
                                            color="error"
                                            >
                                            Delete
                                        </v-btn>
                                    </nuxt-link>

                                    <nuxt-link :to="{path:'/export_one/' + item.id}">
                                        <v-btn
                                            class="ma-2"
                                            color="success"
                                            >
                                            Export File
                                        </v-btn>
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
            axios.get('http://127.0.0.1:5000/show').then(response => {
                    this.items = response.data
                })
        }
    },
    data(){
        return{
            items:[
                {
                    id:null,
                    f_name:null,
                    l_name:null,     
                }
            ],
        }
    }
}
</script>