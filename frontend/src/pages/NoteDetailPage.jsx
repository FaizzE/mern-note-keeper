import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import {
  ArrowLeftIcon,
  LoaderIcon,
  Trash2Icon,
  SaveIcon,
  Sparkles,
} from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#16113A] flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-sky-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#16113A]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
              <ArrowLeftIcon className="size-4" />
              Back to Notes
            </Link>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
              <Trash2Icon className="size-4" />
              Delete Entry
            </button>
          </div>

          <div className="bg-[#1D1B4B]/40 border border-white/5 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
                  <SaveIcon className="size-5 text-sky-400" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Edit Note
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Identification Tag
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all font-semibold"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Data Content
                  </label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all h-48 resize-none leading-relaxed"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-sky-500/50 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                      Modifying Note_{id?.slice(-4)}
                    </span>
                  </div>

                  <button
                    disabled={saving}
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-white hover:bg-slate-100 disabled:bg-slate-700 px-6 py-2.5 rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-black/20">
                    <span className="text-[#16113A] font-bold">
                      {saving ? "Updating..." : "Save Changes"}
                    </span>
                    {!saving && (
                      <Sparkles size={16} className="text-[#16113A]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
