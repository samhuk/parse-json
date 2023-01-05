/**
 * This file defines the public API of the package. Everything here will be available from
 * the top-level package name when importing as an npm package.
 *
 * E.g. `import { createPackageName, PackageNameOptions } from 'parse-json`
 */
import { parseJson } from './parse-json'

export { JSONError } from './parse-json'
export * from './types'

export default parseJson
