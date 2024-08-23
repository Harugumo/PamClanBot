import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { EmbedBuilder } from "@discordjs/builders";

export const command: SlashCommand = {
    name: "ping",
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    execute: async (interaction) => {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: "Pong!" })
                    .setDescription(`Latency: ${interaction.client.ws.ping}ms`)
                    .setColor([0, 255, 0]),
            ],
        });
    },
};
