const { Events } = require('discord.js');
const { autoRoleName } = require('../config.json');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
        try {
            // Replace 'RoleName' with the actual name of the role you want to assign
            const role = member.guild.roles.cache.find(r => r.name === autoRoleName);
    
            if (!role) {
                console.log('Role not found');
                return;
            }
    
            // Add the role to the new member
            await member.roles.add(role);
    
            console.log(`Successfully added the ${role.name} role to ${member.user.username}`);
        } catch (error) {
            console.error('Error assigning role:', error);
        }
	},
};