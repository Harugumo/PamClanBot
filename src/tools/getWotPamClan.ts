import { GuildMember } from "discord.js";

/**
 * Retourne le clan Wot Pam auquel appartient le membre.
 * @param member Le membre que l'on veut vérifier.
 * @returns Role clan pam
 */
function getWotPamClan(member: GuildMember) {
    const roles = member.roles.cache;
    const rolesClan = ["PAM-A", "PAM-B", "PAM-C", "PAM-D", "PAM-E", "PAM-Z"];

    const roleClan = roles.find((role) => rolesClan.includes(role.name));

    return roleClan || null;
}

export { getWotPamClan };
