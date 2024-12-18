Day 1: Project Setup
Goals:

Initialize the project.
Setup essential libraries and configurations.
Tasks:

Initialize Next.js project (npx create-next-app@15 leaderboard).
Install dependencies listed in package.json.
Set up Prisma:
Initialize Prisma schema (npx prisma init).
Define database models (Player, Performance, AgeCategory, CubeType).
Connect PostgreSQL database.
Set up Tailwind CSS (npx tailwindcss init).
Add Tailwind configurations for custom styles.
Test project setup by running npm run dev.
Day 2: Database & Prisma
Goals:

Finalize schema and seed database.
Tasks:

Define Prisma models (Player, Performance, enums for AgeCategory and CubeType).
Run Prisma migrations (npx prisma migrate dev).
Create a seed script (prisma/seed.ts) for test data.
Test database queries using Prisma Client.
Verify seeded data in the database.
Day 3: UI Components Setup
Goals:

Create reusable components for the UI.
Tasks:

Set up base components:
Card, Button, Tabs, Table, Dropdown using Radix UI and Tailwind.
Implement layout with Tailwind's container utility.
Build a basic navbar for navigation.
Day 4: Leaderboard UI Framework
Goals:

Build static versions of the leaderboard page.
Tasks:

Create a CubeLeaderboard page.
Add static age categories and cube type filters.
Build a responsive table layout for displaying player data.
Integrate lucide-react icons for enhanced UI.
Day 5: Server Actions for Leaderboard Data
Goals:

Fetch leaderboard data dynamically using Prisma.
Tasks:

Write server-side functions to fetch players' performance based on:
AgeCategory.
CubeType.
Return sorted data (e.g., by timeInSeconds).
Test fetching data using server components.
Day 6: Dynamic Filtering
Goals:

Enable dynamic filtering based on age and cube type.
Tasks:

Create a utility function for query filtering.
Integrate age category and cube type filters with server-side data.
Test filtering and ensure real-time leaderboard updates.
Day 7: Basic Form for New Entries
Goals:

Add a form to input new player data.
Tasks:

Create a form using react-hook-form and zod for validation.
Define validation schema for player and performance data.
Integrate the form with Prisma for data submission.
Test form validations and submissions.
Day 8: Data Management Enhancements
Goals:

Add data creation and update functionality.
Tasks:

Implement update functionality for player and performance data.
Add error handling for database operations.
Ensure unique constraints are respected (e.g., one performance per cube type).
Day 9: Advanced UI Enhancements
Goals:

Polish the UI for production quality.
Tasks:

Add animations using tailwindcss-animate.
Style cards, buttons, and tables for a professional look.
Implement mobile responsiveness.
Day 10: Admin Panel
Goals:

Build an admin panel for managing leaderboard data.
Tasks:

Create an admin page for CRUD operations on players and performances.
Add access control for admin actions (optional).
Use Radix UI Select for better dropdowns.
Day 11: Performance Optimization
Goals:

Optimize app for speed and usability.
Tasks:

Optimize database queries with Prisma (e.g., use include and select wisely).
Preload frequently accessed data using getStaticProps or getServerSideProps.
Enable caching for server responses where applicable.
Day 12: Testing
Goals:

Ensure app reliability with thorough testing.
Tasks:

Write integration tests for server actions.
Test user interactions with filters and forms.
Fix any bugs found during testing.
Day 13: User Feedback
Goals:

Get feedback on the app's usability.
Tasks:

Share the app with a small group of users.
Gather feedback on the UI and features.
Note improvement areas and prioritize fixes.
Day 14: Final Touches
Goals:

Prepare the app for deployment.
Tasks:

Add a favicon and metadata for SEO.
Polish any remaining UI inconsistencies.
Write comprehensive README documentation.
Test the app on multiple devices and browsers.
Day 15: Deployment
Goals:

Deploy the app to production.
Tasks:

Deploy on Vercel (or your preferred platform).
Verify database connections and migrations in production.
Share the app with stakeholders.
Deliverables:
A fully functional, responsive, and dynamic leaderboard app.
Complete CRUD operations for players and performances.
Optimized and production-ready deployment.
Good luck with your project! 🎉
