async function runTest() {
  console.log("Submitting test inquiry to Contact Form...");
  const response = await fetch("http://localhost:3000/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `192.168.1.100` // Bypass rate limit
    },
    body: JSON.stringify({
      refId: `CONTACT-TEST-${Date.now()}`,
      name: "Arjun Sharma",
      email: "arjun@enterprise.com",
      company: "Organization Name",
      message: "Describe your requirements...",
      leadSource: "Contact Form",
      targetSheet: "Sheet2"
    })
  });

  const data = await response.json();
  console.log("Response status:", response.status);
  console.log("Response data:", data);
}
runTest();
