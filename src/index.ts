import { Client, Collection, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../types";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Permission de rentrer dans des serveurs discord
        GatewayIntentBits.GuildMembers, // Permission de voir les membres
        GatewayIntentBits.GuildMessages, // Permission d'envoyer des messages
        GatewayIntentBits.GuildMessageReactions, // Permission de reagir aux messages
        GatewayIntentBits.MessageContent, // Permission de lire le contenu des messages
        GatewayIntentBits.GuildPresences,
    ],
});

client.slashCommands = new Collection<string, SlashCommand>();

const handlersDir = join(__dirname, "./handlers");

readdirSync(handlersDir).forEach((file) => {
    require(join(handlersDir, file))(client);
});

client.login(process.env.TOKEN);
