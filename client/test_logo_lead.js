const fs = require('fs');
async function runTest() {
  const tinyPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  const refId = `TEST-LOGO-${Date.now()}`;
  
  console.log(`Submitting lead with refId: ${refId} and a tiny PNG logo...`);
  const start = Date.now();
  const response = await fetch("http://localhost:3000/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `192.168.1.99` // Bypass rate limit
    },
    body: JSON.stringify({
      refId: refId,
      name: "Logo Test User",
      email: "logo@example.com",
      whatsapp: "9876543210",
      company: "Logo Upload Corp",
      industry: "hospitality",
      volume: "large",
      customization: ["engraving"],
      city: "Pune",
      gstNumber: "GST123LOGO",
      eventDate: "2026-10-10",
      requestSample: true,
      leadSource: "Automated Logo QA",
      logoName: "test_logo.png",
      logoBase64: tinyPngBase64
    })
  });

  if (!response.ok) {
    console.error("Submission failed:", response.status, await response.text());
    return;
  }
  
  const data = await response.json();
  console.log("Success! Received response:", data);
  
  if (data.logoUrl && data.logoUrl.startsWith("http")) {
    console.log("Validating Google Drive Logo URL accessibility...");
    const driveRes = await fetch(data.logoUrl);
    console.log("Drive URL HTTP Status:", driveRes.status);
    if (driveRes.status === 200) {
      console.log("✅ Google Drive Image is PUBLICLY ACCESSIBLE!");
    } else {
      console.error("❌ Google Drive Image might not be public.");
    }
  } else {
    console.error("❌ No valid logoUrl returned.");
  }
}
runTest();
