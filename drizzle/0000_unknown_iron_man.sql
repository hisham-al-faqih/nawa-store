CREATE TABLE `account` (
	`id` varchar(191) NOT NULL,
	`account_id` varchar(191) NOT NULL,
	`provider_id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`scope` varchar(255),
	`password` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `account_id` PRIMARY KEY(`id`),
	CONSTRAINT `account_provider_account_unique` UNIQUE(`provider_id`,`account_id`)
);
--> statement-breakpoint
CREATE TABLE `address` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`label` varchar(100) NOT NULL,
	`full_name` varchar(191) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`governorate` varchar(100) NOT NULL,
	`city` varchar(100) NOT NULL,
	`district` varchar(100) NOT NULL,
	`details` text NOT NULL,
	`landmark` varchar(255),
	`delivery_notes` text,
	`is_default` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cart` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191),
	`session_id` varchar(191),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cart_id` PRIMARY KEY(`id`),
	CONSTRAINT `cart_user_unique` UNIQUE(`user_id`),
	CONSTRAINT `cart_session_unique` UNIQUE(`session_id`)
);
--> statement-breakpoint
CREATE TABLE `cart_item` (
	`id` varchar(191) NOT NULL,
	`cart_id` varchar(191) NOT NULL,
	`product_id` varchar(191) NOT NULL,
	`quantity` int NOT NULL,
	CONSTRAINT `cart_item_id` PRIMARY KEY(`id`),
	CONSTRAINT `cart_item_unique` UNIQUE(`cart_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`description` text,
	`image` varchar(500),
	`is_active` boolean NOT NULL DEFAULT true,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `category_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contact_inquiry` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`phone` varchar(32),
	`subject` varchar(191) NOT NULL,
	`message` text NOT NULL,
	`status` varchar(32) NOT NULL DEFAULT 'NEW',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_inquiry_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorite` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`product_id` varchar(191) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorite_id` PRIMARY KEY(`id`),
	CONSTRAINT `favorite_user_product_unique` UNIQUE(`user_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` varchar(191) NOT NULL,
	`order_number` varchar(64) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`address_id` varchar(191) NOT NULL,
	`status` enum('PENDING','CONFIRMED','PROCESSING','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED') NOT NULL DEFAULT 'PENDING',
	`subtotal` int NOT NULL,
	`discount` int NOT NULL DEFAULT 0,
	`shipping` int NOT NULL DEFAULT 0,
	`total` int NOT NULL,
	`customer_note` text,
	`internal_note` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `order_id` PRIMARY KEY(`id`),
	CONSTRAINT `order_number_unique` UNIQUE(`order_number`)
);
--> statement-breakpoint
CREATE TABLE `order_item` (
	`id` varchar(191) NOT NULL,
	`order_id` varchar(191) NOT NULL,
	`product_id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`price` int NOT NULL,
	`quantity` int NOT NULL,
	CONSTRAINT `order_item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`description` text NOT NULL,
	`price` int NOT NULL,
	`old_price` int,
	`brand` varchar(191),
	`is_active` boolean NOT NULL DEFAULT true,
	`is_featured` boolean NOT NULL DEFAULT false,
	`is_best_seller` boolean NOT NULL DEFAULT false,
	`stock_quantity` int NOT NULL DEFAULT 0,
	`low_stock_at` int NOT NULL DEFAULT 5,
	`rating_average` decimal(3,2) NOT NULL DEFAULT '0',
	`review_count` int NOT NULL DEFAULT 0,
	`category_id` varchar(191) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_id` PRIMARY KEY(`id`),
	CONSTRAINT `product_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `product_image` (
	`id` varchar(191) NOT NULL,
	`url` varchar(1000) NOT NULL,
	`alt` varchar(255),
	`sort_order` int NOT NULL DEFAULT 0,
	`product_id` varchar(191) NOT NULL,
	CONSTRAINT `product_image_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `review` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`product_id` varchar(191) NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`is_approved` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `review_id` PRIMARY KEY(`id`),
	CONSTRAINT `review_user_product_unique` UNIQUE(`user_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(191) NOT NULL,
	`token` varchar(255) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`ip_address` varchar(128),
	`user_agent` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` varchar(500),
	`phone` varchar(32),
	`phone_verified` boolean NOT NULL DEFAULT false,
	`role` enum('CUSTOMER','MANAGER','ADMIN') NOT NULL DEFAULT 'CUSTOMER',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(191) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `account_user_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `address_user_idx` ON `address` (`user_id`,`is_default`);--> statement-breakpoint
CREATE INDEX `category_active_sort_idx` ON `category` (`is_active`,`sort_order`);--> statement-breakpoint
CREATE INDEX `contact_status_created_idx` ON `contact_inquiry` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `order_user_created_idx` ON `order` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `order_status_created_idx` ON `order` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `order_item_order_idx` ON `order_item` (`order_id`);--> statement-breakpoint
CREATE INDEX `product_category_active_idx` ON `product` (`category_id`,`is_active`);--> statement-breakpoint
CREATE INDEX `product_active_created_idx` ON `product` (`is_active`,`created_at`);--> statement-breakpoint
CREATE INDEX `product_image_product_idx` ON `product_image` (`product_id`,`sort_order`);--> statement-breakpoint
CREATE INDEX `review_product_approved_idx` ON `review` (`product_id`,`is_approved`);--> statement-breakpoint
CREATE INDEX `session_user_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);