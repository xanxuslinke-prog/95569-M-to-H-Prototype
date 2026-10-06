/* Content: seeds, the next EA event, friends, feed posts, eco actions, EA links, avatars and shop prices. */

const SEEDS = {
  sunflower: {
    name: "Sunflower",
    cat: "flower",
    color: "#F4C430",
    src: "event",
    from: "Connected in Nature",
    date: "29 Aug 2026",
    order: 1,
    days: 12,
    sun: "Full sun",
    type: "Annual",
    about: "Tall summer flower. Turns its head to follow the sun while it is young.",
  },
  hibiscus: {
    name: "Hibiscus",
    cat: "flower",
    color: "#E0453A",
    src: "daily",
    from: "7-day check-in",
    date: "2 Sep 2026",
    order: 2,
    days: 14,
    sun: "Full sun",
    type: "Perennial",
    about: "Big red trumpet flowers that open for a single day each.",
  },
  orchid: {
    name: "Orchid",
    cat: "flower",
    color: "#C45BAA",
    src: "daily",
    from: "7-day check-in",
    date: "9 Sep 2026",
    order: 3,
    days: 20,
    sun: "Part shade",
    type: "Perennial",
    about: "Slow to flower but lasts for weeks once it does.",
  },
  lemon: {
    name: "Lemon",
    cat: "tree",
    color: "#F2D14B",
    src: "event",
    from: "Hope Bag Swap",
    date: "12 Sep 2026",
    order: 4,
    days: 30,
    sun: "Full sun",
    type: "Perennial",
    about: "A small citrus tree. Good for balconies in a large pot.",
  },
  basil: {
    name: "Basil",
    cat: "herb",
    color: "#3F8A3A",
    src: "daily",
    from: "7-day check-in",
    date: "16 Sep 2026",
    order: 5,
    days: 8,
    sun: "Full sun",
    type: "Annual",
    about: "Fast kitchen herb. Pinch off the tops to keep it bushy.",
  },
  tomato: {
    name: "Tomato",
    cat: "fruit",
    color: "#D9412F",
    src: "event",
    from: "Abundance Map Walk",
    date: "19 Sep 2026",
    order: 6,
    days: 16,
    sun: "Full sun",
    type: "Annual",
    about: "Needs regular water and a stake once the fruit sets.",
  },
  lavender: {
    name: "Lavender",
    cat: "shrub",
    color: "#9B7FCB",
    src: "daily",
    from: "7-day check-in",
    date: "23 Sep 2026",
    order: 7,
    days: 22,
    sun: "Full sun",
    type: "Perennial",
    about: "Hardy, scented shrub that bees love. Likes dry soil.",
  },
  marigold: {
    name: "Marigold",
    cat: "flower",
    color: "#F08A24",
    src: "daily",
    from: "7-day check-in",
    date: "",
    order: 8,
    days: 9,
    sun: "Full sun",
    type: "Annual",
    about: "Bright companion flower that keeps some pests away from vegetables.",
  },
  bottlebrush: {
    name: "Bottlebrush",
    cat: "shrub",
    color: "#C8323A",
    src: "event",
    from: "Seed Swap & Picnic",
    date: "",
    order: 9,
    days: 26,
    sun: "Full sun",
    type: "Perennial",
    about: "Red brush-shaped flowers that attract birds. Only given out at the Seed Swap & Picnic.",
  },
};

const LOCKED = [
  ["flower", "daily"],
  ["tree", "event"],
  ["fruit", "event"],
  ["herb", "daily"],
  ["shrub", "daily"],
  ["fruit", "daily"],
  ["flower", "event"],
  ["tree", "daily"],
  ["herb", "event"],
  ["flower", "daily"],
  ["fruit", "event"],
  ["shrub", "event"],
  ["tree", "event"],
  ["herb", "daily"],
  ["flower", "event"],
];

const CATS = { flower: "Flower", tree: "Tree", fruit: "Fruit", herb: "Herb", shrub: "Shrub" };

const EVENT = {
  badge: "EA-SSP-0417",
  title: "Seed Swap & Picnic",
  day: "SAT",
  num: "17",
  date: "Sat 17 Oct 2026",
  time: "10:00 – 12:00",
  dur: "2 hours",
  place: "Bennelong Lawn, Sydney",
  pts: 80,
  going: 18,
  seed: "bottlebrush",
  desc: "Bring seeds, cuttings or empty jars to swap. We finish with a shared picnic on the lawn.",
  sched: [
    ["10:00", "Arrive and check in with your badge"],
    ["10:15", "Seed and cutting swap"],
    ["11:00", "Regrow demo: celery and spring onion from kitchen scraps"],
    ["11:30", "Shared picnic"],
    ["12:00", "Wrap up"],
  ],
  bring: ["Reusable cup", "Seeds or cuttings", "Picnic rug"],
};

const FRIENDS = [
  {
    id: "priya",
    name: "Priya S.",
    lv: 21,
    col: "#8E6CC0",
    plants: [
      ["sunflower", 3],
      ["lavender", 3],
      ["lemon", 2],
      ["basil", 3],
      ["orchid", 1],
    ],
  },
  {
    id: "maya",
    name: "Maya R.",
    lv: 12,
    col: "#D96B4A",
    plants: [
      ["tomato", 3],
      ["hibiscus", 2],
      ["basil", 1],
    ],
  },
  {
    id: "sam",
    name: "Sam O.",
    lv: 9,
    col: "#3F8FA8",
    plants: [
      ["lemon", 2],
      ["sunflower", 1],
    ],
  },
  { id: "theo", name: "Theo K.", lv: 7, col: "#C49A2B", plants: [["marigold", 1]] },
];

const POSTS = [
  {
    id: "p0",
    who: "EnvironmentallyAbled",
    official: true,
    col: "#4E7A4F",
    time: "2h ago",
    text: "Thanks to the 14 people who mapped fruit trees on the Abundance Map walk around Bennelong Point.",
    likes: 31,
  },
  {
    id: "p1",
    who: "Maya R.",
    fid: "maya",
    col: "#D96B4A",
    time: "4h ago",
    text: "My tomato from the Abundance Map walk finally has fruit.",
    likes: 12,
    plant: "tomato",
  },
  {
    id: "p2",
    who: "Theo K.",
    fid: "theo",
    col: "#C49A2B",
    time: "Yesterday",
    text: "Finished a 7-day check-in streak and got a marigold daily seed.",
    likes: 10,
    plant: "marigold",
  },
  {
    id: "p3",
    who: "Sam O.",
    fid: "sam",
    col: "#3F8FA8",
    time: "Yesterday",
    text: "Planted the lemon I got at the Hope Bag Swap.",
    likes: 8,
    plant: "lemon",
  },
];

const ECO = [
  {
    id: "recycle",
    name: "Recycle or sort waste",
    pts: 3,
    icon: "recycle",
    photo: true,
    hint: "Photo of sorted bins or recycling",
  },
  {
    id: "transport",
    name: "Green transport",
    pts: 5,
    icon: "bike",
    photo: true,
    hint: "Photo of your bike, bus or train",
  },
  {
    id: "swap",
    name: "Reuse or buy second-hand",
    pts: 4,
    icon: "swap",
    photo: true,
    hint: "Photo of the item",
  },
  {
    id: "cup",
    name: "Used a reusable cup",
    pts: 3,
    icon: "cup",
    photo: false,
    hint: "Hard to photograph, so this is self-reported once a day",
  },
  {
    id: "power",
    name: "Switched off at the wall",
    pts: 3,
    icon: "plug",
    photo: false,
    hint: "Self-reported once a day",
  },
];

const AVATARS = [
  {
    id: "sprout",
    bg: "#DCEBD3",
    art: '<path d="M32 46V30" stroke="#3A5E3C" stroke-width="3.5" stroke-linecap="round"/><path d="M32 32c-10 0-15-6-15-13 9 0 15 4 15 13z" fill="#6FA35E"/><path d="M32 30c0-9 6-14 15-14 0 8-5 14-15 14z" fill="#4E7A4F"/>',
  },
  {
    id: "sun",
    bg: "#FDEBC4",
    art: '<circle cx="32" cy="32" r="10" fill="#F2B63C"/><g stroke="#F2B63C" stroke-width="3" stroke-linecap="round"><path d="M32 14v4M32 46v4M14 32h4M46 32h4M19 19l3 3M42 42l3 3M19 45l3-3M42 22l3-3"/></g><path d="M28 33q4 3 8 0" stroke="#8A5B00" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="28.5" cy="29.5" r="1.4" fill="#8A5B00"/><circle cx="35.5" cy="29.5" r="1.4" fill="#8A5B00"/>',
  },
  {
    id: "bird",
    bg: "#DDEFF7",
    art: '<ellipse cx="32" cy="36" rx="14" ry="11" fill="#3F8FA8"/><circle cx="38" cy="26" r="8" fill="#3F8FA8"/><path d="M45 26l6 2-6 2z" fill="#F2B63C"/><circle cx="40" cy="25" r="1.6" fill="#fff"/><path d="M22 34q6 8 14 2" fill="#7FC1D6"/>',
  },
  {
    id: "frog",
    bg: "#E4EDDF",
    art: '<ellipse cx="32" cy="38" rx="15" ry="10" fill="#6FA35E"/><circle cx="25" cy="27" r="6" fill="#6FA35E"/><circle cx="39" cy="27" r="6" fill="#6FA35E"/><circle cx="25" cy="27" r="3" fill="#fff"/><circle cx="39" cy="27" r="3" fill="#fff"/><circle cx="25" cy="27" r="1.5" fill="#1F2A1D"/><circle cx="39" cy="27" r="1.5" fill="#1F2A1D"/><path d="M26 39q6 4 12 0" stroke="#3A5E3C" stroke-width="2" fill="none" stroke-linecap="round"/>',
  },
  {
    id: "bee",
    bg: "#FBF3DC",
    art: '<ellipse cx="22" cy="24" rx="7" ry="9" fill="#DDEFF7" transform="rotate(-25 22 24)"/><ellipse cx="42" cy="24" rx="7" ry="9" fill="#DDEFF7" transform="rotate(25 42 24)"/><ellipse cx="32" cy="36" rx="13" ry="11" fill="#F2B63C"/><path d="M26 27v18M34 25v22" stroke="#1F2A1D" stroke-width="3.2"/>',
  },
  {
    id: "mushroom",
    bg: "#F8E0DC",
    art: '<path d="M14 32a18 13 0 0 1 36 0z" fill="#D9412F"/><circle cx="24" cy="26" r="2.6" fill="#fff"/><circle cx="36" cy="23" r="3" fill="#fff"/><circle cx="42" cy="29" r="2" fill="#fff"/><rect x="26" y="32" width="12" height="14" rx="4" fill="#F4E9D8"/>',
  },
  {
    id: "flower",
    bg: "#EFE5F7",
    art:
      '<g fill="#9B7FCB">' +
      [0, 72, 144, 216, 288]
        .map((a) => '<ellipse cx="32" cy="21" rx="6" ry="9" transform="rotate(' + a + ' 32 32)"/>')
        .join("") +
      '</g><circle cx="32" cy="32" r="6" fill="#F2B63C"/>',
  },
  {
    id: "leaf",
    bg: "#E3F0EC",
    art: '<path d="M16 46c0-18 12-30 32-30-1 20-13 30-32 30z" fill="#4E9A7E"/><path d="M16 46l20-20" stroke="#E3F0EC" stroke-width="2.4" stroke-linecap="round"/>',
  },
];

const EA_LINKS = [
  {
    n: "Instagram",
    d: "@environmentallyabled",
    u: "https://www.instagram.com/environmentallyabled/",
    ic: "image",
  },
  {
    n: "LinkedIn group",
    d: "EnvironmentallyAbled community",
    u: "https://www.linkedin.com/groups/21370030/",
    ic: "users",
  },
  {
    n: "Upcoming events",
    d: "Tickets on Humanitix",
    u: "https://events.humanitix.com/host/environmentallyabled",
    ic: "cal",
  },
];

const COST = { sun: 5, water: 5, fert: 15 };

/* Daily check-in seeds rotate each week. */
const DAILY_SEEDS = ["marigold", "hibiscus", "basil", "orchid", "lavender"];

/* Points you get if you swap a seed you already have. Event seeds are rarer, so they are worth more. */
const DUP_VALUE = { event: 30, daily: 15 };
