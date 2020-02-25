type chrome$MutedInfo = {
  extensionId?: string,
  muted: boolean,
  reason?: chrome$MutedInfoReason
};

type chrome$MutedInfoReason = 'capture' | 'extension' | 'user';

type chrome$Tab = {
  active: boolean,
  audible?: boolean,
  favIconUrl?: string,
  height?: number,
  highlighted: boolean,
  id?: number,
  incognito: boolean,
  index: number,
  mutedInfo?: chrome$MutedInfo,
  openerTabId?: number,
  pinned: boolean,
  selected: boolean,
  sessionId?: string,
  status?: string,
  title?: string,
  url?: string,
  width?: number,
  windowId: number
};

type chrome$TabStatus = 'complete' | 'loading';

type chrome$TabChangeInfo = {
  audible?: boolean,
  favIconUrl?: string,
  mutedInfo?: chrome$MutedInfo,
  pinned?: boolean,
  status?: string,
  title?: string,
  url?: string
};

type chrome$ZoomSettings = {
  defaultZoomFactor?: number,
  mode?: chrome$ZoomSettingsMode,
  scope?: chrome$ZoomSettingsScope
};

type chrome$ZoomSettingsScope = 'per-origin' | 'per-tab';

type chrome$ZoomSettingsMode = 'automatic' | 'disabled' | 'manual';

type $tabs$UpdateProperties = {
  active?: boolean,
  highlighted?: boolean,
  muted?: boolean,
  openerTabId?: number,
  pinned?: boolean,
  selected?: boolean,
  url?: string
};

type chrome$tabs = {
  TAB_ID_NONE: -1,

  captureVisibleTab: (
    ((
      windowId: number,
      options: {
        format?: 'jpeg' | 'png',
        quanlity?: number
      },
    ) => Promise) &
    ((windowId: number) => Promise) &
    ((
      options: {
        format?: 'jpeg' | 'png',
        quanlity?: number
      },
    ) => Promise) &
    (() => Promise)
  ),
  connect(tabId: number, connectInfo?: {
    frameId?: number,
    name?: string
  }): chrome$Port,
  create(createProperties: {
    active?: boolean,
    index?: number,
    openerTabId?: number,
    pinned?: boolean,
    selected?: boolean,
    url?: string,
    windowId?: number
  }): Promise,
  detectLanguage: (
    ((tabId: number, ) => Promise<string>) &
  ): Promise,
  duplicate(tabId: number, callback?: (tab?: chrome$Tab) => void): Promise,
  executeScript: (
    ((
      tabId?: number,
      details: {
        allFrames?: boolean,
        code?: string,
        file?: string,
        frameId?: number,
        matchAboutBlank?: boolean,
        runAt?: chrome$RunAt
      },
    ) => Promise) &
    ((
      details: {
        allFrames?: boolean,
        code?: string,
        file?: string,
        frameId?: number,
        matchAboutBlank?: boolean,
        runAt?: chrome$RunAt
      },
    ) => Promise)
  ),
  get(tabId: number, callback: (tab: chrome$Tab) => void): Promise,
  getAllInWindow: (
    ((windowId: number, callback: (tabs: Array<chrome$Tab>) => void) => void) &
    ((callback: (tabs: Array<chrome$Tab>) => void) => void)
  ),
  getCurrent(callback: (tab?: chrome$Tab) => void): Promise,
  getSelected: (
    ((windowId: number, callback: (tab: chrome$Tab) => void) => void) &
    ((callback: (tab: chrome$Tab) => void) => void)
  ),
  getZoom: (
    ((tabId: number, callback: (zoomFactor: number) => void) => void) &
    ((callback: (zoomFactor: number) => void) => void)
  ),
  getZoomSettings: (
    ((
      tabId: number,
      zoomSettings: chrome$ZoomSettings,
      callback?: () => void
    ) => void) &
    ((
      zoomSettings: chrome$ZoomSettings,
      callback?: () => void
    ) => void)
  ),
  highlight(highlightInfo: {
    tabs: number | Array<number>,
    windowId?: number
  }, callback?: (window: chrome$Window) => void): Promise,
    insertCSS: (
      ((
        tabId: number,
        details: {
          allFrames?: boolean,
          code?: string,
          file?: string,
          frameId?: number,
          matchAboutBlank?: boolean,
          runAt?: chrome$RunAt
        },
        callback?: () => void
      ) => void) &
      ((
        details: {
          allFrames?: boolean,
          code?: string,
          file?: string,
          frameId?: number,
          matchAboutBlank?: boolean,
          runAt?: chrome$RunAt
        },
        callback?: () => void
      ) => void)
    ),
  move(
    tabIds: number | Array<number>,
    moveProperties: {
      index: number,
      windowId?: number
    },
    callback?: (tabs: chrome$Tab | Array<chrome$Tab>) => void
  ): Promise,
  query(queryInfo: {
    active?: boolean,
    audible?: boolean,
    currentWindow?: boolean,
    highlighted?: boolean,
    index?: number,
    lastFocusedWindow?: boolean,
    muted?: boolean,
    pinned?: boolean,
    status?: chrome$TabStatus,
    title?: string,
    url?: string | Array<string>,
    windowId?: number,
    windowType?: chrome$WindowType
  }): Promise,
  reload(
    tabId?: number,
    reloadProperties?: {bypassCache?: boolean},
  ): Promise,
  remove(tabIds: number | Array<number>, callback?: () => void): Promise,
  sendMessage(
    tabId: number,
    message: any,
    options?: {frameId?: number},
  ): Promise,
  sendRequest(tabId: number, request: any): Promise,
  setZoom: (
    ((
      tabId: number,
      zoomFactor: number,
      callback?: () => void
    ) => void) &
    ((
      zoomFactor: number,
      callback?: () => void
    ) => void)
  ),
  setZoomSettings: (
    ((
      tabId: number,
      zoomSettings: chrome$ZoomSettings,
      callback?: () => void
    ) => void) &
    ((
      zoomSettings: chrome$ZoomSettings,
      callback?: () => void
    ) => void)
  ),
  update: (
    ((
      tabId: number,
      updateProperties: $tabs$UpdateProperties,
      callback?: (tab?: chrome$Tab) => void
    ) => void) &
    ((
      updateProperties: $tabs$UpdateProperties,
      callback?: (tab?: chrome$Tab) => void
    ) => void)
  ),

  onActivated: {
    ...chrome$Event,
    addListener(callback: (activeInfo: {
      tabId: number,
      windowId: number
    }) => Promise): void
  },
  onActiveChanged: {
    ...chrome$Event,
    addListener(callback: (tabId: number, selectInfo: {windowId: number}) => Promise): void
  },
  onAttached: {
    ...chrome$Event,
    addListener(callback: (tabId: number, attachInfo: {
      newPosition: number,
      newWindowId: number
    }) => Promise): void
  },
  onCreated: {
    ...chrome$Event,
    addListener(callback: (tab: chrome$Tab) => Promise): void
  },
  onDetached: {
    ...chrome$Event,
    addListener(callback: (tabId: number, detachInfo: {
      oldPosition: number,
      oldWindowId: number
    }) => Promise): void
  },
  onHighlightChanged: {
    ...chrome$Event,
    addListener(callback: (selectInfo: {
      tabIds: Array<number>,
      windowId: number
    }) => Promise): void
  },
  onHighlighted: {
    ...chrome$Event,
    addListener(callback: (highlightInfo: {
      tabIds: Array<number>,
      windowId: number
    }) => Promise): void
  },
  onMoved: {
    ...chrome$Event,
    addListener(callback: (tabId: number, moveInfo: {
      fromIndex: number,
      toIndex: number,
      windowId: number
    }) => Promise): void
  },
  onRemoved: {
    ...chrome$Event,
    addListener(callback: (tabId: number, removeInfo: {
      isWindowClosing: boolean,
      windowId: number
    }) => Promise): void
  },
  onReplaced: {
    ...chrome$Event,
    addListener(callback: (addedTabIds: number, removedTabId: number) => Promise): void
  },
  onSelectionChanged: {
    ...chrome$Event,
    addListener(callback: (tabId: number, selectInfo: {windowId: number}) => Promise): void
  },
  onUpdated: {
    ...chrome$Event,
    addListener(callback: (
      tabId: number,
      changeInfo: chrome$TabChangeInfo,
      tab: chrome$Tab
    ) => Promise): void
  },
  onZoomChange: {
    ...chrome$Event,
    addListener(callback: (ZoomChangeInfo: {
      newZoomFactor: number,
      oldZoomFactor: number,
      tabId: number,
      zoomSettings: chrome$ZoomSettings
    }) => Promise): void
  }
};
