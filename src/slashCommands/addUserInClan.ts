import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { getMemberById, getMembersWithRole, getRoleByName, isAutorize } from "../tools/tools";

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
            const userIdOption = interaction.options.get("user_id", true);
            const roleOfficier = await getRoleByName(interaction, process.env.AUTORIZE_ROLE);
            const member = await getMemberById(interaction, interaction.user.id);

            isAutorize(interaction, member, roleOfficier);

            let roleName: string = 'NOT_FOUND';
            switch (roleOption.value) {
                case 'A': roleName = 'PAM-A'; break;
                case 'a': roleName = 'PAM-A'; break;
                case 'B': roleName = 'PAM-B'; break;
                case 'b': roleName = 'PAM-B'; break;
                case 'C': roleName = 'PAM-C'; break;
                case 'c': roleName = 'PAM-C'; break;
                case 'D': roleName = 'PAM-D'; break;
                case 'd': roleName = 'PAM-D'; break;
                case 'E': roleName = 'PAM-E'; break;
                case 'e': roleName = 'PAM-E'; break;
                case 'Z': roleName = 'PAM-Z'; break;
                case 'z': roleName = 'PAM-Z'; break;
            }

            const role = await getRoleByName(interaction, roleName);
            const joinMember = await getMemberById(interaction, String(userIdOption.value));

            joinMember.roles.add(role);

            await interaction.reply({ content: `Le membre <@${joinMember.user.id}> a été ajouté à ${role.name}` });
        } catch (error) {
            console.error(error);
        }
    },
};
