// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["nuxt-icon", "@pinia/nuxt", "nuxt-gtag"],
	ssr: true,
	gtag: {
		id: "G-TJ3V7HWRHC",
	},
} as any);
