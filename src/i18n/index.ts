import { getLanguage } from 'obsidian';
import { derived, get, writable } from 'svelte/store';
import { zh } from './locales/zh';

/**
 * Lightweight, dependency-free i18n layer.
 *
 * The English UI strings are used as the translation keys. `zh.ts` maps those
 * source strings to Simplified Chinese. Missing entries fall back to the
 * English source, so the UI never shows a raw key.
 */

export type Locale = 'en' | 'zh';
export type LanguageSetting = 'auto' | 'en' | 'zh';
export type TranslationVars = Record<string, string | number | undefined>;

const localeWritable = writable<Locale>('en');

/** Read-only locale store, useful for `$locale` subscriptions. */
export const locale = { subscribe: localeWritable.subscribe };

export function normalizeLanguageSetting(value: unknown): LanguageSetting {
	return value === 'en' || value === 'zh' || value === 'auto' ? value : 'auto';
}

export function detectLocale(): Locale {
	let language = '';
	try {
		language = getLanguage() ?? '';
	} catch {
		// `getLanguage` is unavailable in very old Obsidian versions.
	}
	if (!language) {
		language = window.localStorage.getItem('language') ?? navigator.language ?? 'en';
	}
	return language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function resolveLocale(setting: LanguageSetting): Locale {
	return setting === 'auto' ? detectLocale() : setting;
}

export function initI18n(setting: unknown): Locale {
	const resolved = resolveLocale(normalizeLanguageSetting(setting));
	localeWritable.set(resolved);
	return resolved;
}

export function setLanguage(setting: unknown): Locale {
	return initI18n(setting);
}

export function getLocale(): Locale {
	return get(localeWritable);
}

function interpolate(template: string, vars?: TranslationVars): string {
	if (!vars) {
		return template;
	}
	return template.replace(/\{(\w+)\}/g, (match, name: string) => {
		const value = vars[name];
		return value === undefined ? match : String(value);
	});
}

export function translate(currentLocale: Locale, key: string, vars?: TranslationVars): string {
	if (currentLocale === 'zh') {
		return interpolate(zh[key] ?? key, vars);
	}
	return interpolate(key, vars);
}

/**
 * Reactive translator for Svelte components: `{$t('Dashboard')}`.
 */
export const t = derived(
	localeWritable,
	($locale) =>
		(key: string, vars?: TranslationVars): string =>
			translate($locale, key, vars),
);

/**
 * Reactive plural-aware translator for Svelte components:
 * `{$tn(count, '{count} card', '{count} cards', { count })}`.
 */
export const tn = derived(
	localeWritable,
	($locale) =>
		(count: number, one: string, other: string, vars?: TranslationVars): string =>
			translate($locale, count === 1 ? one : other, { count, ...vars }),
);

/**
 * Non-reactive translator for plain TypeScript code (commands, notices,
 * event handlers). Svelte components should use `$t`/`$tn` instead.
 */
export function tr(key: string, vars?: TranslationVars): string {
	return translate(get(localeWritable), key, vars);
}

export function trn(count: number, one: string, other: string, vars?: TranslationVars): string {
	return translate(get(localeWritable), count === 1 ? one : other, { count, ...vars });
}

/**
 * Maps a lowercase card type value (`basic`, `sequence`, …) to the English
 * label used as its translation key (`Basic`, `Sequence`, …).
 */
export function cardTypeKey(type: string): string {
	return type.length > 0 ? type.charAt(0).toUpperCase() + type.slice(1) : type;
}

