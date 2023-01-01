const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");

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
        videoDescription = res.data.videoDescription;
        trailerLink = res.data.link;
        await interaction.reply(
          `Master ${interaction.user} may I suggest ` +
            title +
            "\n" +
            img +
            "\n" +
            videoDescription +
            "\n" +
            trailerLink
        );
        console.log(movieId);
      })
      .catch((err) => console.log(err));   
  }
};
