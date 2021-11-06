<template>
  <!--<pre>{{data}}</pre> -->
    <div class="modal">
      <pre style="color: #fff;">{{ data }}</pre>
    </div>
</template>

<script>
  export default {
    props: ['data'],
  }
</script>

<style scoped>
.modal {
      width: 400px;
      min-width: fit-content;
      padding: 20px;
      height: 150px;
      background-color:#666;
      border-radius: 10px;
      position: relative;
  }

</style>
