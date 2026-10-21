// Bahasa Malaysia overlays for content entries (see gatewaysMs / postsMs in
// src/content.config.ts). Each returns null when no translation exists, so
// callers fall back to the English entry.
import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "./locale";

let gwMs: Map<string, CollectionEntry<"gatewaysMs">> | undefined;
let postMs: Map<string, CollectionEntry<"postsMs">> | undefined;

export async function gatewayMs(id: string, locale: Locale) {
  if (locale !== "ms") return null;
  gwMs ??= new Map((await getCollection("gatewaysMs")).map((e) => [e.id, e]));
  return gwMs.get(id) ?? null;
}

export async function postMsEntry(id: string, locale: Locale) {
  if (locale !== "ms") return null;
  postMs ??= new Map((await getCollection("postsMs")).map((e) => [e.id, e]));
  return postMs.get(id) ?? null;
}

/** tagline for a gateway in the page language */
export async function gatewayTagline(entry: { id: string; data: { tagline: string } }, locale: Locale) {
  return (await gatewayMs(entry.id, locale))?.data.tagline ?? entry.data.tagline;
}
