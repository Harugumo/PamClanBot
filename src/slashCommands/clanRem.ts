import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import {
    getMemberById,
    getRoleById,
    getRoleByName,
    isAutorize,
    memberHasRoles,
    sendErrorAndThrow,
} from "../tools/tools";
import { getWotPamClan } from "../tools/getWotPamClan";

export const command: SlashCommand = {
    name: "clan-rem",
    data: new SlashCommandBuilder()
        .setName("clan-rem")
        .setDescription("Retire un membre au clan PAM de l'officier.")
        .addStringOption((option) => {
            return option
                .setName("user_id")
                .setDescription("Id du membre à retirer")
                .setRequired(true);
        }),

    execute: async (interaction) => {
        try {
            const joinedMemberIdOption = interaction.options.get(
                "user_id",
                true
            );
            const roleOfficier = await getRoleById(
                interaction,
                process.env.OFFICIER_ROLE_ID
            );
            const author = await getMemberById(
                interaction,
                interaction.user.id
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

            const joinMember = await getMemberById(
                interaction,
                String(joinedMemberIdOption.value)
            );

            if (!memberHasRoles(joinMember, roleClan)) {
                sendErrorAndThrow(
                    interaction,
                    `Le membre <@${joinMember.user.id}> n'a pas le rôle ${roleClan.name}`
                );
            }

            await joinMember.roles.remove(roleClan);

            await interaction.reply({
                content: `Le membre <@${joinMember.user.id}> a été retiré de ${roleClan.name}`,
            });
        } catch (error) {
            console.error(error);
        }
    },
};
