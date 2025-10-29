EduConnec — Bridging Students and Colleges Seamlessly

https://educonnec.vercel.app

EduConnec is a collaborative platform built to connect students, colleges, and representatives through events, academic networks, and AI-driven discovery — all within a clean, distraction-free interface. The platform currently runs on mock data to demonstrate the complete UI/UX and structural flow while real backend integration using Supabase is under active development. The team is focused on achieving lightning-fast loading speeds, real-time updates, and a production-ready experience tailored for the student community.

---

**Project Vision**
EduConnec aims to bridge the communication and collaboration gap between students and colleges. It simplifies how students discover opportunities, how colleges showcase their culture, and how representatives manage campus activities. Every feature is being developed for real-time data handling, minimal latency, and an AI-enhanced experience that personalizes content for every user.

---

**Tech Stack**
Frontend: React + Vite + Tailwind CSS
Backend (Planned): Supabase (for authentication, database, and role management)
State Management: React Context API
Hosting: Vercel

---

**Current Status**

* The site currently uses mock data to demonstrate functionality and UI.
* Supabase integration for live data, authentication, and storage is under development.
* Full UI and navigation for all roles are ready and functional.
* Backend and real-time data synchronization are being implemented to make EduConnec fully dynamic.

---

## **Roles and Detailed Features**

### **1. Student Role**

**Purpose:**
Students are the central users of EduConnec. Their experience is designed to help them explore, learn, and connect through a streamlined digital ecosystem.

**Current Functionalities (Mock Data):**

* Browse and explore college events, fests, hackathons, and workshops.
* View and interact with college posts (like, comment, share).
* Follow multiple colleges and get updates on their wall.
* Create posts and share achievements or announcements.
* Save or bookmark interesting events.
* Personalized “Explore” feed showcasing trending and nearby events.
* Access an AI assistant to suggest events or summarize updates.

**Planned Functionalities (Post-Supabase Integration):**

* Real-time event participation and registration.
* AI-curated event suggestions based on interests and behavior.
* Comment moderation, mentions, and threaded discussions.
* College joining requests and verification through institutional emails.
* Personalized dashboard tracking engagement, saved content, and progress.

**Test Credentials:**
Email: student@test.com
Password: Student@123

---

### **2. College Admin Role**

**Purpose:**
College admins represent the official authority of an institution. Their dashboard provides full control over college-related posts, events, and user management.

**Current Functionalities (Mock Data):**

* Access college dashboard with event and post management tools.
* Create, edit, and delete official posts, announcements, and events.
* Manage posts visible on the college wall.
* Review and manage student activities related to their college.
* Oversee and verify college representatives (mock control for now).
* Access engagement metrics (impressions, interactions — mock data).

**Planned Functionalities (Post-Supabase Integration):**

* Real-time post management connected to the database.
* Approve or reject college representative requests.
* Manage student participation in events (approve/reject entries).
* Analytics dashboard showing student engagement and reach metrics.
* Direct collaboration tools to connect with other college admins.
* AI-driven post recommendations and event summaries for efficient moderation.

**Access Credentials:**
Email: college@test.com
Password: College@123
Access Code: collegeadmin

---

### **3. College Representative Role (Under Development)**

**Purpose:**
College representatives act as intermediaries between students and the college admin. They assist in managing events, verifying content, and maintaining college engagement.

**Planned Functionalities:**

* Approve or review student posts before publishing on the college wall.
* Handle event registrations, track participation, and update event details.
* Collaborate with other representatives to manage inter-college events.
* Suggest and draft posts for admin approval.
* Respond to student queries related to events and opportunities.
* Maintain communication between admin and student communities.
* Moderate comment sections and report inappropriate content.
* View participation reports and manage volunteer coordination.

**Access Code:** collegerep
**Status:** Under Development

---

**Data Disclaimer**
EduConnec currently operates on mock data for demonstration purposes.
Integration with Supabase is actively in progress to introduce:

* Real-time authentication
* Secure role-based access control
* Dynamic data fetching
* Instant event updates and live synchronization across all user roles

Once complete, EduConnec will provide an optimized backend with zero lag and lightning-fast user experience.

---

**User Interface Overview**

**Desktop View:**

* **Left Sidebar:** Home, Explore, Create Post, Saved, Profile
* **Top Bar:** Motivational quote, search, notifications, theme toggle, user menu
* **Main Section:** Scroll-based event feed with AI assistant integration
* **Footer:** Smooth scroll-to-top and compact navigation shortcuts

**Mobile View:**

* **Bottom Navigation Bar:** Home, Explore, Create, Saved, Profile
* **Floating Buttons:** AI Assistant, Scroll-to-top
* **Optimized Layout:** Swipe-based navigation and responsive cards

---

**Development Roadmap**

**Currently in Progress:**

* Supabase role-based authentication (student/admin/representative)
* Dynamic event and post fetching
* Backend-driven profile data synchronization

**Planned Next:**

* AI event discovery and recommendations
* College collaboration dashboard
* Automated ranking of colleges based on engagement
* Advanced caching and offline support
* AI-powered moderation system

---

**Developer Note**
EduConnec is currently in its pre-launch stage with complete frontend functionality and mock data architecture. The backend integration and dynamic functionalities are under active development.

The platform’s goal is not short-term — EduConnec is being developed with the vision to become the most intuitive student–college bridge platform in India, with fast performance, intelligent features, and a smooth, professional user experience.

Feedback, feature requests, and collaboration proposals are welcome as the team continues building the full-scale dynamic version.
