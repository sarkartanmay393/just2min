import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": 'Just 2 Minutes',
    "short_name": 'Just2Min',
    "description": 'Build habits with the 2-minute strategy',
    "start_url": '/',
    "display": 'standalone',
    "theme_color": "#bdd4d3",
    "background_color": "#bdd4d3",
    "icons": [
    {
      "src": "/web-app-manifest-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  }
}