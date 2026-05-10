"use client";

import { useEffect, useMemo, useState } from "react";

type VoteValue = -1 | 0 | 1;

function storageKey(slug: string) {
  return `dippa.blog.vote.${slug}`;
}

export default function ArticleVote(props: {
  slug: string;
  initialUpvotes: number;
  initialDownvotes: number;
}) {
  const [vote, setVote] = useState<VoteValue>(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(props.slug));
      if (raw === "1") setVote(1);
      else if (raw === "-1") setVote(-1);
      else setVote(0);
    } catch {
      // ignore storage errors (private mode, disabled storage, etc.)
    }
  }, [props.slug]);

  const totals = useMemo(() => {
    const upvotes = props.initialUpvotes + (vote === 1 ? 1 : 0);
    const downvotes = props.initialDownvotes + (vote === -1 ? 1 : 0);
    return { upvotes, downvotes, score: upvotes - downvotes };
  }, [props.initialDownvotes, props.initialUpvotes, vote]);

  function persist(next: VoteValue) {
    try {
      if (next === 0) localStorage.removeItem(storageKey(props.slug));
      else localStorage.setItem(storageKey(props.slug), String(next));
    } catch {
      // ignore
    }
  }

  function onUpvote() {
    setVote((current) => {
      const next: VoteValue = current === 1 ? 0 : 1;
      persist(next);
      return next;
    });
  }

  function onDownvote() {
    setVote((current) => {
      const next: VoteValue = current === -1 ? 0 : -1;
      persist(next);
      return next;
    });
  }

  const baseButton =
    "inline-flex min-h-12 items-center gap-2 rounded-full border px-5 text-[9px] font-bold uppercase tracking-widest transition focus:outline-none";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onUpvote}
        aria-pressed={vote === 1}
        className={`${baseButton} ${
          vote === 1 ? "border-[#1E293B] bg-[#1E293B] text-white shadow-lg" : "border-gray-200 bg-white text-[#475569] hover:border-gray-400"
        }`}
      >
        <span className="text-sm leading-none">↑</span> Helpful <span className={vote === 1 ? "text-white/70" : "text-gray-500"}>({totals.upvotes})</span>
      </button>

      <button
        type="button"
        onClick={onDownvote}
        aria-pressed={vote === -1}
        className={`${baseButton} ${
          vote === -1
            ? "border-black bg-black text-white"
            : "border-gray-200 bg-white text-[#475569] hover:border-gray-400"
        }`}
      >
        <span className="text-sm leading-none">↓</span> Not for me <span className={vote === -1 ? "text-white/70" : "text-gray-500"}>({totals.downvotes})</span>
      </button>
    </div>
  );
}
