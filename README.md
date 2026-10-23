

<h1 align="center">ptweb</h1>
<p align="center">
  <img src="icon/ptweb.png" alt="ptweb" width="120" height="120">
</p>

<p align="center">
  <strong>Run shell commands from your browser.</strong><br>
  <code>ptweb://run?cmd=ls</code> => opens terminal => runs
</p>

---

## Install

```bash
https://github.com/i3idev/ptweb.git
cd ptweb
python3 ptweb.py install
ptweb test
```

## Usage

From terminal:

```bash
xdg-open 'ptweb://run?cmd=pwd%20%26%26%20ls'
```

From browser console (chatgpt.com, GitHub, any page):

```js
// paste the Run script from this repo → click Run on any code block
```

## CLI

```bash
ptweb install              # install
ptweb remove [--purge]     # uninstall
ptweb set-path ~/project   # set default cwd
ptweb set-terminal kitty   # set terminal
ptweb status               # health check
ptweb test                 # test it
```

## Protocol

```
ptweb://run?cmd=<urlencoded>[&cwd=<urlencoded>][&clip=1]
```

- `cmd` — shell command
- `cwd` — working directory
- `clip=1` — read command from clipboard (for long commands)

## How it works

```
browser → ptweb:// URL → ~/.local/bin/ptweb-run → terminal → bash
```

No server. No daemon. Just a protocol handler.

## Uninstall

```bash
ptweb remove --purge
```

## License

MIT
