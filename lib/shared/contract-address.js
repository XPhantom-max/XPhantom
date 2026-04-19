const EVM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const BASE58_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function validateContractAddress(address) {
  const normalized = String(address || "").trim();

  if (!normalized) {
    return {
      ok: false,
      message: "CA cannot be empty.",
    };
  }

  if (EVM_ADDRESS_REGEX.test(normalized)) {
    return {
      ok: true,
      kind: "evm",
      normalized,
    };
  }

  if (BASE58_ADDRESS_REGEX.test(normalized)) {
    return {
      ok: true,
      kind: "base58",
      normalized,
    };
  }

  return {
    ok: false,
    message: "CA must be a valid 0x EVM address or a 32-44 char base58 address.",
  };
}
