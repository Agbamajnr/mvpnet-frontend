import axios from 'axios'
import { ref } from 'vue';

const url = 'http://localhost:3000/api/network';

  const runIp = (ip) => {
    const data = ref('')
    const error = ref('')

    const handleReq = async (ip) => {
      try {
        const res = await axios.post(url, {
          ip
        })
         data.value =  res.data;
      } catch (err) {
        error.value = err
      }
    }

    return { data, error, handleReq};
  }


  export default runIp
