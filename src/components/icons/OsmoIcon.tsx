export type OsmoIconName =
  | 'VuesaxBoldCopy'
  | 'VuesaxBoldCall'
  | 'VuesaxBoldTickCircle'
  | 'VuesaxBoldCloseCircle'
  | 'VuesaxBoldMicrophone2'
  | 'VuesaxBoldSetting2'
  | 'VuesaxBoldMessageText'
  | 'VuesaxLinearClock'
  | 'VuesaxLinearCalendar'
  | 'VuesaxLinearLocation'
  | 'VuesaxBoldTask'
  | 'VuesaxBoldVoiceSquare';

/* Minimal stand-ins for the Vuesax icon set referenced by the OsmO prototype —
 * the original icon component wasn't part of the design export. */
export default function OsmoIcon({ name, size = 18 }: { name: OsmoIconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24' };
  switch (name) {
    case 'VuesaxBoldCopy':
      return (
        <svg {...common} fill="none">
          <rect x="8" y="8" width="12" height="12" rx="2.5" fill="currentColor" />
          <path d="M6 16H5.5A2.5 2.5 0 0 1 3 13.5v-8A2.5 2.5 0 0 1 5.5 3h8A2.5 2.5 0 0 1 16 5.5V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'VuesaxBoldCall':
      return (
        <svg {...common} fill="currentColor">
          <path d="M21.5 16.7c0 .4-.1.8-.3 1.2-.2.4-.4.7-.7 1a6.6 6.6 0 0 1-4.6 1.9c-.9 0-1.9-.2-2.9-.6a19 19 0 0 1-3-1.6 24 24 0 0 1-2.9-2.5A24 24 0 0 1 4.6 13c-.6-.9-1.1-1.9-1.5-2.9-.4-1-.6-2-.6-2.9 0-.6.1-1.2.3-1.7.2-.6.5-1.1 1-1.5.5-.6 1.1-.8 1.8-.8.3 0 .5.1.8.2.3.1.5.3.6.6l1.9 2.6c.2.2.3.5.4.7.1.2.1.5.1.7 0 .3-.1.5-.2.7-.1.2-.3.5-.5.7l-.6.7c-.1.1-.2.3-.2.5 0 .1 0 .2.1.4.2.4.5 1 1 1.6.5.6 1.1 1.2 1.7 1.8.6.6 1.2 1.1 1.9 1.5.1.1.3.1.4.1.2 0 .3-.1.4-.2l.7-.7c.2-.2.5-.4.7-.5.2-.1.5-.2.7-.2.2 0 .5 0 .7.1.2.1.5.2.7.4l2.6 1.9c.3.2.5.4.6.7.1.2.1.5 0 .8Z" />
        </svg>
      );
    case 'VuesaxBoldTickCircle':
      return (
        <svg {...common} fill="none">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="M8 12.2l2.5 2.5L16 9" stroke="var(--paper, #fff)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'VuesaxBoldCloseCircle':
      return (
        <svg {...common} fill="none">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="M9 9l6 6M15 9l-6 6" stroke="var(--paper, #fff)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'VuesaxBoldMicrophone2':
      return (
        <svg {...common} fill="currentColor">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M6 11a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'VuesaxBoldSetting2':
      return (
        <svg {...common} fill="currentColor">
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.4 13.6a1.7 1.7 0 0 1 0-3.2l.8-.4a1 1 0 0 0 .4-1.3l-1-1.7a1 1 0 0 0-1.3-.4l-.8.4a1.7 1.7 0 0 1-2.8-1l-.1-.9A1 1 0 0 0 13.6 4h-2a1 1 0 0 0-1 .9l-.1.9a1.7 1.7 0 0 1-2.8 1l-.8-.4a1 1 0 0 0-1.3.4l-1 1.7a1 1 0 0 0 .4 1.3l.8.4a1.7 1.7 0 0 1 0 3.2l-.8.4a1 1 0 0 0-.4 1.3l1 1.7a1 1 0 0 0 1.3.4l.8-.4a1.7 1.7 0 0 1 2.8 1l.1.9a1 1 0 0 0 1 .9h2a1 1 0 0 0 1-.9l.1-.9a1.7 1.7 0 0 1 2.8-1l.8.4a1 1 0 0 0 1.3-.4l1-1.7a1 1 0 0 0-.4-1.3l-.8-.4Z" opacity="0.4" />
        </svg>
      );
    case 'VuesaxBoldMessageText':
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.6 1.4 4.9 3.6 6.5-.1 1-.5 2.3-1.4 3.5-.2.2 0 .6.3.5 2-.5 3.6-1.5 4.4-2.1.9.2 2 .3 3.1.3 5.5 0 10-3.9 10-8.7S17.5 2 12 2Z" />
        </svg>
      );
    case 'VuesaxLinearClock':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'VuesaxLinearCalendar':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M3.5 9.5h17M8 3v3M16 3v3" strokeLinecap="round" />
        </svg>
      );
    case 'VuesaxLinearLocation':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 13.4a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8Z" />
          <path d="M3.6 8.9c2.3-9.6 14.5-9.6 16.8 0 1.4 5.7-2.2 10.6-5.4 13.6a3 3 0 0 1-4 0c-3.2-3-6.8-7.9-5.4-13.6Z" />
        </svg>
      );
    case 'VuesaxBoldTask':
      return (
        <svg {...common} fill="currentColor">
          <rect x="4" y="3" width="16" height="18" rx="2.5" opacity="0.25" />
          <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'VuesaxBoldVoiceSquare':
      return (
        <svg {...common} fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="5" opacity="0.25" />
          <rect x="7.5" y="10" width="1.8" height="4" rx="0.9" />
          <rect x="11.1" y="7" width="1.8" height="10" rx="0.9" />
          <rect x="14.7" y="9" width="1.8" height="6" rx="0.9" />
        </svg>
      );
    default:
      return null;
  }
}
