
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AuthModal from "@/components/AuthModal";
import { createClient } from "@/utils/supabase/client";

type UserPlaylist = {
  id:string
  name: string;
  songIds: number[];
};

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  color: string;
  duration: string;
  src?: string;
};

const songs: Song[] = [
  {
    id: 1,
    title: "Neon Synthwave Vibe",
    artist: "echoes_of_lumen",
    album: "Synthwave",
    cover: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500&h=500&fit=crop",
    color: "from-indigo-500/30",
    duration: "0:00",
    src: "/music/midnight-city.mp3",
  },
  {
    id: 2,
    title: "Dil Mera Maane Hi Nahi Hai",
    artist: "Hindi Music",
    album: "Hindi Vocals",
    cover: "https://plus.unsplash.com/premium_photo-1676068244059-62241bd1418e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=500&h=700&fit=crop",
    color: "from-indigo-500/30",
    duration: "0:00",
    src: "/music/dil-mera-mane-hi-nahi-hai.mp3",
  },
  {
    id: 3,
    title: "Happinessinmusic",
    artist: "hindi",
    album: "Hindi Vocals",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop",
    color: "from-rose-500/30",
    duration: "0:00",
    src: "/music/happinessinmusic-hindi.mp3",
  },
  {
    id: 4,
    title: "Indian Music",
    artist: "ikoliks_aj",
    album: "Indian Music",
    cover: "https://images.unsplash.com/photo-1663471984093-5925e87e72d5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=500&h=900&fit=crop",
    color: "from-amber-500/30",
    duration: "0:00",
    src: "/music/ikoliks_aj-indian.mp3",
  },
  {
    id: 5,
    title: "Kesari Nandan Hanuman Song",
    artist: "Hindi Devotional",
    album: "Devotional",
    cover: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=500&h=800&fit=crop",
    color: "from-orange-500/30",
    duration: "0:00",
    src: "/music/kesari-nandan-hanuman-song.mp3",
  },
  {
    id: 6,
    title: "MusicForPeople",
    artist: "Indian Music",
    album: "Indian Instrumental",
    cover: "https://images.unsplash.com/photo-1791114401151-ef2dcde2e109?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=500&h=700&fit=crop",
    color: "from-amber-500/30",
    duration: "0:00",
    src: "/music/musicforpeople-indian.mp3",
  },
  {
    id: 7,
    title: "Shadows of the System",
    artist: "Electronic Music",
    album: "Electronic",
    cover: "https://images.unsplash.com/photo-1536031278826-87ac0b75174f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=500&h=500&fit=crop",
    color: "from-violet-500/30",
    duration: "0:00",
    src: "/music/shadows-of-the-system.mp3",
  },
  {
    id: 8,
    title: "Doraemon Generic",
    artist: "Theme Song",
    album: "Hindi Cartoon Themes",
    cover: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=500&h=500&fit=crop",
    color: "from-sky-500/30",
    duration: "0:00",
    src: "/music/doraemon-generic.mp3",
  },
  {
    id: 9,
    title: "Doraemon Hindi R&B",
    artist: "Hindi R&B",
    album: "Hindi Cartoon Themes",
    cover: "https://images.unsplash.com/photo-1633069404479-2a8aa9526ea6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=500&h=500&fit=crop",
    color: "from-cyan-500/30",
    duration: "0:00",
    src: "/music/doraemon-hindi-rampb.mp3",
  },
  {
    id: 10,
    title: "Sonic Sunrise",
    artist: "Electronic Music",
    album: "Electronic",
    cover: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&h=500&fit=crop",
    color: "from-orange-500/30",
    duration: "0:00",
    src: "/music/sonic-sunrise.mp3",
  },
  {
    id: 11,
    title: "Soulful Indian",
    artist: "Indian Vocals",
    album: "Indian Music",
    cover: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500&h=500&fit=crop",
    color: "from-amber-500/30",
    duration: "0:00",
    src: "/music/soulful-indian.mp3",
  },
  {
    id: 12,
    title: "Tere Sang (With You)",
    artist: "80sElectricmusicandlyrics",
    album: "Indie Pop",
    cover: "https://plus.unsplash.com/premium_photo-1681930071154-cd791b88991d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?w=500&h=800&fit=crop",
    color: "from-rose-500/30",
    duration: "0:00",
    src: "/music/tere-sang-with-you.mp3",
  },
  {
    id: 13,
    title: "Whispers of Silence",
    artist: "Ambient Music",
    album: "Ambient",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop",
    color: "from-cyan-500/30",
    duration: "0:00",
    src: "/music/whispers-of-silence.mp3",
  },
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

const playlists = [
  {
    name: "Late Night",
    subtitle: "For the quiet hours",
    cover: songs[0].cover,
  },
  {
    name: "Golden Days",
    subtitle: "A little sunshine",
    cover: songs[1].cover,
  },
  {
    name: "Deep Focus",
    subtitle: "Get in the zone",
    cover: songs[4].cover,
  },
  {
    name: "Ocean Drive",
    subtitle: "Somewhere far away",
    cover: songs[2].cover,
  },
];

export default function Home() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<any>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  // Fresh start: no songs are liked until the user likes them.
  const [liked, setLiked] = useState<number[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<number[]>([]);
  const [recentLoaded, setRecentLoaded] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  const [search, setSearch] = useState("");
  const [volume, setVolume] = useState(70);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;
  }, [volume]);

  
  // Load recently played songs from localStorage.
  useEffect(() => {
    try {
      const savedRecent = localStorage.getItem("sargam-v2-recently-played");

      if (savedRecent) {
        const parsed: unknown = JSON.parse(savedRecent);

        if (Array.isArray(parsed)) {
          setRecentlyPlayed(
            parsed.filter((id): id is number => typeof id === "number")
          );
        }
      }
    } catch (error) {
      console.error("Could not load recently played songs:", error);
    } finally {
      setRecentLoaded(true);
    }
  }, []);


  useEffect(() => {
    if (recentLoaded) localStorage.setItem("sargam-v2-recently-played", JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed, recentLoaded]);
  
  useEffect(() => {
  let cancelled = false;

  
async function loadUserLibrary() {
  if (!user) {
    setLiked([]);
    setUserPlaylists([]);
    setLibraryLoading(false);
    setLibraryError("");
    return;
  }

  setLibraryLoading(true);
  setLibraryError("");

  try {
    const { data: likesData, error: likesError } = await supabase
      .from("user_likes")
      .select("song_id");

    if (likesError) {
      console.error("Error loading likes:", likesError);
      setLibraryError("Could not load your liked songs.");
      return;
    }

    const { data: playlistsData, error: playlistsError } = await supabase
      .from("playlists")
      .select("id, name")
      .order("created_at", { ascending: false });

    if (playlistsError) {
      console.error("Error loading playlists:", playlistsError);
      setLibraryError("Could not load your playlists.");
      return;
    }

    const { data: playlistSongsData, error: songsError } = await supabase
      .from("playlist_songs")
      .select("playlist_id, song_id");

    if (songsError) {
      console.error("Error loading playlist songs:", songsError);
      setLibraryError("Could not load playlist songs.");
      return;
    }

    if (cancelled) return;

    setLiked((likesData ?? []).map((item) => item.song_id));

    setUserPlaylists(
      (playlistsData ?? []).map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        songIds: (playlistSongsData ?? [])
          .filter((item) => item.playlist_id === playlist.id)
          .map((item) => item.song_id),
      }))
    );
  } catch (error) {
    console.error("Unexpected library loading error:", error);

    if (!cancelled) {
      setLibraryError("Something went wrong while loading your library.");
    }
  } finally {
    if (!cancelled) {
      setLibraryLoading(false);
    }
  }
}
loadUserLibrary();

  return () => {
    cancelled = true;
  };
}, [user, supabase]);

  // Read duration directly from the browser's audio element.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateDuration = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("canplay", updateDuration);
    audio.load();
    updateDuration();

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("canplay", updateDuration);
    };
  }, []);

// Sign out the current Supabase user.
async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error);
    window.alert("Could not log out. Please try again.");
    return;
  }

  setAccountMenuOpen(false);
  setAuthOpen(false);
  setActiveNav("Home");
  setIsPlaying(false);
}

// supabase authentication
useEffect(() => {
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  getUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, [supabase]);

// Load the selected track whenever the song changes.
useEffect(() => {
  const audio = audioRef.current;
  if (!audio || !currentSong.src) return;

  setCurrentTime(0);
  setDuration(0);
  audio.load();
}, [currentSong.src]);

// Handle all audio playback from one effect.
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  let cancelled = false;

  if (isPlaying && currentSong.src) {
    audio.play().catch((error) => {
      if (cancelled || error?.name === "AbortError") return;

      console.error("Audio playback failed:", error);
      setIsPlaying(false);
    });
  } else {
    audio.pause();
  }

  return () => {
    cancelled = true;
  };
}, [isPlaying, currentSong.src]);


  const playableSongs = songs.filter((song) => Boolean(song.src));
  const activePlaylist = userPlaylists.find((playlist) => playlist.name === activeNav);

  function recordRecentlyPlayed(songId: number) {
    setRecentlyPlayed((previous) => [songId, ...previous.filter((id) => id !== songId)].slice(0, 30));
  }

  function playSong(song: Song) {
    if (!song.src) return;
    setCurrentSong(song);
    setIsPlaying(true);
    recordRecentlyPlayed(song.id);
  }
  
  function handleNavClick(label: string) {
  const protectedSections = [
    "Your Library",
    "Liked Songs",
    ...userPlaylists.map((playlist) => playlist.name),
  ];

  if (!user && protectedSections.includes(label)) {
    setAuthOpen(true);
    return;
  }

  setActiveNav(label);
}
  async function createPlaylist() {
    if (!user) {
  setAuthOpen(true);
  return;
}
    const name = window.prompt("Give your playlist a name:");
    if (!name || !name.trim()) return;
    const cleanName = name.trim().slice(0, 40);
    if (["Home", "Search", "Your Library", "Liked Songs", "Recently Played", "Made for You"].includes(cleanName) || userPlaylists.some((item) => item.name.toLowerCase() === cleanName.toLowerCase())) {
      window.alert("That playlist name is already in use. Please choose another name.");
      return;
    }
    const { data, error } = await supabase
  .from("playlists")
  .insert({
    user_id: user.id,
    name: cleanName,
  })
  .select("id, name")
  .single();

if (error) {
  console.error("Playlist creation failed:", error);
  window.alert("Could not create playlist. Please try again.");
  return;
}

setUserPlaylists((previous) => [
  ...previous,
  { id: data.id, name: data.name, songIds: [] },
]);

setActiveNav(cleanName);

window.alert("Playlist created successfully!");
  }
  async function deletePlaylist(playlist: UserPlaylist) {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${playlist.name}"?`
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("playlists")
    .delete()
    .eq("id", playlist.id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Playlist deletion failed:", error);
    window.alert("Could not delete playlist. Please try again.");
    return;
  }

  setUserPlaylists((previous) =>
    previous.filter((item) => item.id !== playlist.id)
  );

  if (activeNav === playlist.name) {
    setActiveNav("Your Library");
  }
}
  
async function removeSongFromPlaylist(songId: number) {
  if (!activePlaylist) return;

  const { error } = await supabase
    .from("playlist_songs")
    .delete()
    .eq("playlist_id", activePlaylist.id)
    .eq("song_id", songId);

  if (error) {
    console.error("Song removal failed:", error);
    window.alert("Could not remove song. Please try again.");
    return;
  }

  setUserPlaylists((previous) =>
    previous.map((playlist) =>
      playlist.id === activePlaylist.id
        ? {
            ...playlist,
            songIds: playlist.songIds.filter((id) => id !== songId),
          }
        : playlist
    )
  );
}
async function addSongToPlaylist(song: Song) {
  if (!user) {
    setAuthOpen(true);
    return;
  }

  if (userPlaylists.length === 0) {
    window.alert("Create a playlist first using the + button in Your Collection.");
    return;
  }

  const choices = userPlaylists
    .map((item, index) => `${index + 1}. ${item.name}`)
    .join("\n");

  const answer = window.prompt(
    `Add "${song.title}" to which playlist? Enter its number:\n${choices}`
  );

  if (!answer) return;

  const index = Number(answer) - 1;
  const target = userPlaylists[index];

  if (!Number.isInteger(index) || !target) {
    window.alert("Please enter a valid playlist number.");
    return;
  }

  if (target.songIds.includes(song.id)) {
    window.alert("This song is already in that playlist.");
    return;
  }

  const { error } = await supabase
    .from("playlist_songs")
    .insert({
      playlist_id: target.id,
      song_id: song.id,
    });

  if (error) {
    console.error("Adding song failed:", error);
    window.alert("Could not add song. Please try again.");
    return;
  }

  setUserPlaylists((previous) =>
    previous.map((item) =>
      item.id === target.id
        ? { ...item, songIds: [...item.songIds, song.id] }
        : item
    )
  );

  window.alert(`Added to ${target.name}.`);
}


  function nextSong() {
    const index = playableSongs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = shuffle
      ? Math.floor(Math.random() * playableSongs.length)
      : (index + 1) % playableSongs.length;

    setCurrentSong(playableSongs[nextIndex]);
    setIsPlaying(true);
    recordRecentlyPlayed(playableSongs[nextIndex].id);
  }

  function previousSong() {
    const index = playableSongs.findIndex((song) => song.id === currentSong.id);
    const previous = playableSongs[(index - 1 + playableSongs.length) % playableSongs.length];
    setCurrentSong(previous);
    setIsPlaying(true);
    recordRecentlyPlayed(previous.id);
  }

  
async function toggleLike(id: number) {
  // Guest user: open login popup
  if (!user) {
    setAuthOpen(true);
    return;
  }

  const alreadyLiked = liked.includes(id);

  if (alreadyLiked) {
    const { error } = await supabase
      .from("user_likes")
      .delete()
      .eq("user_id", user.id)
      .eq("song_id", id);

    if (error) {
      console.error("Unlike failed:", error);
      window.alert("Could not remove like. Please try again.");
      return;
    }

    setLiked((previous) => previous.filter((songId) => songId !== id));
  } else {
    const { error } = await supabase
      .from("user_likes")
      .insert({
        user_id: user.id,
        song_id: id,
      });

    if (error) {
      console.error("Like failed:", error);
      window.alert("Could not like this song. Please try again.");
      return;
    }

    setLiked((previous) => [...previous, id]);
  }
}
  
const filteredSongs = songs.filter((song) => {
  const matchesSearch = `${song.title} ${song.artist} ${song.album}`
    .toLowerCase()
    .includes(search.toLowerCase());
  if (!matchesSearch) return false;
  if (activeNav === "Liked Songs") return liked.includes(song.id);
  if (activeNav === "Your Library") {
  return (
    liked.includes(song.id) ||
    userPlaylists.some((playlist) => playlist.songIds.includes(song.id))
  );
}
  if (activeNav === "Recently Played") return recentlyPlayed.includes(song.id);
  if (activeNav === "Made for You") return [1, 3, 5, 7, 9, 11, 13].includes(song.id);
  if (activePlaylist) return activePlaylist.songIds.includes(song.id);
  return true;
}).sort((a, b) => activeNav === "Recently Played"
  ? recentlyPlayed.indexOf(a.id) - recentlyPlayed.indexOf(b.id)
  : a.id - b.id);

  // Use the displayed song length until the browser reports the real duration.
  const [fallbackMinutes, fallbackSeconds] = currentSong.duration.split(":").map(Number);
  const fallbackDuration = fallbackMinutes * 60 + fallbackSeconds;
  const effectiveDuration = duration > 0 ? duration : fallbackDuration;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="metadata"
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setCurrentTime(audio.currentTime);
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            setDuration(audio.duration);
          }
        }}
        onLoadedMetadata={(event) => {
          const audioDuration = event.currentTarget.duration;
          if (Number.isFinite(audioDuration) && audioDuration > 0) {
            setDuration(audioDuration);
          }
        }}
        onDurationChange={(event) => {
          const audioDuration = event.currentTarget.duration;
          if (Number.isFinite(audioDuration) && audioDuration > 0) {
            setDuration(audioDuration);
          }
        }}
        onEnded={() => {
          if (repeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            void audioRef.current.play();
          } else {
            nextSong();
          }
        }}
      />
    <main className="min-h-screen bg-[#09090d] pb-28 text-white selection:bg-violet-500/40 md:pb-28">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        {/* Sidebar */}
        <aside className="hidden w-[245px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0c0c11] px-6 py-8 md:flex">
          <button
            onClick={() => setActiveNav("Home")}
            className="mb-12 flex items-center gap-3 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-xl font-black shadow-lg shadow-violet-500/20">
              S
            </span>
            <span className="text-2xl font-bold tracking-[0.12em]">
              SARGAM<span className="text-violet-400">.</span>
            </span>
          </button>

          <p className="mb-4 text-[10px] font-bold tracking-[0.24em] text-zinc-500">
            MENU
          </p>

          <nav className="space-y-2">
            {[
              ["⌂", "Home"],
              ["⌕", "Search"],
              ["▤", "Your Library"],
            ].map(([icon, label]) => (
              <button
                key={label}
                onClick={() => handleNavClick(label)}
                className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm transition ${
                  activeNav === label
                    ? "bg-violet-500/15 font-semibold text-violet-300"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="text-xl">{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          <div className="mb-4 mt-12 flex items-center justify-between">
            <p className="text-[10px] font-bold tracking-[0.24em] text-zinc-500">
              YOUR COLLECTION
            </p>
            <button
              onClick={createPlaylist}
              className="text-xl text-zinc-400 transition hover:text-white"
              aria-label="Create playlist"
              title="Create playlist"
            >
              +
            </button>
          </div>

          <nav className="space-y-2">
            {[
              ["♡", "Liked Songs"],
              ["◷", "Recently Played"],
              ["♫", "Made for You"],
            ].map(([icon, label]) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm transition ${
                  activeNav === label
                    ? "bg-violet-500/15 text-violet-300"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="text-xl">{icon}</span>
                {label}
              </button>
            ))}
          </nav>
         {userPlaylists.length > 0 && (
  <nav className="mt-3 space-y-1">
    {userPlaylists.map((playlist) => (
      <button
        key={playlist.id}
        onClick={() => handleNavClick(playlist.name)}
        className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition ${
          activeNav === playlist.name
            ? "bg-violet-500/15 text-violet-300"
            : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
        }`}
      >
        <span className="text-lg">♫</span>
        <span className="truncate">{playlist.name}</span>
        <span className="ml-auto text-xs text-zinc-600">
          {playlist.songIds.length}
        </span>
      </button>
    ))}
  </nav>
)}

          <div className="mt-auto rounded-2xl border border-white/[0.07] bg-gradient-to-br from-violet-500/10 to-transparent p-4">
            <div className="mb-3 text-2xl">♫</div>
            <p className="text-sm font-semibold">Your sound. Your space.</p>
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              A little music can change your whole mood.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/[0.06] bg-[#09090d]/90 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
            <div className="flex shrink-0 items-center gap-2 md:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 font-black">
                S
              </span>
              <span className="font-bold tracking-wider">SARGAM</span>
            </div>

            <div className="relative ml-auto w-full max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-500">
                ⌕
              </span>
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setActiveNav("Search");
                }}
                placeholder="What do you want to listen to?"
                aria-label="Search songs"
                className="w-full rounded-full border border-white/[0.08] bg-white/[0.04] py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 focus:bg-white/[0.06]"
              />
            </div>

            {user ? (
  <div className="relative shrink-0">
    <button
      onClick={() => setAccountMenuOpen((open) => !open)}
      aria-expanded={accountMenuOpen}
      aria-label="Open account menu"
      className="flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-2 text-xs text-zinc-300 transition hover:border-violet-400/40 hover:text-white"
    >
      ACCOUNT
      <span className="text-[10px] text-violet-300">
        {accountMenuOpen ? "▲" : "▼"}
      </span>
    </button>

    {accountMenuOpen && (
      <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-white/[0.09] bg-[#17151f] p-3 shadow-2xl shadow-black/40">
        <div className="border-b border-white/[0.07] px-3 py-2">
          <p className="text-[10px] font-bold tracking-[0.18em] text-zinc-500">
            SIGNED IN AS
          </p>
          <p className="mt-2 break-all text-sm text-zinc-200">
            {user.email || "SARGAM user"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-2 w-full rounded-xl px-3 py-2.5 text-left text-sm text-zinc-300 transition hover:bg-red-500/10 hover:text-red-300"
        >
          Log out
        </button>
      </div>
    )}
  </div>
) : (
  <button
    onClick={() => setAuthOpen(true)}
    className="shrink-0 items-center gap-2 rounded-full border border-white/[0.08] px-3 py-2 text-xs text-zinc-400 transition hover:border-violet-400/40 hover:text-white sm:flex"
  >
    LOGIN / SIGN UP
  </button>
)}
          </header>

          <div className="px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
            {/* Greeting */}
            <div className="mb-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-400">
                YOUR PERSONAL SOUNDTRACK
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {activeNav === "Search"
                  ? "Find your sound."
                  : activeNav === "Liked Songs"
                    ? "Your favourites."
                    : activeNav === "Recently Played"
                      ? "Back in the vibe."
                      : activeNav === "Your Library"
                        ? "Your collection."
                        : activeNav === "Made for You"
                          ? "Picked for you."
                          : "Feel every beat."}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
                Good music. Good mood. Great moments. Find the soundtrack to
                whatever you&apos;re feeling today.
              </p>
            </div>

            {/* Featured card */}
            {activeNav === "Home" && !search && (
              <div className="group relative mb-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#17151f]">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-950 via-[#191329]/95 to-transparent" />
                <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-[90px]" />

                <div className="relative flex min-h-[270px] flex-col justify-between gap-8 p-6 sm:flex-row sm:items-center sm:p-10 lg:p-12">
                  <div className="max-w-lg">
                    <span className="rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-violet-200">
                      FEATURED PLAYLIST
                    </span>
                    <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                      After Hours
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
                      For the nights that feel endless and the songs that stay
                      with you.
                    </p>
                    <button
                      onClick={() => playSong(songs[0])}
                      className="mt-7 inline-flex items-center gap-3 rounded-full bg-violet-500 px-6 py-3 text-sm font-bold transition hover:scale-105 hover:bg-violet-400"
                    >
                      <span>▶</span> Explore the vibe
                    </button>
                  </div>

                  <div className="relative mx-auto w-full max-w-[210px] shrink-0 sm:mx-0">
                    <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-3xl" />
                    <img
                      src={songs[0].cover}
                      alt="Featured playlist artwork"
                      className="relative aspect-square w-full rotate-3 rounded-2xl object-cover shadow-2xl shadow-black/50 transition duration-500 group-hover:rotate-0"
                    />
                    <div className="absolute -bottom-3 -left-3 rounded-xl border border-white/10 bg-[#19151f]/90 px-4 py-3 shadow-xl backdrop-blur-xl">
                      <p className="text-[9px] tracking-widest text-violet-300">
                        SARGAM SELECTS
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        Made for the moment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick access */}
            {activeNav === "Home" && !search && (
              <section className="mb-12">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold sm:text-2xl">
                    Your mood, your music
                  </h2>
                  <span className="text-xs text-zinc-500">QUICK PICKS</span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {playlists.map((playlist) => (
                    <button
                      key={playlist.name}
                      onClick={() => {
                        const song = songs.find(
                          (item) => item.cover === playlist.cover
                        );
                        if (song) playSong(song);
                      }}
                      className="group flex items-center gap-4 overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.035] text-left transition hover:border-violet-400/20 hover:bg-white/[0.07]"
                    >
                      <img
                        src={playlist.cover}
                        alt=""
                        className="h-16 w-16 object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="min-w-0 py-2">
                        <p className="truncate text-sm font-semibold">
                          {playlist.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-zinc-500">
                          {playlist.subtitle}
                        </p>
                      </div>
                      <span className="ml-auto mr-4 flex h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-violet-500 text-sm opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100">
                        ▶
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            
{/* Your Library Sections */}
{activeNav === "Your Library" && (
  <section className="mb-12 space-y-8">

    {libraryLoading && (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm text-zinc-400">
        Loading your library...
      </div>
    )}

    {!libraryLoading && libraryError && (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
        {libraryError}
      </div>
    )}

    {/* Liked Songs */}
    <div>
      <h3 className="mb-4 text-lg font-bold">Liked Songs</h3>

      <button
        onClick={() => setActiveNav("Liked Songs")}
        className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-violet-600/20 to-purple-500/5 p-4 text-left transition hover:border-violet-400/30"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-800 text-3xl">
          ♥
        </div>
        <div>
          <p className="font-bold">Liked Songs</p>
          <p className="mt-1 text-xs text-zinc-500">
            {liked.length} songs
          </p>
        </div>
      </button>
    </div>

    {/* Your Playlists */}
    <div>
      <h3 className="mb-4 text-lg font-bold">Your Playlists</h3>

      
    {libraryLoading ? null : libraryError ? null : userPlaylists.length === 0 ? (
      <p className="text-sm text-zinc-500">
       You haven't created any playlists yet.
     </p>
    ) : (

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {userPlaylists.map((playlist) => (
  <div key={playlist.id} className="relative">
    <button
      onClick={() => handleNavClick(playlist.name)}
      className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-left transition hover:border-violet-400/30 hover:bg-white/[0.055]"
    >
      <div className="mb-3 flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-violet-950 text-4xl">
        ♫
      </div>
      <p className="truncate text-sm font-semibold">
        {playlist.name}
      </p>
      <p className="mt-1 text-xs text-zinc-500">
        {playlist.songIds.length} songs
      </p>
    </button>

    <button
      onClick={() => deletePlaylist(playlist)}
      aria-label={`Delete ${playlist.name}`}
      title="Delete playlist"
      className="absolute right-6 top-6 rounded-lg bg-black/60 px-2 py-1 text-sm text-zinc-400 hover:bg-red-500/20 hover:text-red-400"
    >
      🗑
    </button>
  </div>
))}
        </div>
      )}
    </div>
  </section>
)}

{/* Songs - Hidden on Your Library */}
{activeNav !== "Your Library" && (
  <section className="mb-12">
    <div className="mb-5 flex items-end justify-between">
      <div>
        <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-violet-400">
          {activeNav === "Liked Songs"
            ? "YOUR COLLECTION"
            : activeNav === "Search"
              ? "DISCOVER"
              : "HANDPICKED FOR YOU"}
        </p>

        <h2 className="text-xl font-bold sm:text-2xl">
          {activeNav === "Liked Songs"
            ? "Liked Songs"
            : activeNav === "Recently Played"
              ? "Recently Played"
              : activeNav === "Search"
                ? "Search results"
                : activePlaylist
                  ? activePlaylist.name
                  : "Made for your ears"}
        </h2>
      </div>

      <span className="text-xs text-zinc-500">
        {filteredSongs.length} tracks
      </span>
    </div>

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {filteredSongs.map((song, index) => (
        <article
          key={song.id}
          className="group min-w-0 rounded-2xl border border-white/[0.04] bg-white/[0.025] p-3 transition duration-300 hover:-translate-y-1 hover:border-white/[0.09] hover:bg-white/[0.055] sm:p-4"
        >
          <div className="relative mb-4">
            <img
              src={song.cover}
              alt={`${song.album} artwork`}
              className="aspect-square w-full rounded-xl object-cover shadow-lg shadow-black/20"
            />

            <button
              onClick={() => playSong(song)}
              aria-label={`Play ${song.title}`}
              className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-violet-500 text-lg shadow-xl shadow-violet-900/30 opacity-0 transition hover:scale-105 hover:bg-violet-400 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
            >
              ▶
            </button>

            <span className="absolute left-2 top-2 rounded-md bg-black/50 px-2 py-1 text-[9px] font-bold tracking-wider text-white/80 backdrop-blur">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={() => playSong(song)}
            className="block w-full truncate text-left text-sm font-semibold transition hover:text-violet-300"
          >
            {song.title}
          </button>

          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="truncate text-xs text-zinc-500">
              {song.artist}
            </p>

            <button
              onClick={() => addSongToPlaylist(song)}
              aria-label={`Add ${song.title} to a playlist`}
              title="Add to playlist"
              className="shrink-0 text-sm text-zinc-500 transition hover:text-white"
            >
              +♫
            </button>

            {activePlaylist && (
  <button
    onClick={() => removeSongFromPlaylist(song.id)}
    aria-label={`Remove ${song.title} from playlist`}
    title="Remove from playlist"
    className="shrink-0 text-sm text-zinc-500 transition hover:text-red-400"
  >
    ✕
  </button>
)}
            <button
              onClick={() => toggleLike(song.id)}
              aria-label={
                liked.includes(song.id)
                  ? "Unlike song"
                  : "Like song"
              }
              className={`shrink-0 text-lg transition hover:scale-125 ${
                liked.includes(song.id)
                  ? "text-violet-400"
                  : "text-zinc-600 hover:text-violet-300"
              }`}
            >
              {liked.includes(song.id) ? "♥" : "♡"}
            </button>
          </div>
        </article>
      ))}
    </div>

    {filteredSongs.length === 0 && (
      <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
        <p className="text-3xl">♫</p>
        <p className="mt-3 font-semibold">Nothing here yet</p>

        <p className="mt-2 text-sm text-zinc-500">
          {activeNav === "Liked Songs"
            ? "Like a song to find it here."
            : activeNav === "Recently Played"
              ? "Play a song and it will appear here."
              : activePlaylist
                ? "Use +♫ on any song to add it to this playlist."
                : "Try another search."}
        </p>
      </div>
    )}
  </section>
)}

            {/* Bottom message */}
            <div className="mb-4 flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-white/[0.04] to-transparent p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-lg font-bold">Music for every version of you.</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Discover a mood. Find your rhythm. Make it yours.
                </p>
              </div>
              <span className="text-3xl text-violet-400">♫</span>
            </div>

            <footer className="flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-[10px] tracking-widest text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 SARGAM</span>
              <span>MADE FOR THE LOVE OF MUSIC</span>
            </footer>
          </div>
        </section>
      </div>

      {/* Persistent player */}
      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-[#101015]/95 shadow-[0_-15px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1800px] items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:px-10">
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:max-w-[270px]">
            <img
              src={currentSong.cover}
              alt=""
              className="h-12 w-12 shrink-0 rounded-lg object-cover shadow-lg"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {currentSong.title}
              </p>
              <p className="mt-1 truncate text-xs text-zinc-500">
                {currentSong.artist}
              </p>
            </div>
            <button
              onClick={() => toggleLike(currentSong.id)}
              aria-label="Like current song"
              className={`ml-1 hidden text-lg sm:block ${
                liked.includes(currentSong.id)
                  ? "text-violet-400"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {liked.includes(currentSong.id) ? "♥" : "♡"}
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex items-center gap-5 sm:gap-7">
              <button
                onClick={() => setShuffle(!shuffle)}
                aria-label="Toggle shuffle"
                className={`hidden text-sm transition sm:block ${
                  shuffle ? "text-violet-400" : "text-zinc-500 hover:text-white"
                }`}
              >
                ⤨
              </button>
              <button
                onClick={previousSong}
                aria-label="Previous song"
                className="text-lg text-zinc-400 transition hover:scale-110 hover:text-white"
              >
                |◀
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 hover:bg-violet-200"
              >
                <span className="text-base">
                  {isPlaying ? "Ⅱ" : "▶"}
                </span>
              </button>
              <button
                onClick={nextSong}
                aria-label="Next song"
                className="text-lg text-zinc-400 transition hover:scale-110 hover:text-white"
              >
                ▶|
              </button>
              <button
                onClick={() => setRepeat(!repeat)}
                aria-label="Toggle repeat"
                className={`hidden text-sm transition sm:block ${
                  repeat ? "text-violet-400" : "text-zinc-500 hover:text-white"
                }`}
              >
                ↻
              </button>
            </div>

            <div className="flex w-full max-w-xl items-center gap-3">
              <span className="w-9 text-right text-[10px] tabular-nums text-zinc-500">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={effectiveDuration || 1}
                value={Math.min(currentTime, effectiveDuration || 0)}
                onChange={(event) => {
                  const newTime = Number(event.target.value);
                  if (audioRef.current) {
                    audioRef.current.currentTime = newTime;
                    setCurrentTime(newTime);
                  }
                }}
                aria-label="Seek through song"
                className="h-1 min-w-0 flex-1 cursor-pointer accent-violet-400"
              />
              <span className="w-9 text-[10px] tabular-nums text-zinc-500">
                {formatTime(effectiveDuration)}
              </span>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
            <span className="text-sm text-zinc-500">♫</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Volume"
              className="h-1 w-24 cursor-pointer accent-violet-400"
            />
            <span className="w-8 text-right text-xs text-zinc-500">
              {volume}%
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile navigation */}
      <nav className="fixed inset-x-0 bottom-[82px] z-40 grid grid-cols-4 border-t border-white/[0.06] bg-[#0c0c11]/95 px-2 py-2 backdrop-blur-xl md:hidden">
        {[
          ["⌂", "Home"],
          ["⌕", "Search"],
          ["▤", "Your Library"],
          ["♡", "Liked Songs"],
        ].map(([icon, label]) => (
          <button
            key={label}
            onClick={() => handleNavClick(label)}
            className={`flex flex-col items-center gap-1 py-1 text-[10px] transition ${
              activeNav === label ? "text-violet-300" : "text-zinc-500"
            }`}
          >
            <span className="text-xl">{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </main>

    <AuthModal
      open={authOpen}
      onClose={() => setAuthOpen(false)}
      onSuccess={() => setAuthOpen(false)}
    />
    </>
  );
}
