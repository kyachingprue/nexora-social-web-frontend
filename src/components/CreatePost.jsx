import { useState } from "react";
import { Image, Smile, MapPin, ListVideo } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { currentUser } from "../data/fakeData";
import { Button } from "../ui/button";


const actions = [
  { icon: Image, label: "Photo", color: "text-emerald-500" },
  { icon: ListVideo, label: "Video", color: "text-sky-500" },
  { icon: MapPin, label: "Location", color: "text-accent" },
  { icon: Smile, label: "Feeling", color: "text-amber-500" },
];

export default function CreatePost() {
  const [value, setValue] = useState("");

  return (
    <Card className="overflow-visible border border-gray-300 dark:border-gray-500 hover:shadow-lg shadow-blue-300 dark:shadow-cyan-700 dark:bg-black/40">
      <CardContent className="flex gap-3 p-4">
        <Avatar className="h-11 w-11 shrink-0">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>YU</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="What's happening?"
            rows={1}
            className="w-full resize-none bg-transparent text-[15px] text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"/>

          <div
            className="mt-3 flex items-center justify-between border-t border-gray-300 pt-3 dark:border-gray-600">
            <div className="flex items-center gap-1">
              {actions.map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  className="grid h-9 w-9 place-items-center rounded-full text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
                  <Icon size={18} className={color} />
                </button>
              ))}
            </div>

            <Button size="sm" variant="gradient" disabled={!value.trim()}>
              Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
