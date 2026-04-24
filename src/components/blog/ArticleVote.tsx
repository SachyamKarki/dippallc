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
    "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-black uppercase tracking-widest transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="mr-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
        Score <span className="font-black text-slate-900">{totals.score}</span>
      </div>

      <button
        type="button"
        onClick={onUpvote}
        aria-pressed={vote === 1}
        className={`${baseButton} ${
          vote === 1 ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
        }`}
      >
        <span className="text-sm leading-none">↑</span> Upvote <span className="text-slate-400 font-bold">({totals.upvotes})</span>
      </button>

      <button
        type="button"
        onClick={onDownvote}
        aria-pressed={vote === -1}
        className={`${baseButton} ${
          vote === -1
            ? "border-rose-200 bg-rose-50 text-rose-700"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
        }`}
      >
        <span className="text-sm leading-none">↓</span> Downvote{" "}
        <span className="text-slate-400 font-bold">({totals.downvotes})</span>
      </button>
    </div>
  );
}

