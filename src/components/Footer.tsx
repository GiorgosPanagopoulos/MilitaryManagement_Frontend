import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white text-sm py-3 mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} MilMan. Όλα τα δικαιώματα διατηρούνται.</p>
        </footer>
    );
}
