import { useState, useEffect } from 'react';

const CACHE_NAME = 'spline-cache-v1';

export function useSplineCache(url: string) {
    const [cachedUrl, setCachedUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchAndCache = async () => {
            if (!url) return;

            try {
                // 1. Check if Cache API is available
                if (!('caches' in window)) {
                    setCachedUrl(url); // Fallback to original URL
                    setIsLoading(false);
                    return;
                }

                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(url);

                if (cachedResponse) {
                    // 2. Serve from Cache
                    const blob = await cachedResponse.blob();
                    const objectUrl = URL.createObjectURL(blob);
                    if (isMounted) {
                        setCachedUrl(objectUrl);
                        setIsLoading(false);
                    }
                } else {
                    // 3. Fetch and Cache
                    try {
                        const response = await fetch(url);
                        if (response.ok) {
                            cache.put(url, response.clone());
                            const blob = await response.blob();
                            const objectUrl = URL.createObjectURL(blob);
                            if (isMounted) {
                                setCachedUrl(objectUrl);
                                setIsLoading(false);
                            }
                        } else {
                            // Fallback on fetch error
                            if (isMounted) {
                                setCachedUrl(url);
                                setIsLoading(false);
                            }
                        }
                    } catch (err) {
                        console.error('Error fetching Spline asset:', err);
                        if (isMounted) {
                            setCachedUrl(url);
                            setIsLoading(false);
                        }
                    }
                }
            } catch (error) {
                console.error('Error accessing Cache API:', error);
                if (isMounted) {
                    setCachedUrl(url);
                    setIsLoading(false);
                }
            }
        };

        fetchAndCache();

        return () => {
            isMounted = false;
            // Cleanup ObjectURL to avoid memory leaks? 
            // Ideally yes, but we want to keep it alive for the session.
            // If we revoke it, other components using it might break if they remount.
            // For a single large asset, it's acceptable to keep it.
        };
    }, [url]);

    return { sceneUrl: cachedUrl, isLoading };
}
