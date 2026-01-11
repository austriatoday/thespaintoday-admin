/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            experimental: {
                scrollRestoration: true,
            },
            images: {
                remotePatterns: [
                    {
                        protocol: 'https',
                        hostname: 'thespaintoday.com',
                    }
                ]
            },
            poweredByHeader: false,
            env: {
                // Локальные переменные
                ENV: 'dev',
                // API_URL: "http://localhost:3000/api"
                API_URL: "https://thespaintoday.com/api"
            }
        }
    } else {
        return {
            experimental: {
                scrollRestoration: true,
            },
            images: {
                remotePatterns: [
                    {
                        protocol: 'https',
                        hostname: 'thespaintoday.com',
                    }
                ]
            },
            poweredByHeader: false,
            env: {
                // Продакшн переменные
                ENV: 'production',
                API_URL: "https://thespaintoday.com/api"
            }
        }
    }
}
