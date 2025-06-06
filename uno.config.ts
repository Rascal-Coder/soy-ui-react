import { presetSoybeanUI } from '@soybean-ui/unocss-preset';
import { defineConfig, presetTypography, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { presetAnimations } from 'unocss-preset-animations';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      include: [/.*\/soy-ui.*\.js/]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' }), presetTypography(), presetAnimations(), presetSoybeanUI()]
});
