import throttle from 'lodash.throttle'

interface ThrottleSettings {
  leading?: boolean
  trailing?: boolean
}

export default function useThrottle(
  fn: (args: any) => any,
  delay: number = 300,
  options?: ThrottleSettings
): ReturnType<typeof throttle> {
  return throttle(fn, delay, options)
}
