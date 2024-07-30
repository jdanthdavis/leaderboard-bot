const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('approve-submission')
    .setDescription('Approves a submission')
    .addStringOption((option) =>
      option
        .setName('submission-id')
        .setDescription('the ID of the submission')
        .setRequired(true)
    ),
  async execute(interaction) {
    const options = interaction.options._hoistedOptions;
    const approvalNum = options[0].value;
    const nickname = interaction.member.nickname;
    await interaction.reply(
      `**${nickname}**, has approved **${approvalNum}**. Pending x/x approvals...`
    );
  },
};
