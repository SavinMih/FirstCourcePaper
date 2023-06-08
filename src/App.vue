<template>
  <div id="app" class="bg-dark">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img width="50" margin-right="50" v-bind:src="require('./burunya.png')">
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a class="nav-link px-2 text-light">Чат</a></li>
          </ul>

          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input v-model="name" type="text" class="form-control form-control-dark" placeholder="Ваше имя... (Гость)" aria-label="name">
          </form>
          <div><button  @click="saveName()" type="button" class="btn btn-outline-light me-2">Сохранить</button></div>
        </div>
      </div>
    </header>  
    <Chat ref="chat"/>
  </div>
</template>

<script>
import Chat from '@/components/chat-vue.vue';

export default {
  components: {
    Chat,
  },
  data() {
    return {
      name: localStorage.getItem("userName"),
      current: "all"
    }
  },
  created() {
    this.$refs.chat.name = this.name
  },
  methods: {
    saveName() {
      localStorage.setItem("userName", this.name)
      this.$refs.chat.name = this.name
    }
  }
};
</script>

<style>
#app {
  margin: auto;
  height: 100vh;
}

a:hover {
  color: grey !important;
  user-select: none;
}

</style>