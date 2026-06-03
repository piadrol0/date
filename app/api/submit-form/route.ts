// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     console.log("========== REQUEST DATA ==========");
//     console.log(data);
//     console.log("==================================");
//     const loggedBody = `submit-form body:\n${JSON.stringify(data, null, 2)}`;
//     console.log(loggedBody);

//     if (
//       typeof data?.data === "string" &&
//       data.data.trim().startsWith("<!DOCTYPE")
//     ) {
//       console.warn("submit-form ignored HTML data field from request body");
//     }

//     const { emailSubject } = data;

//     const response = await fetch(
//       "https://piadrol2356.app.n8n.cloud/webhook/submit-form",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           subject: emailSubject || "Date request payload",
//           body: loggedBody,
//         }),
//       },
//     );

//     const responseText = await response.text();

//     if (!response.ok) {
//       console.error("n8n error:", responseText);

//       return Response.json(
//         {
//           success: false,
//           message: "n8n failed",
//         },
//         { status: 502 },
//       );
//     }

//     return Response.json({
//       success: true,
//     });
//   } catch (error) {
//     console.error("server error:", error);

//     return Response.json(
//       {
//         success: false,
//         message: "Server error",
//       },
//       { status: 500 },
//     );
//   }
// }
export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("REQUEST DATA:", data);

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

    const responseText = await response.text();

    console.log("N8N RESPONSE:", responseText);

    if (!response.ok) {
      return Response.json(
        { success: false, message: "n8n failed" },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
