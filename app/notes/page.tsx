import { QueryClient } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NotesClient from "./Notes.client";

export const dynamic = "force-dynamic";

const NotesPage: React.FC = async () => {
  const queryClient = new QueryClient();
  const perPage = 12;

  const initialData = await queryClient.fetchQuery<FetchNotesResponse>({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: perPage, search: "" }),
  });

  return <NotesClient initialData={initialData} />;
};

export default NotesPage;
