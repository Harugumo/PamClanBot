import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { EmbedBuilder } from "@discordjs/builders";
import { getMemberById, getRoleByName, isAutorize } from "../tools/tools";

export const command: SlashCommand = {
    name: "pingpam",
    data: new SlashCommandBuilder()
        .setName("pingpam")
        .setDescription("PamBot replies with Boum!"),
    execute: async (interaction) => {
        isAutorize(
            interaction,
            await getMemberById(interaction, interaction.user.id),
            await getRoleByName(interaction, process.env.OFFICIER_ROLE)
        );

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: "Boum!" })
                    .setDescription(`Latency: ${interaction.client.ws.ping}ms`)
                    .setColor([0, 255, 0]),
            ],
            ephemeral: true,
        });
    },
};
