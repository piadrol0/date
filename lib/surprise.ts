export type ActivityKey =
  | "restaurant"
  | "cafe"
  | "park"
  | "movie"
  | "bowling"
  | "museum";

export type SurpriseScene = {
  text: string;
  mood: string;
  music: string;
  flower?: string;
};

export const surpriseMap: Record<string, SurpriseScene> = {
  restaurant: {
    text: "یه شام آروم با نور کم، انگار دنیا کند شده",
    mood: "You make me think of this song",
    music: "/drake.mp3",
    flower: "red-rose",
  },

  cafe: {
    text: "کافه، حرف‌های نصفه نیمه، نگاه‌های کامل",
    mood: "You make me think of this song",
    music: "/drake.mp3",
    flower: "white-rose",
  },

  park: {
    text: "پیاده‌روی بی‌هدف، اما با یک مقصد مشخص",
    mood: "You make me think of this song",
    music: "/drake.mp3",
    flower: "tulip",
  },

  movie: {
    text: "سینما، تاریکی امن، سکوت مشترک",
    mood: "You make me think of this song",
    music: "/drake.mp3",
    flower: "rose",
  },

  bowling: {
    text: "رقابت الکی ولی خنده‌های واقعی",
    mood: "You make me think of this song",
    music: "/drake.mp3",
    flower: "sunflower",
  },

  default: {
    text: "یه لحظه ساده که خاص میشه",
    mood: "You make me think of this song",
    music: "/drake.mp3",
    flower: "white-rose",
  },
};

export const getScene = (activity: string): SurpriseScene => {
  return surpriseMap[activity] ?? surpriseMap.default;
};
