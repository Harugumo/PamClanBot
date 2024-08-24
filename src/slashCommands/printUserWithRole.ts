import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { getMembersWithRole, getRoleByName } from "../tools/tools";

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
        const roleOption = interaction.options.get("role", true);

        const role = await getRoleByName(interaction, String(roleOption.value));
        const membersWithRole = await getMembersWithRole(interaction, role);

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
