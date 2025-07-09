
# Email Setup Instructions

To enable actual email sending functionality, you need to set up EmailJS:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Create a new service (Gmail, Outlook, etc.)

## Step 2: Create Email Template
Create a template with these variables:
- {{to_name}} - Recipient name
- {{to_email}} - Recipient email
- {{skill_name}} - Skill being tested
- {{test_score}} - Score achieved
- {{total_questions}} - Total questions
- {{percentage}} - Percentage score
- {{test_length}} - Test length
- {{performance_analysis}} - Performance analysis
- {{improvements}} - Improvement suggestions
- {{test_type}} - Type of test
- {{date}} - Test date

## Step 3: Update EmailReport Component
Replace these placeholders in EmailReport.tsx:
- YOUR_EMAILJS_PUBLIC_KEY - Your EmailJS public key
- YOUR_SERVICE_ID - Your EmailJS service ID  
- YOUR_TEMPLATE_ID - Your EmailJS template ID

## Sample Email Template:
```
Hi {{to_name}},

Here's your {{skill_name}} {{test_type}} report:

📊 Score: {{test_score}}/{{total_questions}} ({{percentage}}%)
📝 Test Length: {{test_length}} questions
📅 Date: {{date}}

🎯 Performance Analysis:
{{performance_analysis}}

💡 Areas for Improvement:
{{improvements}}

Keep practicing and improving your DevOps skills!

Best regards,
DevOps Quiz Team
```
