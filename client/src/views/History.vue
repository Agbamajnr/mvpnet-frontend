<template>
  <div class="history">
    <div class="links">
      <button id="back" name="button" @click="back">&#706;</button>
      <button name="button" id="delete" @click= "deleteLogs">&#128465;</button>
      <button  name="button" id="bottom">&#8595;</button>
    </div>
    <pre :class= "{ false: data_state ==  false, true: data_state == true }" v-if="data.length">{{ data }}</pre>
    <p v-else>No Logs found</p>
  </div>

  <router-view />
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'Logs',
  methods: {
    back () {
      this.$router.go(-1);
    },
  },
  setup() {
    //fetch logs
    const data = ref('');
    const url = 'https://mvpnet.herokuapp.com/api/network/logs';
    const url2 = 'https://mvpnet.herokuapp.com/api/network/logs/del';

    const fetchLogs = async (url) => {
      const res = await axios.get(url);
      data.value = res.data;
    }
    fetchLogs(url);

    //delete Logs

    const deleteLogs = async (url) => {
      const res = await axios.delete(url2);
      alert(res.data)
      data.value = '';
    }

    return { data, deleteLogs }
  }
  //fetch logs--Success

}
</script>

<style scoped>
  pre {
    font-size: 16px;
    padding: 10px
  }
  .links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  #delete {
    font-size: 26px;
    color: crimson;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 50px;
    cursor: pointer;
  }
  #back, #bottom {
    width: 50px;
    height: 35px;
    font-size: 27px;
    cursor: pointer;
    font-weight: 800;
  }
  #delete:hover {
    transition: all .7s;
    border: 2px solid crimson;
  }
</style>
