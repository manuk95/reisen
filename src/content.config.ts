import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:schema';

const source = z.object({ label: z.string(), url: z.string().url() });
const coords = z.object({ lat: z.number(), lon: z.number() });
const editorial = {
  title: z.string(),
  slug: z.string(),
  trip: z.string().default('georgien-2026'),
  country: z.string().default('Georgien'),
  region: z.string(),
  summary: z.string(),
  categories: z.array(z.string()).default([]),
  status: z.enum(['fix', 'empfohlen', 'optional', 'vorschlag', 'gebucht', 'nicht-auf-route']).default('empfohlen'),
  coordinates: coords.optional(),
  days: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  sources: z.array(source).min(1),
  updated: z.coerce.date(),
  image: z.string().optional(),
  imageCredit: z.string().optional(),
};

const contentLoader = (collection: string) => glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${collection}` });
const trips = defineCollection({ loader: contentLoader('reisen'), schema: z.object({ ...editorial, start: z.coerce.date(), end: z.coerce.date(), travellers: z.array(z.string()), route: z.array(z.string()), hero: z.string() }) });
const days = defineCollection({ loader: contentLoader('reisetage'), schema: z.object({ ...editorial, date: z.coerce.date(), day: z.number().int().positive(), from: z.string(), to: z.string(), character: z.string(), distance: z.string().optional(), driveTime: z.string().optional(), lodging: z.string().optional(), fixed: z.array(z.object({ time: z.string(), label: z.string() })).default([]), recommended: z.array(z.object({ time: z.string(), label: z.string() })).default([]), optional: z.array(z.string()).default([]), climate: z.string(), bathing: z.string(), sunrise: z.string().optional(), sunset: z.string().optional() }) });
const standard = (collection: string) => defineCollection({ loader: contentLoader(collection), schema: z.object(editorial) });

export const collections = { reisen: trips, reisetage: days, orte: standard('orte'), sehenswuerdigkeiten: standard('sehenswuerdigkeiten'), unterkuenfte: standard('unterkuenfte'), restaurants: standard('restaurants'), genuss: standard('genuss'), wissen: standard('wissen'), praktisches: standard('praktisches') };
