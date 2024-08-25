import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import {
    getMemberById,
    getRoleByName,
    isAutorize,
    memberHasRoles,
    sendErrorAndThrow,
} from "../tools/tools";
import { clanLetterToFullName } from "../tools/clanLetterToFullName";

export const command: SlashCommand = {
    name: "clan-add",
    data: new SlashCommandBuilder()
        .setName("clan-add")
        .setDescription("Liste des utilisateurs avec le role en paramêtre.")
        .addStringOption((option) => {
            return option
                .setName("clan_lettre")
                .setDescription("Lettre du clan Pamboum (A, B, C, D, E, Z)")
                .setRequired(true);
        })
        .addStringOption((option) => {
            return option
                .setName("user_id")
                .setDescription("Id du membre rejoignant le clan")
                .setRequired(true);
        }),

    execute: async (interaction) => {
        try {
            const roleOption = interaction.options.get("clan_lettre", true);
            const joinedMemberIdOption = interaction.options.get(
                "user_id",
                true
            );
            const roleOfficier = await getRoleByName(
                interaction,
                process.env.OFFICIER_ROLE
            );
            const roleAdmin = await getRoleByName(
                interaction,
                process.env.ADMIN_ROLE
            );
            const member = await getMemberById(
                interaction,
                interaction.user.id
            );

            let roleName = clanLetterToFullName(String(roleOption.value));
            const roleClan = await getRoleByName(interaction, roleName);

            // Si l'utilisateur n'a pas le role admin, check si il a le role officier et si il possède aussi le rôle du clan demandé
            if (!memberHasRoles(member, roleAdmin)) {
                isAutorize(interaction, member, [roleOfficier, roleClan]);
            }

            const joinMember = await getMemberById(
                interaction,
                String(joinedMemberIdOption.value)
            );

            if (memberHasRoles(joinMember, roleClan)) {
                sendErrorAndThrow(
                    interaction,
                    `Le membre <@${joinMember.user.id}> a déja le rôle ${roleName}`
                );
            }

            joinMember.roles.add(roleClan);

            await interaction.reply({
                content: `Le membre <@${joinMember.user.id}> a été ajouté à ${roleClan.name}`,
            });
        } catch (error) {
            console.error(error);
        }
    },
};
