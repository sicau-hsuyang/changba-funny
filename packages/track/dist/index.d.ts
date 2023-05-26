type EventType = 'show_page_H5' | 'click_element_H5_ktv'
export declare class Track {
  private sensorURL

  private sensorUtilsURL

  private retryTimes

  private initialized

  config: {
    retry: number
  }

  private asyncQueue

  private insertScript

  init(): Promise<void>

  trackEvent(eventType: EventType, trackData?: Record<string, unknown>): void

  flushTrack(): void
}
export declare const track: (eventType: EventType, trackData?: Record<string, unknown>) => void
export declare function PV(): void
export declare function ElClick(content: string): void
export {}
