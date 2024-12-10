-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 14. 10:09
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `alkat`
--

INSERT INTO `alkat` (`id`, `tkat_id`, `nev`) VALUES
(1, 1, 'Haladómozgással kapcsolatos'),
(2, 1, 'Körmozgás/Forgómozgás kapcsolatos'),
(3, 1, 'Dinamika (erőtan)'),
(4, 1, 'Munka/Energiával kapcsolatos'),
(5, 1, 'Folyadékokkal kapcsolatos'),
(6, 2, 'Rezgés/Hullámokkal kapcsolatos'),
(7, 3, 'Hőtan'),
(8, 4, 'Elektromossággal kapcsolatos'),
(9, 4, 'Mágnesességgel kapcsolatos'),
(10, 4, 'Ellenállások fajtái');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dolgozatok`
--

CREATE TABLE `dolgozatok` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ido` int(11) NOT NULL,
  `kezdet` varchar(255) NOT NULL,
  `dif` int(11) NOT NULL,
  `tabla_id` varchar(255) NOT NULL,
  `tabla_sor` int(11) NOT NULL,
  `osztaly` varchar(4) NOT NULL,
  `kiirva` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `eredmenyek`
--

CREATE TABLE `eredmenyek` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `osztaly` varchar(4) NOT NULL,
  `Mpont` int(11) NOT NULL,
  `Epont` int(11) NOT NULL,
  `datum` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `katok` varchar(255) NOT NULL,
  `dif` int(11) NOT NULL,
  `fajta` int(11) NOT NULL,
  `EIdo` int(11) DEFAULT NULL,
  `TIdo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ertesitesek`
--

CREATE TABLE `ertesitesek` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `datum` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `extra` varchar(255) NOT NULL,
  `kinek` varchar(255) DEFAULT NULL,
  `lezarva` int(11) DEFAULT NULL,
  `megjelenitve` tinyint DEFAULT 0,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tablak`
--

INSERT INTO `tablak` (`id`, `nev`, `jel`, `def`, `mert`, `alkat_id`) VALUES
(1, 'Helyvektor', '`vec r` (r vektor)', 'irányított szakasz', 'méter (m)', 1),
(2, 'Elmozdulás', '`Deltavec r` (delta er)', '`vec x`<sub>1</sub>-`vec x`<sub>2</sub>', 'méter (m)', 1),
(3, 'Idő', 't', 'alapmennyiség', 'secundum (sec)', 1),
(4, 'Eltelt idő', '`Delta`t (delta té)', 't<sub>2</sub>-t<sub>1</sub>', 'secundum (sec)', 1),
(5, 'Sebesség', '`vec v`', '`(Deltavec r)/(Deltat)`', '`(méter)/(sec)`', 1),
(6, 'Sebességváltozás', '`Deltavec v` (v vektor)', '`vec v`<sub>2</sub>-`vec v`<sub>1</sub>', '`(méter)/(sec)`', 1),
(7, 'Gyorsulás', 'a (a vektor)', '`(Deltavec v)/(Deltat)`', '`m/s^2`', 1),
(8, 'Forgásszög', '`varphi` (fi)', 'a síkszög ívmértéke', 'radián (rad)', 2),
(9, 'Szögelfordulás', '`Deltavarphi`', '`varphi`<sub>2</sub>-`varphi`<sub>1</sub>', ' radián (rad)', 2),
(10, 'Szögsebesség', '`omega` (ómega)', '`(Deltavarphi)/(Deltat)`', '`(radián)/sec`', 2),
(11, 'A szögsebesség megváltozása', '`Deltaomega`', '`omega`<sub>2</sub>-`omega`<sub>1</sub>', '`(radián)/sec`', 2),
(12, 'Szöggyorsulás', '`beta` (béta)', '`(Deltavarphi)/(Deltat)`', '`(radián)/sec^2`', 2),
(13, 'Tömeg', 'm', 'alapmennyiség', 'kg', 3),
(14, 'Impulzus (lendület)', ' I, (p)', 'm`*`v', 'kg`*m/s`', 3),
(15, 'Lendületváltozás', '`Delta`I', 'I<sub>2</sub>-I<sub>1</sub>', 'kg`*m/s`', 3),
(16, 'Erő', 'F', '`(DeltaI)/(Deltat)`', 'kg`*m/s^2`=Newton', 3),
(17, 'Nehézségi gyorsulás', 'g', 'm`*`g', 'Newton (N)', 3),
(18, 'Súrlódási együttható', '`mu` (mű)', 'értéke táblázatban adott', 'nincs', 3),
(19, 'Csúszási együttható', '`mu` (mű)', 'értéke táblázatban adott', 'nincs', 3),
(20, 'Tapadási együttható', '`mu` (mű)', 'értéke táblázatban adott', 'nincs', 3),
(21, 'Súrlódási erő', 'F<sub>s</sub>', '`mu*`F<sub>nyomó</sub>', 'Newton', 3),
(22, 'Erőkar', 'k', 'A forgástengely távolsága az erő hatásvonalától', 'méter (m)', 3),
(23, 'Perdület', 'N', '`Theta*omega`', '`kg^2*m/s`', 3),
(24, 'Perdület változás', '`Delta`N', 'N<sub>2</sub>-N<sub>1</sub>', '`kg^2*m/s`', 3),
(25, 'Forgatónyomaték', 'M', '`(DeltaN)/(Deltat)` - (`F*k`)', 'Newton`*`méter (Nm)', 3),
(26, 'Tehetetlenségi nyomaték', '`Theta`', 'képlete táblázatban', 'kg`*m^2`', 3),
(27, 'Az út', 's', 'a pálya egy szakaszának az ívhossza', 'méter (m)', 4),
(28, 'Az erő munkája', 'W', 'F`*`s - (`F*Deltar`)', 'N`*`m=Joule(J)', 4),
(29, 'Haladási energia', 'E<sub>h</sub>', '`1/2*m*v^2`', 'N`*`m=Joule(J)', 4),
(30, 'Forgási energia', 'E<sub>forg</sub>', '`1/2*Theta*omega^2`', 'N`*`m=Joule(J)', 4),
(31, 'Hosszúság', 'l', 'alapmennyiség', 'méter (m)', 4),
(32, 'Hosszváltozás (megnyúlás)', '`Deltal` (delta el)', 'l<sub>2</sub>-l<sub>1</sub>', 'méter (m)', 4),
(33, 'Rugóenergia', 'E<sub>rugó</sub>', '`1/2*D*(Deltal)^2`', 'N`*`m=Joule(J)', 4),
(34, 'Magasság', 'h', 'a nullszinttől mért függőleges távolság', 'méter (m)', 4),
(35, 'Helyzeti energia(gravitációs potenciális energia)', 'E<sub>p</sub>', 'mg`*`h', 'N`*`m=Joule(J)', 4),
(36, 'Teljesítmény', 'P (nagy pé)', '`W/(Deltat)`', '`J/sec`=Watt (W)', 4),
(37, 'Hatásfok', '`eta`', 'W(<sub>h</sub>)`/`W(<sub>b</sub>)', 'nincs', 4),
(38, 'Felszín (terület)', 'A', 'alakfüggő', '`méter^2 (m^2)`', 5),
(39, 'Térfogat', 'V', 'alakfüggő', '`méter^3 (m^3)`', 5),
(40, 'Sűrűség', '`rho`', '`m/v`', '`kg/m^3`', 5),
(41, 'Nyomás', 'p (kis pé)', '`F/A` nyomó erő/nyomott terület', '`N/m^2`=pascal (Pa)', 5),
(42, 'Keringési idő (periódusidő)', 'T', 'a visszatéréshez szükséges idő', 'secundum (s)', 6),
(43, 'Fordulatszám (frekvencia)', 'f,`nu`', '`1/T`', '`1/sec`=Hertz (Hz)', 6),
(44, 'Hullámhossz', '`lambda` (lambda)', 'az azonos fázisú szomszédok távolsága', 'méter (m)', 6),
(45, 'Terjedési sebesség', 'c', 'a rezgésállapot haladási sebessége', '`m/s`', 6),
(46, 'Pillanatnyi kitérés', 'x,y', 'Az egyensúlyi helyzettől mért előjeles távolság', 'méter (m)', 6),
(47, 'Amplitúdó', 'A', 'Maximális kitérés', 'méter (m)', 6),
(48, 'Körfrekvencia', '`omega`', '`(2pi)/T`', '`(rad)/(sec)`', 6),
(49, 'Keringési / körül fordulási idő', 'T', 'Egy teljes keringéshez / körül forduláshoz szükséges idő', 'secundum', 6),
(50, 'Idő', 't', 'alapmennyiség', 'secundum', 6),
(51, 'Sebesség', 'v', '`(Deltar)/(Deltat)`', '`(méter)/(sec)`', 6),
(52, 'Gyorsulás', 'a', '`(Deltav)/(Deltat)`', '`(méter)/(sec)^2`', 6),
(53, 'Rezgésidő / Lengésidő', 'T', 'Egy teljes lengéshez / rezgéshez szükséges idő', 'secundum', 6),
(54, 'Tömeg', 'm', 'alapmennyiség', 'kilogramm', 6),
(55, 'Rugóállandó', 'D', '`F/(DeltaI)`', '`(N)/(méter)`', 6),
(56, 'Hosszúság', 'I', 'alapmennyiség', 'méter (m)', 6),
(57, 'Megnyúlás', '`DeltaI`', 'I<sub>2</sub>-I<sub>1</sub>', 'méter (m)', 6),
(58, 'Nehézségi gyorsulás', 'g', 'A szabadon eső test sebességének változási gyorsasága', '`(méter)/sec^2`', 6),
(59, 'A tömegközépponti tengelyre vonatkoztatott tehetetlenségi nyomaték', '`Theta`<sub>T</sub>', 'Képlete táblázatban', '`kg^2*m/s`', 6),
(60, 'A tömegközéppont és a forgástengely távolsága', 's', 'alapmennyiség', 'méter (m)', 6),
(61, 'Frekvencia', 'f', '`1/T`', '`1/sec`', 6),
(62, 'Hullámhossz', '`lambda`', 'A szomszédos, azonos fázisú helyek távolsága', 'méter (m)', 6),
(63, 'A hullám pillanatnyi kitérése az x helyen, a t időpillanatban', 'y(x,t)', 'A`*`sin[`omega*`(t - x/c)]', 'méter (m)', 6),
(64, 'Abszolút hőmérséklet', 'T', 'alapmennyiség', 'K (Kelvin)', 7),
(65, 'Hőmérséklet', 't', 'T-273', '°C (Celsius fok)', 7),
(66, 'Hőmérséklet változás', '`Deltat`,`DeltaT`', 't<sub>2</sub>-t<sub>1</sub>`-=T<sub>2</sub>-T<sub>1</sub>', '°C, K', 7),
(67, 'Hosszúság, megnyúlás', 'l,`Delta`l', 'alapmennyiség, i<sub>2</sub>-i<sub>1</sub>', 'méter (m)', 7),
(68, 'Felszín, felszínváltozás', 'A,`Delta`A', 'alakfüggő,A<sub>2</sub>-A<sub>1</sub>', '`m^2` (négyzetméter)', 7),
(69, 'Térfogat, térfogatváltozás', 'V,`Delta`V', 'alakfüggő,V<sub>2</sub>-V<sub>1</sub>', '`m^3` (köbméter)', 7),
(70, 'Lineáris hőtágulási együttható', '`alpha`', '`(Deltal)/(l*Deltat)` (l<sub>0</sub>)', '`1/°C` vagy `1/K`', 7),
(71, 'Térfogati hőtágulási együttható', '`beta`', '`(DeltaV)/(V*Deltat)` (V<sub>0</sub>)', '`1/°C` vagy `1/K`', 7),
(72, 'Nyomás', 'p', '`F/A`', 'Pa (Pascal)(N/m`^2`)', 7),
(73, 'Tömeg', 'm', 'alapmennyiség', 'kg (kilogramm)', 7),
(74, 'Moláris tömeg', 'M', 'táblázati adat', '´g/mol´ ´(gramm/mol)´', 7),
(75, 'Molekulák száma', 'N', '-', '-', 7),
(76, 'Anyagmennyiség (mólszám)', 'n', '`m/M`', 'mol', 7),
(77, 'Egyetemes gázállandó', 'R', '8,31', '`J/(mol·K)`', 7),
(78, 'Boltzmann-állandó', 'k', '1,38`*`10<sup>-23</sup>', '`J/K`', 7),
(79, 'Avogadro-állandó', 'N<sub>A</sub>', '6`*`10<sup>23</sup>', '`1/(mol)`', 7),
(80, 'A szabadsági fokok száma', 'f', 'az energiatárolás független lehetőségeinek a száma', '-', 7),
(81, 'Az egy szabadságfokra jutó átlagos energia', '`epsilon`<sub>1</sub>', '½ k`*`T', 'J (Joule)', 7),
(82, 'Egy molekula átlagos mechanikai energiája', '`epsilon`', 'f `*` ½ k`*`T', 'J (Joule)', 7),
(83, 'Belső energia', 'belső energia', 'E`N`*`f `*` ½ k`*`T', 'J (Joule)', 7),
(84, 'Hő (hőenergia)', 'Q', 'a hőközlés mértéke', 'J (Joule)', 7),
(85, 'Fajhő', 'c', '`Q/(m*DeltaT)`', '`J/(kg·K)`', 7),
(86, 'A fajhő állandó nyomáson', 'c<sub>p</sub>', '`Q/(m*DeltaT)`', '`J/(kg·K)`', 7),
(87, 'A fajhő állandó térfogaton', 'c<sub>v</sub>', '`Q/(m*DeltaT)`', '`J/(kg·K)`', 7),
(88, 'Hőkapacitás', 'C', 'm`*`c', '`J/K`', 7),
(89, 'Olvadáshő, fagyáshő', 'L<sub>o</sub>', '`Q/m`', '`J/kg`', 7),
(90, 'Párolgáshő', 'L<sub>p</sub>', '`Q/m`', '`J/kg`', 7),
(91, 'Forráshő, lecsapódáshő ', 'L<sub>f</sub>', '`Q/m`', '`J/kg`', 7),
(92, 'A gáz által végzett tágulási munka', 'W', 'folyamatfüggő', 'J (joule)', 7),
(93, 'Izobár folyamatnál', 'W', '`p * DeltaV`', 'J (joule)', 7),
(94, 'Izochor folyamatnál', 'W', '0 Nulla', 'J (joule)', 7),
(95, 'Izoterm folyamatnál', 'W', 'Fgvt.(140.o.)', 'J (joule)', 7),
(96, 'Adiabatikus folyamatnál', 'W', 'Fgvt.(140.o.)', 'J (joule)', 7),
(97, 'El. töltés', 'Q (nagy kú)', 'A`*`s', 'Amper szekundum = Coulomb (C)', 8),
(98, 'El. térerősség', '`vec E` (E vektor)', '`(vec F)/Q`', '`N/C`', 8),
(99, 'El. fluxus', '`psi` (nagy pszí)', 'E`*`A', 'Volt `*` méter (V `*` m)', 8),
(100, 'El. feszültség', 'U', '`W/Q`', '`J/C` = Volt (V)', 8),
(101, 'El. kapacitás', 'C', '`Q/U`', '`C/V` = farád (F)', 8),
(102, 'El. áramerősség', 'I (nagy i)', '`Q/(Deltat)`', '`C/sec` =  Amper (A)', 8),
(103, 'El. ellenállás', 'R', '`U/I`', '`V/A` = Ohm (`Omega`)', 8),
(104, 'Fajlagos ellenállás', '`ρ` (kis ró)', '`(R*A)/l`', 'Ohm `*` méter', 8),
(105, 'El. vezetőképesség', 'G', '`1/R`', '`1/(Ohm)`= siemens(S)', 8),
(106, 'Fajlagos vezetőképesség', '`sigma` (kis szigma)', '`1/(rho)`', '`(siemens)/(méter)`', 8),
(107, 'Mágn. indukció', '`vec B`', '`M/(I*A)`', '`N/(Am)`=`(V*s)/m^2`=T(tesla)', 9),
(108, 'Mágn. indukciófluxus', '`Phi` (nagy fí)', 'B`*`A', 'V`*`s=Wb (weber)', 9),
(109, 'Mágn. nyomaték', 'm', 'I`*`A', 'A`*m^2`', 9),
(110, 'Önindukciós együttható (induktivitás)', 'L', 'képlete táblázatban', '`(V*s)/A`=H(henry)', 9),
(111, 'Ohmikus ellenállás', 'R', '`rho*l/A`', 'Ohm (`Omega`)', 10),
(112, 'Induktív ellenállás', 'X<sub>L</sub>', '`omega*`L', 'Ohm (`Omega`)', 10),
(113, 'Kapacitív ellenállás', 'X<sub>C</sub>', '`1/(omega*C)`', 'Ohm (`Omega`)', 10),
(114, 'Impedancia', 'Z', '`((X-X)^2+R^2)^½` (X<sub>L</sub>-X<sub>C</sub>)', 'Ohm (`Omega`)', 10);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tablakapocs`
--

CREATE TABLE `tablakapocs` (
  `id` int(11) NOT NULL,
  `tablaid` int(11) NOT NULL,
  `sor` varchar(255) NOT NULL,
  `dolgozatid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tkat`
--

CREATE TABLE `tkat` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tkat`
--

INSERT INTO `tkat` (`id`, `nev`) VALUES
(1, 'Haladómozgással kapcsolatos'),
(2, 'Rezgések és hullámok'),
(3, 'Hőtan'),
(4, 'Elektromossággal kapcsolatos');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(55) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nev` varchar(36) NOT NULL,
  `osztaly` varchar(4) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `letrehozva` date NOT NULL,
  `modositva` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `nev`, `osztaly`, `jelszo`, `letrehozva`, `modositva`) VALUES
(1, 'admin@ckik.hu', 'admin', 'A', 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec', '2024-02-29', '2024-02-29 08:35:40');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `usersetting`
--

CREATE TABLE `usersetting` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `drkmode` int(11) NOT NULL DEFAULT 0,
  `private` int(11) NOT NULL DEFAULT 0,
  `profPic` longblob NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `usersetting`
--

INSERT INTO `usersetting` (`id`, `userid`, `drkmode`, `private`, `profPic`) VALUES
(1, 1, 0, 0, 0x30);

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
-- A tábla indexei `ertesitesek`
--
ALTER TABLE `ertesitesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `tablak`
--
ALTER TABLE `tablak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `alkat_id` (`alkat_id`);

--
-- A tábla indexei `tablakapocs`
--
ALTER TABLE `tablakapocs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tablaid` (`tablaid`),
  ADD KEY `dolgozatid` (`dolgozatid`);

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
-- A tábla indexei `usersetting`
--
ALTER TABLE `usersetting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alkat`
--
ALTER TABLE `alkat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
-- AUTO_INCREMENT a táblához `ertesitesek`
--
ALTER TABLE `ertesitesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tablak`
--
ALTER TABLE `tablak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT a táblához `tablakapocs`
--
ALTER TABLE `tablakapocs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tkat`
--
ALTER TABLE `tkat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(55) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `usersetting`
--
ALTER TABLE `usersetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Megkötések a táblához `ertesitesek`
--
ALTER TABLE `ertesitesek`
  ADD CONSTRAINT `ertesitesek_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `tablak`
--
ALTER TABLE `tablak`
  ADD CONSTRAINT `tablak_ibfk_1` FOREIGN KEY (`alkat_id`) REFERENCES `alkat` (`id`);

--
-- Megkötések a táblához `tablakapocs`
--
ALTER TABLE `tablakapocs`
  ADD CONSTRAINT `tablakapocs_ibfk_1` FOREIGN KEY (`tablaid`) REFERENCES `tablak` (`id`),
  ADD CONSTRAINT `tablakapocs_ibfk_2` FOREIGN KEY (`dolgozatid`) REFERENCES `dolgozatok` (`id`);

--
-- Megkötések a táblához `usersetting`
--
ALTER TABLE `usersetting`
  ADD CONSTRAINT `usersetting_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
