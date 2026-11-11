/**
 * Vercel Serverless Function: api/send-whatsapp.js
 * Receives on-site customer inquiries and forwards them directly
 * to the Bea Luxe store owner's WhatsApp via CallMeBot API.
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { name, phone, message, product } = req.body || {};

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message content is required." });
    }

    const customerName = name ? name.trim() : "Anonymous Shopper";
    const customerPhone = phone ? phone.trim() : "Not provided";
    const productInfo = product ? product.trim() : null;

    // The store owner's WhatsApp destination
    // Defaults to primary line (+2348162040699), or can be set via env variable
    const STORE_PHONE = process.env.BEA_LUXE_WA_PHONE || "+2348162040699";
    const API_KEY = process.env.CALLMEBOT_API_KEY || "";

    // Format clean message for WhatsApp
    let alertText = `✨ *New Bea Luxe NG Message*\n\n`;
    alertText += `👤 *Customer:* ${customerName}\n`;
    alertText += `📞 *Phone:* ${customerPhone}\n`;
    if (productInfo) {
      alertText += `🏷️ *Inquiry For:* ${productInfo}\n`;
    }
    alertText += `💬 *Message:* ${message.trim()}\n\n`;
    alertText += `_Sent directly from Bea Luxe NG website_`;

    // If API key is configured, send directly via CallMeBot
    if (API_KEY) {
      const formattedPhone = STORE_PHONE.replace(/\s+/g, "");
      const encodedText = encodeURIComponent(alertText);
      const url = `https://api.callmebot.com/whatsapp.php?phone=${formattedPhone}&text=${encodedText}&apikey=${API_KEY}`;

      const response = await fetch(url);
      const resultText = await response.text();

      if (!response.ok || resultText.toLowerCase().includes("error")) {
        console.error("CallMeBot error response:", resultText);
        return res.status(502).json({
          success: false,
          error: "CallMeBot failed to send message.",
          details: resultText,
        });
      }

      return res.status(200).json({
        success: true,
        delivered: true,
        message: "Message sent directly to WhatsApp!",
      });
    } else {
      // API Key not yet added - log and return graceful simulated success with instructions
      console.log("[Bea Luxe Store Alert Received]:", alertText);
      return res.status(200).json({
        success: true,
        delivered: false,
        pendingKey: true,
        message:
          "Inquiry received successfully! (Add CALLMEBOT_API_KEY in Vercel to activate direct WhatsApp forwarding).",
      });
    }
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
