# Dashboard & Pages Documentation

## Overview
Created a complete multi-page dashboard application with routing for your Learning Hub.

## Pages Created

### 1. **Dashboard** (`/`)
- Main landing page after login
- 4 beautiful cards displayed in a 2x2 grid:
  - **Timetable Generation** 📅
  - **User Wellness** 💚
  - **Learning Resources** 📚
  - **Progress Tracking** 📈
- Each card is clickable and navigates to its respective page
- Purple gradient background

### 2. **Timetable Generation** (`/timetable`)
- Centered input form on the page
- Large textarea for users to describe their schedule preferences
- Users can input:
  - Subjects they want to study
  - Available time slots
  - Preferred study duration
  - Break preferences
- Submit button to generate timetable
- Purple gradient background

### 3. **Learning Resources** (`/learning`)
- Centered input form on the page
- Large textarea for users to describe what they want to learn
- Users can input:
  - Topics they want to learn
  - Learning level (beginner/intermediate/advanced)
  - Preferred learning style (videos/articles/tutorials)
- Submit button to find resources
- Pink/coral gradient background

### 4. **User Wellness** (`/wellness`)
- Placeholder page for wellness tracking features
- Teal gradient background
- Ready for future implementation

### 5. **Progress Tracking** (`/progress`)
- Placeholder page for progress monitoring features
- Peach gradient background
- Ready for future implementation

## Features

### Navigation
- **Back Button**: Fixed position on top-left of each page (except Dashboard)
- **Sign Out Button**: Fixed position on top-right (visible on all pages after login)
- All buttons have smooth hover animations

### Authentication Flow
1. User sees a beautiful login page if not authenticated
2. After Google login, redirected to Dashboard
3. Can navigate freely between all pages
4. Sign out button always accessible

### Design Features
- **Responsive**: Mobile-friendly design
- **Modern UI**: Gradient backgrounds, rounded corners, shadows
- **Smooth Animations**: Hover effects, transitions
- **Centered Layouts**: Clean, focused user experience
- **Color Coded**: Each page has its own unique gradient theme

## File Structure
```
Frontend/src/
├── App.tsx (Updated with routing)
├── pages/
│   ├── Dashboard.tsx
│   ├── Dashboard.css
│   ├── TimetableGeneration.tsx
│   ├── TimetableGeneration.css
│   ├── LearningResources.tsx
│   ├── LearningResources.css
│   ├── UserWellness.tsx
│   ├── UserWellness.css
│   ├── ProgressTracking.tsx
│   └── ProgressTracking.css
```

## Dependencies Installed
- `react-router-dom` - For page routing and navigation

## To Run
```bash
cd Frontend
npm run dev
```

## Next Steps
You can now:
1. Connect the form submissions to your backend APIs
2. Add actual timetable generation logic
3. Implement learning resource fetching
4. Build out wellness tracking features
5. Add progress monitoring capabilities

## Customization
Each page has its own CSS file, making it easy to:
- Change colors and gradients
- Adjust spacing and sizes
- Add more form fields
- Customize animations
