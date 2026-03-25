#!/bin/bash
# SOL-004: Mint demo HTGN tokens to a wallet for testing
# Usage: ./scripts/faucet-htgn.sh <wallet-address> <amount>
#
# Example: ./scripts/faucet-htgn.sh Bc22iVFo... 10000
# (Mints 10000.00 HTGN — amount is in whole units, not smallest)

set -euo pipefail

export PATH="$HOME/.local/share/solana/install/active_release/bin:$HOME/.cargo/bin:$PATH"

WALLET=${1:?"Usage: $0 <wallet-address> <amount>"}
AMOUNT=${2:?"Usage: $0 <wallet-address> <amount>"}
HTGN_MINT=${HTGN_MINT:?"Set HTGN_MINT environment variable to the token mint address"}

# Ensure devnet
solana config set --url devnet > /dev/null

echo "=== HTGN Faucet ==="
echo "Mint: $HTGN_MINT"
echo "Wallet: $WALLET"
echo "Amount: $AMOUNT HTGN"

# Create associated token account if needed
echo "Creating token account (if needed)..."
spl-token create-account "$HTGN_MINT" --owner "$WALLET" 2>/dev/null || true

# Mint tokens
echo "Minting $AMOUNT HTGN..."
spl-token mint "$HTGN_MINT" "$AMOUNT" --recipient-owner "$WALLET"

echo ""
echo "=== Faucet Complete ==="
echo "Minted $AMOUNT HTGN to $WALLET"
