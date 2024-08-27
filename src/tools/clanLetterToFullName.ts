/**
 * Return the full name of the Wot Pam clan from a letter.
 * @param letter The letter of the clan.
 * @returns The full name of the clan, or "NOT_FOUND" if the letter is not recognized.
 */
function clanLetterToFullName(letter: string) {
    let roleName: string = "NOT_FOUND";
    switch (letter) {
        case "A":
            roleName = "PAM-A";
            break;
        case "a":
            roleName = "PAM-A";
            break;
        case "B":
            roleName = "PAM-B";
            break;
        case "b":
            roleName = "PAM-B";
            break;
        case "C":
            roleName = "PAM-C";
            break;
        case "c":
            roleName = "PAM-C";
            break;
        case "D":
            roleName = "PAM-D";
            break;
        case "d":
            roleName = "PAM-D";
            break;
        case "E":
            roleName = "PAM-E";
            break;
        case "e":
            roleName = "PAM-E";
            break;
        case "Z":
            roleName = "PAM-Z";
            break;
        case "z":
            roleName = "PAM-Z";
            break;
    }

    return roleName;
}

export { clanLetterToFullName };
