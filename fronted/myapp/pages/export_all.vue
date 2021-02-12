<template>
    <div class='container'>
        <div class="card">
            <div class="card-body">
                <template>
                    <v-simple-table id='tblData'>
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">User ID</th>
                            <th class="text-left">Day</th>
                            <th class="text-left">Month</th>
                            <th class="text-left">Year</th>
                            <th class="text-left">Check_in</th>
                            <th class="text-left">Check_out</th>
                            <th class="text-left">Leave</th>
                            <th class="text-left">Late</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                            <td>{{ item.uid }}</td>   
                            <td>{{ item.day }}</td>
                            <td>{{ item.month }}</td>
                            <td>{{ item.year }}</td>
                            <td>{{ item.date_check_in }}</td>
                            <td>{{ item.date_check_out }}</td>
                            <td>{{ item.date_leave }}</td>
                            <td>{{ item.date_late }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </template>

                <div align='right'>
                    <v-btn
                        class="ma-2"
                        color="success"
                        large
                        @click="exportTableToExcel('tblData')"
                    >
                        Export File
                    </v-btn>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    mounted(){
        this.check_login();
        this.get_data();
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
            axios.get('http://127.0.0.1:5000/export_graph_all').then(response => {
                this.items = response.data
            })
        },
        exportTableToExcel(tableID, filename = ''){
            var downloadLink;
            var dataType = 'application/vnd.ms-excel';
            var tableSelect = document.getElementById(tableID);
            var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
            
            // Specify file name
            filename = filename?filename+'.xls':'excel_data.xls';
            
            // Create download link element
            downloadLink = document.createElement("a");
            
            document.body.appendChild(downloadLink);
            
            if(navigator.msSaveOrOpenBlob){
                var blob = new Blob(['\ufeff', tableHTML], {
                    type: dataType
                });
                navigator.msSaveOrOpenBlob( blob, filename);
            }else{
                // Create a link to the file
                downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            
                // Setting the file name
                downloadLink.download = filename;
                
                //triggering the function
                downloadLink.click();
            }
        }
    },
    data(){
        return{
            items:[],
        }
    }
}
</script>