<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
// import $ from "jquery";

export default {
  components:{
    NavBar
  },

  setup() {
    // $.ajax({
    //   url: "http://127.0.0.1:8888/user/account/token/",
    //   type: "post",
    //   headers: {
    //     'Content-Type':'application/json'
    //   },
    //   data: JSON.stringify({
    //     username: "mike",
    //     password: "123456"
    //   }),
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // });

    // $.ajax({
    //   url: "http://127.0.0.1:8888/user/account/info/",
    //   type: "get",
    //   headers: {
    //     Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNTZmNTRmNzdjZTQ0NjgwODA3OGIyZjFhNDM2NDE3NiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2ODE1OTA4OCwiZXhwIjoxNjY5MzY4Njg4fQ.fKsRmuVHB_o0BJ2BEwjMSzSU-ix52YGQcJJnLlIIRtw",
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // });
  }
}
</script>

<style>
/* body {
  background-image: url("@/assets/background.png");
  background-size: 100%; 
} */
</style>
