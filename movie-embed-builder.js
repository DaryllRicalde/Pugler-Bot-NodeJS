// Create a Message Embed for a movie related command

const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

const file = new AttachmentBuilder("static/icon.jpg");

/**
 * @param movieObject -- the object made from the movie's data
 *          movieObject.movieId
 *          movieObject.title
 *          movieObject.img
 *          movieObject.videoDescription
 *          movieObject.trailerLink
 */

module.exports =  (movieObject) => {
    const embed = new EmbedBuilder()
        .setColor('#FA8072')
        .setTitle(movieObject.title)
        .setDescription(movieObject.videoDescription)
        .setThumbnail('attachment://icon.jpg')
        .addFields(
            { name: 'Movie trailer', value: movieObject.trailerLink }
        )
        // .setImage(interaction.client.application.iconURL())
        .setImage(movieObject.img)
        .setTimestamp()
    
    return embed;
};