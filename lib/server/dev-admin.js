import { createHash, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CONFIG_DIR = path.join(process.cwd(), "data");
const CONFIG_PATH = path.join(CONFIG_DIR, "runtime-config.json");
const SESSION_COOKIE = "zkac_dev_session";
const DEFAULT_CONFIG = {
  contractAddress: "",
};

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function getPassword() {
  return process.env.DEV_ADMIN_PASSWORD || "123456789";
}

function getSessionSecret() {
  return process.env.DEV_ADMIN_SECRET || "zkac-hidden-dev-admin";
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function createSessionToken() {
  return sha256(`${getPassword()}:${getSessionSecret()}`);
}

export function isValidSessionToken(token) {
  if (!token) {
    return false;
  }

  const expected = createSessionToken();
  const left = Buffer.from(token);
  const right = Buffer.from(expected);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function isValidPassword(password) {
  const expected = getPassword();
  const left = Buffer.from(password || "");
  const right = Buffer.from(expected);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export async function readRuntimeConfig() {
  try {
    const raw = await readFile(CONFIG_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function writeRuntimeConfig(nextConfig) {
  const normalized = { ...DEFAULT_CONFIG, ...nextConfig };
  await mkdir(CONFIG_DIR, { recursive: true });
  await writeFile(CONFIG_PATH, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  return normalized;
}
