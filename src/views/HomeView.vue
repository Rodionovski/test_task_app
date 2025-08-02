<template>
  <div class="home">
    <h1>Вітаю!</h1>
    <p>Для початку завантажте CSV-файл для аналізу.</p>
    <router-link to="/file-uploader">
      <button>Перейти до завантаження файлу</button>
    </router-link>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  font-family: Arial, sans-serif;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42a5f5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #1e88e5;
}
</style>
