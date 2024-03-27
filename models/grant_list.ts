interface GrantListRolePart {
  role: string;
  resource: string;
  action: string;
  [key: string]: any;
}

interface GrantList {
  [name: string]: GrantListRolePart;
}

const grantList: GrantList = {
  admin: { role: "admin", resource: "all", action: "create:any" },

  rootRead: { role: "rootRead", resource: "getMessage", action: "read:any" },

  userCreate: { role: "user_create", resource: "user", action: "create:any" },
  userRead: { role: "user_read", resource: "user", action: "read:any" },
  userDelete: { role: "user_delete", resource: "user", action: "delete:any" },
  userUpdate: { role: "user_update", resource: "user", action: "update:any" },

  liveCreate: {
    role: "live_create",
    resource: "chat",
    action: "create:any",
    attributes: "*",
  },
  liveRead: {
    role: "live_read",
    resource: "chat",
    action: "read:any",
    attributes: "*",
  },
  liveDelete: {
    role: "live_delete",
    resource: "chat",
    action: "delete:any",
    attributes: "*",
  },

  whatsappCreate: {
    role: "whatsapp_create",
    resource: "chat",
    action: "create:any",
    attributes: "*",
  },
  whatsappRead: {
    role: "whatsapp_read",
    resource: "chat",
    action: "read:any",
    attributes: "*",
  },
  whatsappDelete: {
    role: "whatsapp_delete",
    resource: "chat",
    action: "delete:any",
    attributes: "*",
  },

  instagramCreate: {
    role: "instagram_create",
    resource: "chat",
    action: "create:any",
    attributes: "*",
  },
  instagramRead: {
    role: "instagram_read",
    resource: "chat",
    action: "read:any",
    attributes: "*",
  },
  instagramDelete: {
    role: "instagram_delete",
    resource: "chat",
    action: "delete:any",
    attributes: "*",
  },

  facebookCreate: {
    role: "facebook_create",
    resource: "chat",
    action: "create:any",
    attributes: "*",
  },
  "facebookRead',": {
    role: "facebook_read",
    resource: "chat",
    action: "read:any",
    attributes: "*",
  },
  facebookDelete: {
    role: "facebook_delete",
    resource: "chat",
    action: "delete:any",
    attributes: "*",
  },

  "outlookCreate'": {
    role: "outlook_create",
    resource: "chat",
    action: "create:any",
    attributes: "*",
  },
  "outlookRead', ": {
    role: "outlook_read",
    resource: "chat",
    action: "read:any",
    attributes: "*",
  },
  "outlookDelete'": {
    role: "outlook_delete",
    resource: "chat",
    action: "delete:any",
    attributes: "*",
  },

  gmailCreate: {
    role: "gmail_create",
    resource: "chat",
    action: "create:any",
    attributes: "*",
  },
  gmailRead: {
    role: "gmail_read",
    resource: "chat",
    action: "read:any",
    attributes: "*",
  },
  gmailDelete: {
    role: "gmail_delete",
    resource: "chat",
    action: "delete:any",
    attributes: "*",
  },

  microsoftTeamsCreate: {
    role: "microsoftTeams_create",
    resource: "chat",
    action: "create:any",
    attributes: "*",
  },
  microsoftTeamsRead: {
    role: "microsoftTeams_read",
    resource: "chat",
    action: "read:any",
    attributes: "*",
  },
  microsoftTeamsDelete: {
    role: "microsoftTeams_delete",
    resource: "chat",
    action: "delete:any",
    attributes: "*",
  },
};

export default grantList;
