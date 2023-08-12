const adminName = "Afzal";
const adminEmail = "admin@bookmystay.com";
const adminPassword = "tXZm2FpcZz2rsj";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

async function checkout({ roomNo, price, image, description }) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "pkr",
          product_data: {
            name: roomNo,
            description: description,
            images: [image],
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/customer/payment/{CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/customer/payment/{CHECKOUT_SESSION_ID}`,
  });
  return session.url;
}

const getCurrentDate = () => {
  const unixTime = 1642698000 * 1000;
  const format = {
    weekday: "long",
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  };
  const date = new Date(unixTime)
    .toLocaleDateString("en-US", format)
    .split("T")[0];
  console.log(date);
  return date;
};

module.exports = {
  adminName,
  adminEmail,
  adminPassword,
  checkout,
  getCurrentDate,
};
