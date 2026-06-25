export type Movie = {
  id: string;
  title: string;
  genre: string;
  rating: string;
  image: string;
  description: string;
};

export const movies: Movie[] = [
  {
    id: "1",
    title: "Interestelar",
    genre: "Ficção Científica",
    rating: "8.6",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description:
      "Um grupo de exploradores viaja através de um buraco de minhoca no espaço em busca de um novo lar para a humanidade.",
  },
  {
    id: "2",
    title: "A Origem",
    genre: "Suspense",
    rating: "8.8",
    image: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    description:
      "Um ladrão que invade sonhos para roubar segredos recebe a missão inversa: plantar uma ideia na mente de alguém.",
  },
  {
    id: "3",
    title: "Pantera Negra",
    genre: "Ação",
    rating: "7.3",
    image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    description:
      "T'Challa retorna a Wakanda para assumir o trono e proteger sua nação.",
  },
  {
    id: "4",
    title: "Duna",
    genre: "Ficção Científica",
    rating: "8.0",
    image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    description:
      "Paul Atreides une forças com os Fremen para libertar o planeta Arrakis de seus opressores.",
  },
];