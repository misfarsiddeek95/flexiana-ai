# Contact Modal Implementation

## Overview

A fully responsive, interactive contact form modal integrated throughout the Flexiana AI website.

## Features

### ✅ Interactive Form

- **Name field** - Required, validates for empty input
- **Email field** - Required, validates email format
- **Message field** - Required, minimum 10 characters

### ✅ User Experience

- Real-time validation with error messages
- Loading state during submission
- Success message after submission
- Auto-close after successful submission
- Backdrop click to close
- Close button (X) in top-right corner
- Prevents body scroll when open
- Smooth animations using Framer Motion

### ✅ Mobile Responsive

- Adapts to all screen sizes
- Touch-friendly on mobile devices
- Proper padding and spacing on small screens
- Full-width on mobile, max-width on desktop

### ✅ Brand Consistency

- Uses Flexiana AI color scheme:
  - Gradient buttons: `#FF6F00` to `#C33C00`
  - Focus states: `#42A5F5` (blue)
  - Error states: Red
  - Success states: Green
- Satoshi font for headings
- Alpino font for body text

## Integration Points

The contact modal is triggered from:

1. **Navbar** - "Contact Us" button (desktop & mobile)
2. **Footer** - "Say Hi!" link
3. **CTA Section** - "Talk to Our AI Experts" button

## Technical Implementation

### Components Created

- `src/components/ui/ContactModal.tsx` - Main modal component
- `src/components/ui/ContactModalWrapper.tsx` - Wrapper for context integration
- `src/contexts/ContactModalContext.tsx` - Global state management

### Modified Components

- `src/app/(root)/layout.tsx` - Added ContactModalProvider
- `src/components/Navbar.tsx` - Integrated modal trigger
- `src/components/Footer.tsx` - Integrated modal trigger
- `src/components/CTASection.tsx` - Integrated modal trigger

## Usage

To open the modal programmatically:

```tsx
import { useContactModal } from "@/contexts/ContactModalContext";

function MyComponent() {
  const { openModal } = useContactModal();

  return <button onClick={openModal}>Contact Us</button>;
}
```

## Form Validation

- **Name**: Cannot be empty
- **Email**: Must be valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Message**: Minimum 10 characters

## Animations

- Modal backdrop: Fade in/out (200ms)
- Modal content: Scale + fade + slide up (300ms)
- Error messages: Fade + slide down
- Success message: Fade + slide down
- Submit button: Loading spinner animation

## Accessibility

- Proper ARIA labels
- Keyboard accessible (Tab navigation)
- Focus management
- Required field indicators (\*)
- Clear error messages
- Close on Escape key (handled by AnimatePresence)

## Future Enhancements

- Backend API integration for form submission
- Email service integration (SendGrid, Mailgun, etc.)
- Form submission tracking/analytics
- CAPTCHA for spam prevention
- File attachment support
- Multi-step form option
