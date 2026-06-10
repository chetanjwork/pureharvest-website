const url = 'https://pureharvest-enterprises.vercel.app';

async function verify() {
  console.log('--- STARTING LIVE VERIFICATION ---');

  // 1. Check Reachability & CSP Headers
  console.log('\\n[1] Checking Site Reachability & Headers...');
  try {
    const res = await fetch(url);
    console.log(`Status: ${res.status}`);
    const csp = res.headers.get('content-security-policy-report-only');
    console.log(`CSP Report-Only Header Present: ${!!csp}`);
    if (csp) console.log(`CSP Value snippet: ${csp.substring(0, 50)}...`);
  } catch (e) {
    console.log('Site reachability failed:', e.message);
  }

  // 2. Check OG Image
  console.log('\\n[2] Checking OG Image...');
  try {
    const ogRes = await fetch(`${url}/og-image.jpg`, { method: 'HEAD' });
    console.log(`OG Image Status: ${ogRes.status}`);
    console.log(`Content-Type: ${ogRes.headers.get('content-type')}`);
    console.log(`Content-Length: ${ogRes.headers.get('content-length')}`);
  } catch (e) {
    console.log('OG Image check failed:', e.message);
  }

  // 3. Contact Form Submission (Sheet2)
  console.log('\\n[3] Testing Contact Form (Sheet2)...');
  try {
    const contactRes = await fetch(`${url}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '111.222.333.444' },
      body: JSON.stringify({
        name: 'Live Verify Contact',
        email: 'contact@verify.com',
        phone: '9999999999',
        company: 'Verification Inc',
        message: 'This is an automated test to verify Sheet2 routing.',
        leadSource: 'Contact Form',
        targetSheet: 'Sheet2'
      })
    });
    const contactData = await contactRes.json();
    console.log(`Contact Status: ${contactRes.status}`);
    console.log(`Contact Response:`, contactData);
  } catch (e) {
    console.log('Contact form test failed:', e.message);
  }

  // 4. Enterprise Form Submission (Sheet1) & Drive Upload
  console.log('\\n[4] Testing Enterprise Form (Sheet1) + Drive Upload...');
  try {
    const entRes = await fetch(`${url}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '111.222.333.555' },
      body: JSON.stringify({
        refId: 'PH-LIVE-VERIFY',
        name: 'Live Verify Enterprise',
        whatsapp: '+91 8888888888',
        email: 'enterprise@verify.com',
        company: 'Verification Corp',
        industry: 'Hospitality',
        volume: 'medium',
        customization: ['mockup'],
        city: 'Mumbai',
        orderType: 'recurring',
        logoName: 'test-logo.png',
        // 1x1 transparent PNG base64
        logoBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        leadSource: 'Website Form'
      })
    });
    const entData = await entRes.json();
    console.log(`Enterprise Status: ${entRes.status}`);
    console.log(`Enterprise Response:`, entData);
    if (entData.logoUrl) {
      console.log(`Drive Upload URL Received: ${entData.logoUrl}`);
    } else {
      console.log('Drive Upload URL Missing (Upload Failed or not returned).');
    }
  } catch (e) {
    console.log('Enterprise form test failed:', e.message);
  }

  // 5. Rate Limiting Check
  console.log('\\n[5] Testing Rate Limiting (Upstash)...');
  try {
    let status429Hit = false;
    for (let i = 1; i <= 6; i++) {
      const rlRes = await fetch(`${url}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '222.333.444.555' },
        body: JSON.stringify({
          name: `Rate Limit Test ${i}`,
          _honey: '' // Ensure it doesn't trigger honeypot
        })
      });
      console.log(`Request ${i} Status: ${rlRes.status}`);
      if (rlRes.status === 429) {
        status429Hit = true;
        console.log(`Rate limit triggered on request ${i}`);
        break;
      }
    }
    if (!status429Hit) {
      console.log('Rate Limit NOT Triggered (Is Upstash configured in Vercel?)');
    }
  } catch (e) {
    console.log('Rate limiting test failed:', e.message);
  }

  console.log('\\n--- VERIFICATION COMPLETE ---');
}

verify();
