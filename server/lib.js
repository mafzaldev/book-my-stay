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

module.exports = {
  checkout,
};
