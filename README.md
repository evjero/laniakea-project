# Laniakea Project

> Started April 2, 2022 - evjero

Project created in order to expand knowledge of bridging the gap between frontend and backend engineering via **Node.js**. Allowing me to write both edges of the stack in the same language (TypeScript). Specifically, I'm polishing my AuthN and AuthZ skills of a served application. Heavy processing and performance concerns is not as critical in this project.

# Project Overview

This project, despite it's name, will use Exoplanet data captured by Kepler via their [TAP interface](https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html#PS). These Kepler Objects of Interest (KOI) will be provided in a tabular (CSV) format. Offline use will use a downloaded table backup.

These KOI will enable us to launch our own missions to explore the edges of space.

# Appendix

## Node.js

> Node.js is "an asynchronous event-driven JavaScript runtime... designed to build scalable network applications. ...if there is no work to be done, Node.js will sleep" :bed: :zzz:

Node.js is very good at servers, networking (auth) and I/O. Unfortunately it is not good at leveraging GPU tasks like AI/ML or heavy CPU processing.

### Node.js vs Browser Runtimes

Browsers contain `window` but Node.js will contain [`global`](https://nodejs.org/dist/latest-v16.x/docs/api/globals.html). They each offer a variety of utility functions and variables, both of which are critical for developing nearly any program.

| `window`    | `global`       |
| ----------- | -------------- |
| _document_  | _process_      |
| _history_   | _module_       |
| _location_  | _\_\_filename_ |
| _navigator_ | _require()_    |

### Node.js Internals

Constructed on the backs of [v8](https://github.com/v8/v8) and [libuv](https://github.com/libuv/libuv) (C++), Node.js provides many useful modules, APIs, and automatic bindings for allowing programmatic access to operating system functions, like Async I/O for instance.

#### Threads

By default, there are 5 threads for a Node.js process. One `main`, which contains the event loop, and 4 auxilliary threads awaiting worker tasks. These threads are made available via _libuv_. However not all tasks are available to be run through the thread pool, and thus are sent to the OS kernel, like networking. Node.js automatically does the decision-making on the thread process.

#### Event Loop

While loops and callback queues (FIFO) are the bread and butter of operations within the Node.js process. These are virtually invisible to the day-to-day developer but key to the ordered phases below that are relevant to JavaScript.

1. Timers
    - `setTimeout` & `setInterval` operations
2. I/O callbacks
    - File system operations
    - Polling
3. `setImmediate`
    - "ASAP" invocation
4. Close callbacks
