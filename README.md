# Service Worker "Server"

## Server endpoints

- `GET /pseudoserver/`: All data as JSON array of JSON objects
- `POST /pseudoserver/`: Add data entry using given multipart form data
- `GET /pseudoserver/:name/`: Get [File](https://developer.mozilla.org/en-US/docs/Web/API/File) response from key `:name`, as returned from `/pseudoserver/` endpoint

## Files

1. `src/service-worker/main.js`: Service Worker entrypoint
2. `src/main.js`: Registers Service Worker
3. `example/`: Example application using [p5.js](https://p5js.org) and the Service Worker Server

