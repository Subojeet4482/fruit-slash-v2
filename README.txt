FRUIT SLASH
===========
A 60-second fruit slicing game made with plain HTML, CSS and JavaScript.

How to run
  Double-click index.html. It opens in any modern browser (Chrome, Edge, Firefox, Safari).
  No install or server needed. Internet is only used for the title font; the game works without it.

How to play
  Swipe (drag the mouse or your finger) to slice fruit with the knife.
  You have 60 seconds. Slice as many fruits as you can.
  Slice 3 or more fruits in one swipe for a combo bonus.
  Slice a bomb and the match ends instantly.

Points
  Lemon 5 | Apple 10 | Orange 12 | Strawberry 15 | Banana 18
  Kiwi 20 | Watermelon 25 | Dragon Fruit 30 | Pineapple 40
  Bomb = game over

Files
  index.html         page structure
  style.css          dojo theme and menu animations
  script.js          game logic, knife animation, background, effects
  sounds.js          the sound files embedded as text (so double-clicking index.html works)
  assets/fruits/     PNG images: <fruit>.png plus <fruit>_half_l.png and <fruit>_half_r.png
  assets/sounds/     MP3 sound effects (slice, swish, splat, bomb, combo, ambience ...)

Use your own images
  Replace any PNG in assets/fruits/ with your own. Keep the same file names, a square image,
  fruit centred. The half_l / half_r files are the two sliced halves (left / right of a vertical cut).

Use your own sounds
  The game plays the sounds from sounds.js. To swap a sound, replace the MP3 in assets/sounds/
  and rebuild sounds.js (base64 of each mp3 stored as window.SFX_DATA = {name: "..."}).
  If you serve the folder from a web server you may also change loadSamples() to fetch the MP3s directly.

Use the speaker button to mute. If the samples cannot load, the game falls back to built-in synthesized sounds.
