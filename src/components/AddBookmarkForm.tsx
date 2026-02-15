'use client';

import { useState } from 'react';

interface AddBookmarkFormProps {
    onAdd: (title: string, url: string) => Promise<void>;
}

export default function AddBookmarkForm({ onAdd }: AddBookmarkFormProps) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !url.trim()) {
            alert('Please fill in all fields');
            return;
        }
        try {
            new URL(url);
        } catch {
            alert('Please enter a valid URL');
            return;
        }
        setIsSubmitting(true);
        try {
            await onAdd(title.trim(), url.trim());
            setTitle('');
            setUrl('');
        } catch (error) {
            console.error('Error adding bookmark:', error);
            alert('Failed to add bookmark');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter bookmark title"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    disabled={isSubmitting}
                />
            </div>
            <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                </label>
                <input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    disabled={isSubmitting}
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                    </span>
                ) : (
                    'Add Bookmark'
                )}
            </button>
        </form>
    );
}
