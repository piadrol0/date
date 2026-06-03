export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("submit-form body:", data);

    const response = await fetch(
      "https://piadrol2356.app.n8n.cloud/webhook/submit-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: "date-planner-app",
        }),
      },
    );

    const text = await response.text();

    if (!response.ok) {
      console.error("n8n error:", text);

      return Response.json(
        {
          success: false,
          message: "n8n failed",
        },
        { status: 502 },
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("server error:", error);

    return Response.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 },
    );
  }
}
