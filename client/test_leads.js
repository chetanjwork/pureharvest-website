async function runTests() {
  console.log("Starting 10 End-to-End Lead Submissions...");
  let successCount = 0;
  let failCount = 0;

  for (let i = 1; i <= 10; i++) {
    try {
      const response = await fetch("http://localhost:3000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": `192.168.1.${i}` // Bypass rate limit
        },
        body: JSON.stringify({
          refId: `TEST-${Date.now()}-${i}`,
          name: `Test User ${i}`,
          email: `test${i}@example.com`,
          whatsapp: `987654321${i % 10}`,
          company: `Automated Test Corp ${i}`,
          industry: "hospitality",
          volume: "medium",
          customization: ["mockup", "glass"],
          city: "Mumbai",
          gstNumber: `GST${i}123456789`,
          eventDate: "2026-12-01",
          requestSample: i % 2 === 0,
          leadSource: "Automated QA Audit"
        })
      });

      if (response.ok) {
        successCount++;
        console.log(`[Lead ${i}] Success: ${response.status}`);
      } else {
        const errText = await response.text();
        failCount++;
        console.error(`[Lead ${i}] Failed: ${response.status} - ${errText}`);
      }
    } catch (e) {
      failCount++;
      console.error(`[Lead ${i}] Error:`, e.message);
    }
    
    // Add small delay to not overwhelm Google Apps Script
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log(`\nResults: ${successCount} Successful, ${failCount} Failed.`);
}

runTests();
