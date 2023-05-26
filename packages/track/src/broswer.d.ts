interface Window {
  _cbs?: {
    action: (eventType: string, eventData: Record<string, unknown>) => void
  }
}
