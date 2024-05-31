import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			input: {
				home: "src/home.html",
				events: "src/events.html",
				contact: "src/contact.html",
				welcome: "src/welcome.html",
			}
		}
	},
	publicDir: "../public",
	root: "src"
});
