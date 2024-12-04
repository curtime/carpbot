const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const {logChannelName} = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('kick user mentioned are you slow?')
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('The member to kick')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for kicking')),
	async execute(interaction) {
        // Get the mentioned user and reason
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        // Check if the bot has the necessary permissions
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.reply("I don't have permission to kick members.");
        }

        // Check if the user has permission to ban members
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.reply("You don't have permission to kick members.");
        }

        // Check if the user is trying to ban themselves
        if (user.id === interaction.user.id) {
            return interaction.reply("You can't kick yourself.");
        }

        // Check if the bot is trying to ban the server owner
        if (user.id === interaction.guild.ownerId) {
            return interaction.reply("You can't kick the server owner.");
        }

        try {
            // Ban the user
            await interaction.guild.members.kick(user, { reason });
            
            // Find the log channel to send the ban info
            const logChannel = interaction.guild.channels.cache.find(ch => ch.name === logChannelName);
            if (!logChannel) {
                return interaction.reply('No "log" channel found.');
            }

            // Create an embed with the ban details
            const banEmbed = new EmbedBuilder()
                .setColor(0xFFFF00) // Red color for ban
                .setTitle('Member Kicked')
                .addFields(
                    { name: 'Kicked User', value: `${user.tag} (${user.id})` },
                    { name: 'Kicked By', value: interaction.user.tag },
                    { name: 'Reason', value: reason }
                )
                .setTimestamp()
                .setFooter({ text: `ID: ${user.id}` });

            // Send the embed to the log channel
            await logChannel.send({ embeds: [banEmbed] });

            // Acknowledge the ban in the interaction channel
            interaction.reply(`Successfully kicked ${user.tag} for: ${reason}`);
        } catch (error) {
            console.error(error);
            interaction.reply('There was an error trying to kick that user.');
        }
	},
};