<template>
    <div class="mainf">
       <div class="up11">
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
          <div v-if="movies && movies.year" id="div" class="mainmovies" :style="{backgroundImage:`url(${bacground})`}" >
          <div class="leftimg">
         <img class="imgmain" :src="movies.poster.url">
         <p class="imgmainp">Рейтинг по ИМБД: {{ movies.rating.imdb}}</p>
         <p class="imgmainp">Рейтинг по КП: {{ movies.rating.kp }}</p>
          </div>

         <div class="mainmovies1">
          <h1 class="h1b">{{ movies.name }}</h1>
          <div class="p1">
          <p>{{ movies.type }}</p>|
          <p>
            <span v-for="(genre, index) in movies.genres" :key="index">
              {{ genre.name }}<span v-if="index <movies.genres.length - 1">, </span>
            </span>
          </p>
          </div>
          <div class="aformovie" @mouseover="isHovered = true" @mouseleave="isHovered = falce" style="width: fit-content;">
            <h4>Посмотреть фильм</h4>

            <div class="expandable" v-show="isHovered">
              <div v-if="!movies?.watchability?.items || movies.watchability.items.length === 0">
                  <span>Ссылки для просмотра недоступны</span>
              </div>
              <div v-else>
                <div  v-for="(item, index) in movies.watchability.items" :key="index">
                    <a  class="router" v-if="item?.url" :href=item.url><h4 v-if="item?.name">{{ item.name  }}</h4></a>
                </div>
              </div>         
            </div>
          </div>       
          <h3 v-if="movies?.shortDescription">Описание: {{ movies.shortDescription }}</h3>
          <h3 v-else>Описания нету</h3>
         </div>

        </div>

        
          <h1 style="color: white; padding-top: 50px;">Схожие фильмы</h1>
        <div class="mainsimilar">
          <router-link class="similar" to = "/films"  v-for="similar in similarMovies" @click="gr(similar.id)">
             <div class="similar">
        <img class="img" :src="similar.poster.previewUrl || '/src/stores/views/NOPHOTO.svg.png'" alt="">
        <p>{{similar.name}}</p>
          <p class="rairing">рейтинг по imbd : {{ similar.rating.imdb }}</p>
          <p class="rairing">рейтинг по kp : {{ similar.rating.kp }}</p>
      </div>
          </router-link>
        </div>
      
    </div>
</template>
<script>
    import { useMainStore } from '@/stores/counter'
    export default{
        data() {
    return {
    mainStore: useMainStore(),
    a:"",
    movies: null,
    similarMovies:[],
    bacground:"",
    isHovered: false,
    }
  },
   methods:{
        async fetchMovies() {
        this.a=localStorage.getItem("movieid")
        console.log(localStorage.getItem("movieid"))
      const response = await fetch(`https://api.poiskkino.dev/v1.4/movie/${this.a}`, {
        headers: {
          'X-API-KEY': 'CRFK3SF-6AD4Q6X-KKWG9QJ-DQ29VJ6',
          'accept': 'application/json'
        }
      })
      
      const data = await response.json()
      this.movies = data
      console.log(this.movies)
      this.similarMovies=this.movies.similarMovies
      console.log(this.similarMovies)
      console.log(this.movies.backdrop.previewUrl)
      this.bacground =this.movies.backdrop.previewUrl
    },
         gr(e){
      this.mainStore.peremenaya=e
      localStorage.setItem("movieid",this.mainStore.peremenaya)
      window.location.reload()
    }
   },
   mounted(){
    console.log(this.mainStore)
    console.log(this.mainStore.peremenaya)
    this.fetchMovies()
    
       }
    }
</script>
<style>
  .mainsimilar{
    display: flex;
    flex-direction: row;
    width: 1400px;
    flex-wrap: wrap;
    gap: 35px;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 100px;
  }
  .expandable{
    position: absolute;
    background-color: rgb(0, 0, 0);
    border: 1px solid ;
    border-color: rgba(0, 149, 255, 0.637);
    box-shadow: 
    0 10px 25px rgba(0, 100, 255, 0.25),
    0 4px 12px rgba(0, 150, 255, 0.15),
    0 0 0 1px rgba(0, 180, 255, 0.4),
    0 2px 4px rgba(255, 255,255,0.1);

    padding: 10px;
    z-index: 100;
    animation: slideDown 0.6s ease-out forwards;
    transform-origin: top center;
  }
  @keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px) scaleY(0.9);
  };
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
}
}
  .aformovie{
    padding-bottom: 40px;
    
  }
  .similar{
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 500px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(17, 17, 17, 0.685);
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition:  box-shadow 0.5s ease ;

  }
  .similar:hover{
  border-color: rgba(0, 149, 255, 0.637);
  box-shadow: 
    0 10px 25px rgba(0, 100, 255, 0.25),
    0 4px 12px rgba(0, 150, 255, 0.15),
    0 0 0 1px rgba(0, 180, 255, 0.4),
    0 2px 4px rgba(255, 255,255,0.1);


  }
  .imgmainp{
    padding-top: 10px;
    margin: 0;
  }
  .leftimg{
    display: flex;
    flex-direction: column;
  }
  .p1{
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
  }
  .h1b{
    font-size: 5em;
    margin: 0;
    padding-bottom: 50px;
  }
  .mainmovies1{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 500px;
  }
  .mainf{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(0, 0, 0);
  }
.imgmain{
  width: 315px;
  height: 425px;

}
.mainmovies {
  color: white;
  width: 1400px;
  height: 755px;
  background-size: cover;
  position: relative;
    display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  padding-left: 30px;
}

.mainmovies::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(19, 18, 18, 0.808);
  z-index: 1; 
}

.mainmovies > * {
  position: relative;
  z-index: 2;
}
.router{
  text-decoration: none;
  color: white;
  color: #ffffff;
  text-shadow: 
    0 2px 4px rgba(0, 100, 255, 0.25),
    0 0 8px rgba(0, 150, 255, 0.15),
    0 0 2px rgba(0, 180, 255, 0.4);

}
.router:hover{
  color: rgb(85, 184, 255) ;
  text-shadow: 
    0 4px 12px rgba(0, 100, 255, 0.35),
    0 0 16px rgba(0, 150, 255, 0.25),
    0 0 4px rgba(0, 180,255,0.6);

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
.up11{
  width: 1445px;
  height: 100px;
  display: flex;
  flex-direction: row;
  position: sticky; top: 0;
  z-index: 3;
  background-color: black;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>