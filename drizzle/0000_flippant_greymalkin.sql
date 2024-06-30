CREATE TABLE `experiences` (
	`id` text PRIMARY KEY NOT NULL,
	`company_name` text NOT NULL,
	`role` text NOT NULL,
	`metrics` text,
	`project` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
