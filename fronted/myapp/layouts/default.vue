<template>
  <v-app>
    <v-navigation-drawer dark color="primary"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list v-if="data_array == ''">
        <v-list-item
          v-for="(item, i) in items1"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-else-if="data_array[0].user_role == 'admin'">
        <v-list-item
          v-for="(item, i) in items3"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-else>
        <v-list-item
          v-for="(item, i) in items2"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <img src="../img/logo.png" width='100px' height='25px'>

      <v-spacer />

    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {mapActions, mapState} from 'vuex'
    export default {
      mounted() {
        this.get_data()
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
        get_data(){
          // this.set_state2({
          //   id:3,
          //   f_name:'songpol',
          //   l_name:'takha',
          //   email:'pungpondstr@gmail.com',
          //   user_role:'Part-time'
          // })
          this.set_state2(JSON.parse(localStorage.getItem('store')))
          //console.log(JSON.parse(localStorage.getItem('store')))
        }
      },
      
        data () {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                items1: [
                    {
                        icon: 'mdi-home',
                        title: 'Home',
                        to: '/'
                    },
                    {
                        icon: 'mdi-account',
                        title: 'Login',
                        to: '/login'
                    },
                    {
                        icon: 'mdi-account-plus',
                        title: 'Register',
                        to: '/register'
                    }
                ],
                items2: [
                    {
                        icon: 'mdi-home',
                        title: 'Home',
                        to: '/'
                    },
                    {
                        icon: 'mdi-table-edit',
                        title: 'Manage',
                        to: '/manage'
                    },
                    {
                        icon:'mdi-history',
                        title:'History',
                        to:'/history'
                    },
                    {
                        icon: 'mdi-logout',
                        title: 'Logout',
                        to: '/logout'
                    }
                ],
                items3:[
                  {
                    icon:'mdi-table-edit',
                    title:'Manage',
                    to:'/admin'
                  },
                  {
                    icon:'mdi-plus-box',
                    title:'Add OT',
                    to:'/add_ot'
                  },
                  {
                    icon:'mdi-file-export',
                    title:'Export File All User',
                    to:'/export_all'
                  },
                  {
                    icon: 'mdi-logout',
                    title: 'Logout',
                    to: '/logout'
                  }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Artisan Digital'
            }
        }
    }
</script>
