"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as XLSX from "xlsx";
import { MobileAdminBlocker } from "@/components/admin/MobileAdminBlocker";

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
    async (currentPage: number, query: string, ascending: boolean) => {
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

      const { data: result, count: resultCount } = await builder.range(from, to);

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

  // Page changes
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

    const rows = allData.map((row) => ({
      Email: row.email,
      Joined: formatDate(row.created_at),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
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
    <>
      <MobileAdminBlocker />
      <div className="hidden lg:block min-h-screen bg-[#0A0A0A] font-archivo transition-colors duration-500 overflow-x-hidden">
      <div className="w-full max-w-[1152px] mx-auto px-6 py-16 flex flex-col gap-16">
        
        {/* Top Header */}
        <div className="flex flex-col gap-12">
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Back to landing page */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
               <img src="/admin/box-arrow-left.svg" alt="Back" className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
               <span className="text-[#777777] text-xs font-medium font-sans group-hover:text-white transition-colors tracking-wide uppercase">Back to Landing Page</span>
            </Link>

            {/* Buttons */}
            <div className="flex items-center gap-4">
               <button onClick={handleExport} disabled={exporting || count === 0} className="w-28 h-8 px-3.5 py-2 bg-[#FF3700] hover:bg-[#e63200] transition-colors rounded-lg flex justify-center items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  <img src="/admin/download-03.svg" className="w-4 h-4" />
                  <span className="text-white text-xs font-medium leading-3">{exporting ? 'Exporting...' : 'Download'}</span>
               </button>
               <button onClick={handleLogout} className="w-28 h-8 px-3.5 py-2 bg-[#191919] hover:bg-[#2A2A2A] transition-colors rounded-lg flex justify-center items-center gap-1 cursor-pointer">
                  <img src="/admin/logout-02.svg" className="w-4 h-4" />
                  <span className="text-[#777777] text-xs font-medium leading-3">Sign Out</span>
               </button>
            </div>
          </div>

          {/* Title and Search */}
          <div className="flex justify-between items-end sm:items-center flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-2">
               <h1 className="text-[#FF3700] text-3xl font-extrabold leading-8">Waitlist</h1>
               <div className="text-[#777777] text-base font-medium leading-4">{count.toLocaleString()} Signup{count !== 1 ? 's' : ''}</div>
            </div>

            <div 
              style={{ outline: "none", boxShadow: "none", border: "none" }}
              className="w-full max-w-[360px] pl-4 pr-4 py-3 bg-[#191919] rounded-[71px] flex items-center gap-2 outline-none border-none focus:outline-none focus:border-none focus:ring-0 focus-within:outline-none focus-within:border-none focus-within:ring-0 shadow-none focus-within:shadow-none"
            >
               <img src="/admin/search.svg" className="w-5 h-5 opacity-70" />
               <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Email..." 
                  autoComplete="off"
                  spellCheck={false}
                  style={{ outline: "none", boxShadow: "none", border: "none" }}
                  className="bg-transparent border-none outline-none text-[#777777] text-base font-normal w-full focus:text-white focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 shadow-none focus:shadow-none"
               />
               {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-[#777777] hover:text-white transition-colors cursor-pointer mr-2"
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
        </div>

        {/* Table Container */}
        <div className="p-4 sm:p-8 bg-[#191919] rounded-[32px] flex flex-col gap-px w-full overflow-x-auto">
           <div className="min-w-[500px]">
             <div className="h-12 px-5 py-4 border-b border-[#2F2F2F] flex items-center">
                <div className="flex-1 flex flex-col items-start">
                   <span className="text-[#777777] text-sm font-semibold leading-5 uppercase">Email</span>
                </div>
                <button onClick={handleSort} className="flex items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer">
                   <span className="text-[#777777] text-sm font-semibold leading-5 uppercase">Joined</span>
                   <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#777777"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${sortAsc ? "rotate-180" : ""}`}
                   >
                      <path d="m6 9 6 6 6-6" />
                   </svg>
                </button>
             </div>

             {/* Rows */}
             {loading ? (
                <div className="divide-y divide-[#2F2F2F]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 px-5 py-4 flex items-center"
                    >
                      <div className="flex-1 h-4 w-48 max-w-full bg-[#2F2F2F] rounded animate-pulse" />
                      <div className="h-4 w-20 bg-[#2F2F2F] rounded animate-pulse" />
                    </div>
                  ))}
                </div>
             ) : data.length === 0 ? (
                 <div className="px-6 py-16 text-center">
                    <p className="text-[#777777] text-sm">
                      {search ? "No signups match your search." : "No signups yet."}
                    </p>
                  </div>
             ) : (
                 <div className="divide-y divide-[#2F2F2F]">
                   {data.map((signup) => (
                      <div key={signup.id} className="h-12 px-5 py-4 flex items-center hover:bg-[#2a2a2a] transition-colors rounded-md -mx-2 px-7">
                         <div className="flex-1 flex flex-col items-start">
                            <span className="text-[#F0F0F0] text-sm font-normal leading-5 truncate pr-4 max-w-[200px] sm:max-w-none">{signup.email}</span>
                         </div>
                         <div className="flex flex-col items-start">
                            <span className="text-[#F0F0F0] text-sm font-normal leading-5 whitespace-nowrap">{formatDate(signup.created_at)}</span>
                         </div>
                      </div>
                   ))}
                 </div>
             )}
           </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-sm text-[#777777] hover:bg-[#191919] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
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
                    ? "bg-[#FF3700] text-white"
                    : "text-[#777777] hover:bg-[#191919] hover:text-white"
                }`}
              >
                {p + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-sm text-[#777777] hover:bg-[#191919] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
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
      </div>
    </div>
    </>
  );
}
