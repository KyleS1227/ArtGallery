# Art Gallery - User Profile Page

A Progressive Web App (PWA) user profile page for an art gallery application where users can view and update their account information.

## Features

- **View Profile Information**: Display user account details including:
  - Profile picture
  - Full name
  - Account name
  - Email address
  - Phone number
  - Art style preference

- **Edit Profile**: Users can update their account information with:
  - Profile picture upload
  - Form validation
  - Save/Cancel functionality
  - Success notifications

- **Responsive Design**: 
  - Mobile-first design
  - Works on all screen sizes

## Files Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── app.js              # JavaScript functionality
└── README.md          # This file
```

## Usage

1. Open `index.html` in a web browser
2. View your profile information
3. Click "Edit Profile" to modify your information
4. Upload a new profile picture by clicking the camera icon
5. Make changes and click "Save Changes" or "Cancel"

## Data Storage

Profile data is stored in the browser's localStorage. In a production environment, this would be connected to a backend API.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Art Styles Available

- Realism
- Abstract
- Impressionism
- Expressionism
- Surrealism
- Pop Art
- Minimalism
- Contemporary
- Digital Art
- Mixed Media
- Other

## Notes

- Profile pictures are stored as base64 data URLs in localStorage
- Maximum image size: 5MB
- Phone number formatting is automatically applied
- All form fields are validated before saving

