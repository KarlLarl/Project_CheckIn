-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2019 at 06:12 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `artisan`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_ot`
--

CREATE TABLE `add_ot` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) DEFAULT NULL,
  `time_start` varchar(255) DEFAULT NULL,
  `time_stop` varchar(255) DEFAULT NULL,
  `ot_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `add_ot`
--

INSERT INTO `add_ot` (`id`, `date`, `time`, `time_start`, `time_stop`, `ot_name`) VALUES
(28, '2019-11-09', '23.57', '18.00', '21.00', 'Project P');

-- --------------------------------------------------------

--
-- Table structure for table `check_in`
--

CREATE TABLE `check_in` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(10) NOT NULL,
  `time` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `check_in`
--

INSERT INTO `check_in` (`id`, `uid`, `time`, `date`) VALUES
(82, 11, '23.57', '2019-11-9');

-- --------------------------------------------------------

--
-- Table structure for table `check_out`
--

CREATE TABLE `check_out` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(10) NOT NULL,
  `time` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `check_out`
--

INSERT INTO `check_out` (`id`, `uid`, `time`, `date`) VALUES
(22, 11, '23.57', '2019-11-9');

-- --------------------------------------------------------

--
-- Table structure for table `graph`
--

CREATE TABLE `graph` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(10) DEFAULT NULL,
  `date_check_in` int(10) DEFAULT 0,
  `date_check_out` int(10) NOT NULL DEFAULT 0,
  `date_leave` int(10) NOT NULL DEFAULT 0,
  `date_late` int(10) NOT NULL DEFAULT 0,
  `day` int(10) DEFAULT NULL,
  `month` int(10) DEFAULT NULL,
  `year` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `graph`
--

INSERT INTO `graph` (`id`, `uid`, `date_check_in`, `date_check_out`, `date_leave`, `date_late`, `day`, `month`, `year`) VALUES
(111, 11, 1, 0, 0, 0, 10, 11, 2019),
(112, 11, 0, 0, 0, 1, 10, 11, 2019),
(113, 11, 0, 1, 0, 0, 10, 11, 2019),
(114, 11, 0, 0, 2, 0, 10, 11, 2019);

-- --------------------------------------------------------

--
-- Table structure for table `leaves`
--

CREATE TABLE `leaves` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `start` varchar(255) NOT NULL,
  `stop` varchar(255) NOT NULL,
  `type_select` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `date_leave` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `leaves`
--

INSERT INTO `leaves` (`id`, `uid`, `start`, `stop`, `type_select`, `note`, `date_leave`) VALUES
(121, 11, '11/10/2019', '11/12/2019', 'ลากิจ', 'qwe', 2);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(10) UNSIGNED NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_role` varchar(255) NOT NULL,
  `fix_leave` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `f_name`, `l_name`, `email`, `password`, `user_role`, `fix_leave`) VALUES
(3, 'songpol', 'takha', 'pungpondstr@gmail.com', '25f9e794323b453885f5181f1b624d0b', 'admin', 4),
(11, 'Songpol', 'Takha', 'pungpondstr123@gmail.com', '25f9e794323b453885f5181f1b624d0b', 'Full-time', 10),
(12, '5555', '666', 'pond123456789@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Intern', 0),
(13, 'cxcvxcv', 'adasdasds', 'pond1234567890@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Intern', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ot`
--

CREATE TABLE `ot` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(10) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `time_start` varchar(255) DEFAULT NULL,
  `time_stop` varchar(255) DEFAULT NULL,
  `ot_id` int(10) DEFAULT NULL,
  `ot_name` varchar(255) DEFAULT NULL,
  `sum_time_ot` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ot`
--

INSERT INTO `ot` (`id`, `uid`, `date`, `time`, `time_start`, `time_stop`, `ot_id`, `ot_name`, `sum_time_ot`) VALUES
(14, 11, '2019-11-09', '0.3', '18.00', '21.00', 28, 'Project P', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_ot`
--
ALTER TABLE `add_ot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `check_in`
--
ALTER TABLE `check_in`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `check_out`
--
ALTER TABLE `check_out`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `graph`
--
ALTER TABLE `graph`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaves`
--
ALTER TABLE `leaves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `ot`
--
ALTER TABLE `ot`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_ot`
--
ALTER TABLE `add_ot`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `check_in`
--
ALTER TABLE `check_in`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `check_out`
--
ALTER TABLE `check_out`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `graph`
--
ALTER TABLE `graph`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `leaves`
--
ALTER TABLE `leaves`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `ot`
--
ALTER TABLE `ot`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
