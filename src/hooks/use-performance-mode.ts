import { useIsMobile } from "./use-is-mobile"
import { useSettings } from "@/context/SettingsContext"

export function usePerformanceMode() {
  const isMobile = useIsMobile()
  const { forcePerformance } = useSettings()

  return isMobile || forcePerformance
}
