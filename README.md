# create-pr

A simple TypeScript CLI Tool that opens the browser to create a PR.

## Setup

First, clone the repo into your home folder and `cd` into it.

Then, run `bun add -g open`, or `pnpm add -g open` depending on your stack.

Then, create a file there called `create-pr` in `/usr/bin` and paste the following contents into it:

```bash
#!/bin/bash

bun run ~/create-pr/index.ts # I'm using bun here, but you can use anything you want :D
```

Then lastly make it executable using `chmod +x /usr/bin/create-pr`.

Then start using it ;)
