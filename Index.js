//TODO: Add boss list to DB & add bot command to add new boss
//TODO: Figure out how to approve a submission (command or reaction to submission?)
//TODO: Embed style submission for fun-z
//TODO: Can the bot wipe an entire channel and resend the whole channel with updated info
//TODO: Sort times lol
//TODO: Force timestamp formatting on submission
//TODO: Test multiple people in team
require('dotenv').config();
// const { token } = require('dotenv');
// const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
  Partials,
} = require('discord.js');
const internal = require('node:stream');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const getTeamList = (teamMembers) => {
  //TODO: Format team list
};

const submissionBuilder = (interaction) => {
  const options = interaction.options._hoistedOptions;
  const submissionID = interaction.id;
  const nickname = interaction.member.nickname;
  const boss = options[0].value;
  const teamSize = options[1].value;
  const teamList = options[2].value;
  const time = options[3].value;
  const screenshot = options[4].attachment.attachment;
  const channel = client.channels.cache.get(process.env.SUBMISSION_CHANNEL);

  const embed = new EmbedBuilder()
    .setTitle('**Submission Received!**')
    .setDescription(
      'React with a 👍 to approve this submission\n\nReact with a 👎 to deny this submission.\n'
    )
    .addFields(
      {
        name: 'Submission ID',
        value: submissionID.toString(),
        inline: false,
      },
      {
        name: 'Submitter',
        value: nickname,
        inline: false,
      },
      {
        name: 'Boss',
        value: boss,
        inline: false,
      },
      {
        name: 'Time',
        value: time,
        inline: false,
      },
      {
        name: 'Team Size',
        value: teamSize.toString(),
        inline: false,
      },
      {
        name: 'Team List',
        value: teamList,
        inline: false,
      }
    )
    .setThumbnail(screenshot)
    .setColor('#01f307')
    .setFooter({
      text: 'Powered by Watermelons',
      iconURL: process.env.FOOTER_ICON_URL,
    })
    .setTimestamp();

  channel.send({ embeds: [embed] });
};

client.on('messageCreate', async (message) => {
  const channelId = message.channelId;
  const author = message.author.id;

  if (channelId !== '1294018363072315483') return;

  if (author !== '1267624772343300148') {
    const messageToDelete = message;

    message
      .reply(
        'This channel only allows the /join-team command!\n-# This message will auto delete in 10s.'
      )
      .then((msg) => {
        messageToDelete.delete();
        setTimeout(() => msg.delete(), 10000);
      });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isAutocomplete()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return console.log('AutoComplete command was not found');

    if (!command.autocomplete)
      return console.error(
        `No autocomplete handler was found for the ${interaction.commandName} command.`
      );

    try {
      await command.autocomplete(interaction);
    } catch (error) {
      console.error(error);
    }
  }

  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return console.log('ChatInput command was not found');

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } finally {
      if (interaction.commandName === 'submit') {
        submissionBuilder(interaction);
      }
    }
  }
});

client.login(process.env.TOKEN);
