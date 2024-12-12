const { Events, Client } = require('discord.js');

const targetHour = 12; // Target hour (0-23)
const targetMinute = 30; // Target minute (0-59)

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		function scheduleMessage() {
			const now = new Date();
		  
			// Helper function to calculate the time difference to the next target day (Monday or Friday)
			function getNextTargetDay(targetDay) {
			  let daysUntilTarget = targetDay - now.getDay();
			  if (daysUntilTarget < 0) {
				daysUntilTarget += 7; // If the target day is in the next week
			  }
		  
			  const targetDate = new Date(now);
			  targetDate.setDate(now.getDate() + daysUntilTarget);
			  targetDate.setHours(targetHour, targetMinute, 0, 0);
		  
			  return targetDate - now; // Time in milliseconds until the target date and time
			}
		  
			// Schedule the next Monday and Friday
			const mondayDelay = getNextTargetDay(1); // 1 = Monday
			const tuesdayDelay = getNextTargetDay(2); // 2 = Tuesday
			const wednesdayDelay = getNextTargetDay(3); // 3 = Wednesday
			const fridayDelay = getNextTargetDay(5); // 5 = Friday
			const saturdayDelay = getNextTargetDay(6); // 6 = Saturday

			console.log(`Next Monday message delay: ${mondayDelay}ms`);
			console.log(`Next Tuesday message delay: ${tuesdayDelay}ms`);
			console.log(`Next Wednesday message delay: ${wednesdayDelay}ms`);
			console.log(`Next Friday message delay: ${fridayDelay}ms`);
			console.log(`Next Saturday message delay: ${saturdayDelay}ms`);
		  
			// Set timeouts to send the message on Monday and Friday
			setTimeout(() => {
			  sendMondayMessage();
			  // After sending the Monday message, schedule the next Monday message
			  setInterval(() => {
				sendMondayMessage();
			  }, 7 * 24 * 60 * 60 * 1000); // 1 week interval for Mondays
			}, mondayDelay);
		
			// Set timeouts to send the message on Monday and Friday
			setTimeout(() => {
				sendTuesdayMessage();
				// After sending the Monday message, schedule the next Monday message
				setInterval(() => {
					sendTuesdayMessage();
				}, 7 * 24 * 60 * 60 * 1000); // 1 week interval for Mondays
			}, tuesdayDelay);
			
				// Set timeouts to send the message on Monday and Friday
			setTimeout(() => {
				sendWednesdayMessage();
			  // After sending the Monday message, schedule the next Monday message
			  setInterval(() => {
				sendWednesdayMessage();
			  }, 7 * 24 * 60 * 60 * 1000); // 1 week interval for Mondays
			}, wednesdayDelay);
		  
			setTimeout(() => {
			  sendFridayMessage();
			  // After sending the Friday message, schedule the next Friday message
			  setInterval(() => {
				sendFridayMessage();
			  }, 7 * 24 * 60 * 60 * 1000); // 1 week interval for Fridays
			}, fridayDelay);

			setTimeout(() => {
				sendSaturdayMessage();
				// After sending the Friday message, schedule the next Friday message
				setInterval(() => {
				  sendSaturdayMessage();
				}, 7 * 24 * 60 * 60 * 1000); // 1 week interval for Fridays
			  }, saturdayDelay);
		}

		// Function to send a message for Monday
		function sendMondayMessage() {
			const channel = client.channels.cache.get('1123143493762678786'); // Replace with your channel ID
			if (channel) {
			channel.send('https://tenor.com/view/hatsune-miku-gif-25753056');
			} else {
			console.log('Channel not found!');
			}
		}

		// Function to send a message for Tuesday
		function sendTuesdayMessage() {
			const channel = client.channels.cache.get('1123143493762678786'); // Replace with your channel ID
			if (channel) {
			channel.send('https://tenor.com/view/teto-tuesday-kasane-teto-vocaloid-triple-baka-gif-1784188039162722');
			} else {
			console.log('Channel not found!');
			}
		}

		// Function to send a message for Wednesday
		function sendWednesdayMessage() {
			const channel = client.channels.cache.get('1123143493762678786'); // Replace with your channel ID
			if (channel) {
			channel.send('https://tenor.com/view/akita-neru-yellow-one-wednesday-the-yellow-one-from-mesmerizer-whatever-vocaloid-gif-2813789103481908278');
			} else {
			console.log('Channel not found!');
			}
		}

		// Function to send a message for Friday
		function sendFridayMessage() {
			const channel = client.channels.cache.get('1123143493762678786'); // Replace with your channel ID
			if (channel) {
			channel.send('https://tenor.com/view/femboy-femboy-friday-friday-felix-knight-gif-17335633647289684431');
			} else {
			console.log('Channel not found!');
			}
		}

		// Function to send a message for Saturday
		function sendSaturdayMessage() {
			const channel = client.channels.cache.get('1313418772446711828'); // Replace with your channel ID
			if (channel) {
			channel.send('https://tenor.com/view/serj-tankian-serj-saturday-system-of-a-down-soad-gif-5152056670570682786');
			} else {
			console.log('Channel not found!');
			}
		}
		

		console.log(`Ready! Logged in as ${client.user.tag}`);
		scheduleMessage();
	},
};