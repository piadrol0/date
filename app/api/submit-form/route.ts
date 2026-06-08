export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("REQUEST TO N8N:", data);
    console.log("📦 RAW DATA FROM FRONTEND:", data);

    const response = await fetch(
      "https://piadrol2356.app.n8n.cloud/webhook/submit-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const text = await response.text();
    console.log("🤖 N8N RESPONSE:", text);
    console.log("N8N RESPONSE:", text);
    if (!response.ok) {
      console.error("❌ N8N FAILED:", text);

      return Response.json(
        {
          success: false,
          error: text,
        },
        { status: 502 },
      );
    }
    return Response.json({
      success: true,
      n8nResponse: text,
    });
  } catch (err) {
    console.error("ERROR:", err);

    return Response.json({ success: false }, { status: 500 });
  }
}
