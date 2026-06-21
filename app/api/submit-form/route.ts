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
    console.log("USER:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS);
    const data = await req.json();

    const entryTime = data.entry_time;
    const decisionTime = data.decision_time;

    const timeToDecision =
      typeof entryTime === "number" && typeof decisionTime === "number"
        ? decisionTime - entryTime
        : null;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔥 مهم: verify برای تست اتصال
    await transporter.verify();

    // 🔥 مهم: await اضافه شد + نتیجه ذخیره شد
    const info = await transporter.sendMail({
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

        <p><b>Attempts:</b> YES: ${data.click_count?.yes ?? 0} / NO: ${
          data.click_count?.no ?? 0
        }</p>

        <hr />

        <pre style="background:#f4f4f4;padding:10px;border-radius:8px;">
${JSON.stringify(data, null, 2)}
        </pre>
      `,
    });

    // 🔥 خیلی مهم: لاگ واقعی ارسال
    console.log("📨 EMAIL SENT:", info.messageId);

    return Response.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (err) {
    console.error("EMAIL ERROR:", err);

    return Response.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
