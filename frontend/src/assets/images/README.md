# Place Images for FesGuide

This directory should contain the following images for the Featured Places section on the home page:

1. `bou-inania-madrasa.jpg` - Image of Bou Inania Madrasa
2. `chouara-tannery.jpg` - Image of Chouara Tannery
3. `al-qarawiyyin-mosque.jpg` - Image of Al-Qarawiyyin Mosque
4. `dar-batha-museum.jpg` - Image of Dar Batha Museum
5. `borj-nord.jpg` - Image of Borj Nord
6. `fes-background.jpg` - Background image for the chat bot (can be a scenic view of Fes)

## Image Requirements

- Images should be high quality and properly represent each location
- Recommended size: at least 800x600 pixels
- Landscape orientation works best for the card layout
- Optimize images for web to keep file sizes reasonable (under 300KB per image)

## Alternative Approach

If you prefer to continue using external image URLs, you can modify the Home.tsx file to use reliable image hosting services or CDNs.

Example:

```jsx
<img
  src="https://example.com/path/to/image.jpg"
  alt="Place Name"
  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
/>
```

Make sure any external image URLs you use are from reliable sources that won't remove or change the images.
