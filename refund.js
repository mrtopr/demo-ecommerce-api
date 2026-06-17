// Refund system — intentional bugs hain taaki AI suggest kare
async function processRefund(paymentId, amount) {
  // BUG 1: No input validation
  const payment = await db.findPayment(paymentId);
  
  // BUG 2: No check if refund amount > original
  const refund = await stripe.refund({
    payment_intent: paymentId,
    amount: amount
  });
  
  // BUG 3: Password log ho raha hai
  console.log("Refund processed", payment.user.password);
  
  // BUG 4: No error handling
  await db.updatePayment(paymentId, { refunded: true });
  
  return refund;
}

// PERFORMANCE ISSUE: Har refund pe full table scan
async function getAllRefunds() {
  return await db.query("SELECT * FROM refunds");
}