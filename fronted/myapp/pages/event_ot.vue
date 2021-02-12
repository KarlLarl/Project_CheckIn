<template>
  <div class='container' align='center'>
    <div class='card'>
      <div class='card-body'>
        <template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class='text-left'>Date</th>
                  <th class='text-left'>Time Start</th>
                  <th class='text-left'>Time Stop</th>
                  <th class="text-left">List</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>
                    {{ item.date }}
                  </td>

                  <td>
                    {{ item.time_start }}
                  </td>

                  <td>
                    {{ item.time_stop }}
                  </td>

                  <td>
                    <nuxt-link :to="{path:'./ot/' + item.id}">{{ item.ot_name }}</nuxt-link>
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
    this.get_data();
    this.check_login();
  },
  methods:{
    check_login(){
        if (JSON.parse(localStorage.getItem('store')) == ''){
          location.href = '/login'
        }else{
          
        }
      },
    get_data(){
      axios.get('http://127.0.0.1:5000/show_add_ot').then(response => {
        this.items = response.data
        //console.log(this.items)
      })
    }
  },
  data(){
    return{
      items:[]
    }
  }
}
</script>