#!/bin/bash
# SOL-003: Deploy Anchor program to Solana devnet
# Usage: ./scripts/deploy-devnet.sh

set -euo pipefail

export PATH="$HOME/.local/share/solana/install/active_release/bin:$HOME/.cargo/bin:$PATH"

echo "=== Nclusion Escrow Program — Devnet Deploy ==="

# Verify tools
echo "Checking tools..."
solana --version
anchor --version

# Ensure devnet
solana config set --url devnet > /dev/null

# Check balance
BALANCE=$(solana balance | awk '{print $1}')
echo "Devnet balance: $BALANCE SOL"

if (( $(echo "$BALANCE < 0.5" | bc -l) )); then
  echo "Insufficient balance. Requesting airdrop..."
  solana airdrop 2 --url devnet || echo "Airdrop failed — try again later or use https://faucet.solana.com"
fi

# Build
echo "Building program..."
anchor build

# Deploy
echo "Deploying to devnet..."
anchor deploy --provider.cluster devnet

# Show program ID
PROGRAM_ID=$(solana-keygen pubkey target/deploy/escrow-keypair.json 2>/dev/null || echo "unknown")
echo ""
echo "=== Deploy Complete ==="
echo "Program ID: $PROGRAM_ID"
echo "Cluster: devnet"
echo "Explorer: https://explorer.solana.com/address/$PROGRAM_ID?cluster=devnet"
