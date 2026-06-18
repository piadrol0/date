import nodemailer from "nodemailer";

const formatDate = (ts: number) => {
  return new Date(ts).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("RAW DATA:", data);
    console.log("📦 DATA:", data);

    const entryTime = data.entry_time;
    const decisionTime = data.decision_time;

    const timeToDecision =
      typeof entryTime === "number" && typeof decisionTime === "number"
        ? decisionTime - entryTime
        : null;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

     transporter.sendMail({
      from: `"Date App" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Event - ${data.event || "unknown"}`,
      html: `
        <h2>New Submission</h2>

        <p><b>Event:</b> ${data.event || "-"}</p>
        <p><b>Name:</b> ${data.personName || data.userName || "-"}</p>
        <p><b>ID:</b> ${data.id || "-"}</p>

        <p><b>Entry Time:</b> ${entryTime ? formatDate(entryTime) : "-"}</p>

<p><b>Time to decision:</b> ${
        timeToDecision ? Math.round(timeToDecision / 1000) : "-"
      }s</p>

        <p><b>Total engagement:</b> ${
          data.time_on_page ? Math.round(data.time_on_page / 1000) : "-"
        }s</p>

        <p><b>Attempts:</b> YES: ${
          data.click_count?.yes ?? 0
        } / NO: ${data.click_count?.no ?? 0}</p>

        <hr />

        <pre style="background:#f4f4f4;padding:10px;border-radius:8px;">
${JSON.stringify(data, null, 2)}
        </pre>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);

    return Response.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
