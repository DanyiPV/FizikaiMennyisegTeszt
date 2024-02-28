-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 28. 09:41
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fizikai_tablazatok`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alkat`
--

CREATE TABLE `alkat` (
  `id` int(11) NOT NULL,
  `tkat_id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dolgozatok`
--

CREATE TABLE `dolgozatok` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ido` int(11) NOT NULL,
  `kezdet` date NOT NULL,
  `tablak` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `eredmenyek`
--

CREATE TABLE `eredmenyek` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `MPont` int(11) NOT NULL,
  `Epont` int(11) NOT NULL,
  `datum` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `katok` varchar(255) NOT NULL,
  `dif` int(11) NOT NULL,
  `fajta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tablak`
--

CREATE TABLE `tablak` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `jel` varchar(255) NOT NULL,
  `def` varchar(255) NOT NULL,
  `mert` varchar(255) NOT NULL,
  `alkat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tkat`
--

CREATE TABLE `tkat` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(55) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nev` varchar(36) NOT NULL,
  `osztaly` varchar(4) NOT NULL,
  `jelszo` varchar(20) NOT NULL,
  `letrehozva` date NOT NULL,
  `modositva` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alkat`
--
ALTER TABLE `alkat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tkat_id` (`tkat_id`);

--
-- A tábla indexei `dolgozatok`
--
ALTER TABLE `dolgozatok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `eredmenyek`
--
ALTER TABLE `eredmenyek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `tablak`
--
ALTER TABLE `tablak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alkat_id` (`alkat_id`);

--
-- A tábla indexei `tkat`
--
ALTER TABLE `tkat`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alkat`
--
ALTER TABLE `alkat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `dolgozatok`
--
ALTER TABLE `dolgozatok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `eredmenyek`
--
ALTER TABLE `eredmenyek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tablak`
--
ALTER TABLE `tablak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tkat`
--
ALTER TABLE `tkat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(55) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `alkat`
--
ALTER TABLE `alkat`
  ADD CONSTRAINT `alkat_ibfk_1` FOREIGN KEY (`tkat_id`) REFERENCES `tkat` (`id`);

--
-- Megkötések a táblához `dolgozatok`
--
ALTER TABLE `dolgozatok`
  ADD CONSTRAINT `dolgozatok_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `eredmenyek`
--
ALTER TABLE `eredmenyek`
  ADD CONSTRAINT `eredmenyek_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `tablak`
--
ALTER TABLE `tablak`
  ADD CONSTRAINT `tablak_ibfk_1` FOREIGN KEY (`alkat_id`) REFERENCES `alkat` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
