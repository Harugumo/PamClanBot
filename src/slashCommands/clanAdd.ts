import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import {
    getMemberById,
    getRoleById,
    isAutorize,
    memberHasRoles,
    sendErrorAndThrow,
} from "../tools/tools";
import { getWotPamClan } from "../tools/getWotPamClan";

export const command: SlashCommand = {
    name: "clan-add",
    data: new SlashCommandBuilder()
        .setName("clan-add")
        .setDescription("Ajoute un membre au clan PAM de l'officier.")
        .addStringOption((option) => {
            return option
                .setName("user_id")
                .setDescription("Id du membre rejoignant le clan")
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

            if (memberHasRoles(joinMember, roleClan)) {
                sendErrorAndThrow(
                    interaction,
                    `Le membre <@${joinMember.user.id}> a déja le rôle ${roleClan.name}`
                );
            }

            await joinMember.roles.add(roleClan);

            await interaction.reply({
                content: `Le membre <@${joinMember.user.id}> a été ajouté à ${roleClan.name}`,
            });
        } catch (error) {
            console.error(error);
        }
    },
};
