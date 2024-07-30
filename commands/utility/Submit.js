const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('submit')
    .setDescription('Submits a PB for review.')
    .addStringOption((option) =>
      option
        .setName('boss')
        .setDescription("the boss you're submitting")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('team-size')
        .setDescription('the size of your team (1-8)')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('team-members')
        .setDescription('player1, player2, player3, player4, ect')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('time-achieved')
        .setDescription('the time you achieved')
        .setRequired(true)
    )
    .addAttachmentOption((option) =>
      option
        .setName('screenshot-link')
        .setDescription('a link to the screenshot of the PB')
        .setRequired(true)
    ),

  async autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    let choices;

    if (focusedOption.name === 'boss') {
      choices = [
        'Alchemical Hydra',
        'COX',
        'COX: CM',
        'Duke Sucellus',
        'Duke Sucellus: AWK',
        'Fight Caves',
        'Fortis Colosseum',
        'Gauntlet',
        'Gauntlet: CG',
        'Grotesque Guardians',
        'Hespori',
        'Inferno',
        'Phantom Muspah',
        'PNM',
        'The Leviathan',
        'The Leviathan: AWK',
        'The Mimic',
        'The Nightmare',
        'The Whisperer',
        'The Whisperer: AWK',
        'TOA',
        'TOA: Expert',
        'TOB',
        'TOB: HMT',
        'Vardorvis',
        'Vardorvis: AWK',
        'Vorkath',
        'Zulrah',
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
    await interaction.reply({
      content: 'Submission received!',
      ephemeral: true,
    });
  },
};
