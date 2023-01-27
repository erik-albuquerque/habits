import WebPush from "web-push";

import { FastifyInstance } from "fastify";
import { z } from "zod";

const publicKey =
  "BA1JpBKTQ5GmCzpRfRKM-RblcaGgdY4RrdAU5a7p70N9RxiOo2CR8WfoE_LDkIMbIJAb696CUnrEC-jJxqm1L8Q";
const privateKey = "pEHPNxEJSMM_gXXC_wYmQjEOrDdMUCSLqXqrCLXqDfA";

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", async (request, response) => {
    response.status(200).send({ publicKey });
  });

  app.post("/push/register", async (request, response) => {
    console.log(request.body);

    response.status(201).send();
  });

  app.post("/push/send", async (request, response) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, "HELLO DO BACKEND");
    }, 5000);

    response.status(201).send();
  });
}
