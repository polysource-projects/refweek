// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["nuxt-icon", "@pinia/nuxt", "nuxt-gtag"],
	ssr: true,
	app: {
		head: {
			script: [
				{
					async: true,
					defer: true,
					"data-website-id": "1b3df033-91b4-41ee-968a-d0b45e9605c0",
					src: "https://analytics.sys.epfl.tools/umami.js",
				},
			],
		},
	},
} as any);
