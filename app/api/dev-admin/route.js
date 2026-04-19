import { NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionCookieName,
  isValidPassword,
  isValidSessionToken,
  readRuntimeConfig,
  writeRuntimeConfig,
} from "@/lib/server/dev-admin";
import { validateContractAddress } from "@/lib/shared/contract-address";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getAuthorized(request) {
  const token = request.cookies.get(getSessionCookieName())?.value || "";
  return isValidSessionToken(token);
}

async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function GET(request) {
  const config = await readRuntimeConfig();
  return NextResponse.json({
    authorized: getAuthorized(request),
    contractAddress: config.contractAddress || "",
  });
}

export async function POST(request) {
  const body = await readJsonBody(request);

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const action = body?.action;

  if (action === "authenticate") {
    if (!isValidPassword(body?.password || "")) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: getSessionCookieName(),
      value: createSessionToken(),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
  }

  if (action === "logout") {
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      name: getSessionCookieName(),
      value: "",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  if (action === "update") {
    if (!getAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const validation = validateContractAddress(body?.contractAddress || "");

    if (!validation.ok) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    const config = await writeRuntimeConfig({
      contractAddress: validation.normalized,
    });
    return NextResponse.json({
      ok: true,
      contractAddress: config.contractAddress || "",
      kind: validation.kind,
    });
  }

  return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
}
