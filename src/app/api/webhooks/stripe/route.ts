import { PRO_QUOTA } from "@/config";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
    try {
      const body = await req.text();
      const signature = headers().get("stripe-signature");
  
      // Construct Stripe event
      const event = stripe.webhooks.constructEvent(
        body,
        signature ?? " ",
        process.env.STRIPE_WEBHOOK_SECRET ?? ""
      );
  
      // Handle specific event types
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(session);
        const { userId } = session.metadata || { userId: null };
  
        if (!userId) {
          return new Response("Invalid metadata", {
            status: 400,
          });
        }
  
        // Update user plan in the database
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            plan: "PRO",
            quotaLimit:PRO_QUOTA.maxEventsPerMonth
            
          },
        });
         console.log("Webhook processed successfully")
        return new Response("Webhook processed successfully", {
          status: 200,
        });
      }
  
      // Return response for unhandled event types
      console.log("Event type not handled")
      return new Response("Event type not handled", {
        status: 200,
      });
    } catch (error) {
      console.error("Error processing Stripe webhook:", error);
  
      return new Response("Webhook handler error", {
        status: 500,
      });
    }
  }