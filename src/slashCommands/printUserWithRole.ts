import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
    name: "liste_des_utilisateurs",
    data: new SlashCommandBuilder()
        .setName("liste_des_utilisateurs")
        .setDescription("Liste des utilisateurs avec le role en paramêtre.")
        .addStringOption((option) => {
            return option
                .setName("role")
                .setDescription("Role des utilisateurs")
                .setRequired(true);
        }),
    execute: async (interaction) => {
        const guild = interaction.guild;
        const roleOption = interaction.options.get("role", true);

        if (!guild) {
            await interaction.reply({
                content: "Cette commande doit être utilisée dans un serveur.",
                ephemeral: true,
            });
            return;
        }

        await guild.members.fetch();
        await guild.roles.fetch();

        const role = guild.roles.cache.find((r) => r.name === roleOption.value);

        if (!role) {
            await interaction.reply({
                content: "Role invalide!",
                ephemeral: true,
            });
            return;
        }

        const membersWithRole = guild.members.cache.filter((member) =>
            member.roles.cache.has(role.id)
        );

        let message = `Membres avec le rôle **${role.name}** :\n`;
        if (membersWithRole.size === 0) {
            message += "Aucun membre trouvé avec ce rôle.";
        } else {
            let index: number = 1;
            membersWithRole.forEach((member) => {
                message += `> ${index++} — <@${member.user.id}>\n`;
            });
        }

        await interaction.reply({ content: message });
    },
};
