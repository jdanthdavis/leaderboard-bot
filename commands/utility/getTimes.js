const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('get-times')
    .setDescription('Submits a PB for review.'),
  async execute(interaction) {
    const nickname = interaction.member.nickname;
    console.log(interaction);

    const embed = new EmbedBuilder()
      .setTitle('**Whisperer Personal Bests**')
      .setURL('https://oldschool.runescape.wiki/w/The_Whisperer')
      .addFields(
        {
          name: ':first_place: **LSx Swap**',
          value: 'Personal best of 1s',
          inline: true,
        },
        {
          name: ':second_place: **Gout Haver**',
          value: 'Personal best of 2s',
          inline: true,
        },
        {
          name: ':second_place: **bg s**',
          value: 'Personal best of 3s',
          inline: true,
        }
      )
      .setThumbnail(
        'https://oldschool.runescape.wiki/images/thumb/The_Whisperer.png/120px-The_Whisperer.png?aedab'
      )
      .setColor('#00b0f4')
      .setFooter({
        text: 'Powered by Watermelons',
        iconURL:
          'https://raw.githubusercontent.com/jdanthdavis/custom-dink-webhook/main/assets/watermelon.png',
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

    // await interaction.reply(`${nickname}, has submitted a PB. Please review!`);
  },
};
