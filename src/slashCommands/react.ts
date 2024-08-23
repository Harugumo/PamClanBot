import { Message, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
    name: "react",
    data: new SlashCommandBuilder()
        .setName("react")
        .setDescription("Send a message with a reaction."),
    execute: async (interaction) => {
        const message: Message = await interaction.reply({
            content: "Message de réaction",
            fetchReply: true,
        });

        await message.react("👍");
    },
};
