import {
  createFormatterConfig,
  createGitignoreRule,
  createImportConfig,
  createJsConfig,
  createNodeConfig,
  createPrettierConfig,
  createReactConfig,
  createTsConfig,
  createUnicornConfig,
  createUnocssConfig
} from './configs';
import { createOptions } from './options';
import { getOverridesRules } from './shared';
import type { Awaitable, FlatConfigItem, Options } from './types';

export * from './types';

export async function defineConfig(options: Partial<Options> = {}, ...userConfigs: Awaitable<FlatConfigItem>[]) {
  const opts = await createOptions(options);

  const ignore: FlatConfigItem = {
    ignores: opts.ignores
  };

  const overrideRecord = getOverridesRules(opts.overrides);

  const gitignore = await createGitignoreRule(opts.gitignore);
  const js = createJsConfig(overrideRecord.js);
  const node = await createNodeConfig(overrideRecord.n);
  const imp = await createImportConfig(overrideRecord.import);
  const unicorn = await createUnicornConfig(overrideRecord.unicorn);
  const ts = await createTsConfig(overrideRecord.ts);
  const react = await createReactConfig(opts.react, overrideRecord.react);
  const unocss = await createUnocssConfig(opts.unocss, overrideRecord.unocss);
  const prettier = await createPrettierConfig(opts.prettierRules);
  const formatter = await createFormatterConfig(opts.formatter, opts.prettierRules);

  const userResolved = await Promise.all(userConfigs);

  const configs: FlatConfigItem[] = [
    ...gitignore,
    ignore,
    ...js,
    ...node,
    ...imp,
    ...unicorn,
    ...ts,
    ...react,
    ...unocss,
    ...userResolved,
    ...prettier,
    ...formatter
  ];

  return configs;
}
