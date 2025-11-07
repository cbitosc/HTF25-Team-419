
# 🩺 VitalSync — Personal Health Record & Symptom Tracker  

**Smart. Secure. Simplified.**  
Your health companion that helps you track symptoms, store records, and get intelligent insights — all in one place.

---

## 🚀 Overview  
**VitalSync** is a secure, AI-assisted platform that empowers individuals to manage and analyze their personal health data efficiently.  
Users can:
- Upload & organize medical records (lab reports, prescriptions, etc.)
- Track daily health logs & symptoms
- Get AI-powered insights on trends or risks
- Export health summaries for doctors
- Maintain privacy through **role-based access**

The system promotes **preventive healthcare** by helping users monitor patterns before they escalate into serious issues.

---

## 🧩 Core Features  

| Category | Feature | Description |
|-----------|----------|-------------|
| 📂 **Smart Record Management** | Upload, categorize, and view health documents easily. | Organize and access all your medical records — prescriptions, reports, and documents — from one dashboard. |
| 💬 **Symptom Tracker** | Log daily symptoms and visualize progress. | Keep a digital diary of your health conditions and monitor improvements over time. |
| 🤖 **AI Insights** | Detect trends or potential health anomalies. | Leverage AI-powered analytics to identify early warning patterns and health trends. |
| 🔒 **Secure Access** | Role-based access for patients and doctors. | Ensure privacy through permission-based control for users and healthcare professionals. |
| 📤 **Health Summary Export** | Generate shareable reports for consultations. | Export your complete health summary securely to share with medical experts. |
| 🧠 **Privacy-First Design** | All data is encrypted and stored securely. | Implement robust encryption and security measures to protect sensitive health data. |

---

## 🏗️ Tech Stack  

| Layer | Technologies Used |
|--------|-------------------|
| 🖥️ **Frontend** | React + TypeScript + Vite + TailwindCSS + ShadCN UI |
| ⚙️ **Backend** | Supabase (Database + Auth + Edge Functions) |
| 🤖 **AI Layer** | OpenAI / Deno Edge (for symptom analysis) |
| ☁️ **Deployment** | GitHub + Render / Vercel |
---

## ⚙️ Local Setup (Developer Guide)

```bash
# Clone your team repo
git clone https://github.com/Alisha-cloud/HTF25-Team-419.git
cd HTF25-Team-419

# Install dependencies
npm install

# Create your .env file (add Supabase and API keys)
cp .env.example .env

# Run the app
npm run dev
