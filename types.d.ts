import {
    CommandInteraction,
    SlashCommandBuilder,
    Collection,
    SlashCommandStringOption,
    SlashCommandOptionsOnlyBuilder,
} from "discord.js";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string;
            TOKEN: string;
            OFFICIER_ROLE: string;
            ADMIN_ROLE: string;
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
    }
}

export interface BotEvent {
    name: string;
    once?: boolean | false;
    execute: (...args: any[]) => void;
}

export interface SlashCommand {
    name: string;
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

export {};
