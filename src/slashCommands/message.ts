import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
    name: "message",
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Send a message.")
        .addStringOption((option) => {
            return option
                .setName("message")
                .setDescription("The message to send.")
                .setRequired(true);
        }),
    execute: async (interaction) => {
        const message = interaction.options.get("message")?.value?.toString();

        await interaction.reply({ content: `Contenu du message : ${message}` });
    },
};
