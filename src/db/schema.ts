import { relations } from "drizzle-orm";
import {
	pgTable,
	serial,
	text,
	timestamp,
	boolean,
	integer,
	primaryKey,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
	id: text("id").primaryKey(), // Clerk user ID
	email: text("email").notNull(),
	name: text("name").notNull(),
	imageUrl: text("image_url"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User relations
export const usersRelations = relations(users, ({ many }) => ({
	studyGroups: many(studyGroupMembers),
	materials: many(studyMaterials),
	likes: many(materialLikes),
}));

// Study Materials table
export const studyMaterials = pgTable("study_materials", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	type: text("type").notNull(), // PYQ, notes, youtube_playlist
	fileUrl: text("file_url"), // URL to the file (PDF, image, etc.)
	youtubeUrl: text("youtube_url"), // YouTube URL if type is youtube_playlist
	subject: text("subject").notNull(),
	course: text("course").notNull(),
	year: integer("year"),
	semester: integer("semester"),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	isApproved: boolean("is_approved").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Study Material relations
export const studyMaterialsRelations = relations(
	studyMaterials,
	({ one, many }) => ({
		user: one(users, {
			fields: [studyMaterials.userId],
			references: [users.id],
		}),
		likes: many(materialLikes),
		studyGroups: many(studyGroupMaterials),
	})
);

// Material Likes table
export const materialLikes = pgTable("material_likes", {
	id: serial("id").primaryKey(),
	materialId: integer("material_id")
		.references(() => studyMaterials.id, { onDelete: "cascade" })
		.notNull(),
	userId: text("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Material Likes relations
export const materialLikesRelations = relations(materialLikes, ({ one }) => ({
	material: one(studyMaterials, {
		fields: [materialLikes.materialId],
		references: [studyMaterials.id],
	}),
	user: one(users, {
		fields: [materialLikes.userId],
		references: [users.id],
	}),
}));

// Study Groups table
export const studyGroups = pgTable("study_groups", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	isPublic: boolean("is_public").default(true).notNull(),
	creatorId: text("creator_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Study Group relations
export const studyGroupsRelations = relations(studyGroups, ({ one, many }) => ({
	creator: one(users, {
		fields: [studyGroups.creatorId],
		references: [users.id],
	}),
	members: many(studyGroupMembers),
	materials: many(studyGroupMaterials),
}));

// Study Group Members table
export const studyGroupMembers = pgTable(
	"study_group_members",
	{
		groupId: integer("group_id")
			.references(() => studyGroups.id, { onDelete: "cascade" })
			.notNull(),
		userId: text("user_id")
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		role: text("role").default("member").notNull(), // member, admin
		joinedAt: timestamp("joined_at").defaultNow().notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.groupId, t.userId] }),
	})
);

// Study Group Members relations
export const studyGroupMembersRelations = relations(
	studyGroupMembers,
	({ one }) => ({
		group: one(studyGroups, {
			fields: [studyGroupMembers.groupId],
			references: [studyGroups.id],
		}),
		user: one(users, {
			fields: [studyGroupMembers.userId],
			references: [users.id],
		}),
	})
);

// Study Group Materials table
export const studyGroupMaterials = pgTable(
	"study_group_materials",
	{
		groupId: integer("group_id")
			.references(() => studyGroups.id, { onDelete: "cascade" })
			.notNull(),
		materialId: integer("material_id")
			.references(() => studyMaterials.id, { onDelete: "cascade" })
			.notNull(),
		addedAt: timestamp("added_at").defaultNow().notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.groupId, t.materialId] }),
	})
);

// Study Group Materials relations
export const studyGroupMaterialsRelations = relations(
	studyGroupMaterials,
	({ one }) => ({
		group: one(studyGroups, {
			fields: [studyGroupMaterials.groupId],
			references: [studyGroups.id],
		}),
		material: one(studyMaterials, {
			fields: [studyGroupMaterials.materialId],
			references: [studyMaterials.id],
		}),
	})
);
