const axios = require("axios");
const movieEmbedBuilder = require("../movie-embed-builder.js");

const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");

// Bot icon
const file = new AttachmentBuilder("static/icon.jpg");

// TODO: !help command => Return the current capabilities of Pugler
module.exports = {
    // suggest a movies with title, description and image
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggests a movie for your watch party"),
  async execute(interaction){
    let movie = "";
    let movieId = "";
    let title = "";
    let img = "";
    let videoDescription = "";
    let trailerLink = "";
    // TODO: Use Embeds to send messages
    axios
      .get(
        "https://imdb-api.com/en/API/MostPopularMovies/" +
          process.env.IMDB_TOKEN
      )
      .then((res) => {
        const movieList = res.data.items;
        const r = Math.floor(Math.random() * movieList.length);
        movie = movieList[r];
        movieId = movie.id;
        console.log(movieId)
        title = movie.title;
        img = movie.image;
        return axios.get(
          "https://imdb-api.com/en/API/Trailer/" +
            process.env.IMDB_TOKEN +
            "/" +
            movieId
        );  
      })
      .then( async (res) => {
        // console.log(`videoDescription == ${res.data.videoDescription}`);
        if(res.data.videoDescription.length < 1){
          videoDescription = "No movie summary provided";
        }
        videoDescription = res.data.videoDescription;
        trailerLink = res.data.link;
        // create Message Embed using data 
        const movieObject = { movieId, title, img, videoDescription, trailerLink };
        await interaction.deferReply();
        const embedMessage = movieEmbedBuilder(movieObject);
        await interaction.editReply({ embeds: [embedMessage], files: [file] });
      })
      .catch((err) => console.log(err));   
  }
};
