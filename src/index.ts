export default function chunk(str: string, maxLengthInBytes: number): string[] {
  let buf = Buffer.from(str)
  const result: string[] = []
  while (buf.length) {
    let i = 0
    result.push(buf.subarray(0, maxLengthInBytes).toString())
    i = i + maxLengthInBytes
    buf = buf.subarray(i)
  }
  return result
}