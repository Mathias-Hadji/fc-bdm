"use client";

import React, { useState, useEffect } from "react";
import playersData from "@/data/players.json";
import Image from "next/image";
import PlayerModal from "./PlayerModal";

interface Player {
    rank: number;
    name: string;
    totalGoals: number;
    matchesPlayed: number;
    goalsPerMatch: number;
    goalPercentage: number;
}

const PlayerRanking: React.FC = () => {
    const [data, setData] = useState<Player[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Player | null;
        direction: "asc" | "desc";
    }>({
        key: "rank",
        direction: "asc",
    });
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    useEffect(() => {
        setData(playersData);
    }, []);

    const sortTable = (key: keyof Player) => {
        if (key === "rank") {
            setData(playersData);
            setSortConfig({ key: "rank", direction: "asc" });
            return;
        }

        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        const rankedData = sortedData.map((player, index) => ({
            ...player,
            rank: index + 1,
        }));

        setSortConfig({ key, direction });
        setData(rankedData);
    };

    const filteredData = data.filter((player) =>
        player.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    const getMedal = (rank: number) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
        return "";
    };

    return (
        <div className="p-1 md:p-6 mb-14 text-sm md:text-base">
            <h1 className="text-xl text-slate-100 md:text-4xl font-bold mb-4 flex items-center gap-4">
                <Image
                    src="/bayern-de-monique-logo.png"
                    alt="Logo Bayern de Monique"
                    width={60}
                    height={60}
                    className="rounded-full"
                />
                <span>FC Bayern de Monique</span>
            </h1>

            <h2 className="text-slate-100 text-xl text-center md:text-left md:text-2xl font-bold mb-4">
                Classement des joueurs - Championnat FSGT 2024-2025
            </h2>

            <input
                type="text"
                placeholder="Rechercher un joueur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-600 rounded bg-gray-800 text-white"
            />

            <table className="min-w-full bg-gray-800 text-white border border-gray-700">
                <thead>
                    <tr className="bg-gray-900">
                        {[
                            { key: "rank", label: "#" },
                            { key: "name", label: "Joueur" },
                            { key: "totalGoals", label: "Total Buts" },
                            {
                                key: "matchesPlayed",
                                label: "Matchs Joués (17)",
                            },
                            {
                                key: "goalsPerMatch",
                                label: "Moyenne Buts/Match",
                            },
                        ].map(({ key, label }) => (
                            <th
                                key={key}
                                className="p-2 cursor-pointer hover:bg-gray-700 transition"
                                onClick={() => sortTable(key as keyof Player)}
                            >
                                <span className="flex items-center justify-center gap-1">
                                    {label}{" "}
                                    {sortConfig.key === key
                                        ? sortConfig.direction === "asc"
                                            ? "▲"
                                            : "▼"
                                        : ""}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((player) => (
                            <tr
                                key={player.rank}
                                className="border-t border-gray-700 text-center hover:bg-gray-700 transition"
                            >
                                <td className="font-bold p-2 py-3 md:py-3 flex justify-center items-center gap-1 whitespace-nowrap">
                                    <span>{getMedal(player.rank)}</span>
                                    <span>{player.rank}</span>
                                </td>

                                <td
                                    className="px-3 py-3 md:py-2 font-bold text-slate-300 cursor-pointer hover:underline whitespace-nowrap"
                                    onClick={() => setSelectedPlayer(player)}
                                >
                                    {player.name}
                                </td>
                                <td className="md:p-1">
                                    <div className="flex flex-col items-center">
                                        {player.totalGoals}
                                    </div>
                                </td>
                                <td className="md:p-2">
                                    {player.matchesPlayed}
                                </td>
                                <td className="md:p-2">
                                    {player.goalsPerMatch.toFixed(2)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="p-4 text-center text-gray-400"
                            >
                                Aucun joueur trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedPlayer && (
                <PlayerModal
                    player={selectedPlayer}
                    onClose={() => setSelectedPlayer(null)}
                />
            )}
        </div>
    );
};

export default PlayerRanking;
