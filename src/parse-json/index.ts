import errorEx from 'error-ex'
import fallback from 'json-parse-even-better-errors'
import { codeFrameColumns } from '@babel/code-frame'
import { LinesAndColumns } from 'lines-and-columns'
import { ParseJsonOptions } from './types'

export const JSONError = errorEx('JSONError', {
  fileName: errorEx.append('in %s'),
  codeFrame: errorEx.append('\n\n%s\n'),
})

export const parseJson = (string: string, options?: ParseJsonOptions) => {
  const fileName = options?.fileName
  const reviver = options?.reviver ?? null

  try {
    try {
      return JSON.parse(string, reviver)
    }
    catch (error) {
      fallback(string, reviver)
      throw error
    }
  }
  catch (error: any) {
    error.message = error.message.replace(/\n/g, '')
    const indexMatch = error.message.match(/in JSON at position (\d+) while parsing/)

    const jsonError = new JSONError(error)
    if (fileName)
      jsonError.fileName = fileName

    if (indexMatch && indexMatch.length > 0) {
      const lines = new LinesAndColumns(string)
      const index = Number(indexMatch[1])
      const location = lines.locationForIndex(index)

      const codeFrame = codeFrameColumns(
        string,
        { start: { line: location.line + 1, column: location.column + 1 } },
        { highlightCode: true },
      )

      jsonError.codeFrame = codeFrame
    }

    throw jsonError
  }
}
