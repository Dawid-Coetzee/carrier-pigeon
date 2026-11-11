import { CommunityCreateStage } from "../types";

export const MAX_NAME_LENGTH = 21;
export const MIN_NAME_LENGTH = 3;
export const TEXTAREA_ROWS = 8;
export const MIN_DESCRIPTION_LENGTH = 1;
export const COMMUNITY_MEDIA_TYPES = ["banner", "avatar"] as const;
export const COMMUNITY_CREATE_DIALOG_HEADER_TEXT = {
    [CommunityCreateStage.One]: {
        title: "Enlighten us concerning your community",
        description: "A name and description would greatly enlighten people as to the nature of your community."
    },
    [CommunityCreateStage.Two]: {
        title: "Adorn your community",
        description: "A touch of visual splendour shall draw new members’ notice and help shape the character of your community. You may amend it at any time."
    },
    [CommunityCreateStage.BannerStage]: {
        title: "Adorn your community",
        description: "The banner must be 1028px x 128px"
    },
    [CommunityCreateStage.AvatarStage]: {
        title: "Adorn your community",
        description: "The avatar must be 1:1"
    }
}