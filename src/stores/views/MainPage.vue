<template>
  <main>
    <div class="main">

      <div class="alluppage">
          <div class="upmain">
            <div class="up1">
              <img class="imgup" src="../views/Vector.png" alt="">
              <img class="imgup" src="../views/Filmagnet.png" alt="">
            </div>
            <div class="up2">
            <router-link class="router" to = "/">Home</router-link>|
            <router-link class="router" to = "/search">Search</router-link>|
            <h4>WEB SERIES</h4>
            </div>
          </div>
          <div class="midle">
            <img src="../views/LANDNGTEXT.png" alt="">
          </div>
      </div>
      
      <div class="postermain">
        <div class="postersup">
          <h1>Movies</h1> 
        </div>

        <div class="inposter">
          <router-link class="poster" to = "/films"  v-for="poster in movies" @click="gr(poster.id)">
             <div class="poster">
        <img class="img" :src="poster.poster.previewUrl || '/src/stores/views/NOPHOTO.svg.png'" alt="">
        <p>{{poster.name}}</p>
          <p class="rairing">рейтинг по imbd : {{ poster.rating.imdb }}</p>
          <p class="rairing">рейтинг по kp : {{ poster.rating.kp }}</p>
      </div>
          </router-link>
          
        </div>
      <div class="postersdown">
        <img src="../views/Group2.png" alt="">
      </div>
      <div class="postersdown1">
        <img src="../views/Rectangle52.png" alt="">
        <img src="../views/Rectangle53.png" alt="">
        <img src="../views/Rectangle54.png" alt="">
        <img src="../views/Rectangle55.png" alt="">
      </div>
      <div class="posterdown2">
        <img src="../views/movieslide.png" alt="">
      </div>
      <div class="posterdown3">
        <p>Filmagnet is an online movie streaming platform that offers pirated content that is not released. It has a huge collection of latest movies and films that still not available on the market and YouTube. You can watch and download all contents free of costs, but they are illegal, so you have to take some precautions. It is not available in all countries so you can use VPN and choose a location with access to Filmagnet. Here, we will discuss the Filmagnet.</p>
      </div>
      </div>



    </div>
  </main>
</template>

<script>
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores/counter'


export default {
  data() {
    return {
      movies: [],
      mainStore: useMainStore(),
    }
  },
  methods: {
    async fetchMovies() {
      const response = await fetch('https://api.poiskkino.dev/v1.4/movie/search?page=1&limit=8&query=', {
        headers: {
          'X-API-KEY': 'CRFK3SF-6AD4Q6X-KKWG9QJ-DQ29VJ6',
          'accept': 'application/json'
        }
      })
      
      const data = await response.json()
      this.movies = data.docs
      console.log(this.movies)
    },
    gr(e){
      this.mainStore.peremenaya=e

      localStorage.setItem("movieid",this.mainStore.peremenaya)
    }
  },
  mounted() {
    this.fetchMovies()
  }
}
</script>
<style scoped>
.router{
  text-decoration: none;
  color: white;
}
.posterdown3{
  height: 200px;
  width: 1130px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.posterdown2{
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
height: 330px;
}
.postersdown1{
  width: 1325px;
  gap: 35px;
  height: 220px;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
}
.postersdown{
  height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.postersup{
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.inposter{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 35px;
  width: 1400px;
  align-items: center;
  justify-content: center;
}
.midle{
  margin-left: 50px;
}
.main{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}
.up2{
  width: 1000px;
  height: 100px;
  display: flex;
  flex-direction: row;
  color: white;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
.up1{
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.imgup{
  height: 30px;
  margin-right: 10px;
}
.alluppage{
  display: flex;
  flex-direction: column;
  background-image: url(../views/LANDINGbg.png);
  width: 1445px;
  height: 755px;
}
.upmain{
  width: 1445px;
  height: 100px;
  display: flex;
  flex-direction: row;
  padding-bottom: 230px;
}
.rairing{
  margin: 0px;  
}
.postermain{
  display: flex;
  flex-direction: column;
  background-color: black;
  background-image: url(../views/Rectangle31.png);
  width: 1445px;
  color: white;
  align-items: center;
  
}
.poster{
display: flex;
flex-direction: column;
text-decoration: none;
color: white;
  border-radius: 10px;
  border: 1px solid rgba(27, 27, 27, 0.582);
  box-shadow: 5px 5px 5px rgb(17, 17, 17);
  transition:  box-shadow 0.5s ease ;
    background-color:  rgb(22, 21, 21);
    z-index: 1;
}
.poster:hover{
    border-color: rgba(0, 149, 255, 0.637);
  box-shadow: 
    0 10px 25px rgba(0, 100, 255, 0.25),
    0 4px 12px rgba(0, 150, 255, 0.15),
    0 0 0 1px rgba(0, 180, 255, 0.4),
    0 2px 4px rgba(255, 255,255,0.1);
}
.img{
  width: 300px;
height: 400px;
}
</style>