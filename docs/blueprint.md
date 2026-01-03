# **App Name**: Liturgical Calendar Argentina

## Core Features:

- Data Interface Definition: Define TypeScript interfaces to strongly type the liturgical data from the JSON file.
- Component Modularization: Modularize the monolithic HTML structure into reusable React components: Header, CalendarGrid, DayCard, and DayModal.
- Dynamic Calendar Grid: Implement a dynamic calendar grid that maps data from the JSON file to individual DayCard components.
- Interactive Day Modal: Create an interactive DayModal component that displays detailed information for a selected day, including liturgical details and biblical readings with preserved line breaks.
- State Management for Modal Visibility: Implement state management using `useState` to control the visibility of the DayModal component based on user interaction.
- Date Parsing and Formatting: Parse the 'fecha' field from the JSON data to extract and format the day number for display in the DayCard component.
- Import JSON Data: In `page.tsx`, import and parse JSON file to make data from `liturgia_completa_dic_2025.json` accessible to app components.

## Style Guidelines:

- Primary color: Amber (#F59E0B) to reflect the liturgical solemnity and Argentinian identity.
- Background color: Light gray (#F5F5F4) to ensure readability and a clean interface.
- Accent color: Stone (#4B5563) for text and interactive elements to provide contrast and legibility.
- Headline font: 'Cinzel' serif for titles, reflecting a vintage, intellectual, and slightly formal style.
- Body font: 'Lato' sans-serif for body text, offering a modern and readable feel.
- Note: currently only Google Fonts are supported.
- FontAwesome icons should be used.
- Responsive grid layout with 7 columns for the calendar, adapting to different screen sizes.
- Modal backdrop blur to focus user attention on the detailed liturgical information.
- Subtle transition effects for modal opening and closing to enhance user experience.