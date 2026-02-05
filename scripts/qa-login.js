import puppeteer from 'puppeteer';

const CREDENTIALS = {
  email: 'openclawagent.giuseppe@gmail.com',
  password: 'Alvaro1998!'
};

// FAST STAGGER: 500ms - 1500ms
const stagger = async (label) => {
  const delay = Math.floor(Math.random() * 1000) + 500;
  console.log(`[Stagger] Pausing for ${delay}ms (${label})...`);
  await new Promise(r => setTimeout(r, delay));
};

(async () => {
  console.log("Starting QA: Clerk Login Flow (Optimized)...");
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // 1. Navigate
    console.log("Navigating...");
    await page.goto('https://ai-receptionist-site.vercel.app/sign-in', { waitUntil: 'networkidle0' });
    
    // 2. Identify & Login
    console.log("Checking Login State...");
    const url = page.url();
    
    if (url.includes('dashboard')) {
        console.log("PASS: Already logged in.");
        process.exit(0);
    }

    // Handle "Sign In" button on landing page if redirect didn't happen
    if (!url.includes('sign-in')) {
         const signInBtn = await page.$('a[href*="sign-in"]');
         if (signInBtn) {
            console.log("Clicking Sign In button...");
            await signInBtn.click();
            await page.waitForNavigation();
         }
    }

    // CLERK FORM HANDLING
    try {
        await page.waitForSelector('input[name="identifier"], input[type="email"]', { timeout: 10000 });
    } catch(e) {
        console.log("FAIL: Login form not found.");
        await page.screenshot({ path: 'qa-fail-no-form.png' });
        process.exit(1);
    }

    // Email
    await page.type('input[name="identifier"], input[type="email"]', CREDENTIALS.email, { delay: 10 });
    await page.keyboard.press('Enter');
    await stagger("Email Submit");

    // Password
    try {
        await page.waitForSelector('input[name="password"]', { timeout: 5000 });
        await page.type('input[name="password"]', CREDENTIALS.password, { delay: 10 });
        await page.keyboard.press('Enter');
        await stagger("Password Submit");
    } catch(e) {
        // Might be Account Not Found -> Sign Up
        console.log("Password field not found. Checking for errors...");
        const error = await page.$('.cl-formFieldErrorText, .cl-alert');
        if (error) {
            console.log("Account Not Found. Switching to Sign Up...");
            await page.goto('https://ai-receptionist-site.vercel.app/sign-up', { waitUntil: 'networkidle0' });
            
            // Sign Up Flow
            await page.type('input[name="emailAddress"], input[type="email"]', CREDENTIALS.email, { delay: 10 });
            await page.type('input[name="password"]', CREDENTIALS.password, { delay: 10 });
            
            // Name Fields (Patch)
            const firstName = await page.$('input[name="firstName"]');
            if(firstName) await firstName.type('OpenClaw', { delay: 10 });
            
            const lastName = await page.$('input[name="lastName"]');
            if(lastName) await lastName.type('Agent', { delay: 10 });

            await page.keyboard.press('Enter');
            await stagger("Sign Up Submit");
            
            // OTP Check
            const otp = await page.$('input[name="code"]');
            if (otp) {
                console.log("OTP Required. Attempting Test Code...");
                await otp.type('424242'); // Magic Code
                await stagger("OTP Submit");
            }
        }
    }

    // 3. Final Verification
    console.log("Verifying Dashboard Access...");
    try {
        await page.waitForNavigation({ timeout: 15000, waitUntil: 'domcontentloaded' });
    } catch(e) {}

    const finalUrl = page.url();
    console.log("Final URL: " + finalUrl);

    if (finalUrl.includes('dashboard')) {
        console.log("PASS: Dashboard Reached.");
        await page.screenshot({ path: 'qa-login-pass.png' });
    } else {
        console.log("FAIL: Stuck on " + finalUrl);
        await page.screenshot({ path: 'qa-login-fail-stuck.png' });
        process.exit(1);
    }

    await browser.close();
  } catch (err) {
    console.error("CRITICAL ERROR:", err);
    process.exit(1);
  }
})();
