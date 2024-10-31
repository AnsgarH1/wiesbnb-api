import { Hono } from "hono";

import { database } from "../../../infrastructure/drizzle";
import * as schema from "../../../infrastructure/drizzle/schema";
import { z } from "zod";
import { InsertApartmentSchema } from "../../../common/database.schema";

export const seed = new Hono();

seed.get("/", async (c) => {
  console.log("Seeding apartments");
  const initialApartments = [
    {
      title: "Moritzstraße 19",
      teaserText: "Nur 5 Minuten von der Innenstadt entfernt",
      description: "",
      numberOfRooms: 2,
      maxAdults: 5,
      maxChildren: 2,
      bedAmountAdults: 5,
      bedAmountChildren: 2,
      images: [
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/4a3290de-4565-486b-95bc-ff65c393f12c.png?im_w=1200&im_format=avif",
          description: "Gesamtübersicht",
        },
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/03113514-a81e-4eaf-9992-3a444cc7bae5.jpeg?im_w=960&im_format=avif",
          description: "Blick ins Wohnzimmer",
        },
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/114673a5-5d70-41b0-a569-72f7a3bbe6eb.jpeg?im_w=1200&im_format=avif",
          description: "Schlafzimmer 1",
        },
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/97a559e7-d6ea-4447-85a7-24a376d9b27b.jpeg?im_w=1200&im_format=avif",
          description: "",
        },
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/386dab43-8a45-48b9-9e68-3a91402a57e9.jpeg?im_w=1200&im_format=avif",
          description: "Schlafzimmer 2",
        },
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/97a559e7-d6ea-4447-85a7-24a376d9b27b.jpeg?im_w=1200&im_format=avif",
          description: "Schlafzimmer 3",
        },
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/c448d783-3ff6-4440-b854-6d518cafd797.jpeg?im_w=1200&im_format=avif",
          description: "Schlafzimmer 4",
        },
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/803c7b51-be33-4fe5-8f7a-dd6d4963ace4.jpeg?im_w=1200&im_format=avif",
          description: "Badezimmer",
        },
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/1fd7d592-3381-4fdd-8d5b-02bdf6b0bc26.jpeg?im_w=1200&im_format=avif",
          description: "Gäste WC",
        },
        {
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzOTAzMzgxNTI2OTAyMzUwMQ%3D%3D/original/e73e5eb9-4f9e-4c06-8ba5-2c0bbb41aecb.jpeg?im_w=1200&im_format=avif",
          description: "Außenbereich",
        },
      ],
      adress: {
        street: "Moritzstraße",
        number: "19",
        city: "Wiesbaden",
        postalCode: "65185",
        country: "DE",
        coords: {
          lat: 50.07428513961555,
          lng: 8.238567808079477,
        },
      },
      pricePerNight: 26300,
      rating: 4.6,
    },
    {
      title: "Kirchgasse 17",
      teaserText: "Direkt in der Innenstadt",
      description: "",
      numberOfRooms: 1,
      maxAdults: 2,
      maxChildren: 1,
      bedAmountAdults: 1,
      bedAmountChildren: 0,
      images: [
        {
          url: "https://a0.muscache.com/im/pictures/3fea178b-5353-4f5a-9f7e-64e05234628d.jpg?im_w=960&im_format=avif",
          description:
            "Fühlen Sie sich wie zu Hause im offenen Wohnzimmer mit Sofa, TV und einem großen Tisch, um köstliche Mahlzeiten mit Familie und Freunden zu genießen.",
        },
        {
          url: "https://a0.muscache.com/im/pictures/802aaf69-df90-4726-a2c4-ce09916a822e.jpg?im_w=1200&im_format=avif",
          description: "Bring deine Freunde zusammen!",
        },
        {
          url: "https://a0.muscache.com/im/pictures/2d4be1a9-faac-40a0-8aee-a483369fcc5d.jpg?im_w=1200&im_format=avif",
          description:
            "Schöne kleine Küche mit Backofen, Wasserkocher und einer tollen Delonghi-Kaffeemaschine",
        },
        {
          url: "https://a0.muscache.com/im/pictures/048d3cd4-4d92-487f-a86b-79ba841f4a26.jpg?im_w=1200&im_format=avif",
          description: "",
        },
        {
          url: "https://a0.muscache.com/im/pictures/f7ce9b75-4c5d-4cba-8dda-41db4b005a16.jpg?im_w=1200&im_format=avif",
          description: "",
        },
        {
          url: "https://a0.muscache.com/im/pictures/5736bfba-205a-4ef9-83b9-1997a962d171.jpg?im_w=1200&im_format=avif",
          description: "",
        },
        {
          url: "https://a0.muscache.com/im/pictures/b9b6ec5b-7f21-4244-beaf-783a75d84e0c.jpg?im_w=1200&im_format=avif",
          description: "",
        },
        {
          url: "https://a0.muscache.com/im/pictures/d75ab42e-1de8-43de-ba8c-5fb6a6e794a5.jpg?im_w=1200&im_format=avif",
          description: "",
        },
      ],
      adress: {
        street: "Kirchgasse",
        number: "17",
        city: "Wiesbaden",
        postalCode: "65185",
        country: "DE",
        coords: {
          lat: 50.07913503286719,
          lng: 8.238517646523148,
        },
      },
      pricePerNight: 26300,
      rating: 3.33,
    },
  ] satisfies z.infer<typeof InsertApartmentSchema>[];

  const db = database();

  const alreadyPresentApartments = await db.query.apartment.findMany({
    where: (apartment, { eq, or }) =>
      or(
        eq(apartment.title, initialApartments[0].title),
        eq(apartment.title, initialApartments[1].title)
      ),
  });

  if (alreadyPresentApartments.length > 0) {
    console.log(
      "Apartments already present in the database: ",
      alreadyPresentApartments.map((a) => a.title)
    );
    c.text(
      `Apartments already present in the database: ${alreadyPresentApartments.map(
        (a) => a.title
      )}
    `
    );
  }
  const notPresentApartments = initialApartments.filter(
    (a) => !alreadyPresentApartments.some((b) => b.title === a.title)
  );
  console.log("Not present apartments", notPresentApartments);

  if (notPresentApartments.length === 0) {
    return c.text("No apartments to insert", 200);
  }
  const insert_response = await db
    .insert(schema.apartment)
    .values(notPresentApartments);

  if (!insert_response.success) {
    console.log("Failed to insert apartments", insert_response);
    return c.text(
      `Failed to insert apartments: ${JSON.stringify(insert_response.results)}`
    );
  }

  console.log("Insert response", insert_response);
  return c.text(
    `Seeding Apartments: ${JSON.stringify(insert_response.meta)}`,
    200
  );
});
