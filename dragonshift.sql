-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Czas generowania: 24 Wrz 2016, 08:38
-- Wersja serwera: 10.1.13-MariaDB
-- Wersja PHP: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `dragonshift`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `champs`
--

CREATE TABLE `champs` (
  `id` int(11) NOT NULL,
  `acc_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lvl` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `champs`
--

INSERT INTO `champs` (`id`, `acc_id`, `name`, `lvl`) VALUES
(1, 1, 'Albanczyk', 15),
(2, 1, 'AmaziR', 125);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `neewsy`
--

CREATE TABLE `neewsy` (
  `id` int(11) NOT NULL,
  `nazwa` text NOT NULL,
  `tresc` text NOT NULL,
  `autor` text NOT NULL,
  `data_dodania` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `neewsy`
--

INSERT INTO `neewsy` (`id`, `nazwa`, `tresc`, `autor`, `data_dodania`) VALUES
(1, 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. ', 'AmaziR', '20.09.2016r.'),
(2, 'Lorem2131232112 ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id lobortis dui, sed efficitur dolor. Nam massa felis, fermentum ut turpis sit amet, maximus commodo massa. Quisque ut lobortis urna. Vestibulum et augue eu tortor pellentesque hendrerit vel vitae nibh. Integer eget mi dui. Suspendisse potenti. In rhoncus erat vitae odio aliquam, eu viverra leo faucibus. Integer ac venenatis tortor, sit amet feugiat augue. ', 'AmaziR', '20.09.2016r.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `email` text NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `players`
--

INSERT INTO `players` (`id`, `login`, `pass`, `email`, `x`, `y`) VALUES
(1, 'amazir', 'haslo123', 'm.romaszewski@hotmail.com', 50, 50),
(2, 'root', 'haslo123', 'gamaritpl@wp.pl', 50, 50);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `temp`
--

CREATE TABLE `temp` (
  `id` int(11) NOT NULL,
  `session_id` text NOT NULL,
  `username` text NOT NULL,
  `securex` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `champs`
--
ALTER TABLE `champs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `neewsy`
--
ALTER TABLE `neewsy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `temp`
--
ALTER TABLE `temp`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `champs`
--
ALTER TABLE `champs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT dla tabeli `neewsy`
--
ALTER TABLE `neewsy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT dla tabeli `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT dla tabeli `temp`
--
ALTER TABLE `temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
