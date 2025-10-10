# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Business Questionnaire Web Application - A comprehensive 50-question assessment tool for business owners to gain deeper insights into their business. Built for AI Transformation consultants.

**Technology Stack:**
- **Framework:** Next.js 15 (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma ORM with PostgreSQL
- **Form Management:** React Hook Form (planned) + Zod validation
- **State Management:** React useState + localStorage (current), Database API (production)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Prisma commands
npx prisma generate        # Generate Prisma Client
npx prisma migrate dev     # Create and run migrations
npx prisma studio          # Open Prisma Studio (database GUI)
npx prisma db push         # Push schema changes without migrations
```

## Architecture & Structure

### Core Data Structure

**Question Data (`data/questions.ts`):**
- Contains all 50 questions organized into 10 sections
- Each section has: id, title, description, questions[]
- Each question has: id, text, type, placeholder, required, validation

**Question Types:**
- `text` - Single line text input
- `textarea` - Multi-line text input
- `number` - Numeric input with min/max validation
- `select` - Dropdown selection
- `multiselect` - Multiple checkboxes
- `percentage` - Percentage input (planned)

### Application Flow

1. **Home (`/`)** - Landing page with questionnaire overview
2. **Section Pages (`/questionnaire/[sectionId]`)** - Dynamic routes for 10 sections
3. **Review (`/questionnaire/review`)** - Summary before submission
4. **Complete (`/questionnaire/complete`)** - Confirmation page
5. **Admin (`/admin`)** - Dashboard for viewing responses (planned)

### Database Schema (Prisma)

**Models:**
- `Response` - Main response record with business info and progress
- `Answer` - Individual answers linked to Response

**Key Relations:**
- Response has many Answers (one-to-many)
- Answer belongs to Response (cascade delete)

### Data Storage (Current Implementation)

Currently uses **localStorage** for development:
- `questionnaire_answers` - Array of Answer objects
- `questionnaire_business_name` - Business name string
- `questionnaire_completed` - Completion flag

**Note:** For production, implement API routes to save to PostgreSQL database.

## Key Components

**`components/ProgressBar.tsx`**
- Displays completion progress
- Shows current/total questions and percentage

**`components/QuestionInput.tsx`**
- Renders different input types based on question.type
- Handles validation and error display

**`components/Button.tsx`**
- Reusable button with variants (primary, secondary, outline)
- Sizes: sm, md, lg

## Important Files to Modify

**Adding/Modifying Questions:**
- Edit `data/questions.ts` - Add questions to the appropriate section
- Question IDs must be unique across all sections
- Section IDs must be sequential (1, 2, 3, ...)

**Styling Changes:**
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline Tailwind classes

**Database Schema Changes:**
1. Modify `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description`
3. Update API routes if needed

## Environment Setup

**Required Environment Variables (.env):**

```
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/questionnaire?schema=public"

# Admin Authentication (optional)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"
```

**For production deployment:**
1. Set up PostgreSQL database (Supabase, Neon, Railway, etc.)
2. Update DATABASE_URL in .env
3. Run `npx prisma migrate deploy`
4. Implement API routes for data persistence

## Development Workflow

**When adding new features:**

1. **New Question Types:**
   - Add type to `types/questions.ts`
   - Implement in `components/QuestionInput.tsx`
   - Update validation in section page

2. **New Pages:**
   - Create in `app/[route]/page.tsx`
   - Add navigation links
   - Update routing logic

3. **API Routes (when implementing):**
   - Create in `app/api/[route]/route.ts`
   - Use Prisma client from `lib/prisma.ts`
   - Return JSON responses

## Known Limitations (Current Version)

1. **Data persistence:** Uses localStorage (not suitable for production)
2. **Admin dashboard:** Placeholder only, no actual data viewing
3. **Export functionality:** Not implemented
4. **Authentication:** No user authentication system
5. **API routes:** Not created yet

## Roadmap for Production

**Phase 1: Database Integration**
- Create API routes for CRUD operations
- Replace localStorage with database calls
- Implement session management

**Phase 2: Admin Features**
- Build response viewing interface
- Add filtering and search
- Implement PDF/Excel export

**Phase 3: Authentication**
- Add NextAuth.js or similar
- Implement admin login
- Add user session tracking

**Phase 4: Analytics**
- Create analytics dashboard
- Add charts and insights
- Generate automated reports

## Thai Language Support

The application is primarily in Thai language:
- All UI text is in Thai
- Question data is in Thai
- Ensure UTF-8 encoding for all files
- Test with Thai fonts and characters

## Testing Notes

**Manual Testing Checklist:**
1. Navigate through all 10 sections
2. Test all question input types
3. Verify localStorage saves answers
4. Test back/forward navigation
5. Verify progress bar updates correctly
6. Test form validation
7. Check responsive design on mobile
8. Test review page displays correctly

**Common Issues:**
- Build warnings about unused imports (non-critical)
- TypeScript strict mode enabled - maintain type safety
- Tailwind classes must be complete strings (no dynamic classes)

## Deployment

**Recommended Platforms:**
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **AWS Amplify**

**Deployment Steps:**
1. Push code to GitHub
2. Connect repository to platform
3. Set environment variables
4. Configure build command: `npm run build`
5. Set start command: `npm start`
6. Deploy

**Database Hosting:**
- Supabase (recommended, includes PostgreSQL + Auth)
- Neon (serverless PostgreSQL)
- Railway
- AWS RDS

## Contact & Support

For questions about this questionnaire:
- Purpose: Business assessment for AI Transformation consulting
- Target users: Business owners and entrepreneurs
- Language: Thai (ภาษาไทย)
