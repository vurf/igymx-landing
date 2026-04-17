# NotToday static pages deployment notes

These pages are implemented as static files and expected to be hosted under:

- `https://igymx.ru/nottoday/support`
- `https://igymx.ru/nottoday/privacy`

## File structure

```text
nottoday/
  DEPLOYMENT.md
  support/
    index.html
  privacy/
    index.html
assets/
  nottoday.css
```

## Nginx routing (pretty URLs)

If your server root points to the repository root, this block is enough:

```nginx
location /nottoday/ {
  try_files $uri $uri/ =404;
}
```

This ensures `/nottoday/support` resolves to `/nottoday/support/index.html`
and `/nottoday/privacy` resolves to `/nottoday/privacy/index.html`.
