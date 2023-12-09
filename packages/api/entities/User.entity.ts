import { z } from "zod";

import { BaseEntity } from "./Base.entity";

export const UserRoles = {
  ADMIN: "ADMIN",
  FOUNDER: "FOUNDER",
  TEAM: "TEAM",
  MEMBER: "MEMBER",
  PROSPECT: "PROSPECT",
} as const;

export const UserRolePriorities = {
  ADMIN: 0,
  FOUNDER: 1,
  TEAM: 2,
  MEMBER: 3,
  PROSPECT: 4,
} as const;

export const UserRolesEnum = z.enum([
  UserRoles.ADMIN,
  UserRoles.FOUNDER,
  UserRoles.TEAM,
  UserRoles.MEMBER,
  UserRoles.PROSPECT,
]);

export type UserRolesEnum = z.infer<typeof UserRolesEnum>;

export const UserEntity = BaseEntity.merge(
  z.object({
    email: z.string().email(),
    forename: z.string(),
    surname: z.string().nullish(),
    nickname: z.string().nullish(),
    active: z.boolean().default(false),
    position: z.string().nullish(),
    description: z.string().nullish(),
    roles: z.array(UserRolesEnum),
    public: z.boolean().default(true),
    createdAt: z.coerce.date(),
  }),
);

export type UserEntity = z.infer<typeof UserEntity>;

export const UserCreationEntity = UserEntity.omit({ id: true });

export type UserCreationEntity = z.infer<typeof UserCreationEntity>;

export const UserCreationFieldsEntity = UserEntity.pick({
  email: true,
  forename: true,
  surname: true,
  description: true,
  roles: true,
});

export type UserCreationFieldsEntity = z.infer<typeof UserCreationFieldsEntity>;
