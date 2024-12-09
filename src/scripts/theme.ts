export const toggleTheme = () => {
  const root = document.documentElement;
  const isDarkTheme = root.classList.contains('dark-theme');

  // Удаляем текущую тему
  root.classList.remove(isDarkTheme ? 'dark-theme' : 'light-theme');
  // Добавляем противоположную
  root.classList.add(isDarkTheme ? 'light-theme' : 'dark-theme');

  // Сохраняем предпочтение пользователя
  localStorage.setItem('theme-preference', isDarkTheme ? 'light' : 'dark');
};

export const initTheme = () => {
  const savedPreference = localStorage.getItem('theme-preference');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;

  // Слушаем изменения системной темы
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (savedPreference === 'system') {
      root.classList.remove(e.matches ? 'light-theme' : 'dark-theme');
      root.classList.add(e.matches ? 'dark-theme' : 'light-theme');
    }
  });

  // Устанавливаем начальную тему
  if (savedPreference === 'dark' || (savedPreference === 'system' && systemPrefersDark)) {
    root.classList.add('dark-theme');
  } else {
    root.classList.add('light-theme');
  }
};