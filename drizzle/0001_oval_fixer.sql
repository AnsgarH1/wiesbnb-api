PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_apartments_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`numberOfRooms` integer NOT NULL,
	`maxAdults` integer NOT NULL,
	`maxChildren` integer NOT NULL,
	`adress` text NOT NULL,
	`pricePerNight` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
INSERT INTO `__new_apartments_table`("id", "name", "description", "numberOfRooms", "maxAdults", "maxChildren", "adress", "pricePerNight", "createdAt", "updatedAt") SELECT "id", "name", "description", "numberOfRooms", "maxAdults", "maxChildren", "adress", "pricePerNight", "createdAt", "updatedAt" FROM `apartments_table`;--> statement-breakpoint
DROP TABLE `apartments_table`;--> statement-breakpoint
ALTER TABLE `__new_apartments_table` RENAME TO `apartments_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_bookings_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`apartmentId` integer NOT NULL,
	`userId` integer NOT NULL,
	`startDate` text NOT NULL,
	`endDate` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP),
	`guestInfo` text,
	FOREIGN KEY (`apartmentId`) REFERENCES `apartments_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_bookings_table`("id", "apartmentId", "userId", "startDate", "endDate", "createdAt", "updatedAt", "guestInfo") SELECT "id", "apartmentId", "userId", "startDate", "endDate", "createdAt", "updatedAt", "guestInfo" FROM `bookings_table`;--> statement-breakpoint
DROP TABLE `bookings_table`;--> statement-breakpoint
ALTER TABLE `__new_bookings_table` RENAME TO `bookings_table`;