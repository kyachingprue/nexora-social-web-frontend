
export const users = [
  {
    id: 'u1',
    name: 'Ava Winters',
    handle: '@ava.codes',
    cover:
      'https://i.ibb.co.com/HfbQSWjP/HD-wallpaper-anime-sunset-city-girl.jpg',
    avatar: 'https://i.pravatar.cc/150?img=47',
    verified: true,
    bio: 'Product designer @Lumen · building calm software · she/her',
    followers: 18400,
    following: 312
  },
  {
    id: 'u2',
    name: 'Marcus Chen',
    handle: '@marcuschen',
    cover:
      'https://i.ibb.co.com/HfbQSWjP/HD-wallpaper-anime-sunset-city-girl.jpg',
    avatar: 'https://i.pravatar.cc/150?img=13',
    verified: true,
    bio: 'Street photography · Tokyo & Osaka · Fuji shooter',
    followers: 92100,
    following: 180
  },
  {
    id: 'u3',
    name: 'Priya Nair',
    handle: '@priyacooks',
    cover:
      'https://i.ibb.co.com/HfbQSWjP/HD-wallpaper-anime-sunset-city-girl.jpg',
    avatar: 'https://i.pravatar.cc/150?img=32',
    verified: false,
    bio: 'Home cook · sharing weeknight recipes that actually work',
    followers: 5230,
    following: 890
  },
  {
    id: 'u4',
    name: 'Jordan Blake',
    handle: '@jblake.runs',
    cover:
      'https://i.ibb.co.com/HfbQSWjP/HD-wallpaper-anime-sunset-city-girl.jpg',
    avatar: 'https://i.pravatar.cc/150?img=14',
    verified: false,
    bio: 'Marathon #4 in October · coaching @ PaceLab',
    followers: 3110,
    following: 465
  },
  {
    id: 'u5',
    name: 'Sofia Русева',
    handle: '@sofia.travels',
    cover:
      'https://i.ibb.co.com/HfbQSWjP/HD-wallpaper-anime-sunset-city-girl.jpg',
    avatar: 'https://i.pravatar.cc/150?img=45',
    verified: true,
    bio: '44 countries and counting ✈️ · travel writer',
    followers: 154000,
    following: 92
  },
  {
    id: 'u6',
    name: 'Diego Alarcón',
    handle: '@diego.builds',
    cover:
      'https://i.ibb.co.com/HfbQSWjP/HD-wallpaper-anime-sunset-city-girl.jpg',
    avatar: 'https://i.pravatar.cc/150?img=52',
    verified: false,
    bio: 'Indie hacker · shipping small tools · #buildinpublic',
    followers: 7840,
    following: 210
  },
  {
    id: 'u7',
    name: 'Nina Kowalski',
    handle: '@nina.k',
    cover:
      'https://i.ibb.co.com/HfbQSWjP/HD-wallpaper-anime-sunset-city-girl.jpg',
    avatar: 'https://i.pravatar.cc/150?img=25',
    verified: true,
    bio: 'Illustrator · prints in bio · currently: cats in space 🐈‍⬛🚀',
    followers: 41200,
    following: 133
  },
  {
    id: 'u8',
    name: 'Ethan Brooks',
    handle: '@ethan.plays',
    cover:
      'https://i.ibb.co.com/HfbQSWjP/HD-wallpaper-anime-sunset-city-girl.jpg',
    avatar: 'https://i.pravatar.cc/150?img=8',
    verified: false,
    bio: 'Game dev @Nightowl Studio · roguelikes forever',
    followers: 2870,
    following: 540
  },
  {
    id: 'u9',
    name: 'Ethan Brooks',
    handle: '@ethan.plays',
    cover:
      'https://i.ibb.co.com/HfbQSWjP/HD-wallpaper-anime-sunset-city-girl.jpg',
    avatar: 'https://i.pravatar.cc/150?img=8',
    verified: false,
    bio: 'Game dev @Nightowl Studio · roguelikes forever',
    followers: 2870,
    following: 540
  }
]

export const currentUser = {
  id: "me",
  name: "kyaching",
  handle: "@kyaching.info",
  avatar: "https://i.pravatar.cc/150?img=68",
  verified: false,
};

const findUser = (id) => users.find((u) => u.id === id);

export const stories = users.map((u, i) => ({
  id: `s${i + 1}`,
  user: u,
  viewed: i > 4,
}));

export const posts = [
  {
    id: 'p1',
    user: findUser('u2'),
    createdAt: '2026-08-25T05:40:00Z',
    text: 'Golden hour on the Shibuya crossing never gets old. Third trip back to this exact corner this year.',
    image: 'https://i.ibb.co.com/PsfHMwpJ/images.jpg',
    location: 'Shibuya, Tokyo',
    likes: 2431,
    comments: 128,
    shares: 64,
    likedByMe: false,
    savedByMe: false
  },
  {
    id: 'p2',
    user: findUser('u3'),
    createdAt: '2026-08-25T02:10:00Z',
    text: '20-minute miso brown butter pasta. Recipe drop tomorrow — tell me what you want to see next 👇',
    image:
      'https://i.ibb.co.com/T6f8pxS/Statue-of-Liberty-Island-New-York-Bay.jpg',
    location: null,
    likes: 891,
    comments: 76,
    shares: 22,
    likedByMe: true,
    savedByMe: true
  },
  {
    id: 'p3',
    user: findUser('u5'),
    createdAt: '2026-08-24T19:05:00Z',
    text: 'Woke up at 4am for this. Worth every second. Patagonia, you beautiful thing.',
    image: 'https://i.ibb.co.com/B2Jkjv0j/105223874-gettyimages-1027264824.jpg',
    location: 'Torres del Paine, Chile',
    likes: 15234,
    comments: 502,
    shares: 340,
    likedByMe: false,
    savedByMe: false
  },
  {
    id: 'p4',
    user: findUser('u7'),
    createdAt: '2026-08-24T14:22:00Z',
    text: 'Page 12 of the space-cat zine is finally done. Ink and gouache, six hours, zero regrets.',
    image: 'https://i.ibb.co.com/0RqVcCPx/images-1.jpg',
    location: null,
    likes: 4102,
    comments: 214,
    shares: 88,
    likedByMe: true,
    savedByMe: false
  },
  {
    id: 'p5',
    user: findUser('u4'),
    createdAt: '2026-08-24T09:00:00Z',
    text: '18 miles done before 7am. Marathon taper starts next week and I already miss the long runs.',
    image:
      'https://i.ibb.co.com/6RhB9Rbk/pngtree-sunset-over-city-of-charlotte-nc-north-carolina-buildings-nc-photo-image-12845226.jpg',
    location: 'Riverside Park',
    likes: 673,
    comments: 41,
    shares: 9,
    likedByMe: false,
    savedByMe: false
  },
  {
    id: 'p6',
    user: findUser('u6'),
    createdAt: '2026-08-23T21:15:00Z',
    text: 'Shipped v2 of my habit tracker this weekend — rebuilt the sync engine from scratch. Small team, big relief.',
    image:
      'https://i.ibb.co.com/zWVnHCjk/Modus-july22-sydneyoperahouse-landscape-header.jpg',
    location: null,
    likes: 512,
    comments: 63,
    shares: 47,
    likedByMe: false,
    savedByMe: true
  },
  {
    id: 'p7',
    user: findUser('u1'),
    createdAt: '2026-08-23T16:40:00Z',
    text: 'Redesigned our onboarding flow to remove 3 steps entirely. Sometimes the best UI decision is deleting UI.',
    image:
      'https://i.ibb.co.com/7NJmMbZM/national-flag-canada-with-mountain-forest-jasper-national-park-summer-landscape-lac-beauver-363815-4.avif',
    location: null,
    likes: 1988,
    comments: 156,
    shares: 210,
    likedByMe: false,
    savedByMe: false
  },
  {
    id: 'p8',
    user: findUser('u8'),
    createdAt: '2026-08-23T11:05:00Z',
    text: 'New boss fight is finally readable in motion. Six months of iteration for four seconds of combat.',
    image: 'https://i.ibb.co.com/gMdC2n5b/i-Stock-2164012534.avif',
    location: null,
    likes: 3305,
    comments: 189,
    shares: 71,
    likedByMe: true,
    savedByMe: false
  }
]

export const commentsByPost = {
  p1: [
    { id: "c1", user: findUser("u5"), text: "This light is unreal 😍", createdAt: "2026-08-25T06:02:00Z" },
    { id: "c2", user: findUser("u6"), text: "What lens for this one?", createdAt: "2026-08-25T06:30:00Z" },
    { id: "c3", user: findUser("u7"), text: "Framing is perfect, saving this.", createdAt: "2026-08-25T07:15:00Z" },
  ],
  p2: [
    { id: "c4", user: findUser("u1"), text: "Need this recipe in my life immediately", createdAt: "2026-08-25T02:40:00Z" },
    { id: "c5", user: findUser("u4"), text: "Miso brown butter?? stop it", createdAt: "2026-08-25T03:05:00Z" },
  ],
  p3: [
    { id: "c6", user: findUser("u2"), text: "4am wake-ups for views like this, always worth it", createdAt: "2026-08-24T19:30:00Z" },
    { id: "c7", user: findUser("u3"), text: "Adding this to the list right now", createdAt: "2026-08-24T20:01:00Z" },
    { id: "c8", user: findUser("u8"), text: "The colors don't even look real", createdAt: "2026-08-24T20:45:00Z" },
  ],
  p4: [
    { id: "c9", user: findUser("u2"), text: "The linework on the helmet is insane", createdAt: "2026-08-24T14:50:00Z" },
  ],
  p5: [
    { id: "c10", user: findUser("u1"), text: "Taper brain is going to hit hard, good luck!", createdAt: "2026-08-24T09:20:00Z" },
  ],
  p6: [
    { id: "c11", user: findUser("u8"), text: "Sync engines are so easy to get wrong, congrats on shipping", createdAt: "2026-08-23T21:40:00Z" },
  ],
  p7: [
    { id: "c12", user: findUser("u6"), text: "Deleting UI is underrated as a skill", createdAt: "2026-08-23T17:00:00Z" },
  ],
  p8: [
    { id: "c13", user: findUser("u4"), text: "Readable boss fights are so hard to nail, nice work", createdAt: "2026-08-23T11:30:00Z" },
  ],
};

export const notifications = [
  { id: "n1", user: findUser("u2"), type: "like", text: "liked your post", createdAt: "2026-08-25T08:00:00Z", read: false },
  { id: "n2", user: findUser("u5"), type: "follow", text: "started following you", createdAt: "2026-08-25T07:10:00Z", read: false },
  { id: "n3", user: findUser("u3"), type: "comment", text: "commented on your post", createdAt: "2026-08-24T22:00:00Z", read: true },
  { id: "n4", user: findUser("u7"), type: "mention", text: "mentioned you in a comment", createdAt: "2026-08-24T18:15:00Z", read: true },
  { id: "n5", user: findUser("u6"), type: "share", text: "shared your post", createdAt: "2026-08-23T13:20:00Z", read: true },
];

export const suggestions = users.slice(4, 8);

export const trending = [
  { id: "t1", tag: "#BuildInPublic", posts: 24500 },
  { id: "t2", tag: "#GoldenHour", posts: 18200 },
  { id: "t3", tag: "#MarathonTraining", posts: 9800 },
  { id: "t4", tag: "#IndieGameDev", posts: 7300 },
];
