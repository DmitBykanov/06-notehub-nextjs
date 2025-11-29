import { QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import NoteDetailsClient from "./NoteDetails.client";

export const dynamic = "force-dynamic";

type NoteDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  let initialNote: Note | null = null;

  if (id) {
    try {
      initialNote = await queryClient.fetchQuery<Note>({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
      });
    } catch (e) {
      initialNote = null;
      console.error(`Error prefetching note ${id}:`, e);
    }
  }

  return <NoteDetailsClient id={id} initialNote={initialNote} />;
}
