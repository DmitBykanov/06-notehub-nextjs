"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";
// import axios from "axios";

type NoteDetailsProps = {
  id: string;
  initialNote: Note | null;
};

const NoteDetailsClient: React.FC<NoteDetailsProps> = ({ id, initialNote }) => {
  const QUERY_KEY = ["note", id];

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: QUERY_KEY,
    queryFn: () => fetchNoteById(id),

    placeholderData: initialNote || undefined,

    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created date: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
