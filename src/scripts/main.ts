import { $ } from './_lib';
import { initTheme, toggleTheme } from './theme';

document.addEventListener('DOMContentLoaded', () => {
	initTheme();
	$('[data-button="toggle-theme"]').on('click', toggleTheme);
});
