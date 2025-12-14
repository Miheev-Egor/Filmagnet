<template>
    <div class="main">
      
        <div class="main1">
           <div class="up">
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
            <div class="searchhead">
              <div class="searchhead0">
               
                <select class="select" name="" id="" v-model="selectsort">
                  <option   value="up">По возрастанию рейтинга</option>
                  <option value="down">По убыванию рейтинга</option>
                </select>
              </div>
                     
                <input @keydown.enter="fetchMovies"  class="searchhead1" v-model="text"  placeholder="Search..."  />
                <button class="searchhead2" type="submit" v-on:click="fetchMovies">Go</button>    
            </div>
           
            


        <div class="inposter">
           <router-link class="poster" to = "/films"  v-for="poster in sort1" @click="gr(poster.id)">
             <div class="poster">
        <img class="img" :src="poster.poster.previewUrl || '/src/stores/views/NOPHOTO.svg.png'" alt="">
        <p>{{poster.name}}</p>
          <p class="rairing">рейтинг по imbd : {{ poster.rating.imdb }}</p>
          <p class="rairing">рейтинг по kp : {{ poster.rating.kp }}</p>
      </div>
          </router-link>
        </div>


      </div>
    </div>
</template>
<script>
import { useMainStore } from '@/stores/counter'
export default {
  data() {
    return {
    selectsort:"",
     text:"",
     movies: [],
     movies1: [],
     moviescopy:[],
     mainStore: useMainStore(),

    }
  },
  methods: {
    async fetchMovies() {
      const response = await fetch(`https://api.poiskkino.dev/v1.4/movie/search?page=1&limit=30&query=${this.text}`, {
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
    },
    
  },
   
  mounted() {
       
  },
  computed:{
    sort1() {
    this.moviescopy = [...this.movies]
    this.movies1 = []
    if (!this.selectsort){
      return this.movies
    }
    if (this.selectsort == "up") {
        while (this.moviescopy.length > 0) {

            let minIndex = 0
            
            for (let i = 1; i < this.moviescopy.length; i++) {
                if (this.moviescopy[i].rating.imdb < this.moviescopy[minIndex].rating.imdb) {
                    minIndex = i
                }
            }
            this.movies1.push(this.moviescopy[minIndex])
            this.moviescopy.splice(minIndex, 1)
        }
    }
    
    console.log("Результат:", this.movies1)

    if (this.selectsort == "down"){
        while (this.moviescopy.length > 0) {

            let minIndex = 0
            
            for (let i = 1; i < this.moviescopy.length; i++) {
                if (this.moviescopy[i].rating.imdb > this.moviescopy[minIndex].rating.imdb) {
                    minIndex = i
                }
            }
            this.movies1.push(this.moviescopy[minIndex])
            this.moviescopy.splice(minIndex, 1)
        }
     }

     return this.movies1
}
  }
}
</script>
<style>
  .select{
    background-color:rgb(19, 18, 18);
    color: white;
    border-color: black;
  }
.searchhead0{
display: flex;
flex-direction: row;
gap: 10px;
height: 40px;
}
.router{
  text-decoration: none;
  color: white;
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
.up{
  width: 1445px;
  height: 100px;
  display: flex;
  flex-direction: row;
  position: sticky; top: 0;
  background-color: black;
}
.main1{
  background-color: black;
  height: 5000px;
}
.searchhead1{
  width: 300px;
  height: 35px;
   flex: 0.5;
  padding: 14px 20px;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  font-size: 16px;
}
.searchhead1::placeholder{
   color: rgba(255, 255, 255, 0.5);
}
.searchhead2{
  width: 50px;
  height: 40px;
   padding: 14px 30px;
  border: none;
  background: linear-gradient(135deg, #00a8ff 10%, #0097e6 90%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
}
.searchhead2:hover{
   background: linear-gradient(135deg, #00b4ff 0%, #00a0ff 100%);
  transform: translateX(2px);

}
.p{
display: flex;
flex-wrap: wrap;
}
.main{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: black;
  color: white;
  
}
.searchhead{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: sticky; top: 100px;
    width: 1410px;
    height: 50px;
    background: rgba(30, 30, 30, 0.9);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);

}
.inposter{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 35px;
  width: 1410px;
  align-items: center;
  justify-content: center;
  background-image: url(../views/Rectangle32.png);
}
.poster{
display: flex;
flex-direction: column;
flex-wrap: wrap;
width: 320px;
height: 520px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(17, 17, 17, 0.685);
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition:  box-shadow 0.5s ease ;
}
.poster:hover{
    border-color: rgba(0, 149, 255, 0.637);
  box-shadow: 
    0 10px 25px rgba(0, 100, 255, 0.25),
    0 4px 12px rgba(0, 150, 255, 0.15),
    0 0 0 1px rgba(0, 180, 255, 0.4),
    0 2px 4px rgba(255, 255,255,0.1);
}
.rairing{
  margin: 0px;  
}
.img{
  width: 300px;
height: 400px;
}
</style>