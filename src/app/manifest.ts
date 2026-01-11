import type {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "thespaintoday.com",
        short_name: "thespaintoday.com",
        description: "Самые горячие новости на русском языке, полученные из различных источников, в частности из разнонаправленных австрийских СМИ (новостные сайты и порталы)",
        start_url: "/",
        display: "standalone",
        theme_color: "#D80027",
        background_color: "#D80027",
        display_override: ["window-controls-overlay"],
        orientation: "portrait",
        icons: [
            {
                "src": "/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    }
}
