import { type SchemaTypeDefinition } from 'sanity'

import { heroType } from './heroType'
import { siteSettingsType } from './siteSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, heroType],
}
