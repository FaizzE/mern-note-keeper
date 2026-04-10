import { PenSquareIcon, Trash2Icon, CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents the Link navigation when clicking delete

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group relative flex flex-col h-full bg-[#1D1B4B]/40 border border-white/5 rounded-xl p-5 transition-all duration-300 hover:border-sky-500/40 hover:bg-[#1D1B4B]/60 shadow-xl">
     
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 group-hover:bg-sky-500 transition-all duration-300">
          <PenSquareIcon className="size-4 text-sky-400 group-hover:text-[#16113A]" />
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10">
          <div className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-tight">
            Active
          </span>
        </div>
      </div>

    
      <div className="space-y-2 flex-grow">
        <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
          {note.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 font-medium">
          {note.content}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500">
          <CalendarIcon size={14} className="text-sky-500/40" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            {formatDate(new Date(note.createdAt))}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 bg-white hover:bg-slate-100 text-[#16113A] rounded-md transition-all active:scale-90 shadow-md shadow-black/40"
            onClick={(e) => handleDelete(e, note._id)}>
            <Trash2Icon className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
