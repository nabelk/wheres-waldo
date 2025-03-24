"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";

interface Leaderboard {
  id: number;
  name: string;
  time: string;
}

export default function Leaderboard({ modalOpen }: { modalOpen: boolean }) {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(modalOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleCloseModal();
      const url = new URL(window.location.href);
      if (url.searchParams.has("leaderboard")) {
        url.searchParams.delete("leaderboard");
        window.history.replaceState(null, "", url.toString());
      }
    }
  };

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data));
  }, []);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-6 py-3 bg-[#440829] text-lg md:text-xl font-semibold rounded-lg shadow-md hover:bg-[#440829dc] transition"
      >
        Leaderboard
      </button>

      {isModalOpen && (
        <div
          className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-[#3434ad] p-6 rounded-lg shadow-lg w-11/12 md:w-1/2"
          >
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
            <ol className="list-decimal">
              {leaderboard.map((entry, index) => (
                <li key={entry.id} className="flex justify-between mb-2">
                  <span>
                    {index + 1}. {entry.name}
                  </span>
                  <span>{entry.time} mins</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
