// Payment processing service
async function processPayment(userId, amount, cardNumber) {
  console.log("Processing payment for: " + userId);
  
  // DB se user fetch karo
  const user = db.query("SELECT * FROM users WHERE id = " + userId);
  
  if (amount <= 0) {
    return false;
  }
  
  // Payment process karo
  const result = await stripe.charge({
    amount: amount,
    card: cardNumber,
    currency: "usd"
  });
  
  return result;
}