"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Pencil, Users, ArrowRight } from "lucide-react";

export default function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [activeTab, setActiveTab] = useState("create");
  const [selectedAvatar, setSelectedAvatar] = useState("pixel-1");
  const router = useRouter();

  const avatars = useMemo(
    () => [
      { id: "pixel-1", label: "Pixel 1", emoji: "🎮", bg: "from-pink-500 to-rose-500" },
      { id: "pixel-2", label: "Pixel 2", emoji: "🕹️", bg: "from-indigo-500 to-sky-500" },
      { id: "pixel-3", label: "Pixel 3", emoji: "🎨", bg: "from-emerald-500 to-lime-500" },
      { id: "pixel-4", label: "Pixel 4", emoji: "⚡", bg: "from-yellow-400 to-amber-500" },
      { id: "pixel-5", label: "Pixel 5", emoji: "👾", bg: "from-violet-500 to-fuchsia-500" },
      { id: "pixel-6", label: "Pixel 6", emoji: "💥", bg: "from-red-500 to-orange-500" },
      { id: "pixel-7", label: "Pixel 7", emoji: "🌈", bg: "from-sky-400 to-purple-500" },
      { id: "pixel-8", label: "Pixel 8", emoji: "⭐", bg: "from-slate-500 to-slate-800" },
      { id: "pixel-9", label: "Pixel 9", emoji: "🔥", bg: "from-orange-500 to-rose-500" },
    ],
    []
  );

  const persistProfile = () => {
    localStorage.setItem("playerName", name);
    localStorage.setItem("playerAvatar", selectedAvatar);
  };

  const createRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    const newRoomId = Math.random().toString(36).substring(2, 10);
    persistProfile();
    router.push(`room/${newRoomId}`);
  };

  const joinRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!roomId.trim()) {
      alert("Please enter a room ID");
      return;
    }
    persistProfile();
    router.push(`room/${roomId}`);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      {/* Doodle shapes around the main card */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 top-16 h-32 w-32 rotate-[-12deg] rounded-[40%] border-2 border-dashed border-pink-400/50 bg-pink-500/10 blur-[1px]" />
        <div className="absolute -right-8 bottom-24 h-40 w-40 rotate-[18deg] rounded-[45%] border border-sky-400/60 bg-sky-500/15" />
        <div className="absolute left-1/2 top-10 h-10 w-10 -translate-x-1/2 rotate-12 rounded-xl border border-yellow-300/70 bg-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.9)]" />
        <div className="absolute right-1/3 bottom-10 h-8 w-20 -rotate-6 rounded-full border-2 border-indigo-400/70" />
        <div className="absolute left-6 bottom-6 flex gap-2 text-2xl opacity-80">
          <span>⭐</span>
          <span>🎧</span>
          <span>🧩</span>
        </div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="title-graffiti text-5xl md:text-6xl font-extrabold text-pink-600 dark:text-pink-400 mb-3 drop-shadow-[0_0_25px_rgba(236,72,153,0.8)]">
            Pixel Party
          </h1>
          <p className="text-lg text-slate-700 dark:text-sky-200">
            Draw wild. Guess fast. Win loud.
          </p>
        </div>

        <Card className="relative shadow-2xl border border-indigo-500/30 bg-white/75 dark:bg-black/60 backdrop-blur-xl rounded-[2.25rem]">
          {/* Irregular neon outline */}
          <div className="pointer-events-none absolute -inset-[3px] rounded-[2.75rem] border-2 border-transparent [background:linear-gradient(120deg,rgba(236,72,153,0.9),rgba(56,189,248,0.9))_border-box] opacity-60" />
          <CardHeader>
            <div className="flex space-x-2 mb-2">
              <Button
                variant={activeTab === "create" ? "default" : "outline"}
                className={`flex-1 ${
                  activeTab === "create" ? "bg-indigo-600" : ""
                }`}
                onClick={() => setActiveTab("create")}
              >
                <Pencil className="h-4 w-4 mr-2" /> Create Room
              </Button>
              <Button
                variant={activeTab === "join" ? "default" : "outline"}
                className={`flex-1 ${
                  activeTab === "join" ? "bg-indigo-600" : ""
                }`}
                onClick={() => setActiveTab("join")}
              >
                <Users className="h-4 w-4 mr-2" /> Join Room
              </Button>
            </div>
            <CardTitle className="text-2xl text-center text-slate-900 dark:text-sky-200 tracking-wide">
              {activeTab === "create"
                ? "Create a New Game"
                : "Join Existing Game"}
            </CardTitle>
            <CardDescription className="text-center text-slate-600 dark:text-indigo-100/70">
              {activeTab === "create"
                ? "Start a new game and invite your friends"
                : "Enter a room ID to join an existing game"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
              >
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-pink-400/60 bg-white/70 dark:bg-black/40 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 dark:placeholder:text-indigo-200/50 focus:border-pink-400"
              />
            </div>

            {/* Avatar picker */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
                Choose your avatar
              </p>
              <div className="grid grid-cols-5 gap-2">
                {avatars.map((avatar) => {
                  const isActive = avatar.id === selectedAvatar;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border text-xl transition-all hover:scale-105 ${
                        isActive
                          ? "border-pink-400 shadow-[0_0_18px_rgba(236,72,153,0.9)] bg-gradient-to-br " +
                            avatar.bg +
                            " text-white"
                          : "border-slate-200/70 dark:border-slate-600/70 bg-white/70 dark:bg-slate-900/70 text-slate-800 dark:text-slate-100"
                      }`}
                      aria-label={avatar.label}
                    >
                      <span className="drop-shadow-sm">{avatar.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {activeTab === "join" && (
              <div>
                <label
                  htmlFor="roomId"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
                >
                  Room ID
                </label>
                <Input
                  id="roomId"
                  type="text"
                  placeholder="Enter room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="border-2 border-pink-400/60 bg-white/70 dark:bg-black/40 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 dark:placeholder:text-indigo-200/50 focus:border-pink-400"
                />
              </div>
            )}
          </CardContent>

          <CardFooter>
            {activeTab === "create" ? (
              <Button
                onClick={createRoom}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-sky-400 hover:from-pink-500 hover:via-purple-500 hover:to-sky-300 text-white py-6 font-extrabold text-lg tracking-widest shadow-[0_0_35px_rgba(236,72,153,0.8)]"
                disabled={!name.trim()}
              >
                Create Private Room <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={joinRoom}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-sky-400 hover:from-pink-500 hover:via-purple-500 hover:to-sky-300 text-white py-6 font-extrabold text-lg tracking-widest shadow-[0_0_35px_rgba(236,72,153,0.8)]"
                disabled={!name.trim() || !roomId.trim()}
              >
                Join Game <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Game Instructions */}
        <div className="mt-8 text-center text-slate-700 dark:text-indigo-100/80">
          <h3 className="font-semibold text-slate-800 dark:text-sky-200 mb-2 uppercase tracking-[0.25em] text-xs">
            Quick rules
          </h3>
          <p className="text-sm text-slate-600 dark:text-indigo-100/70">
            Take turns drawing. Everyone else guesses. Faster guesses earn more
            points — first place takes the crown.
          </p>
        </div>
      </div>
    </div>
  );
}
