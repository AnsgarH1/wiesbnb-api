CREATE TABLE `apartments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`teaserText` text NOT NULL,
	`numberOfRooms` integer NOT NULL,
	`maxAdults` integer NOT NULL,
	`maxChildren` integer NOT NULL,
	`bedAmountAdults` integer NOT NULL,
	`bedAmountChildren` integer NOT NULL,
	`images` text NOT NULL,
	`adress` text NOT NULL,
	`pricePerNight` integer NOT NULL,
	`rating` integer NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`apartmentId` integer NOT NULL,
	`cancelled` integer DEFAULT false NOT NULL,
	`startDate` text NOT NULL,
	`endDate` text NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`guestInfo` text,
	`paymentInfo` text,
	FOREIGN KEY (`apartmentId`) REFERENCES `apartments`(`id`) ON UPDATE no action ON DELETE no action
);
