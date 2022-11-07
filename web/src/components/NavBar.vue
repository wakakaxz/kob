<template>
    
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <router-link class="navbar-brand" :to="{name: 'home'}">King of Bots</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{name: 'pk_index'}">对战</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{name: 'record_index'}">对战列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{name: 'ranklist_index'}">排行榜</router-link>
        </li>
      </ul>
      
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            负负得正
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <router-link class="dropdown-item" :to="{name: 'user_bot_index'}">我的Bot</router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">退出</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>

</script>


<!-- scoped 会在当前文件样式上加上随机字符串, 使其不会影响其他组件的样式 -->
<style scoped>

</style>