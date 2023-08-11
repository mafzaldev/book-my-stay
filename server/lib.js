const adminName = "Afzal";
const adminEmail = "admin@bookmystay.com";
const adminPassword = "tXZm2FpcZz2rsj";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

async function checkout() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "pkr",
          product_data: {
            name: "Bike",
            images: [
              "https://bd.gaadicdn.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-062e4b1d700b63.jpg?tr=w-375",
            ],
          },
          unit_amount: 200000 * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:4000/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:4000",
  });
  return session.url;
}

module.exports = {
  adminName,
  adminEmail,
  adminPassword,
  checkout,
};
