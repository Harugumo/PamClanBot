import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
    name: "clan-add",
    data: new SlashCommandBuilder()
        .setName("clan-add")
        .setDescription("Liste des utilisateurs avec le role en paramêtre.")
        .addStringOption((option) => {
            return option
                .setName("clan_lettre")
                .setDescription("Lettre du clan Pamboum (A, B, C, D, Z)")
                .setRequired(true);
        
        })
        .addStringOption((option) => {
            return option
                .setName("user_id")
                .setDescription("Id du membre rejoignant le clan")
                .setRequired(true);
        }),
        
    execute: async (interaction) => {
        const guild = interaction.guild;
        const roleOption = interaction.options.get("clan_lettre", true);
        const userIdOption = interaction.options.get("user_id", true);
       

        if (!guild) {
            await interaction.reply({
                content: "Cette commande doit être utilisée dans un serveur.",
                ephemeral: true,
            });
            return;
        }

        await guild.members.fetch();
        await guild.roles.fetch();

        const roleOfficierId = guild.roles.cache.find((role) => role.name === process.env.AUTORIZE_ROLE)!.id
        const member = await guild.members.fetch(interaction.user.id);
        if (!member.roles.cache.has(roleOfficierId)) {
            await interaction.reply({
                content: "Vous n'avez pas la permission d'utiliser cette commande.",
                ephemeral: true,
            });
            return;
        }


        let roleName: String|null = null;
        switch (roleOption.value) {
            case 'A': roleName = 'PAM-A'; break;
            case 'B': roleName = 'PAM-B'; break;
            case 'C': roleName = 'PAM-C'; break;
            case 'D': roleName = 'PAM-D'; break;
            case 'Z': roleName = 'PAM-Z'; break;
        }

        const role = guild.roles.cache.find((role) => role.name === roleName);
        if (!role) {
            await interaction.reply({
                content: "La lette du clan est invalide !",
                ephemeral: true,
            });
            return;
        }

        const joinMember = guild.members.cache.find((member) => member.user.id === userIdOption.value);
        if (!joinMember) {
            await interaction.reply({
                content: "Membre introuvable !",
                ephemeral: true,
            });
            return;
        }

        joinMember.roles.add(role);

        await interaction.reply({ content: `Le membre <@${joinMember.user.id}> a été ajouté à ${role.name}` });
    },
};
