import { Platform } from "react-native";
import "../global.css";

import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, FlatList, Pressable, ScrollView } from "react-native";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

import { movies, Movie } from "./data/movies";

// Paleta cinematográfica: fundo quase preto + acento dourado (referência a cinema/premiação)
const PALETTE = {
  bg: "#0E0E12",
  surface: "#1B1B22",
  surfaceAlt: "#24242E",
  border: "#2E2E38",
  gold: "#E3B341",
  textPrimary: "#F4F4F6",
  textSecondary: "#9A9AA6",
};

const GENRE_COLORS: Record<string, { bg: string; text: string }> = {
  "Ficção Científica": { bg: "#1E3A5F", text: "#7CC4FF" },
  Suspense: { bg: "#3B2A57", text: "#C9A6FF" },
  Ação: { bg: "#5C2626", text: "#FF9B9B" },
  Drama: { bg: "#4A3414", text: "#E3B341" },
};

function genreColor(genre: string) {
  return GENRE_COLORS[genre] ?? { bg: PALETTE.surfaceAlt, text: PALETTE.textSecondary };
}

// No web não existe módulo nativo de animação; usar JS-driver evita o warning
const useNative = Platform.OS !== "web";

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <GluestackUIProvider mode="dark">
      <Box style={{ flex: 1, backgroundColor: PALETTE.bg }}>
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
        ) : (
          <MovieList
            search={search}
            setSearch={setSearch}
            movies={filtered}
            onSelect={setSelectedMovie}
          />
        )}
        <StatusBar style="light" />
      </Box>
    </GluestackUIProvider>
  );
}

// Imagem com fallback: se a uri falhar (ou não tiver carregado ainda),
// mostra um placeholder com ícone de filme em vez de ficar em branco.
function MoviePoster({
  uri,
  alt,
  height,
}: {
  uri: string;
  alt: string;
  height: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <Box
        style={{ width: "100%", height, backgroundColor: PALETTE.surfaceAlt }}
        className="items-center justify-center"
      >
        <Text style={{ fontSize: 28 }}>🎞️</Text>
        <Text size="xs" style={{ color: PALETTE.textSecondary }} className="mt-1">
          {alt}
        </Text>
      </Box>
    );
  }

  return (
    <Image
      source={{ uri }}
      alt={alt}
      resizeMode="cover"
      className="w-full h-full"
      onError={() => setFailed(true)}
    />
  );
}

// Card com animação de entrada (fade + slide-up), atrasada por índice
function AnimatedCard({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        delay: index * 60,
        useNativeDriver: useNative,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        delay: index * 60,
        useNativeDriver: useNative,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

function MovieList({
  search,
  setSearch,
  movies,
  onSelect,
}: {
  search: string;
  setSearch: (v: string) => void;
  movies: Movie[];
  onSelect: (m: Movie) => void;
}) {
  return (
    <Box className="flex-1 px-4 pt-16">
      <Heading size="2xl" style={{ color: PALETTE.textPrimary }}>
        🎬 Catálogo de Filmes
      </Heading>
      <Text size="sm" style={{ color: PALETTE.textSecondary }} className="mb-4 mt-1">
        {movies.length} {movies.length === 1 ? "filme encontrado" : "filmes encontrados"}
      </Text>

      <Input
        variant="outline"
        className="mb-4 rounded-2xl px-2"
        style={{ backgroundColor: PALETTE.surface, borderColor: PALETTE.border }}
      >
        <InputField
          placeholder="Buscar filme..."
          placeholderTextColor={PALETTE.textSecondary}
          value={search}
          onChangeText={setSearch}
          style={{ color: PALETTE.textPrimary }}
          className="text-base"
        />
      </Input>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 14, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const colors = genreColor(item.genre);
          return (
            <AnimatedCard index={index}>
              <Pressable onPress={() => onSelect(item)}>
                <Card
                  className="p-0 rounded-2xl overflow-hidden flex-row"
                  style={{ backgroundColor: PALETTE.surface, borderColor: PALETTE.border, borderWidth: 1 }}
                >
                  <Box style={{ width: 96, height: 130 }}>
                    <MoviePoster uri={item.image} alt={item.title} height={130} />
                  </Box>
                  <VStack className="flex-1 p-3 justify-between">
                    <VStack space="xs">
                      <Heading size="md" style={{ color: PALETTE.textPrimary }}>
                        {item.title}
                      </Heading>
                      <Box
                        style={{ backgroundColor: colors.bg, alignSelf: "flex-start" }}
                        className="rounded-full px-2 py-0.5"
                      >
                        <Text size="xs" style={{ color: colors.text }}>
                          {item.genre}
                        </Text>
                      </Box>
                    </VStack>
                    <HStack className="items-center" space="xs">
                      <Text style={{ color: PALETTE.gold }}>⭐</Text>
                      <Text size="sm" style={{ color: PALETTE.textPrimary }} className="font-semibold">
                        {item.rating}
                      </Text>
                    </HStack>
                  </VStack>
                </Card>
              </Pressable>
            </AnimatedCard>
          );
        }}
        ListEmptyComponent={
          <Box className="items-center justify-center py-20">
            <Text style={{ color: PALETTE.textSecondary }}>Nenhum filme encontrado.</Text>
          </Box>
        }
      />
    </Box>
  );
}

function MovieDetails({ movie, onBack }: { movie: Movie; onBack: () => void }) {
  const colors = genreColor(movie.genre);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: useNative,
    }).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity, backgroundColor: PALETTE.bg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
        <Box style={{ width: "100%", height: 320 }}>
          <MoviePoster uri={movie.image} alt={movie.title} height={320} />
        </Box>

        <VStack
          className="p-5 -mt-6 rounded-t-3xl"
          space="sm"
          style={{ backgroundColor: PALETTE.bg }}
        >
          <HStack className="items-center justify-between">
            <Heading size="2xl" className="flex-1 pr-2" style={{ color: PALETTE.textPrimary }}>
              {movie.title}
            </Heading>
            <HStack className="items-center" space="xs">
              <Text style={{ color: PALETTE.gold }}>⭐</Text>
              <Text style={{ color: PALETTE.textPrimary }} className="font-semibold">
                {movie.rating}
              </Text>
            </HStack>
          </HStack>

          <Box style={{ backgroundColor: colors.bg, alignSelf: "flex-start" }} className="rounded-full px-3 py-1">
            <Text style={{ color: colors.text }}>{movie.genre}</Text>
          </Box>

          <Text size="md" className="pt-2" style={{ color: PALETTE.textSecondary, lineHeight: 22 }}>
            {movie.description}
          </Text>

          <Button
            onPress={onBack}
            className="mt-6 rounded-xl"
            style={{ backgroundColor: PALETTE.gold }}
          >
            <ButtonText style={{ color: "#1B1B22" }}>Voltar para a lista</ButtonText>
          </Button>
        </VStack>
      </ScrollView>

      <Pressable
        onPress={onBack}
        className="absolute top-12 left-4 rounded-full px-3 py-2"
        style={{ backgroundColor: "rgba(14,14,18,0.85)" }}
      >
        <Text style={{ color: PALETTE.textPrimary }} className="font-semibold">
          ← Voltar
        </Text>
      </Pressable>
    </Animated.View>
  );
}
