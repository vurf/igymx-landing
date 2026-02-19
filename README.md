# iGym X Landing

Статический лендинг для App Store Connect (Support URL + Privacy Policy URL).

## Публикация на GitHub Pages

1. Откройте **Settings → Pages**.
2. В разделе **Build and deployment** выберите:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` (или нужная ветка), папка `/ (root)`
3. Сохраните и дождитесь публикации.

## Рекомендуемые URL для App Store Connect

- **Support URL (RU):** `https://<your-domain>/#support`
- **Support URL (EN):** `https://<your-domain>/index-en.html#support`
- **Privacy Policy URL (RU):** `https://<your-domain>/privacy.html`
- **Privacy Policy URL (EN):** `https://<your-domain>/privacy-en.html`

## Файлы

- `index.html` — RU лендинг
- `index-en.html` — EN лендинг
- `privacy.html` / `privacy-en.html` — полная политика конфиденциальности
- `user-agreement.html` / `user-agreement-en.html` — пользовательское соглашение

## Важно перед релизом

- Замените `href="#"` у кнопок App Store на реальную ссылку.
- Обновите плейсхолдер даты `Обновлено: <MONTH> <YEAR>`.
- При необходимости замените текстовые плейсхолдеры в блоке "Смотрите в действии" на реальные скриншоты (тег `<img>` или `picture`).
