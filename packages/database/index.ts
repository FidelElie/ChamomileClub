export * from "./client";

export const Roles = ["admin", "founder", "editor", "team", "member", "prospect"] as const;

export type RoleNames = typeof Roles[number];
