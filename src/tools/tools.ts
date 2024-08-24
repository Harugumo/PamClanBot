import { CommandInteraction, GuildMember, Role } from "discord.js";


/**
 * Renvoie le serveur associé à l'interaction, lance une erreur si le serveur n'existe pas.
 * @param interaction L'interaction command qui a appelé cette fonction.
 * @returns Le serveur associé à l'interaction.
 * @throws {Error} Si le serveur n'existe pas.
 */
function getGuild(interaction: CommandInteraction) { 
    if (!interaction.guild) {
        interaction.reply({
            content: "Cette commande doit être utilisée dans un serveur.",
            ephemeral: true,
        });

        throw new Error("Cette commande doit être utilisée dans un serveur.");
    }

    return interaction.guild;
}


/**
 * Retourne le rôle portant le nom donné ou throw une erreur si ce rôle n'existe pas.
 * @param interaction L'interaction command qui a appelé cette fonction.
 * @param roleName Nom du rôle cherché.
 * @returns Le rôle portant le nom donné.
 * @throws {Error} Si le rôle n'existe pas.
 */
async function getRoleByName(interaction: CommandInteraction, roleName: string) {
    let guild = getGuild(interaction);
    await guild.roles.fetch();

    const role = guild.roles.cache.find((r) => r.name === roleName);

     if (!role) {
        interaction.reply({
            content: `Le rôle ${roleName} ne semble pas existé !`,
            ephemeral: true,
        });
            
        throw new Error(`Le rôle ${roleName} ne semble pas existé !`);
    }

    return role;
}


/**
 * Retourne les membres du serveur qui ont le rôle donné.
 * @param interaction L'interaction command qui a appelé cette fonction.
 * @param role Le rôle que l'on cherche.
 * @returns Une collection de membres qui ont le rôle donné.
 */
async function getMembersWithRole(interaction: CommandInteraction, role: Role) {
    let guild = getGuild(interaction);
    await guild.members.fetch();
    return guild.members.cache.filter((member) =>
        member.roles.cache.has(role.id)
    );
}

/**
 * Retourne le membre du serveur qui a l'ID donné ou throw une erreur si ce membre n'existe pas.
 * @param interaction L'interaction command qui a appelé cette fonction.
 * @param memberId L'ID du membre cherché.
 * @returns Le membre du serveur qui a l'ID donné.
 * @throws {Error} Si le membre n'existe pas.
 */
async function getMemberById(interaction: CommandInteraction, memberId: string) {
    let guild = getGuild(interaction);

    const member = await guild.members.fetch(interaction.user.id);

     if (!member) {
        interaction.reply({
            content: `Le membre ${memberId} ne semble pas existé !`,
            ephemeral: true,
        });
            
        throw new Error(`Le membre ${memberId} ne semble pas existé !`);
    }

    return member;
}

/**
 * Vérifie si le membre a le rôle donné, lance une erreur si ce n'est pas le cas.
 * @param interaction L'interaction command qui a appelé cette fonction.
 * @param member Le membre qui a appelé cette fonction.
 * @param role Le rôle que l'on cherche.
 * @returns True si le membre a le rôle.
 * @throws {Error} Si le membre n'a pas le rôle.
 */
function isAutorize(interaction: CommandInteraction, member: GuildMember, role: Role) {
     if (!member.roles.cache.has(role.id)) {
            interaction.reply({
                content: "Vous n'avez pas la permission d'utiliser cette commande.",
                ephemeral: true,
            });
            
            throw new Error("Vous n'avez pas la permission d'utiliser cette commande.");
    }

    return true;
}

export { getGuild, getRoleByName, getMembersWithRole, getMemberById, isAutorize };