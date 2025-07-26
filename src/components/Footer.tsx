import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm py-4 mt-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                <p className="text-center sm:text-left">
                    &copy; {new Date().getFullYear()} MilMan. Όλα τα δικαιώματα διατηρούνται.
                </p>
                <div className="flex flex-wrap gap-4 text-xs justify-center sm:justify-end">
                    <span className="opacity-80">Έκδοση: 1.0.0</span>
                    <Link to="/terms" className="hover:underline">
                        Όροι Χρήσης
                    </Link>
                    <Link to="/privacy" className="hover:underline">
                        Πολιτική Απορρήτου
                    </Link>
                </div>
            </div>
        </footer>
    );
}
