# WiesBnB API

WiesBnB is a small Airbnb-like project built to help students learn web development with React. 

This repo contains the Api, which is built using [Hono](https://hono.dev/) with [Zod Open-Api](https://hono.dev/examples/zod-openapi) to provide Open-Api Docs as well as a Swagger-UI. The Database Layer is implemented with Drizzle. This project is currently setup to be deployed to Cloudflare Workers and the Cloudflare D1 Database, utilizing [SST](https://sst.dev/docs/) as IaaC Layer.

## Project Background

This API serves as the backend for WiesBnB, a mock vacation rental service, named after the city of Wiesbaden where the Rhein Main University of Applied Science is located. The API exposes endpoints for listing apartments, fetching details about specific apartments, and creating bookings. There is also an admin section where authenticated users can perform CRUD operations on apartments and bookings.

The primary goal is to provide this Api to students, to teach them how to integrate Rest-Apis into their React Applications.

# How to Use This API

## Prerequisites

* Node.js (version 18 or later)
* Cloudflare account (to provision the services using SST)
* D1 database (for local development/testing)
* [pnpm](https://pnpm.io/) is used as package-manager (or use any other)


1. Install Dependencies
To install the necessary packages, run: `pnpm install`

2. Set Up Environment Variables
Create a .env file in the root directory with the following environment variables:

```.env
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_DEFAULT_ACCOUNT_ID=your_cloudflare_account_id
```

3. Running the API 
You can run the API in a development environment by executing the following command: `pnpm dev`

This will run `sst dev` and deploy all needed Ressources to a personal development environment at cloudflare.

# API Endpoints

Below you find a brief overview of the available endpoints.

> For more details run the server yourself and open the `/` Route to see all currently implemented Routes inside the [ Public Swagger-UI](wiesbnb.web-engineering.dev/api) and [Admin Swagger-UI](wiesbnb.web-engineering.dev/api/admin)

## Apartments API (public)

`GET /api/availableApartments`
List available apartments (with optional filters like date range, rooms, adults, and children).

`GET /api/availableApartments/{id}`
Fetch details of a specific apartment by its ID.

## Bookings API (public)

`POST /api/submitBooking`
Create a new booking for an apartment.

`POST /api/cancelBooking/{id}`
Fetch details of a specific booking.

## Admin API (will get restricted at some point)

`GET /api/admin/apartments`
Get all apartments 

`GET /api/admin/apartments/{id}`
Get apartment per id 

`POST /api/admin/apartments`
Create a new apartment 

`PUT /admin/apartments/{id}`
Update an existing apartment (admin only).

`DELETE /admin/apartments/{id}`
Delete an apartment (admin only).

`GET /admin/bookings`
List all bookings (admin only).

`GET /admin/bookings/{id}`
List all bookings (admin only).

`PUT /admin/bookings/{id}`
Update an existing booking (admin only).

`DELETE /admin/bookings/{id}`
Cancel or delete a booking (admin only).

# Used Technologies

The WiesBnB API project was also an excuse to try out some technologies, that should fit well together:

**Backend Stack:**

- [Hono.js](https://hono.dev/): Fast web framework designed for Cloudflare Workers, used to build the API routing and middleware.
  
- [Zod + OpenAPI](https://hono.dev/examples/zod-openapi): For validating API requests and generating OpenAPI documentation to be hopefully used by the students. It also provides an Swagger-UI out of the box, so I don't need to write any special documentation
  
- [Drizzle ORM](https://orm.drizzle.team/): Lightweight, type-safe ORM that works with almost every database.

- Honorable Mention: [Zod](https://zod.dev/): This app heavily utilizes Zod to parse almost everything, validate and transform input params and and response objects as well as using it for generated documentation.

**Infrastructure:**

As I only want to use cheap (or even free) infrastructure ressources, this project was built to allow serverless deployment. Also i don't want to rebuild this project every semester using a new Cloud SDK, or deal with Docker SST was a perfect Choice for a lightweight Infrastructure Abstraction. Currently this project is deployed to Cloudflare, but thanks to SST, there is no need to use the Wrangler CLI or other Cloudflare Specific tooling.

- [SST](https://sst.dev/): Lightweight infrastructure as code framework to provision and manage the Cloudflare environment (Workers, D1).
Database:

- [Cloudflare Workers](https://workers.cloudflare.com/): Used for serverless compute
- [Cloudflare D1](https://developers.cloudflare.com/d1/): Used as SQLite DB. 
- [Drizzle-Kit](https://orm.drizzle.team/docs/kit-overview): Used to interact with the DB and manage Migrations.

# Development and Contributions
This project is intended as an educational tool. Feel free to fork it, experiment, and expand it. Contributions are welcome!

# License
This project is licensed under the MIT License.