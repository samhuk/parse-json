import { parseJson } from '.'

describe('parse-json', () => {
  describe('parseJson', () => {
    const fn = parseJson

    test('basic test (no error)', () => {
      expect(fn('{"foo": true}')).toEqual({ foo: true })
    })

    test('basic test (has error)', () => {
      expect(() => fn('{\n\t"foo": true,\n}')).toThrow()
    })
  })
})
