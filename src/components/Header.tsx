'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
    userEmail: string;
    onLogout: () => Promise<void>;
}

export default function Header({ userEmail, onLogout }: HeaderProps) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await onLogout();
        } catch (error) {
            console.error('Error logging out:', error);
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/bookmark.svg"
                            alt="Smart Bookmark"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Smart Bookmark
                        </h3>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 hidden sm:inline">
                            {userEmail}
                        </span>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-600 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
