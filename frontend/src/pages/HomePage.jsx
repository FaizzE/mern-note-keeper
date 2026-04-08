import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import NoteCard from "../components/NoteCard";
import RateLimitedUi from '../components/RateLimitedUi';
import NotesNotFound from '../components/NotesNotFound';
import toast from "react-hot-toast";
import api from "../lib/axios";



const HomePage = () => {

  const [isRateLimited, setisRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data); //  store data
        setisRateLimited(false);
      } catch (error) {
        console.log(error);
        console.log("Error fetching notes");
        if(error.response?.status === 429) {
          setisRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false); //  stop loading
      }
    }

    fetchNotes();
  } ,[])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes.....
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage
