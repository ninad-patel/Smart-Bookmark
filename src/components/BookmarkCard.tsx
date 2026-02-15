'use client';

import { useState } from 'react';
import type { Bookmark } from '@/types/bookmark';
import {ERROR_MESSAGES, CONFIRMATIONS, BUTTON_LABELS, DATE_FORMAT_OPTIONS, LOCALE, LINK_ATTRIBUTES} from '@/constants';

interface BookmarkCardProps {
    bookmark: Bookmark;
    onDelete: (id: string) => Promise<void>;
}

export default function BookmarkCard({ bookmark, onDelete }: BookmarkCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(CONFIRMATIONS.DELETE_BOOKMARK)) return;
        setIsDeleting(true);
        try {
            await onDelete(bookmark.id);
        } catch (error) {
            console.error(ERROR_MESSAGES.DELETE_BOOKMARK_ERROR, error);
            alert(ERROR_MESSAGES.DELETE_BOOKMARK_FAILED);
        } finally {
            setIsDeleting(false);
        }
    };
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(LOCALE.DEFAULT, DATE_FORMAT_OPTIONS).format(date);
    };

    return (
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-300">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <a
                        href={bookmark.url}
                        target={LINK_ATTRIBUTES.TARGET_BLANK}
                        rel={LINK_ATTRIBUTES.REL_NOOPENER}
                        className="block"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                            {bookmark.title}
                        </h3>
                        <p className="text-sm text-indigo-600 mb-2 truncate hover:underline">
                            {bookmark.url}
                        </p>
                    </a>
                    <p className="text-xs text-gray-500">
                        {formatDate(bookmark.created_at)}
                    </p>
                </div>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-shrink-0 rounded-lg bg-red-50 p-2 text-red-600 transition-all duration-200 hover:bg-red-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    title={BUTTON_LABELS.DELETE}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
