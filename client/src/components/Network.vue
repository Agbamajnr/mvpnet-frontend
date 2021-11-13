<template>
  <div class="container">
    <input type="text" v-model="ip" placeholder="Input IP">
    <input type="number" v-model="counts" placeholder="Number of times to ping">
    <button @click= "handleSubmit" id="submit">AUTO PING</button>
    <p>{{ ip }}</p>
  </div>
  <hr>
  <div class="show-value">
    <p v-if="data.length" style="font-size: 20px"><img src="../assets/download.jpg" id="counts">{{ count }}</p>
    <div class="result">
      <p id="data" :class= "{ red: data_state ==  false, green: data_state == true }">{{data}}</p>
      <button id="full" :class= "{ red: data_state ==  false, green: data_state == true }" @click="handleBare" >Full Details</button>
    </div>
    <!--<button name="button" id="reload" @click="reload" :class= "{ red: data_state ==  false, green: data_state == true }">Stop</button>-->
    <p id="err" v-if="!ip">{{err_mes}} {{error}}</p>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue';

//import runIp from '../composables/runIp'
export default {
  name: 'Network',
  setup (props, context) {
    const ip = ref('')
    const counts = ref()
    const data = ref('')
    const error = ref('')
    const bare_data = ref('')
    const err_mes = ref('')
    const data_state = ref()

    const count = ref(0)


    //make request
    const reg = /down/;

    const url = 'http://localhost:3000/api/network';
    const url2 = 'http://localhost:3000/api/network/bare';

    //health analysid
        const handleReq = async (ip) => {
          try {
            const res = await axios.post(url, {
              ip
            })
             data.value =  res.data;
             function validate (field, regex) {
                data_state.value = !regex.test(field)
             }
             validate(data.value, reg);
          } catch (err) {
            error.value = err
          }
        }

        const bareReq = async (ip) => {
          try {
            const res = await axios.post(url2, {
              ip
            })
             bare_data.value =  res.data;
          } catch (err) {
            console.error(err);
          }
        }





        //events
        //submit data
    const handleSubmit = () => {
      if (!ip.value) {
        err_mes.value = ref('You have not inputed an IP')
      } else {
        const interval = setInterval(function () {
          handleReq(ip);
          bareReq(ip);
          count.value++;
        }, 4000);

        console.log(counts, count);

        setTimeout(function () {
          clearInterval(interval)
          alert('Done, Check logs for full details')
        }, counts.value * 4000);
    }

    count.value = 0;
  }




  const handleBare = () => {
    setTimeout(function () {
      alert(bare_data.value)
    }, 1000);
  }
    return {ip, data, error, handleSubmit, err_mes, data_state, bare_data, count, counts, handleBare }
  }
}
</script>


<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    box-shadow: 1px 10px 15px rgba(0,0,0,0.1);
  }
  .container input {
    width: 100%;
    height: 40px;
    border: 0.2px solid #666;
    border-radius: 3px 2px 3px 3px;
    padding-left: 10px;
  }
  .container input::placeholder {
    font-size: 17px;
  }
  .container input:focus {
    transition: all .9s linear;
    border: none !important;
    border-radius: 6px;
  }
  .container button {
    width: 100%;
    height: 30px;
    box-shadow: 1px 10px 15px rgba(0,0,0,0.1);
    margin-top: 20px;
    background: rgb(223, 14, 14);
    border-radius: 4px;
    font-size: 20px;
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 800;
    color: white;
    border: none;
  }
  .container button:focus {
    background-color: #666;
  }
  #err {
    color: red;
    font-weight: 500;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .result {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .show-value {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #full {
    padding: 7.5px;
    border-radius: 4px;
    border: none;
    display: none;
    margin-top: 15px;
    box-shadow: 1px 10px 15px rgba(0,0,0,0.1);
    text-transform: uppercase;
    font-size: 21px;
    text-decoration: none;
    cursor: pointer;
    color: #fff;
    font-weight: 400;
  }

  #data {
    font-weight: 400;
    text-align: center;
    padding: 20px;
    box-shadow: 1px 10px 15px rgba(0,0,0,0.1);
  }
  #data.red {
    color: crimson;
  }
  #data.green {
    color: green;
  }
  #full.red {
    display: block;
    background-color: rgb(223, 14, 14);
  }
  #full.green {
    display: block;
    background-color: green
  }
  #counts {
    width: 40px;
    margin-top: 40px;
    margin-right: 10px;
    height: 25px;
  }

</style>
