import { ArrowLeftIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title or content is empty, Please enter");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "⏳",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#16113A]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors mb-6">
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>

          <div className="bg-[#1D1B4B]/40 border border-white/5 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="size-5 text-sky-400" />
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Create new note
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Note Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
                    Content
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all h-48 resize-none leading-relaxed"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    v1.0.4 • secure_node
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-white hover:bg-slate-100 disabled:bg-slate-700 px-6 py-2.5 rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-black/20">
                    <span className="text-[#16113A] font-bold">
                      {loading ? "Creating..." : "Create Note"}
                    </span>
                    {!loading && (
                      <Sparkles size={16} className="text-[#16113A]" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
