CREATE TABLE `apartments_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`numberOfRooms` integer NOT NULL,
	`maxAdults` integer NOT NULL,
	`maxChildren` integer NOT NULL,
	`adress` blob NOT NULL,
	`pricePerNight` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `bookings_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`apartmentId` integer NOT NULL,
	`userId` integer NOT NULL,
	`startDate` text NOT NULL,
	`endDate` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP),
	`guestInfo` blob,
	FOREIGN KEY (`apartmentId`) REFERENCES `apartments_table`(`id`) ON UPDATE no action ON DELETE no action
);
