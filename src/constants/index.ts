export const APP_NAME = 'Smart Bookmark';
export const APP_DESCRIPTION = 'Organize and access your bookmarks anywhere with Smart Bookmark';
export const APP_TAGLINE = 'Organize and access your bookmarks anywhere';

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
} as const;

export const DATABASE = {
    SCHEMA: 'public',
    TABLES: {
        BOOKMARKS: 'bookmarks',
    },
    CHANNELS: {
        BOOKMARKS_CHANGES: 'bookmarks-changes',
    },
    EVENTS: {
        ALL: '*',
        INSERT: 'INSERT',
        DELETE: 'DELETE',
        UPDATE: 'UPDATE',
    },
    COLUMNS: {
        CREATED_AT: 'created_at',
        USER_ID: 'user_id',
        ID: 'id',
    },
} as const;

export const ASSETS = {
    LOGO: '/bookmark.svg',
} as const;

export const FORM_LABELS = {
    TITLE: 'Title',
    URL: 'URL',
} as const;

export const PLACEHOLDERS = {
    TITLE: 'Enter bookmark title',
    URL: 'https://example.com',
} as const;

export const BUTTON_LABELS = {
    ADD_BOOKMARK: 'Add Bookmark',
    ADDING: 'Adding...',
    LOGOUT: 'Logout',
    LOGGING_OUT: 'Logging out...',
    DELETE: 'Delete bookmark',
} as const;

export const HEADINGS = {
    ADD_NEW_BOOKMARK: 'Add New Bookmark',
    MY_BOOKMARKS: 'My Bookmarks',
} as const;

export const MESSAGES = {
    LOADING: 'Loading...',
    NO_BOOKMARKS: 'No bookmarks yet',
    NO_BOOKMARKS_DESCRIPTION: 'Add your first bookmark to get started!',
    BOOKMARK_SINGULAR: 'bookmark',
    BOOKMARK_PLURAL: 'bookmarks',
} as const;

export const ERROR_MESSAGES = {
    FILL_ALL_FIELDS: 'Please fill in all fields',
    INVALID_URL: 'Please enter a valid URL',
    ADD_BOOKMARK_FAILED: 'Failed to add bookmark',
    DELETE_BOOKMARK_FAILED: 'Failed to delete bookmark',
    FETCH_BOOKMARKS_ERROR: 'Error fetching bookmarks:',
    DELETE_BOOKMARK_ERROR: 'Error deleting bookmark:',
    ADD_BOOKMARK_ERROR: 'Error adding bookmark:',
    LOGOUT_ERROR: 'Error logging out:',
} as const;

export const CONFIRMATIONS = {
    DELETE_BOOKMARK: 'Are you sure you want to delete this bookmark?',
} as const;

export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
} as const;

export const LOCALE = {
    DEFAULT: 'en-US',
    LANGUAGE: 'en',
} as const;

export const IMAGE_SIZES = {
    LOGO_SMALL: { width: 32, height: 32 },
    LOGO_LARGE: { width: 64, height: 64 },
} as const;

export const QUERY_OPTIONS = {
    BOOKMARKS: {
        ORDER_BY: DATABASE.COLUMNS.CREATED_AT,
        ASCENDING: false,
    },
} as const;

export const AUTH_PROVIDERS = {
    GOOGLE: 'google',
} as const;

export const LINK_ATTRIBUTES = {
    TARGET_BLANK: '_blank',
    REL_NOOPENER: 'noopener noreferrer',
} as const;
