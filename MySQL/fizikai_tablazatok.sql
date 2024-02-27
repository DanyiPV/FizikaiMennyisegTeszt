-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Feb 22. 10:59
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
-- Tábla szerkezet ehhez a táblához `dolgozatok`
--

CREATE TABLE `dolgozatok` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ido` int(11) NOT NULL,
  `kezdet` varchar(255) NOT NULL,
  `tablak` varchar(999) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `eredmenyek`
--

CREATE TABLE `eredmenyek` (
  `id` int(55) NOT NULL,
  `email` varchar(255) NOT NULL,
  `MPont` int(11) NOT NULL,
  `Epont` int(11) NOT NULL,
  `Datum` varchar(255) NOT NULL,
  `Kategoria` varchar(255) NOT NULL,
  `Nehezseg` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `eredmenyek`
--

INSERT INTO `eredmenyek` (`id`, `email`, `MPont`, `Epont`, `Datum`, `Kategoria`, `Nehezseg`) VALUES
(3, 'pintea.roland@ckik.hu', 5, 5, '2024.02.22-10:16', 'Haladómozgással kapcsolatos,Körmozgás/Forgómozgás kapcsolatos', 'Könnyű');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sorok`
--

CREATE TABLE `sorok` (
  `nev` varchar(255) NOT NULL,
  `jel` varchar(255) NOT NULL,
  `def` varchar(255) NOT NULL,
  `mert` varchar(255) NOT NULL,
  `kategoria_id` varchar(255) NOT NULL COMMENT 'A kategóriák tábla idja',
  `teljes_kategoria` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `sorok`
--

INSERT INTO `sorok` (`nev`, `jel`, `def`, `mert`, `kategoria_id`, `teljes_kategoria`) VALUES
('Helyvektor', '`vec r` (r vektor)', 'irányított szakasz', 'méter (m)', 'Haladómozgással kapcsolatos', 'Haladómozgással kapcsolatos'),
('Elmozdulás', '`Deltavec r` (delta er)', '`vec x`<sub>1</sub>-`vec x`<sub>2</sub>', 'méter (m)', 'Haladómozgással kapcsolatos', 'Haladómozgással kapcsolatos'),
('Idő', 't', 'alapmennyiség', 'secundum (sec)', 'Haladómozgással kapcsolatos', 'Haladómozgással kapcsolatos'),
('Eltelt idő', '`Delta`t (delta té)', 't<sub>2</sub>-t<sub>1</sub>', 'secundum (sec)', 'Haladómozgással kapcsolatos', 'Haladómozgással kapcsolatos'),
('Sebesség', '`vec v`', '`(Deltavec r)/(Deltat)`', '`(méter)/(sec)`', 'Haladómozgással kapcsolatos', 'Haladómozgással kapcsolatos'),
('Sebességváltozás', '`Deltavec v` (v vektor)', '`vec v`<sub>2</sub>-`vec v`<sub>1</sub>', '`(méter)/(sec)`', 'Haladómozgással kapcsolatos', 'Haladómozgással kapcsolatos'),
('Gyorsulás', 'a (a vektor)', '`(Deltavec v)/(Deltat)`', '`m/s^2`', 'Haladómozgással kapcsolatos', 'Haladómozgással kapcsolatos'),
('Forgásszög', '`varphi` (fi)', 'a síkszög ívmértéke', 'radián (rad)', 'Körmozgás/Forgómozgás kapcsolatos', 'Haladómozgással kapcsolatos'),
('Szögelfordulás', '`Deltavarphi`', '`varphi`<sub>2</sub>-`varphi`<sub>1</sub>', ' radián (rad)', 'Körmozgás/Forgómozgás kapcsolatos', 'Haladómozgással kapcsolatos'),
('Szögsebesség', '`omega` (ómega)', '`(Deltavarphi)/(Deltat)`', '`(radián)/sec`', 'Körmozgás/Forgómozgás kapcsolatos', 'Haladómozgással kapcsolatos'),
('A szögsebesség megváltozása', '`Deltaomega`', '`omega`<sub>2</sub>-`omega`<sub>1</sub>', '`(radián)/sec`', 'Körmozgás/Forgómozgás kapcsolatos', 'Haladómozgással kapcsolatos'),
('Szöggyorsulás', '`beta` (béta)', '`(Deltavarphi)/(Deltat)`', '`(radián)/sec^2`', 'Körmozgás/Forgómozgás kapcsolatos', 'Haladómozgással kapcsolatos'),
('Tömeg', 'm', 'alapmennyiség', 'kg', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Impulzus (lendület)', ' I, (p)', 'm`*`v', 'kg`*m/s`', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Lendületváltozás', '`Delta`I', 'I<sub>2</sub>-I<sub>1</sub>', 'kg`*m/s`', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Erő', 'F', '`(DeltaI)/(Deltat)`', 'kg`*m/s^2`=Newton', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Nehézségi gyorsulás', 'g', 'm`*`g', 'Newton (N)', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Súrlódási együttható', '`mu` (mű)', 'értéke táblázatban adott', 'nincs', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Csúszási együttható', '`mu` (mű)', 'értéke táblázatban adott', 'nincs', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Tapadási együttható', '`mu` (mű)', 'értéke táblázatban adott', 'nincs', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Súrlódási erő', 'F<sub>s</sub>', '`mu*`F<sub>nyomó</sub>', 'Newton', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Erőkar', 'k', 'A forgástengely távolsága az erő hatásvonalától', 'méter', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Perdület', 'N', '`Theta*omega`', '`kg^2*m/s`', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Perdület változás', '`Delta`N', 'N<sub>2</sub>-N<sub>1</sub>', '`kg^2*m/s`', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Forgatónyomaték', 'M', '`(DeltaN)/(Deltat)` - (`F*k`)', 'Newton`*`méter (Nm)', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Tehetetlenségi nyomaték', '`Theta`', 'képlete táblázatban', 'kg`*m^2`', 'Dinamika (erőtan)', 'Haladómozgással kapcsolatos'),
('Az út', 's', 'a pálya egy szakaszának az ívhossza', 'méter (m)', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Az erő munkája', 'W', 'F`*`s - (`F*Deltar`)', 'N`*`m=Joule(J)', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Haladási energia', 'E<sub>h</sub>', '`1/2*m*v^2`', 'N`*`m=Joule(J)', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Forgási energia', 'E<sub>forg</sub>', '`1/2*Theta*omega^2`', 'N`*`m=Joule(J)', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Hosszúság', 'l', 'alapmennyiség', 'méter', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Hosszváltozás (megnyúlás)', '`Deltal` (delta el)', 'l<sub>2</sub>-l<sub>1</sub>', 'méter', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Rugóenergia', 'E<sub>rugó</sub>', '`1/2*D*(Deltal)^2`', 'N`*`m=Joule(J)', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Magasság', 'h', 'a nullszinttől mért függőleges távolság', 'méter (m)', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Helyzeti energia(gravitációs potenciális energia)', 'E<sub>p</sub>', 'mg`*`h', 'N`*`m=Joule(J)', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Teljesítmény', 'P (nagy pé)', '`W/(Deltat)`', '`J/sec`=Watt (W)', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Hatásfok', '`eta`', 'W(<sub>h</sub>)`/`W(<sub>b</sub>)', 'nincs', 'Munka/Energiával kapcsolatos', 'Haladómozgással kapcsolatos'),
('Felszín (terület)', 'A', 'alakfüggő', '`méter^2 (m^2)`', 'Folyadékokkal kapcsolatos', 'Haladómozgással kapcsolatos'),
('Térfogat', 'V', 'alakfüggő', '`méter^3 (m^3)`', 'Folyadékokkal kapcsolatos', 'Haladómozgással kapcsolatos'),
('Sűrűség', '`rho`', '`m/v`', '`kg/m^3`', 'Folyadékokkal kapcsolatos', 'Haladómozgással kapcsolatos'),
('Nyomás', 'p (kis pé)', '`F/A` nyomó erő/nyomott terület', '`N/m^2`=pascal (Pa)', 'Folyadékokkal kapcsolatos', 'Haladómozgással kapcsolatos'),
('Keringési idő (periódusidő)', 'T', 'a visszatéréshez szükséges idő', 'secundum (s)', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Fordulatszám (frekvencia)', 'f,`nu`', '`1/T`', '`1/sec`=Hertz (Hz)', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Hullámhossz', '`lambda` (lambda)', 'az azonos fázisú szomszédok távolsága', 'méter (m)', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Terjedési sebesség', 'c', 'a rezgésállapot haladási sebessége', '`m/s`', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Pillanatnyi kitérés', 'x,y', 'Az egyensúlyi helyzettől mért előjeles távolság', 'méter', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Amplitúdó', 'A', 'Maximális kitérés', 'méter', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Körfrekvencia', '`omega`', '`(2pi)/T`', '`(rad)/(sec)`', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Keringési / körül fordulási idő', 'T', 'Egy teljes keringéshez /körül forduláshozszükséges idő', 'secundum', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Idő', 't', 'alapmennyiség', 'secundum', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Sebesség', 'v', '`(Deltar)/(Deltat)`', '`(méter)/(sec)`', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Gyorsulás', 'a', '`(Deltav)/(Deltat)`', '`(méter)/(sec)^2`', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Rezgésidő / Lengésidő', 'T', 'Egy teljes lengéshez/rezgéshez szükséges idő', 'secundum', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Tömeg', 'm', 'alapmennyiség', 'kilogramm', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Rugóállandó', 'D', '`F/(DeltaI)`', '`(N)/(méter)`', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Hosszúság', 'I', 'alapmennyiség', 'méter', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Megnyúlás', '`DeltaI`', 'I<sub>2</sub>-I<sub>1</sub>', 'méter', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Nehézségi gyorsulás', 'g', 'A szabadon eső test sebességének változási gyorsasága', '`(méter)/sec^2`', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('A tömegközépponti tengelyre vonatkoztatott tehetetlenségi nyomaték', '`Theta`<sub>T</sub>', 'Képlete táblázatban', '`kg^2*m/s`', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('A tömegközéppont és a forgástengely távolsága', 's', 'alapmennyiség', 'méter', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Frekvencia', 'f', '`1/T`', '`1/sec`', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Hullámhossz', '`lambda`', 'A szomszédos, azonos fázisú helyek távolsága', 'méter', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('A hullám pillanatnyi kitérése az x helyen, a t időpillanatban', 'y(x,t)', 'A`*`sin[`omega*`(t - x/c)]', 'méter', 'Rezgés/Hullámokkal kapcsolatos', 'Rezgések és hullámok'),
('Abszolút hőmérséklet', 'T', 'alapmennyiség', 'K (Kelvin)', 'Hőtan', 'Hőtan'),
('Hőmérséklet', 't', 'T-273', '°C (Celsius fok)', 'Hőtan', 'Hőtan'),
('Hőmérsékletváltozás', '`Deltat`,`DeltaT`', 't<sub>2</sub>-t<sub>1</sub>`-=T<sub>2</sub>-T<sub>1</sub>', '°C, K', 'Hőtan', 'Hőtan'),
('Hosszúság, megnyúlás', 'l,`Delta`l', 'alapmennyiség,i<sub>2</sub>-i<sub>1</sub>', 'm (méter)', 'Hőtan', 'Hőtan'),
('Felszín, felszínváltozás', 'A,`Delta`A', 'alakfüggő,A<sub>2</sub>-A<sub>1</sub>', '`m^2` (négyzetméter)', 'Hőtan', 'Hőtan'),
('Térfogat, térfogatváltozás', 'V,`Delta`V', 'alakfüggő,V<sub>2</sub>-V<sub>1</sub>', '`m^3` (köbméter)', 'Hőtan', 'Hőtan'),
('Lineáris hőtágulási együttható', '`alpha`', '`(Deltal)/(l*Deltat)` (l<sub>0</sub>)', '`1/°C` vagy `1/K`', 'Hőtan', 'Hőtan'),
('Térfogati hőtágulási együttható', '`beta`', '`(DeltaV)/(V*Deltat)` (V<sub>0</sub>)', '`1/°C` vagy `1/K`', 'Hőtan', 'Hőtan'),
('Nyomás', 'p', '`F/A`', 'Pa (Pascal)(N/m`^2`)', 'Hőtan', 'Hőtan'),
('Tömeg', 'm', 'alapmennyiség', 'kg (kilogramm)', 'Hőtan', 'Hőtan'),
('Moláris tömeg', 'M', 'táblázati adat', '´g/mol´ ´(gramm/mol)´', 'Hőtan', 'Hőtan'),
('Molekulák száma', 'N', '-', '-', 'Hőtan', 'Hőtan'),
('Anyagmennyiség (mólszám)', 'n', '`m/M`', 'mol', 'Hőtan', 'Hőtan'),
('Egyetemes gázállandó', 'R', '8,31', '`J/(mol·K)`', 'Hőtan', 'Hőtan'),
('Boltzmann-állandó', 'k', '1,38`*`10<sup>-23</sup>', '`J/K`', 'Hőtan', 'Hőtan'),
('Avogadro-állandó', 'N<sub>A</sub>', '6`*`10<sup>23</sup>', '`1/(mol)`', 'Hőtan', 'Hőtan'),
('A szabadsági fokok száma', 'f', 'az energiatárolás független lehetőségeinek a száma', '-', 'Hőtan', 'Hőtan'),
('Az egy szabadságfokra jutó átlagos energia', '`epsilon`<sub>1</sub>', '½ k`*`T', 'J (Joule)', 'Hőtan', 'Hőtan'),
('Egy molekula átlagos mechanikai energiája', '`epsilon`', 'f `*` ½ k`*`T', 'J (Joule)', 'Hőtan', 'Hőtan'),
('Belső energia', 'belső energia', 'E`N`*`f `*` ½ k`*`T', 'J (Joule)', 'Hőtan', 'Hőtan'),
('Hő (hőenergia)', 'Q', 'a hőközlés mértéke', 'J (Joule)', 'Hőtan', 'Hőtan'),
('Fajhő', 'c', '`Q/(m*DeltaT)`', '`J/(kg·K)`', 'Hőtan', 'Hőtan'),
('A fajhő állandó nyomáson', 'c<sub>p</sub>', '`Q/(m*DeltaT)`', '`J/(kg·K)`', 'Hőtan', 'Hőtan'),
('A fajhő állandó térfogaton', 'c<sub>v</sub>', '`Q/(m*DeltaT)`', '`J/(kg·K)`', 'Hőtan', 'Hőtan'),
('Hőkapacitás', 'C', 'm`*`c', '`J/K`', 'Hőtan', 'Hőtan'),
('Olvadáshő, fagyáshő', 'L<sub>o</sub>', '`Q/m`', '`J/kg`', 'Hőtan', 'Hőtan'),
('Párolgáshő', 'L<sub>p</sub>', '`Q/m`', '`J/kg`', 'Hőtan', 'Hőtan'),
('Forráshő, lecsapódáshő ', 'L<sub>f</sub>', '`Q/m`', '`J/kg`', 'Hőtan', 'Hőtan'),
('A gáz által végzett tágulási munka', 'W', 'folyamatfüggő', 'J (joule)', 'Hőtan', 'Hőtan'),
('Izobár folyamatnál', 'W', '`p * DeltaV`', 'J (joule)', 'Hőtan', 'Hőtan'),
('Izochor folyamatnál', 'W', '0 Nulla', 'J (joule)', 'Hőtan', 'Hőtan'),
('Izoterm folyamatnál', 'W', 'Fgvt.(140.o.)', 'J (joule)', 'Hőtan', 'Hőtan'),
('Adiabatikus folyamatnál', 'W', 'Fgvt.(140.o.)', 'J (joule)', 'Hőtan', 'Hőtan'),
('El. töltés', 'Q (nagy kú)', 'A`*`s', 'Amper szekundum = Coulomb (C)', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('El. térerősség', '`vec E` (E vektor)', '`(vec F)/Q`', '`N/C`', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('El. fluxus', '`psi` (nagy pszí)', 'E`*`A', 'Volt `*` méter (V `*` m)', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('El. feszültség', 'U', '`W/Q`', '`J/C` = Volt (V)', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('El. kapacitás', 'C', '`Q/U`', '`C/V` = farád (F)', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('El. áramerősség', 'I (nagy i)', '`Q/(Deltat)`', '`C/sec` =  Amper (A)', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('El. ellenállás', 'R', '`U/I`', '`V/A` = Ohm (`Omega`)', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('Fajlagos ellenállás', '`ρ` (kis ró)', '`(R*A)/l`', 'Ohm `*` méter', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('El. vezetőképesség', 'G', '`1/R`', '`1/(Ohm)`= siemens(S)', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('Fajlagos vezetőképesség', '`sigma` (kis szigma)', '`1/(rho)`', '`(siemens)/(méter)`', 'Elektromossággal kapcsolatos', 'Elektromossággal kapcsolatos'),
('Mágn. indukció', '`vec B`', '`M/(I*A)`', '`N/(Am)`=`(V*s)/m^2`=T(tesla)', 'Mágnesességgel kapcsolatos', 'Elektromossággal kapcsolatos'),
('Mágn. indukciófluxus', '`Phi` (nagy fí)', 'B`*`A', 'V`*`s=Wb (weber)', 'Mágnesességgel kapcsolatos', 'Elektromossággal kapcsolatos'),
('Mágn. nyomaték', 'm', 'I`*`A', 'A`*m^2`', 'Mágnesességgel kapcsolatos', 'Elektromossággal kapcsolatos'),
('Önindukciós együttható (induktivitás)', 'L', 'képlete táblázatban', '`(V*s)/A`=H(henry)', 'Mágnesességgel kapcsolatos', 'Elektromossággal kapcsolatos'),
('Ohmikus ellenállás', 'R', '`rho*l/A`', 'Ohm (`Omega`)', 'Ellenállások fajtái', 'Elektromossággal kapcsolatos'),
('Induktív ellenállás', 'X<sub>L</sub>', '`omega*`L', 'Ohm (`Omega`)', 'Ellenállások fajtái', 'Elektromossággal kapcsolatos'),
('Kapacitív ellenállás', 'X<sub>C</sub>', '`1/(omega*C)`', 'Ohm (`Omega`)', 'Ellenállások fajtái', 'Elektromossággal kapcsolatos'),
('Impedancia', 'Z', '`((X-X)^2+R^2)^½` (X<sub>L</sub>-X<sub>C</sub>)', 'Ohm (`Omega`)', 'Ellenállások fajtái', 'Elektromossággal kapcsolatos');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `email` varchar(255) NOT NULL COMMENT 'users tábla idja',
  `nev` varchar(255) NOT NULL,
  `osztaly` varchar(4) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `modositva` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`email`, `nev`, `osztaly`, `jelszo`, `modositva`) VALUES
('admin', 'admin', 'A', 'admin', '2024.01.24-17:32(2024.01.24-17:32)'),
('pintea.roland@ckik.hu', 'Pintea Dániel', '12/C', 'PinteaViktoria2024', '2024.01.29-10:46(2024.01.29-10:46)'),
('szab.eman@ckik.hu', 'Szabó Emánuel', 'T', 'TanarJelszo', '2024.02.22-10:26(2024.02.22-10:26)');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `dolgozatok`
--
ALTER TABLE `dolgozatok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- A tábla indexei `eredmenyek`
--
ALTER TABLE `eredmenyek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eredmenyek` (`email`);

--
-- A tábla indexei `sorok`
--
ALTER TABLE `sorok`
  ADD KEY `kategoria_id` (`kategoria_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `eredmenyek`
--
ALTER TABLE `eredmenyek`
  MODIFY `id` int(55) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `dolgozatok`
--
ALTER TABLE `dolgozatok`
  ADD CONSTRAINT `dolgozatok_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

--
-- Megkötések a táblához `eredmenyek`
--
ALTER TABLE `eredmenyek`
  ADD CONSTRAINT `eredmenyek` FOREIGN KEY (`email`) REFERENCES `users` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
