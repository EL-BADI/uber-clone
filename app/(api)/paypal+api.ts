export async function POST(request: Request): Promise<Response> {
  try {
    console.log("hit");

    const approvalUrl = await createOrder();
    if (!approvalUrl) {
      throw new Error("Approval URL not found");
    }

    return new Response(JSON.stringify({ approvalUrl }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
      }
    );
  }
}

// use the orders API to create an order
async function createOrder(): Promise<string | null> {
  const accessToken = process.env.EXPO_PUBLIC_PAYPAL_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("PayPal access token not found");
  }

  const response = await fetch(
    "https://api-m.sandbox.paypal.com/v1/payments/payment",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        intent: "sale",
        payer: { payment_method: "paypal" },
        transactions: [
          {
            amount: {
              total: "30.11",
              currency: "USD",
              details: {
                subtotal: "30.00",
                tax: "0.07",
                shipping: "0.03",
                handling_fee: "1.00",
                shipping_discount: "-1.00",
                insurance: "0.01",
              },
            },
            description: "The payment transaction description.",
            custom: "EBAY_EMS_90048630024435",
            invoice_number: "48787589673",
            payment_options: {
              allowed_payment_method: "INSTANT_FUNDING_SOURCE",
            },
            soft_descriptor: "ECHI5786786",
            item_list: {
              items: [
                {
                  name: "hat",
                  description: "Brown hat.",
                  quantity: "5",
                  price: "3.00",
                  tax: "0.01",
                  sku: "1",
                  currency: "USD",
                },
                {
                  name: "handbag",
                  description: "Black handbag.",
                  quantity: "1",
                  price: "15.00",
                  tax: "0.02",
                  sku: "product34",
                  currency: "USD",
                },
              ],
              shipping_address: {
                recipient_name: "Brian Robinson",
                line1: "4th Floor",
                line2: "Unit #34",
                city: "San Jose",
                country_code: "US",
                postal_code: "95131",
                phone: "011862212345678",
                state: "CA",
              },
            },
          },
        ],
        note_to_payer: "Contact us for any questions on your order.",
        redirect_urls: {
          return_url: "https://example.com/return",
          cancel_url: "https://example.com/cancel",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error creating PayPal order: ${response.statusText}`);
  }

  const data = await response.json();
  const approvalLink = data.links.find(
    (link: { rel: string }) => link.rel === "approval_url"
  );

  return approvalLink ? approvalLink.href : null;
}
