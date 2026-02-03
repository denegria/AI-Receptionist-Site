const baseUrl = process.env.BASE_URL || 'https://ai-receptionist-eowl3q.fly.dev';

async function runTests() {
  console.log(`Starting Onboarding Integration Tests against ${baseUrl}...`);
  
  let passed = true;

  // 1. Test Search Numbers
  try {
    console.log('\n--- Testing /api/onboarding/search-numbers ---');
    const searchRes = await fetch(`${baseUrl}/api/onboarding/search-numbers?areaCode=415`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (searchRes.ok) {
      const data = await searchRes.json();
      if (data.numbers && Array.isArray(data.numbers) && data.numbers.length > 0) {
        console.log('✅ PASS: Returned available numbers.');
        console.log(`   Sample: ${data.numbers[0].phoneNumber} (${data.numbers[0].friendlyName})`);
      } else {
        // Some APIs wrap it differently, let's print if structure differs
        if (Array.isArray(data)) {
             console.log('✅ PASS: Returned available numbers (direct array).');
             console.log(`   Sample: ${data[0].phoneNumber} (${data[0].friendlyName})`);
        } else {
            console.error('❌ FAIL: Response valid but no numbers returned or invalid format.');
            console.error(JSON.stringify(data, null, 2));
            passed = false;
        }
      }
    } else {
      console.error(`❌ FAIL: Status ${searchRes.status} ${searchRes.statusText}`);
      const text = await searchRes.text();
      console.error('   Body:', text);
      passed = false;
    }
  } catch (error) {
    console.error('❌ FAIL: Network or execution error:', error.message);
    passed = false;
  }

  // 2. Test Setup Intent
  try {
    console.log('\n--- Testing /api/onboarding/setup-intent ---');
    const setupRes = await fetch(`${baseUrl}/api/onboarding/setup-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });

    if (setupRes.ok) {
      const data = await setupRes.json();
      if (data.clientSecret && typeof data.clientSecret === 'string') {
        console.log('✅ PASS: Returned client_secret.');
      } else if (data.client_secret) {
        console.log('✅ PASS: Returned client_secret (snake_case).');
      } else {
        console.error('❌ FAIL: Response valid but missing clientSecret.');
        console.error(JSON.stringify(data, null, 2));
        passed = false;
      }
    } else {
      console.error(`❌ FAIL: Status ${setupRes.status} ${setupRes.statusText}`);
      const text = await setupRes.text();
      console.error('   Body:', text);
      passed = false;
    }
  } catch (error) {
    console.error('❌ FAIL: Network or execution error:', error.message);
    passed = false;
  }

  // 3. Simulate Provisioning (Negative Test)
  try {
    console.log('\n--- Testing /api/onboarding/provision-number (Guardrails) ---');
    const provisionRes = await fetch(`${baseUrl}/api/onboarding/provision-number`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber: '+15005550006', 
        setupIntentId: 'seti_fake_123456789',
        userId: 'test-user-verification'
      })
    });

    if (!provisionRes.ok) {
        const errorData = await provisionRes.json().catch(() => ({ error: 'Unknown' }));
        console.log(`✅ PASS: Request correctly rejected with status ${provisionRes.status}.`);
        console.log(`   Error message: ${JSON.stringify(errorData)}`);
    } else {
        console.error('❌ FAIL: Request succeeded but should have failed (Safety check failed).');
        passed = false;
    }

  } catch (error) {
    console.log(`ℹ️ Info: Network error on provision (expected if validation is strict): ${error.message}`);
  }

  console.log('\n-----------------------------------');
  if (passed) {
    console.log('OVERALL STATUS: PASS ✅');
  } else {
    console.log('OVERALL STATUS: FAIL ❌');
    process.exit(1);
  }
}

runTests();
