"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import * as XLSX from "xlsx";

interface Signup {
  id: string;
  email: string;
  created_at: string;
}

interface WaitlistDashboardProps {
  initialData: Signup[];
  totalCount: number;
  pageSize: number;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function WaitlistDashboard({
  initialData,
  totalCount,
  pageSize,
}: WaitlistDashboardProps) {
  const supabase = createClient();
  const router = useRouter();

  const [data, setData] = useState<Signup[]>(initialData);
  const [count, setCount] = useState(totalCount);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  const fetchData = useCallback(
    async (
      currentPage: number,
      query: string,
      ascending: boolean
    ) => {
      setLoading(true);
      const from = currentPage * pageSize;
      const to = from + pageSize - 1;

      let builder = supabase
        .from("waitlist")
        .select("id, email, created_at", { count: "exact" })
        .order("created_at", { ascending });

      if (query.trim()) {
        builder = builder.ilike("email", `%${query.trim()}%`);
      }

      const { data: result, count: resultCount } = await builder.range(
        from,
        to
      );

      setData(result ?? []);
      setCount(resultCount ?? 0);
      setLoading(false);
    },
    [supabase, pageSize]
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(0);
      fetchData(0, search, sortAsc);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, sortAsc, fetchData]);

  // Page changes (not triggered by search debounce)
  useEffect(() => {
    if (page > 0 || data !== initialData) {
      fetchData(page, search, sortAsc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSort = () => {
    setSortAsc((prev) => !prev);
  };

  const handleExport = async () => {
    setExporting(true);

    // Fetch ALL data (respecting current search filter) for export
    let allData: { email: string; created_at: string }[] = [];
    let offset = 0;
    const batchSize = 1000;

    while (true) {
      let builder = supabase
        .from("waitlist")
        .select("email, created_at")
        .order("created_at", { ascending: false });

      if (search.trim()) {
        builder = builder.ilike("email", `%${search.trim()}%`);
      }

      const { data: batch } = await builder.range(offset, offset + batchSize - 1);

      if (!batch || batch.length === 0) break;
      allData = [...allData, ...batch];
      if (batch.length < batchSize) break;
      offset += batchSize;
    }

    // Build spreadsheet
    const rows = allData.map((row) => ({
      Email: row.email,
      Joined: formatDate(row.created_at),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Set column widths
    worksheet["!cols"] = [{ wch: 35 }, { wch: 18 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Waitlist");

    const today = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `zill-waitlist-${today}.xlsx`);

    setExporting(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  // Pagination range — show up to 5 page buttons
  const paginationRange = useMemo(() => {
    const range: number[] = [];
    let start = Math.max(0, page - 2);
    const end = Math.min(totalPages - 1, start + 4);
    start = Math.max(0, end - 4);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] transition-colors duration-500">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-md border-b border-black/5 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-brand-dark dark:text-white tracking-tight">
              Zill
            </span>
            <span className="text-brand-gray dark:text-[#555555] text-xs select-none">
              /
            </span>
            <span className="text-sm text-brand-gray dark:text-[#888888]">
              Team
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="text-xs text-brand-gray dark:text-[#888888] hover:text-brand-dark dark:hover:text-white transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark dark:text-white tracking-tight">
              Waitlist
            </h1>
            <p className="text-brand-gray dark:text-[#888888] text-sm mt-1">
              {count.toLocaleString()} signup{count !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={exporting || count === 0}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-[666px] bg-brand text-white text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {exporting ? "Exporting…" : "Export"}
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray dark:text-[#555555] pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search by email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-brand-light dark:bg-[#111111] border border-transparent focus:border-black/10 dark:focus:border-white/10 text-sm text-brand-dark dark:text-white placeholder:text-brand-gray dark:placeholder:text-[#555555] outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray dark:text-[#555555] hover:text-brand-dark dark:hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-brand-light dark:bg-[#111111] rounded-2xl overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_160px] px-4 sm:px-6 py-3 border-b border-black/5 dark:border-white/5">
            <span className="text-xs font-medium text-brand-gray dark:text-[#888888] uppercase tracking-wider">
              Email
            </span>
            <button
              onClick={handleSort}
              className="text-xs font-medium text-brand-gray dark:text-[#888888] uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:text-brand-dark dark:hover:text-white transition-colors text-right sm:text-left"
            >
              Joined
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  sortAsc ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_160px] px-4 sm:px-6 py-4"
                >
                  <div className="h-4 w-48 max-w-full bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-black/5 dark:bg-white/5 rounded animate-pulse ml-auto sm:ml-0" />
                </div>
              ))}
            </div>
          ) : data.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-brand-gray dark:text-[#555555] text-sm">
                {search
                  ? "No signups match your search."
                  : "No signups yet."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {data.map((signup) => (
                <div
                  key={signup.id}
                  className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_160px] px-4 sm:px-6 py-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm text-brand-dark dark:text-white truncate pr-4">
                    {signup.email}
                  </span>
                  <span className="text-sm text-brand-gray dark:text-[#888888] text-right sm:text-left whitespace-nowrap">
                    {formatDate(signup.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-sm text-brand-gray dark:text-[#888888] hover:bg-brand-light dark:hover:bg-[#111111] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            {paginationRange.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
                  p === page
                    ? "bg-brand-dark dark:bg-white text-white dark:text-brand-dark"
                    : "text-brand-gray dark:text-[#888888] hover:bg-brand-light dark:hover:bg-[#111111]"
                }`}
              >
                {p + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-sm text-brand-gray dark:text-[#888888] hover:bg-brand-light dark:hover:bg-[#111111] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
