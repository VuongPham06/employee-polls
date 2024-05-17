import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const testConfig = defineConfig({ test: { globals: true } })
export default mergeConfig(viteConfig as never, testConfig as never)
