# iGym X Landing (GitHub Pages)

Лендинг и юридические страницы iGym X для публикации через GitHub Pages.

## Что внутри
- `/index.html` — главная страница (RU) с поддержкой, FAQ и CTA.
- `/privacy.html` — политика конфиденциальности (включая HealthKit/Apple Health).
- `/terms.html` — пользовательское соглашение.
- `/assets/styles.css` и `/assets/app.js` — стили и интерактивность.

## Как включить GitHub Pages
1. Откройте репозиторий на GitHub.
2. Перейдите в **Settings → Pages**.
3. В **Build and deployment** выберите:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (или ваш production-branch), папка `/ (root)`
4. Сохраните настройки и дождитесь публикации.

## Какие URL указать в App Store Connect
- **Marketing URL:** `https://igymx.ru/`
- **Support URL:** `https://igymx.ru/#support`
- **Privacy Policy URL:** `https://igymx.ru/privacy.html`

## TODO перед релизом
- Заменить `#` у кнопки App Store на реальную ссылку из App Store Connect.
