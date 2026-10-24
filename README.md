# Medical Clinic • Premium website

১১টি HTML পেজসহ সম্পূর্ণ static website। কোনো framework, npm installation বা build প্রয়োজন নেই।

## ব্যবহার

ZIP extract করে index.html ব্রাউজারে খুলুন। সব HTML, CSS, JavaScript এবং ছবি সঙ্গে দেওয়া আছে।

## GitHub থেকে Vercel

1. GitHub-এ নতুন repository তৈরি করুন।
2. Extract করা medical-clinic ফোল্ডারের ভেতরের ফাইল ও assets ফোল্ডার আপলোড করুন। Repository root-এ index.html থাকতে হবে। ZIP ফাইলটি আপলোড করবেন না।
3. Vercel-এ repository import করুন। Framework Preset: Other। Build Command খালি রাখুন। Output Directory: . (root)।
4. Deploy করুন। এই প্যাকেজে কোনো visitor login নেই।

Official reference: https://vercel.com/docs/builds/configure-a-build

## পেজ

Home, About, Departments, Insurance, Contact, Cardiology, Neurology, Orthopaedics, Appointment, Privacy, 404।

## পরিবর্তন

- প্রতিটি পেজের লেখা: সংশ্লিষ্ট HTML ফাইল। Header/footer একই markup প্রতিটি HTML-এ আছে; পরিবর্তন সব পেজে প্রয়োগ করুন।
- রঙ, font, responsive layout: assets/style.css
- Menu, animation, dialogs, forms: assets/site.js
- ঠিকানা, email, phone: assets/config.js (contact page)। Clinic নাম ও hours সংশ্লিষ্ট HTML-এ পরিবর্তন করুন।
- ছবি: assets/। একই নামে নতুন ছবি দিলে markup পরিবর্তন প্রয়োজন নেই।

## Forms

এখন appointment এবং contact ফর্ম validation করে review ও downloadable text draft তৈরি করে। কোনো তথ্য server-এ পাঠায় না, booking confirm করে না এবং browser storage ব্যবহার করে না। প্রকৃত delivery করতে assets/site.js-এর submit handlers-এ clinic-approved backend API সংযোগ করতে হবে এবং সংশ্লিষ্ট preview text/privacy notice পরিবর্তন করতে হবে। শুধু email configuration বদলালে form delivery চালু হবে না।

## Launch-এর আগে

Clinic address, hours, doctor names/qualifications, departments এবং insurance acceptance যাচাই করে নমুনা তথ্য প্রতিস্থাপন করুন। Contact map link-এ প্রকৃত location দিন। Privacy notice প্রতিস্থাপন করুন। Domain নির্ধারণের পর canonical URLs, sitemap ও social sharing image URL যোগ করুন।

## Assets

consultation.webp: built-in Imagegen দিয়ে তৈরি। Prompt: Premium editorial healthcare photograph of a female physician in sage scrubs and a white coat listening to an adult female patient at a pale oak desk in a sunlit cream-and-sage clinic, natural skin texture, soft daylight, no text or logos.

অন্য ছবিগুলো user-supplied reference screenshots থেকে extracted demonstration assets। প্রকাশের আগে ব্যবহারের অধিকার নিশ্চিত করুন অথবা licensed clinic photographs বসান। এগুলো বাস্তব clinician identity যাচাই করে না।

## Verification

Desktop ও 390px mobile layout visually checked। Mobile menu, FAQ expansion, clinician dialog, appointment draft review/download এবং contact draft tested। JavaScript syntax checked। Internal HTML link/asset references checked। Live Vercel deployment করা হয়নি।
