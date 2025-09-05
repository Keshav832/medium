import { useEffect, useState, useCallback, useRef } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    id : string
    title : string
    content : string
    createdAt: string
    author : {
        name : string
    }
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, { signal: controller.signal })
        .then((res) => setBlog(res.data.post))
        .catch((err) => {
            if (!axios.isCancel(err)) {
                setError(err?.response?.data?.message || "Failed to fetch blog.");
            }
        })
        .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  return { loading, blog, error };
};

export const useBlogs = (initialLimit = 5) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const isFetching = useRef(false); // Prevent duplicate fetches

  const fetchBlogs = useCallback(
    async (append = false) => {
      const currentOffset = append ? blogs.length : 0;

      if (isFetching.current) return;
      isFetching.current = true;

      append ? setLoadingMore(true) : setLoadingInitial(true);
      setError(null);

      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          params: { limit: initialLimit, offset: currentOffset },
        });

        const newPosts: Blog[] = res.data.posts;
        setBlogs((prev) => (append ? [...prev, ...newPosts] : newPosts));
        setHasMore(res.data.pagination.hasMore);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch blogs.");
      } finally {
        isFetching.current = false;
        setLoadingInitial(false);
        setLoadingMore(false);
      }
    },
    [blogs.length, initialLimit]
  );

  // Initial load
  useEffect(() => {
    fetchBlogs(false);
  }, [fetchBlogs]);

  // Debounced scroll handler
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        const nearBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

        if (nearBottom && !loadingMore && hasMore) {
          fetchBlogs(true);
        }
      }, 200); // Debounce time
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadingMore, hasMore, fetchBlogs]);

  return {
    blogs,
    loading: loadingInitial,
    loadingMore,
    error,
    hasMore,
  };
};
