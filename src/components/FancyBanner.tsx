import { Code } from "lucide-react";

export default function FancyBanner() {
    return (
        <div className="overflow-hidden w-full max-w-full mb-8">
            <div className="inline-flex items-center animate-marquee whitespace-nowrap px-6 py-3 bg-gradient-to-r from-indigo-900 to-blue-500 text-white rounded-full shadow-lg w-fit mx-auto">
                <Code className="w-5 h-5 text-blue-200 mr-2 shrink-0" />
                <span className="font-medium tracking-wide">
          Παρακολούθησε εκπαιδεύσεις, πρόσθεσε νέο προσωπικό και δες αναφορές - όλα σε μία εφαρμογή!
        </span>
                <span className="ml-2 text-blue-200">|</span>
            </div>
        </div>
    );
}

