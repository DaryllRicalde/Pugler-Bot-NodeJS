const axios = require("axios");
const movieEmbedBuilder = require("../movie-embed-builder.js");

const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");

// Bot icon
const file = new AttachmentBuilder("static/icon.jpg");

let movie = "";
let movieId = "";
let title = "";
let img = "";
let videoDescription = "";
let trailerLink = "";

module.exports = {
    // suggest a movies with title, description and image
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggests a movie for your watch party"),
  async execute(interaction){
    // Call Most Popular Movies endpoint and get a random movie's id, title, and image
    axios
      .get(`https://imdb-api.com/en/API/MostPopularMovies/${process.env.IMDB_TOKEN}`)
      .then( async (res) => {
        const movieList = res.data.items;
        // movie = movieList.find(element => element.id === 'tt9114286');   // Use to debug failing test cases by providing movie id
        const r = Math.floor(Math.random() * movieList.length);
        movie = movieList[r];
        movieId = movie.id;
        console.log("movieId",movieId)
        title = movie.title;
        img = movie.image;
        await callTrailerAPI(interaction,movieId);
      })
      .catch((error) => console.log (`error when calling most popular movies endpoint`, error));  // END Most Popular API call
  } // END execute()
}; // END module.exports

async function callTrailerAPI(interaction,movieId){
  axios.get(`https://imdb-api.com/en/API/Trailer/${process.env.IMDB_TOKEN}/${movieId}`)
  .then( async (res) => {
    // console.log("result of trailer API call\n",res.data);
    if(res.data.videoDescription === "" || res.data.videoDescription === null){
      console.log('Video description empty');
      videoDescription = "No movie summary provided";
    }
    videoDescription = res.data.videoDescription;
    trailerLink = res.data.link;
    // console.log(`videoDescription: ${videoDescription}, trailerLink: ${trailerLink}`);
    const movieObject = { movieId, title, img, videoDescription, trailerLink };
    const embedMessage = movieEmbedBuilder(movieObject);
    await interaction.reply({ embeds: [embedMessage], files: [file] });
  }) // end axios.get().then()  
  .catch((error) => console.log("error when accessing trailerAPI\n", error));
}
