'use client'
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Scroll() {
    /**
     * Ensures the user is scrolled to the top of the page when navigating between routes.
     * This is necessary because, with a sticky header, the default behavior preserves the
     * previous scroll position, so changing routes doesn't take you to the top of the page.
     * So this is a fix for that.
     *
     * For whoever may work on this project later:
     * Once you figure out that weird behavior, you can delete this component
     * and remove it from the main `layout.js` file.
     *
     * peace.
     */

    const pathname = usePathname();
    useEffect(() => {
        window.scroll(0, 0);
    }, [pathname]);

    return null;
}
