#!/bin/bash
# SOL-004: Create HTGN demo token mint on Solana devnet
# Usage: ./scripts/create-htgn-mint.sh
#
# Creates an SPL Token mint with:
# - 2 decimals (matches HTG currency precision)
# - Platform-controlled mint authority
# - Outputs mint address for .env configuration

set -euo pipefail

export PATH="$HOME/.local/share/solana/install/active_release/bin:$HOME/.cargo/bin:$PATH"

echo "=== HTGN Demo Token Mint — Devnet ==="

# Verify tools
solana --version

# Ensure devnet
solana config set --url devnet > /dev/null

# Check balance
BALANCE=$(solana balance | awk '{print $1}')
echo "Devnet balance: $BALANCE SOL"

if (( $(echo "$BALANCE < 0.1" | bc -l) )); then
  echo "ERROR: Insufficient SOL balance. Need at least 0.1 SOL."
  echo "Run: solana airdrop 2 --url devnet"
  echo "Or visit: https://faucet.solana.com"
  exit 1
fi

# Create mint with 2 decimals
echo "Creating HTGN token mint (2 decimals)..."
MINT_OUTPUT=$(spl-token create-token --decimals 2 2>&1)
MINT_ADDRESS=$(echo "$MINT_OUTPUT" | grep "Creating token" | awk '{print $3}')

if [ -z "$MINT_ADDRESS" ]; then
  echo "ERROR: Failed to create token mint"
  echo "$MINT_OUTPUT"
  exit 1
fi

echo ""
echo "=== HTGN Mint Created ==="
echo "Mint Address: $MINT_ADDRESS"
echo "Decimals: 2"
echo "Authority: $(solana address)"
echo "Cluster: devnet"
echo "Explorer: https://explorer.solana.com/address/$MINT_ADDRESS?cluster=devnet"
echo ""
echo "Add to .env:"
echo "HTGN_MINT=$MINT_ADDRESS"
