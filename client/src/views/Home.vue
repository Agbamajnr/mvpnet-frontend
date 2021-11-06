<template>
  <div class="home">
    <h1>MVP</h1>
    <p>powered by</p>
    <img alt="Vue logo" src="../assets/logo.png">
    <Network @fullData= "relData"/>
    <router-link to="/logs"  id="history">Logs</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Network from '@/components/Network.vue'
import { ref } from 'vue';

export default {
  name: 'Home',
  components: {
    Network
  },
  setup() {
    const data = ref('')

    const relData = (bare) => {
      data.value = bare;
    }

    return { data, relData}
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;

  }
  h1 {
    font-size: 70px;
    font-weight: 100;
  }
  p {
    font-size: 18px;
    padding: 0;
    margin: 0;
    text-align: center;
    padding-right: 10px;
    font-weight: 150;
    font-style: italic;

  }
  img {
    width: 120px;
    height: 120px;
    padding: 0;
    object-fit: cover;
  }
  #history {
    padding: 7.5px;
    border-radius: 4px;
    border: none;
    margin-top: 15px;
    box-shadow: 1px 10px 15px rgba(0,0,0,0.1);
    text-transform: uppercase;
    background-color: rgb(223, 14, 14) ;
    font-size: 21px;
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    font-weight: 400;
  }
</style>
