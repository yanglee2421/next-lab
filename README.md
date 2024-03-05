# Enterprise

## Installation

```bash
# 1. Install pnpm on POSIX system
curl -fsSL https://get.pnpm.io/install.sh | sh -

# 2. Install nodejs with pnpm
pnpm env use -g lts

# 3. Install nodejs with nodesource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

# 4. Install pnpm, if nodejs is installed through nodesource
corepack enable
```

Just choose one of the [1, 2] and [3, 4] groups to execute.

## Usage

```bash
# Install dependencies
pnpm i

# Disable nextjs telemetry
pnpm exec next telemetry disable

# Build & Deploy
pnpm build
```

## Uninstallation

```bash
# If nodejs installed by pnpm
pnpm env rm -g lts
rm -rf $PNPM_HOME

# If nodejs installed by nodesource
sudo apt-get purge nodejs
```
