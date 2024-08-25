import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import {
    getMemberById,
    getMembersWithRole,
    getRoleByName,
    isAutorize,
    sendErrorAndThrow,
} from "../tools/tools";
import { getWotPamClan } from "../tools/getWotPamClan";

export const command: SlashCommand = {
    name: "clan-list",
    data: new SlashCommandBuilder()
        .setName("clan-list")
        .setDescription("Liste des membres du clan de l'officier"),
    execute: async (interaction) => {
        try {
            const author = await getMemberById(
                interaction,
                interaction.user.id
            );
            const roleOfficier = await getRoleByName(
                interaction,
                process.env.OFFICIER_ROLE
            );

            isAutorize(interaction, author, roleOfficier);

            const roleClan = getWotPamClan(author);
            if (roleClan === null) {
                sendErrorAndThrow(
                    interaction,
                    "Vous n’êtes pas dans un clan PAM !"
                );
                return;
            }

            const membersWithRole = await getMembersWithRole(
                interaction,
                roleClan
            );

            let message = `Membres avec le rôle **${roleClan.name}** :\n`;
            if (membersWithRole.size === 0) {
                message += "Aucun membre trouvé avec ce rôle.";
            } else {
                let index: number = 1;
                membersWithRole.forEach((member) => {
                    message += `> ${index++} — <@${member.user.id}>\n`;
                });
            }

            await interaction.reply({ content: message });
        } catch (error) {
            console.error(error);
        }
    },
};
