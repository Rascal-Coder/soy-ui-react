declare module 'eslint-plugin-n' {
  const plugin: import('eslint').ESLint.Plugin;

  export default plugin;
}

declare module 'eslint-plugin-unicorn' {
  const plugin: import('eslint').ESLint.Plugin;

  export default plugin;
}

declare module 'eslint-plugin-i' {
  const plugin: import('eslint').ESLint.Plugin;

  export default plugin;
}

declare module 'eslint-plugin-react' {
  type ReactConfigKey = 'all' | 'jsx-runtime' | 'recommended';

  const plugin: import('eslint').ESLint.Plugin & {
    configs: Record<ReactConfigKey, import('eslint').ESLint.ConfigData>;
  };

  export default plugin;
}
declare module 'eslint-plugin-react-hooks' {
  const plugin: import('eslint').ESLint.Plugin;

  export default plugin;
}
declare module 'eslint-plugin-react-refresh' {
  const plugin: import('eslint').ESLint.Plugin;

  export default plugin;
}

declare namespace Demo {
  interface Person {
    name: string;
  }
}
