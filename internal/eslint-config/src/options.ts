import process from 'node:process';

import { GLOB_EXCLUDE, GLOB_JSX, GLOB_TSX } from './constants/glob';
import { DEFAULT_PRETTIER_RULES } from './constants/prettier';
import { loadPrettierConfig } from './shared';
import type { OnDemandRuleKey, Options, ParsedOptions, RequiredRuleBaseOptions } from './types';

export async function createOptions(options: Partial<Options> = {}) {
  const opts: ParsedOptions = {
    cwd: process.cwd(),
    formatter: {
      css: true,
      html: true,
      json: true
    },
    gitignore: true,
    ignores: GLOB_EXCLUDE,
    overrides: {},
    prettierRules: {
      ...DEFAULT_PRETTIER_RULES
    },
    usePrettierrc: true
  };

  const { cwd, formatter, gitignore, ignores, overrides, prettierRules, unocss, usePrettierrc, ...rest } = options;

  if (cwd) {
    opts.cwd = cwd;
  }

  if (ignores?.length) {
    opts.ignores = [...opts.ignores, ...ignores];
  }

  if (gitignore) {
    opts.gitignore = gitignore;
  }

  if (overrides) {
    opts.overrides = overrides;
  }

  if (prettierRules) {
    opts.prettierRules = { ...opts.prettierRules, ...prettierRules };
  }

  if (usePrettierrc !== undefined) {
    opts.usePrettierrc = usePrettierrc;
  }

  if (opts.usePrettierrc) {
    const prettierConfig = await loadPrettierConfig(opts.cwd);
    Object.assign(opts.prettierRules, prettierConfig);
  }

  if (formatter) {
    Object.assign(opts.formatter, formatter);
  }

  const onDemandKeys: OnDemandRuleKey[] = ['react'];

  const onDemandFiles: Record<OnDemandRuleKey, string[]> = {
    react: [GLOB_JSX, GLOB_TSX]
  };

  onDemandKeys.forEach(key => {
    opts[key] = createItemDemandOptions(key, rest[key], onDemandFiles[key]);
  });

  opts.unocss = Boolean(unocss);

  return opts;
}

// Notice: why this function has a wrong return type
/**
 * Create on demand rule options
 *
 * @param key
 * @param options
 * @param files Default files
 */
function createItemDemandOptions<K extends OnDemandRuleKey>(_key: K, options: Options[K], files: string[]) {
  if (!options) return undefined;

  const itemOptions: RequiredRuleBaseOptions = {
    files
  };

  if (typeof options === 'object') {
    Object.assign(itemOptions, options);
  }

  return itemOptions;
}
