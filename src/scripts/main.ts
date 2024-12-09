import { $ } from "./_lib";
import { initTheme, toggleTheme } from "./theme";

document.addEventListener('DOMContentLoaded', () => {
	initTheme()

	$('button').on('click', () => {
		toggleTheme()
	});
});
