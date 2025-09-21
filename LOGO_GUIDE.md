# 🎨 Logo Integration Guide for ByteMedics

## 📁 Logo Files Added

✅ **Logo Files Created:**
- `/apps/frontend/public/logo.svg` - Main logo file
- `/apps/frontend/public/favicon.svg` - Browser favicon
- `/apps/frontend/src/components/Logo.tsx` - Reusable Logo component

## 🔧 How to Use the Logo Component

### Basic Usage
```tsx
import { Logo } from '@/components/Logo';

// Simple logo without text
<Logo width={40} height={40} />

// Logo with brand text
<Logo width={40} height={40} showText={true} />
```

### Props Available
- `width` (number): Width of the logo in pixels (default: 40)
- `height` (number): Height of the logo in pixels (default: 40)
- `showText` (boolean): Whether to show "ByteMedics" text (default: false)
- `className` (string): Additional CSS classes

## 🎯 Where Logos Are Used

1. **Landing Page** (`/apps/frontend/src/app/page.tsx`)
   - Header with logo + text
   - Responsive and theme-integrated

2. **Chat Page** (`/apps/frontend/src/app/chat/page.tsx`) 
   - Header with logo only (no text to save space)

3. **Browser Tab** (via metadata in layout.tsx)
   - Favicon automatically loads from `/favicon.svg`

## 🔄 How to Replace with Your Own Logo

### Option 1: Replace the SVG file
1. Create your logo as an SVG file
2. Replace `/apps/frontend/public/logo.svg` with your file
3. Keep the same filename for automatic loading

### Option 2: Use a different format (PNG/JPG)
1. Add your logo file to `/apps/frontend/public/` (e.g., `logo.png`)
2. Update the Logo component to use your file:
```tsx
// In Logo.tsx, change this line:
src="/logo.svg"
// To:
src="/logo.png"
```

### Option 3: Use multiple logo variants
```tsx
// You can create different logos for different themes
const logoSrc = isDark ? "/logo-dark.svg" : "/logo-light.svg";
```

## 🎨 Logo Design Guidelines

### Current Logo Features:
- Medical cross design
- Green color scheme (#10b981)
- Simple, clean SVG format
- Works on light and dark backgrounds

### Recommended Specs:
- **Format**: SVG (preferred) or PNG
- **Size**: 100x100px minimum
- **Background**: Transparent
- **Colors**: Should work with your theme
- **Style**: Simple, professional, readable at small sizes

## 🚀 Fallback System

The Logo component includes a smart fallback:
- If your logo file fails to load, it shows a "B" in a green circle
- Ensures your app always has a visual brand element
- No broken image icons

## 🔧 Advanced Customization

### Theme Integration
```tsx
// The logo can respond to your theme colors
import { useTheme } from '@/contexts/ThemeContext';

const { colors } = useTheme();
// Use colors.primary[500] for dynamic theming
```

### Responsive Sizing
```tsx
// Different sizes for different screen sizes
<Logo 
  width={window.innerWidth > 768 ? 50 : 35} 
  height={window.innerWidth > 768 ? 50 : 35}
  showText={window.innerWidth > 768}
/>
```

## ✨ Next Steps

1. **Test Current Logo**: Visit `http://localhost:3001` to see the placeholder logo
2. **Replace with Your Logo**: Upload your logo file to `/public/`
3. **Customize**: Adjust the Logo component props as needed
4. **Deploy**: Your logo will automatically be included in builds

## 🎯 Pro Tips

- Keep logo files under 100KB for fast loading
- Test your logo on both light and dark themes
- Consider creating a simple monogram version for small spaces
- SVG format is recommended for crisp scaling
- Always include alt text for accessibility

---

Need help customizing further? The Logo component is fully customizable and theme-integrated! 🚀