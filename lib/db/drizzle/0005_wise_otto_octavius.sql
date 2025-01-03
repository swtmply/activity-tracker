PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_activity` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`items` text NOT NULL,
	`color` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_activity`("id", "user_id", "name", "items", "color", "created_at", "updated_at") SELECT "id", "user_id", "name", "items", "color", "created_at", "updated_at" FROM `activity`;--> statement-breakpoint
DROP TABLE `activity`;--> statement-breakpoint
ALTER TABLE `__new_activity` RENAME TO `activity`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_activity_entry` (
	`id` text PRIMARY KEY NOT NULL,
	`activity_id` text NOT NULL,
	`metric` integer NOT NULL,
	`date` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`activity_id`) REFERENCES `activity`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_activity_entry`("id", "activity_id", "metric", "date", "created_at", "updated_at") SELECT "id", "activity_id", "metric", "date", "created_at", "updated_at" FROM `activity_entry`;--> statement-breakpoint
DROP TABLE `activity_entry`;--> statement-breakpoint
ALTER TABLE `__new_activity_entry` RENAME TO `activity_entry`;