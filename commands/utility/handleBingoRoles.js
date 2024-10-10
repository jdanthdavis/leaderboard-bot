const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join-team')
    .setDescription('Adds you to a bingo team.')
    .addStringOption((option) =>
      option
        .setName('team-name')
        .setDescription('The name of the bingo team you want to join.')
        .setAutocomplete(true)
        .setRequired(true)
    ),

  async autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    let choices;

    if (focusedOption.name === 'team-name') {
      choices = [
        'C.H.U.M.P',
        'Grand Rising',
        'SusBusiness',
        'Burthorpe Baddies',
      ];
    }

    const filtered = choices?.filter((choice) =>
      choice.startsWith(focusedOption.value)
    );

    const unFiltered = filtered.length > 25 ? filtered.splice(0, 25) : filtered;

    await interaction.respond(
      unFiltered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction) {
    const options = interaction.options._hoistedOptions;
    const nickname = interaction.member.nickname;
    const roleToAdd = options[0].value;
    const tempArr = [];
    const teamChoices = [
      'C.H.U.M.P',
      'Grand Rising',
      'SusBusiness',
      'Burthorpe Baddies',
    ];
    const teamMap = new Map([
      ['C.H.U.M.P', 'LSx Swap'],
      ['Grand Rising', 'Previn'],
      ['SusBusiness', 'ScottVc'],
      ['Burthorpe Baddies', 'Dongu'],
    ]);
    const teamIcons = new Map([
      [
        'C.H.U.M.P',
        'https://raw.githubusercontent.com/jdanthdavis/leaderboard-bot/refs/heads/main/chump.png',
      ],
      [
        'Grand Rising',
        'https://raw.githubusercontent.com/jdanthdavis/leaderboard-bot/refs/heads/main/gr.PNG',
      ],
      [
        'SusBusiness',
        'https://raw.githubusercontent.com/jdanthdavis/leaderboard-bot/refs/heads/main/susb.PNG',
      ],
      [
        'Burthorpe Baddies',
        'https://raw.githubusercontent.com/jdanthdavis/leaderboard-bot/refs/heads/main/bb.PNG',
      ],
    ]);
    const guild = interaction.guild;
    const role = guild.roles.cache.find((role) => role.name === roleToAdd);
    const member = interaction.member;
    const teamCaptain = teamMap.get(roleToAdd);
    const teamIconUrl = teamIcons.get(roleToAdd);
    interaction.member.roles.cache.map((role) => {
      tempArr.push(role.name);
    });

    if (tempArr.some((x) => x === roleToAdd)) {
      await interaction.reply(`You're already assigned to **${roleToAdd}**.`);
    } else if (
      !tempArr.includes(roleToAdd) &&
      !teamChoices.some((x) => tempArr.includes(x))
    ) {
      await member.roles.add(role);

      const embed = new EmbedBuilder()
        .setTitle(`Welcome to team **${roleToAdd}!**`)
        .addFields({
          name: `**${nickname}** has been added to team **${roleToAdd}!**`,
          value: `Your team captain is **${teamCaptain}!**`,
          inline: true,
        })
        .setThumbnail(teamIconUrl)
        .setColor('#00b0f4')
        .setFooter({
          text: 'Powered by Watermelons',
          iconURL:
            'https://raw.githubusercontent.com/jdanthdavis/custom-dink-webhook/main/assets/watermelon.png',
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else {
      await interaction.reply(
        `You cannot join **${roleToAdd}** since you're already assigned to **${teamChoices.filter(
          (x) => tempArr.includes(x)
        )}!**\n-# If you need to have your teams switched please contact @oPE JoeWatermelon or @LSx Swap`
      );
    }

    // if (tempArr.some((x) => x === roleToAdd)) {
    //   await interaction.reply(`You're already assigned to **${roleToAdd}**.`);
    // } else if (
    //   !tempArr.includes(roleToAdd) &&
    //   !teamChoices.some((x) => tempArr.includes(x))
    // ) {
    //   await member.roles.add(role);
    //   await interaction.reply(`You've been added to team **${roleToAdd}!**`);
    // } else {
    //   await interaction.reply(
    //     `You cannot join **${roleToAdd}** since you're already assigned to **${teamChoices.filter(
    //       (x) => tempArr.includes(x)
    //     )}!**\n-# If you need to have your teams switched please contact @oPE JoeWatermelon or @LSx Swap`
    //   );
    // }
  },
};
