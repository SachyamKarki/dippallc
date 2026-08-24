type FocusListener = (busy: boolean) => void;

const listeners = new Set<FocusListener>();
let immersiveBusy = false;

/** True while the 360 view needs network/GPU priority. */
export function isImmersiveFocused() {
  return immersiveBusy;
}

export function setImmersiveFocus(busy: boolean) {
  if (immersiveBusy === busy) return;
  immersiveBusy = busy;
  listeners.forEach((listener) => listener(busy));
}

export function subscribeImmersiveFocus(listener: FocusListener) {
  listeners.add(listener);
  listener(immersiveBusy);
  return () => {
    listeners.delete(listener);
  };
}
