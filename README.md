# Clean Desk Policy – interaktywna strona

Statyczna strona (HTML/CSS/JS), gotowa do publikacji na GitHub Pages.

## Struktura

```
index.html     – struktura strony
style.css      – wygląd i kolory marki (na górze pliku)
script.js      – lista elementów i teksty pop-upów (na górze pliku)
img/biurko.jpg – zdjęcie biurka
```

## Jak zmienić teksty

Otwórz `script.js` i edytuj pole `text` przy danym elemencie w tablicy `ITEMS`.
Tam też zmienisz nazwę (`name`) i kategorię (`allowed: true` = Dozwolone, `false` = Zakazane).

## Publikacja na GitHub Pages

1. Zaloguj się na github.com i kliknij **New repository** (np. nazwa `clean-desk`), ustaw **Public**, kliknij **Create repository**.
2. Na stronie repozytorium kliknij **uploading an existing file** (albo **Add file → Upload files**).
3. Przeciągnij **zawartość** folderu (`index.html`, `style.css`, `script.js`, `README.md` i folder `img`) – nie sam folder nadrzędny. Kliknij **Commit changes**.
4. Wejdź w **Settings → Pages**. W sekcji *Build and deployment* wybierz **Source: Deploy from a branch**, branch **main**, folder **/(root)**, kliknij **Save**.
5. Po 1–2 minutach strona będzie dostępna pod adresem:
   `https://TWOJA-NAZWA.github.io/clean-desk/`

Każda kolejna zmiana (np. podmiana tekstów w `script.js`) publikuje się automatycznie po zapisaniu pliku w repozytorium.

## Podgląd lokalny

Wystarczy dwukrotnie kliknąć `index.html` – strona działa bez serwera.
