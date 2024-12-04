const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nuke')
		.setDescription('nuke channel this command was typed in :)'),
    async execute(interaction) {
        try {
            // Get the channel that the command was used in
            const channel = interaction.channel;
    
            // Check if the bot has the necessary permissions
            if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) {
                return interaction.reply("I don't have permission to nuke channels.");
            }

            // Check if the user has permission to ban members
            if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
                return interaction.reply("You don't have permission to nuke channels.");
            }

            // Clone the channel
            const clonedChannel = await channel.clone({
            name: `${channel.name}`, // Set the new name (optional)
            reason: 'Channel clone requested', // Reason for cloning
            });
    
            // Delete the original channel
            await channel.delete('Deleting the original channel after cloning');
                const nukeEmbed = new EmbedBuilder()
                .setColor(0x7FFF00)
                .setTitle('Channel Nuked')
                .setImage('https://media1.tenor.com/m/FwNuvPzK6IIAAAAd/nuke-it-olliesblog-olliesblog-nuke-it.gif')
                .setTimestamp()


            // Send a confirmation message in the new channel
            await clonedChannel.send({ embeds: [nukeEmbed] });
    
            // Optionally, return a message to the user
            //await interaction.reply({ content: 'Channel cloned successfully!', ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error cloning the channel.', ephemeral: true });
        }
    },
}