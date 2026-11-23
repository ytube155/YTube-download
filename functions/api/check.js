
export async function onRequest(context) {
  return new Response(
    JSON.stringify({
      success: true,
      message: "YTube Download Backend is working!"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
