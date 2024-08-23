import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { EmbedBuilder } from "@discordjs/builders";

export const command: SlashCommand = {
    name: "pingpam",
    data: new SlashCommandBuilder()
        .setName("pingpam")
        .setDescription("PamBot replies with Boum!"),
    execute: async (interaction) => {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: "Boum!" })
                    .setDescription(`Latency: ${interaction.client.ws.ping}ms`)
                    .setColor([0, 255, 0]),
            ],
        });
    },
};
