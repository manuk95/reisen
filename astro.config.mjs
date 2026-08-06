import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import autoLink from './src/markdown/autolink.mjs';
export default defineConfig({ site:'https://manuk95.github.io', base:'/reisen', output:'static', markdown:{rehypePlugins:[autoLink]}, integrations:[mdx(),sitemap()], trailingSlash:'always' });
