-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2015 at 11:10 AM
-- Server version: 5.6.26
-- PHP Version: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xyzdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `is_active`) VALUES
(1, 'house', 0),
(2, 'office', 1),
(9, 'kang dikdik jomblo', 0),
(10, 'afasfdsa', 0),
(11, 'aku', 0),
(12, 'akua', 0),
(13, 'itu', 0),
(14, 'hasem sekali', 0),
(15, 'afasfdsa', 0),
(16, 'afasfdsa', 0),
(17, 'special', 0),
(18, 'special', 1);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` text NOT NULL,
  `birth` date NOT NULL,
  `gender` varchar(16) NOT NULL,
  `nationality` varchar(64) NOT NULL,
  `verify` text,
  `is_active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `email`, `birth`, `gender`, `nationality`, `verify`, `is_active`) VALUES
(9, 'achmad', 'student.achmad@gmail.com', '1996-11-01', 'male', 'fdasfas', 't6vk5Vjt528gwKfmBYYX', 1),
(21, 'achmad', 'student.achmad@gmail.com', '1121-01-03', 'Male', 'indonesia', 'HaNsNvJRI7nleToN6m21', 0),
(22, 'achmad', 'student.achmad@gmail.com', '1121-01-03', 'Male', 'indonesia', 'AhM4OCSaYwx7Xh1MX4IU', 1),
(23, 'achmad', 'student.achmad@gmail.com', '1996-11-01', 'Male', 'indonesia', '30Fd8oJzq8HnhC4UkPbU', 0),
(24, 'fazar', 'hallofazar@gmail.com', '1986-12-09', 'Male', 'indonesia', '1McgAGbGVrTilez1zWuJ', 0),
(25, 'fazar', 'hallofazar@gmail.com', '1986-12-09', 'Male', 'indonesia', 'gQ5AoutcVkL8mgd0JDHY', 0),
(26, 'fasfsafsad', 'asfsafsafasfs@fsafas', '0006-04-03', 'Male', 'sfsafasf', 'VKKWmwhz028w9NEeHADu', 0),
(27, 'fdsafsfsafasfs', 'safasfaf@asfgsadfsa', '0002-05-06', 'Perempuan', 'fsdafsdafasf', 'oTlK9NzMBt5rik9xlaqc', 0),
(28, 'fdsafsfsafasfs', 'safasfaf@asfgsadfsa', '0002-05-06', 'Perempuan', 'fsdafsdafasf', 'iKJAgRzPk1yrJjrySdaP', 0),
(29, 'achmad', '', '1996-11-01', 'Laki-laki', 'in', 'Q1bsAxPfxf036DuL2EAB', 0),
(30, 'achmad', 'student.achmad@gmail.com', '1996-11-01', 'Laki-laki', 'indonesia', 'jLZ4RVuyUJYpQJX7p71v', 0),
(31, 'achmad', 'student.achmad@gmail.com', '0006-03-01', 'Male', 'oinsfaso', 'EVxLmqXzCTyghVALi1sz', 0),
(32, 'sadfsadfsa', 'student.achmad@gmail.com', '0000-00-00', 'Male', 'fsadfsdafsadfas', 'tSuQs2fzddmrGuqFjMDl', 0),
(33, 'achmad', 'student.achmad@gmail.com', '1212-12-12', 'Male', 'safsadf', 'fiDPtH1ykcWUvyJfRQwm', 0),
(34, 'safasfds', 'student.achmad@gmail.com', '1213-09-12', 'Male', 'fdsafas', '4m9I5adEOW14ypZUWL1h', 0),
(35, 'safdsafsfasadfsadfsadfsadfasfasfs', 'student.achmad@gmail.com', '0000-00-00', 'Male', 'safsdfsafsafsafsafsafasmnkjasm', 'Zxk6skeqRf1euVw9H9Js', 0),
(36, 'safda', 'student.achmad@gmail.com', '0000-00-00', 'Male', 'sakl;jfd;', 'pQCtcBXlGjDJsR0UDNnn', 0),
(37, 'fasdsf', 'student.achmad@gmail.com', '1212-11-12', 'Female', 'fasfas', 'uDrJcLMJ3HKcs0n4hUuF', 0),
(38, 'sfsafsadf', 'student.achmad@gmail.com', '1231-12-12', 'Male', 'sfdsfsafas', 'A5nslyb0YdgCv65t4jaC', 0),
(39, 'safsad', 'student.achmad@gmail.com', '1214-12-12', 'Male', 'fasdf', 'zQzFQrQyDkJdFf8YZ8JE', 0),
(40, 'sfdsadf', 'student.achmad@gmail.com', '0432-02-12', 'Male', 'sdfafsafsa', '72cd1qYbMTVySYnDNAGp', 0),
(41, 'sdfdsa', 'student.achmad@gmail.com', '0014-08-12', 'Male', 'safsadfaaaaaa', 'P5FVn209WIqAyhjkD5Pn', 0),
(42, 'sadfsadfsa', 'student.achmad@gmail.com', '2113-06-03', 'Perempuan', 'safsadf', 'vde6QiU8R0CJ5oZTZaWj', 0),
(43, 'achmad', 'student.achmad@gmail.com', '0000-00-00', 'Laki-laki', 'fasfasfasfa', 'fHynqqrZcVmt06TEyNTw', 1),
(44, 'safasfsa', 'student.achmad@gmail.com', '0000-00-00', 'Male', 'fasfsafas', 'pRhQ5maL3p6dsva1Tk8d', 1),
(45, 'achmad', 'student.achmad@gmail.com', '1996-11-01', 'Male', 'Indonesia', 'ABNA2IQwek0SVyRJZr3S', 1),
(46, 'achmad', 'student.achmad@gmail.com', '1997-12-02', 'Male', 'indonesia', 'qUD1p2alGwJxlIrtUwow', 1),
(47, 'safasfsaf', 'student.achmad@gmail.com', '1995-12-12', 'Perempuan', 'fasf', 'CZjXGHjbWPZC2p8Plihm', 1);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `subject` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` text NOT NULL,
  `date` datetime NOT NULL,
  `portfolio_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `parrent_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `message`, `subject`, `name`, `email`, `date`, `portfolio_id`, `post_id`, `parrent_id`, `is_active`) VALUES
(1, 'afsfsfasfafafasfsafffffff', 'asfsafasfaf', 'asfasfas', 'afsfasfasfasf', '2015-10-01 00:00:00', NULL, 1, NULL, 1),
(2, 'sfsafsfasfsdsafasf', 'sadfsafsafsafcvbcves', 'asfdasfasf', 'asfasfasfasf', '2015-10-02 00:00:00', NULL, 1, 1, 1),
(4, 'adsa', 'adsa', 'achmad', 'student.achmad@gmail.com', '2015-11-04 09:43:38', NULL, 1, NULL, 1),
(5, 'lasfmsalf', 'asfmsakld', 'achmad', 'achmadjamaludin41@gmail.com', '2015-11-04 09:51:03', NULL, 1, NULL, 1),
(6, 'afnks fnaskfnask', 'SMFSAKFMASKL', 'ADSKANSDKAN', 'ASKFNASK@A', '2015-11-04 10:18:00', NULL, 1, 5, 1),
(8, 'nfkosnfskafn', 'achmad', 'andfsajkfnakj', 'student.achmad@gmail.com', '2015-11-04 12:03:04', 20, NULL, NULL, 1),
(9, 'kanfkanfk', 'askf askf ', 'ksnfskad', 'knaskfnsakfnskna@a', '2015-11-04 12:05:33', 20, NULL, 8, 1),
(26, 'asdfaf', 'asfasf', 'fsadfsa', 'afsdafasfa@asfs', '2015-11-25 16:06:38', NULL, 45, NULL, 1),
(32, 'afdsa', 'fasdf', 'fsafa', 'achmad@gmail', '2015-11-25 16:53:23', 25, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE IF NOT EXISTS `portfolios` (
  `id` int(11) NOT NULL,
  `architect` varchar(256) NOT NULL,
  `status` varchar(32) NOT NULL,
  `category_id` int(11) NOT NULL,
  `area` text NOT NULL,
  `location` text NOT NULL,
  `title` varchar(64) NOT NULL,
  `content` text NOT NULL,
  `project_year` year(4) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `header_image` text,
  `visitor` int(11) NOT NULL DEFAULT '0',
  `liker` int(11) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`id`, `architect`, `status`, `category_id`, `area`, `location`, `title`, `content`, `project_year`, `created_date`, `updated_date`, `header_image`, `visitor`, `liker`, `is_active`) VALUES
(20, 'afafa', 'aaa', 2, 'aaa', 'afafa', 'afasfasfsaadadsadsadasdaaaaaaaaaaaaaa', '<p>afdasa</p>', 2001, '2015-10-21 14:01:31', '2015-11-09 17:40:29', '/uploads/portfolio/undefined', 11, 3, 1),
(22, 'adfaf', 'afasdfsa', 1, 'aaa', 'asf', 'asfas', '<p>sadfdsafsafsdadfsa</p>', 2020, '2015-10-21 14:37:54', '2015-10-21 14:37:54', 'adfafadsfdasnfasklfalsfa', 0, 0, 0),
(24, 'a', 'a', 1, 'aaaa', 'a', 'aafassadfsafasfsafas', '<p>a</p>', 2001, '2015-10-26 14:05:19', '2015-11-11 17:01:11', '/uploads/portfolio/undefined', 1, 0, 1),
(25, 'fasdfasfasfasfasf', 'fasdfasfs', 2, 'safsadfsafa', 'fasdfasdfsaf', 'faasdfsssssssssssssssssssssss', '<p><span style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" data-mce-style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">Saksikan: Tendangan roket Jay-Jay Okocha hampir merobek jala gawang dan nikmati juga 10 gol terbaik&nbsp;</span><a class="_58cn" style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" href="https://www.facebook.com/hashtag/bpl?source=feed_text&amp;story_id=547497978742536" data-ft="{&quot;tn&quot;:&quot;*N&quot;,&quot;type&quot;:104}" data-mce-href="https://www.facebook.com/hashtag/bpl?source=feed_text&amp;story_id=547497978742536" data-mce-style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;"><span class="_58cl" style="color: #627aad;" data-mce-style="color: #627aad;">?#?</span><span class="_58cm">BPL?</span></a><span style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" data-mce-style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">&nbsp;dari para pemain&nbsp;</span><a class="profileLink" style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" href="https://www.facebook.com/officialbwfc/" data-hovercard="/ajax/hovercard/page.php?id=260216390685379" data-mce-href="https://www.facebook.com/officialbwfc/" data-mce-style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">Bolton Wanderers Official</a><span style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" data-mce-style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">...</span></p><p>&nbsp;<br></p><p><span style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" data-mce-style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">Saksikan: Tendangan roket Jay-Jay Okocha hampir merobek jala gawang dan nikmati juga 10 gol terbaik&nbsp;</span><a class="_58cn" style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" href="https://www.facebook.com/hashtag/bpl?source=feed_text&amp;story_id=547497978742536" data-ft="{&quot;tn&quot;:&quot;*N&quot;,&quot;type&quot;:104}" data-mce-href="https://www.facebook.com/hashtag/bpl?source=feed_text&amp;story_id=547497978742536" data-mce-style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;"><span class="_58cl" style="color: #627aad;" data-mce-style="color: #627aad;">?#?</span><span class="_58cm">BPL?</span></a><span style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" data-mce-style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">&nbsp;dari para pemain&nbsp;</span><a class="profileLink" style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" href="https://www.facebook.com/officialbwfc/" data-hovercard="/ajax/hovercard/page.php?id=260216390685379" data-mce-href="https://www.facebook.com/officialbwfc/" data-mce-style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">Bolton Wanderers Official</a><span style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" data-mce-style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">...</span></p><p>&nbsp;<br></p><p><span style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" data-mce-style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">Saksikan: Tendangan roket Jay-Jay Okocha hampir merobek jala gawang dan nikmati juga 10 gol terbaik&nbsp;</span><a class="_58cn" style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" href="https://www.facebook.com/hashtag/bpl?source=feed_text&amp;story_id=547497978742536" data-ft="{&quot;tn&quot;:&quot;*N&quot;,&quot;type&quot;:104}" data-mce-href="https://www.facebook.com/hashtag/bpl?source=feed_text&amp;story_id=547497978742536" data-mce-style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;"><span class="_58cl" style="color: #627aad;" data-mce-style="color: #627aad;">?#?</span><span class="_58cm">BPL?</span></a><span style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" data-mce-style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">&nbsp;dari para pemain&nbsp;</span><a class="profileLink" style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" href="https://www.facebook.com/officialbwfc/" data-hovercard="/ajax/hovercard/page.php?id=260216390685379" data-mce-href="https://www.facebook.com/officialbwfc/" data-mce-style="color: #3b5998; cursor: pointer; text-decoration: none; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">Bolton Wanderers Official</a><span style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;" data-mce-style="color: #141823; font-family: helvetica, arial, sans-serif; font-size: 14px; line-height: 19.32px;">...</span></p>', 2015, '2015-11-18 10:55:54', '2015-11-18 11:20:35', '/uploads/portfolio/undefined', 4, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_image`
--

CREATE TABLE IF NOT EXISTS `portfolio_image` (
  `id` int(11) NOT NULL,
  `image` text,
  `portfolio_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `portfolio_image`
--

INSERT INTO `portfolio_image` (`id`, `image`, `portfolio_id`) VALUES
(8, '/uploads/portfolio/1445853624084_CAM00008.jpg', 20),
(9, '/uploads/portfolio/1445853624213_CAM00030.jpg', 20),
(10, '/uploads/portfolio/1445853623829_CAM00004.jpg', 20),
(11, '/uploads/portfolio//uploads/portfolio/undefined', 20),
(12, '/uploads/portfolio//uploads/portfolio/undefined', 20),
(13, '/uploads/portfolio//uploads/portfolio/undefined', 24),
(19, '/uploads/portfolio/1447818953843_7179c7f3b6d1fe28b65573076a74a785_k.jpg', 25),
(20, '/uploads/portfolio//uploads/portfolio/undefined', 25);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `type` tinyint(4) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `header_image` text,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `visitor` int(11) NOT NULL DEFAULT '0',
  `liker` int(11) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `category_id`, `type`, `title`, `content`, `header_image`, `created_date`, `updated_date`, `user_id`, `visitor`, `liker`, `is_active`) VALUES
(1, 2, 1, 'aku asadsa', '<p>aaaa</p><p><img src="images/glen.jpg" alt="glen" width="300" height="402" data-mce-src="images/glen.jpg" style="float: left;" data-mce-style="float: left;">&nbsp;skdjflksdjf slkdjflksdjf sldkjflksdjf lskdjflksdjfsd fklsdjlksdjf sldkfjsdkljf skldjfksldjflskdjfsdlk fsldkjfskldjfds flksjdflkjsdkljf lksjdklfsjdklfjs dljsdklfjsdlkf sdlkjfskldf jsdlkfjsdl fsdkjfsdl f</p>', '/uploads/posting/undefined', '2015-10-16 13:42:14', '2015-11-19 15:44:49', 1, 15, 12, 1),
(2, NULL, 2, 'kkkkkaaaabbb', 'afasfasfafafsafmasklmfasklmfsakl', NULL, '2015-10-08 00:00:00', '2015-10-19 13:41:09', 1, 0, 0, 1),
(5, 2, 1, 'asfsafasfas', 'asfsafasfas', 'asdfasfasfsafsafas', '2015-10-19 08:54:53', '2015-10-19 08:54:53', 1, 0, 0, 0),
(13, 2, 1, 'saya', '<h1 class="newstitle news" style="font-size: 35px; padding: 0px; margin: 10px 0px 5px; line-height: 1.2em; color: rgb(51, 51, 51); font-family: arial, sans-serif;">Ronaldo Harus Absen di Clasico dan Ini Lima Alasannya</h1><div style="font-stretch: normal; font-size: 12px; line-height: 19.8px; font-family: arial, sans-serif; color: rgb(153, 153, 153); float: left;">20-11-2015 12:16</div><div class="clear" style="font-stretch: normal; font-size: 12px; line-height: 19.8px; font-family: arial, sans-serif; color: rgb(51, 51, 51); clear: both;"></div><div id="kl-social-share" style="font-stretch: normal; font-size: 12px; line-height: 19.8px; font-family: arial, sans-serif; color: rgb(51, 51, 51);"><div class="kl-share-new" style="font-stretch: normal; line-height: 1.45em; margin: 10px -3px; width: 475px;"><div style="font-stretch: normal; line-height: 1.65em; float: left;"><a class="fb-like" href="http://www.bola.net/editorial/ronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya.html#" style="color: rgb(51, 51, 51); text-decoration: none; font-family: Arial, Helvetica, sans-serif !important; float: left; width: 80px; margin: 3px; background: rgb(68, 95, 174);"><span class="count-box" style="text-align: center; display: block; padding: 10px 0px; border-width: 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-left-style: solid; border-top-color: rgb(210, 210, 210); border-right-color: rgb(210, 210, 210); border-left-color: rgb(210, 210, 210); position: relative; line-height: 1.45em; font-size: 13px !important; color: rgb(85, 85, 85) !important; background: rgb(226, 235, 242) !important;">26</span><div class="box-title" style="font-stretch: normal; line-height: 1.65em; display: table-cell; vertical-align: middle; height: 30px; width: 80px; padding-left: 15px; font-size: 13px !important; color: rgb(255, 255, 255) !important; background-position: 4px 3px !important;"><iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.bola.net%2Feditorial%2Fronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya.html&amp;send=false&amp;layout=button&amp;width=80&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" allowtransparency="true" style="border-style: none; border-width: initial; overflow: hidden; width: 80px; height: 21px;"></iframe></div></a><a href="http://facebook.com/sharer.php?u=http%3A%2F%2Fwww.bola.net%2Feditorial%2Fronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya.html" class="fb-share" style="color: rgb(51, 51, 51); text-decoration: none; font-family: Arial, Helvetica, sans-serif !important; float: left; width: 80px; margin: 3px; background: rgb(68, 95, 174);"><span class="count-box" style="text-align: center; display: block; padding: 10px 0px; border-width: 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-left-style: solid; border-top-color: rgb(210, 210, 210); border-right-color: rgb(210, 210, 210); border-left-color: rgb(210, 210, 210); position: relative; line-height: 1.45em; font-size: 13px !important; color: rgb(85, 85, 85) !important; background: rgb(226, 235, 242) !important;">8</span><div class="box-title" style="font-stretch: normal; line-height: 1.65em; display: table-cell; vertical-align: middle; height: 30px; width: 80px; padding-left: 30px; font-size: 13px !important; color: rgb(255, 255, 255) !important; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/channel/entertainment/share/fb-icon-m.png) no-repeat;">Share</div></a><a href="http://twitter.com/share?text=Ronaldo%20Harus%20Absen%20di%20Clasico%20dan%20Ini%20Lima%20Alasannya%20-%20Bola.net&amp;url=http%3A%2F%2Fwww.bola.net%2Feditorial%2Fronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya.html&amp;via=bolanet" class="tweet-share" style="color: rgb(51, 51, 51); text-decoration: none; font-family: Arial, Helvetica, sans-serif !important; float: left; width: 80px; margin: 3px; background: rgb(103, 173, 209);"><span class="count-box" style="text-align: center; display: block; padding: 10px 0px; border-width: 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-left-style: solid; border-top-color: rgb(210, 210, 210); border-right-color: rgb(210, 210, 210); border-left-color: rgb(210, 210, 210); position: relative; line-height: 1.45em; font-size: 13px !important; color: rgb(85, 85, 85) !important; background: rgb(226, 235, 242) !important;">0</span><div class="box-title" style="font-stretch: normal; line-height: 1.65em; display: table-cell; vertical-align: middle; height: 30px; width: 80px; padding-left: 30px; font-size: 13px !important; color: rgb(255, 255, 255) !important; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/channel/entertainment/share/tw-icon-m.png) no-repeat;">Tweet</div></a></div><br><br></div></div><p><br style="color: rgb(51, 51, 51); font-family: arial, sans-serif; font-size: 12px; line-height: 19.8px;"><br style="color: rgb(51, 51, 51); font-family: arial, sans-serif; font-size: 12px; line-height: 19.8px;"></p><div class="ncont" style="font-stretch: normal; font-size: 14px; line-height: 2em; font-family: arial, helvetica, clean, sans-serif; color: rgb(51, 51, 51);"><div id="editorial_content" style="font-stretch: normal; line-height: 2em;"><div class="np_nav_top" style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; padding: 0px 0px 0px 10px; background: rgb(17, 17, 17);"><div class="guide" style="font-stretch: normal; font-size: 14px; line-height: 1.65em; color: rgb(119, 119, 119); float: left; overflow: hidden; padding: 10px 0px; white-space: nowrap; width: 360px;">Klik tombol ? ? (panah) untuk halaman berikutnya</div><a href="http://www.bola.net/editorial/ronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya-1.html" class="np_next" style="color: rgb(17, 97, 190); text-decoration: none !important; display: block; float: right; width: 40px; padding: 10px 0px; margin: 3px 3px 3px 0px; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/rwhite.png) 50% 50% no-repeat scroll rgb(155, 204, 1);">&nbsp;</a><a href="http://www.bola.net/editorial/ronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya.html" class="np_prev" style="color: rgb(17, 97, 190); text-decoration: none !important; display: block; float: right; width: 40px; padding: 10px 0px; margin: 3px 3px 3px 0px; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/lwhite.png) 50% 50% no-repeat scroll rgb(85, 85, 85);">&nbsp;</a><div class="clear" style="font-stretch: normal; line-height: 1.65em; clear: both;"></div></div><div class="news-headline-image news" style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; margin: 0px; background-color: rgb(0, 0, 0);"><img width="468" src="http://cdn.klimg.com/bola.net/library/upload/20/2015/10/psg-vs-real-madrid_f0e7aee.jpg" alt="Ronaldo Harus Absen di Clasico dan Ini Lima Alasannya" style="border: 0px; vertical-align: middle;"><div style="font-stretch: normal; font-size: 11px; line-height: 1.65em; color: rgb(255, 255, 255); padding: 3px 5px;">Cristiano Ronaldo © AFP</div></div><ul class="np_paging" style="padding: 0px; margin: 0px 0px 20px; overflow: hidden; list-style: none; background: rgb(17, 17, 17);"><li class="intro" style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/ronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya.html" class="active" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; width: 63px; background: rgb(155, 204, 1);">Intro</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/ronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya-1.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">1</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/ronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya-2.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">2</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/ronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya-3.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">3</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/ronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya-4.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">4</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/ronaldo-harus-absen-di-clasico-dan-ini-lima-alasannya-5.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">5</a></li></ul><div id="fb-root" class=" fb_reset" style="font-stretch: normal; font-size: 11px; line-height: 1; font-family: ''lucida grande'', tahoma, verdana, arial, sans-serif; color: rgb(0, 0, 0); border: 0px; border-spacing: 0px; cursor: auto; direction: ltr; margin: 0px; overflow: visible; padding: 0px; text-shadow: none; visibility: visible; word-spacing: normal; background: none;"><div style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; color: rgb(51, 51, 51); overflow: hidden; position: absolute; top: -10000px; height: 0px; width: 0px;"><div style="font-stretch: normal; line-height: 1.65em;"><iframe name="fb_xdm_frame_http" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Facebook Cross Domain Communication Frame" aria-hidden="true" tabindex="-1" id="fb_xdm_frame_http" src="http://static.ak.facebook.com/connect/xd_arbiter/TlA_zCeMkxl.js?version=41#channel=f2e7c20a04&amp;origin=http%3A%2F%2Fwww.bola.net" style="border-style: none; border-width: initial;"></iframe><iframe name="fb_xdm_frame_https" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Facebook Cross Domain Communication Frame" aria-hidden="true" tabindex="-1" id="fb_xdm_frame_https" src="https://s-static.ak.facebook.com/connect/xd_arbiter/TlA_zCeMkxl.js?version=41#channel=f2e7c20a04&amp;origin=http%3A%2F%2Fwww.bola.net" style="border-style: none; border-width: initial;"></iframe></div></div><div style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; color: rgb(51, 51, 51); overflow: hidden; position: absolute; top: -10000px; height: 0px; width: 0px;"><div style="font-stretch: normal; line-height: 1.65em;"></div></div></div><p><b>Bola.net</b>&nbsp;- Membaca judul di atas mungkin banyak orang bakal mengerutkan alis. Bagaimana mungkin?&nbsp;<b>Cristiano Ronaldo</b>&nbsp;yang selama ini jadi ikon&nbsp;<b>Real Madrid</b>&nbsp;harus absen di pertandingan akbar melawan musuh bebuyutan&nbsp;<b>Barcelona</b>, apalagi ia tidak mengalami masalah terkait kondisi fisiknya.<br><br><i>Well</i>, secara sepintas memang hal tersebut seperti terdengar sulit atau bahkan mustahil dilakukan oleh&nbsp;<b>Rafael Benitez</b>, kecuali ia memang ingin memancing amarah dari fans Madrid dan media-media Spanyol - yang selama ini dikenal luar biasa ''kejam''.<br><br>Namun jika ditelaah secara seksama, ada beberapa alasan yang cukup logis, hingga membuat opsi mencadangkan Ronaldo terasa sebagai pilihan yang tepat bagi Madrid untuk menjinakkan Barcelona di laga akhir pekan ini.<br><br>Tak percaya? Berikut&nbsp;<i>Bola.net</i>&nbsp;sajikan lima alasannya.&nbsp;<b>(bola/rer)</b></p></div></div>', '/uploads/posting/1447661391531_3zI0AlQ.png', '2015-10-26 10:46:17', '2015-11-20 16:22:11', 1, 2, 0, 1),
(15, NULL, 3, 'safsafas', '<p>sfsafasfsfda</p>', '/uploads/posting/undefined', '2015-11-11 10:53:49', '2015-11-11 10:53:49', 1, 0, 0, 0),
(16, NULL, 3, 'afdsafasdfaaaaaaaaaaa', '<p>afasfasfsadf</p>', NULL, '2015-11-11 15:44:08', '2015-11-11 16:23:50', 1, 0, 0, 1),
(18, NULL, 3, 'asdfasdfasfsa', '<p>asfdsafsaf</p>', NULL, '2015-11-11 16:25:00', '2015-11-11 16:25:00', 1, 0, 0, 0),
(20, NULL, 2, 'sfdsadfsafas', '<p>safsafsadfdsafasdfsfsnafjklnafjkankj</p><p>sanfsanfkjsadnfjksanfksa</p><p>fnsakjfnsakfnsajkfnsajkf</p><p><img src="/images/1447665247503_adidas-manchester-united-15-16-home-kit_(1).jpg" alt="sdf" width="305" height="398" data-mce-selected="1"><br data-mce-bogus="1"></p><div id="mceResizeHandlenw" data-mce-bogus="all" class="mce-resizehandle" unselectable="true" data-mce-style="cursor: nw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 78.5px;" style="cursor: nw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 78.5px;"></div><div id="mceResizeHandlene" data-mce-bogus="all" class="mce-resizehandle" unselectable="true" data-mce-style="cursor: ne-resize; margin: 0px; padding: 0px; left: 308.5px; top: 78.5px;" style="cursor: ne-resize; margin: 0px; padding: 0px; left: 308.5px; top: 78.5px;"></div><div id="mceResizeHandlese" data-mce-bogus="all" class="mce-resizehandle" unselectable="true" data-mce-style="cursor: se-resize; margin: 0px; padding: 0px; left: 308.5px; top: 476.5px;" style="cursor: se-resize; margin: 0px; padding: 0px; left: 308.5px; top: 476.5px;"></div><div id="mceResizeHandlesw" data-mce-bogus="all" class="mce-resizehandle" unselectable="true" data-mce-style="cursor: sw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 476.5px;" style="cursor: sw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 476.5px;"></div>', NULL, '2015-11-16 16:15:10', '2015-11-16 16:15:10', 28, 0, 0, 1),
(21, 1, 1, 'Posting style', '<p><span style="color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;" data-mce-style="color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;"><a title="admin" href="http://www.google.com" target="_blank" data-mce-href="http://www.google.com">www.google.com</a></span></p><p><span style="color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;" data-mce-style="color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;">Sebuah program kecerdasan buatan (Artificial Intelligence) yang dirancang oleh National Institute of Informatics di Jepang berhasil mengerjakan tugas ujian masuk ke perguruan tinggi.</span><br style="box-sizing: border-box; color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;" data-mce-style="box-sizing: border-box; color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;"><br style="box-sizing: border-box; color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;" data-mce-style="box-sizing: border-box; color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;"><span style="color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;" data-mce-style="color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;">Dengan menjawab pertanyaan yang terdiri atas banyak mata pelajaran, program kecerdasan buatan itu mampu mencatat skor di atas rata-rata, yaitu 511 dari nilai maksimal 950.</span><br style="box-sizing: border-box; color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;" data-mce-style="box-sizing: border-box; color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;"><br style="box-sizing: border-box; color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;" data-mce-style="box-sizing: border-box; color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;"><span style="color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;" data-mce-style="color: #4b4b4b; font-family: Lucida, helvetica, sans-serif; font-size: 16.002px; line-height: 24.003px;">Skor rata-rata untuk ujian masuk perguruan tinggi di Jepang sendiri adalah 416.</span><br></p>', '/uploads/posting/1447900981820_DSC_0005.JPG', '2015-11-19 09:43:02', '2015-11-19 09:50:27', 32, 0, 0, 1),
(43, 1, 1, 'apa aja lah', '<p>fdsa</p>', '/uploads/posting/1447915893145_DSC_0003.JPG', '2015-11-19 13:51:33', '2015-11-19 13:51:33', 32, 1, 0, 1),
(45, 18, 1, '5 Peran Untuk Raul Jika Kembali Ke Real Madrid', '<div style="font-stretch: normal; font-size: 12px; line-height: 19.8px; font-family: arial, sans-serif; color: rgb(153, 153, 153); float: left;">18-11-2015 11:34</div><h2 style="font-size: 12px; padding: 0px; margin: 0px; line-height: 18px; font-family: arial, sans-serif; float: left; color: rgb(153, 153, 153);">&nbsp;| Raul</h2><div class="clear" style="font-stretch: normal; font-size: 12px; line-height: 19.8px; font-family: arial, sans-serif; color: rgb(51, 51, 51); clear: both;"></div><div id="kl-social-share" style="font-stretch: normal; font-size: 12px; line-height: 19.8px; font-family: arial, sans-serif; color: rgb(51, 51, 51);"><div class="kl-share-new" style="font-stretch: normal; line-height: 1.45em; margin: 10px -3px; width: 475px;"><div style="font-stretch: normal; line-height: 1.65em; float: left;"><a class="fb-like" href="http://www.bola.net/editorial/5-peran-untuk-raul-jika-kembali-ke-real-madrid.html#" style="color: rgb(51, 51, 51); text-decoration: none; font-family: Arial, Helvetica, sans-serif !important; float: left; width: 80px; margin: 3px; background: rgb(68, 95, 174);"><span class="count-box" style="text-align: center; display: block; padding: 10px 0px; border-width: 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-left-style: solid; border-top-color: rgb(210, 210, 210); border-right-color: rgb(210, 210, 210); border-left-color: rgb(210, 210, 210); position: relative; line-height: 1.45em; font-size: 13px !important; color: rgb(85, 85, 85) !important; background: rgb(226, 235, 242) !important;">368</span><div class="box-title" style="font-stretch: normal; line-height: 1.65em; display: table-cell; vertical-align: middle; height: 30px; width: 80px; padding-left: 15px; font-size: 13px !important; color: rgb(255, 255, 255) !important; background-position: 4px 3px !important;"><iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.bola.net%2Feditorial%2F5-peran-untuk-raul-jika-kembali-ke-real-madrid.html&amp;send=false&amp;layout=button&amp;width=80&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" allowtransparency="true" style="border-style: none; border-width: initial; overflow: hidden; width: 80px; height: 21px;"></iframe></div></a><a href="http://facebook.com/sharer.php?u=http%3A%2F%2Fwww.bola.net%2Feditorial%2F5-peran-untuk-raul-jika-kembali-ke-real-madrid.html" class="fb-share" style="color: rgb(51, 51, 51); text-decoration: none; font-family: Arial, Helvetica, sans-serif !important; float: left; width: 80px; margin: 3px; background: rgb(68, 95, 174);"><span class="count-box" style="text-align: center; display: block; padding: 10px 0px; border-width: 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-left-style: solid; border-top-color: rgb(210, 210, 210); border-right-color: rgb(210, 210, 210); border-left-color: rgb(210, 210, 210); position: relative; line-height: 1.45em; font-size: 13px !important; color: rgb(85, 85, 85) !important; background: rgb(226, 235, 242) !important;">2</span><div class="box-title" style="font-stretch: normal; line-height: 1.65em; display: table-cell; vertical-align: middle; height: 30px; width: 80px; padding-left: 30px; font-size: 13px !important; color: rgb(255, 255, 255) !important; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/channel/entertainment/share/fb-icon-m.png) no-repeat;">Share</div></a><a href="http://twitter.com/share?text=5%20Peran%20Untuk%20Raul%20Jika%20Kembali%20Ke%20Real%20Madrid%20-%20Bola.net&amp;url=http%3A%2F%2Fwww.bola.net%2Feditorial%2F5-peran-untuk-raul-jika-kembali-ke-real-madrid.html&amp;via=bolanet" class="tweet-share" style="color: rgb(51, 51, 51); text-decoration: none; font-family: Arial, Helvetica, sans-serif !important; float: left; width: 80px; margin: 3px; background: rgb(103, 173, 209);"><span class="count-box" style="text-align: center; display: block; padding: 10px 0px; border-width: 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-left-style: solid; border-top-color: rgb(210, 210, 210); border-right-color: rgb(210, 210, 210); border-left-color: rgb(210, 210, 210); position: relative; line-height: 1.45em; font-size: 13px !important; color: rgb(85, 85, 85) !important; background: rgb(226, 235, 242) !important;">32</span><div class="box-title" style="font-stretch: normal; line-height: 1.65em; display: table-cell; vertical-align: middle; height: 30px; width: 80px; padding-left: 30px; font-size: 13px !important; color: rgb(255, 255, 255) !important; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/channel/entertainment/share/tw-icon-m.png) no-repeat;">Tweet</div></a></div><br><br></div></div><p><br style="color: rgb(51, 51, 51); font-family: arial, sans-serif; font-size: 12px; line-height: 19.8px;"><br style="color: rgb(51, 51, 51); font-family: arial, sans-serif; font-size: 12px; line-height: 19.8px;"></p><div class="ncont" style="font-stretch: normal; font-size: 14px; line-height: 2em; font-family: arial, helvetica, clean, sans-serif; color: rgb(51, 51, 51);"><div id="editorial_content" style="font-stretch: normal; line-height: 2em;"><div class="np_nav_top" style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; padding: 0px 0px 0px 10px; background: rgb(17, 17, 17);"><div class="guide" style="font-stretch: normal; font-size: 14px; line-height: 1.65em; color: rgb(119, 119, 119); float: left; overflow: hidden; padding: 10px 0px; white-space: nowrap; width: 360px;">Klik tombol ? ? (panah) untuk halaman berikutnya</div><a href="http://www.bola.net/editorial/5-peran-untuk-raul-jika-kembali-ke-real-madrid-1.html" class="np_next" style="color: rgb(17, 97, 190); text-decoration: none !important; display: block; float: right; width: 40px; padding: 10px 0px; margin: 3px 3px 3px 0px; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/rwhite.png) 50% 50% no-repeat scroll rgb(155, 204, 1);">&nbsp;</a><a href="http://www.bola.net/editorial/5-peran-untuk-raul-jika-kembali-ke-real-madrid.html" class="np_prev" style="color: rgb(17, 97, 190); text-decoration: none !important; display: block; float: right; width: 40px; padding: 10px 0px; margin: 3px 3px 3px 0px; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/lwhite.png) 50% 50% no-repeat scroll rgb(85, 85, 85);">&nbsp;</a><div class="clear" style="font-stretch: normal; line-height: 1.65em; clear: both;"></div></div><div class="news-headline-image news" style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; margin: 0px; background-color: rgb(0, 0, 0);"><img width="468" src="http://cdn.klimg.com/bola.net/library/upload/20/2015/04/raul-gonzalez-03-afp_7414bda.jpg" alt="5 Peran Untuk Raul Jika Kembali Ke Real Madrid" style="border: 0px; vertical-align: middle;"><div style="font-stretch: normal; font-size: 11px; line-height: 1.65em; color: rgb(255, 255, 255); padding: 3px 5px;">Raul Gonzalez © AFP</div></div><ul class="np_paging" style="padding: 0px; margin: 0px 0px 20px; overflow: hidden; list-style: none; background: rgb(17, 17, 17);"><li class="intro" style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/5-peran-untuk-raul-jika-kembali-ke-real-madrid.html" class="active" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; width: 63px; background: rgb(155, 204, 1);">Intro</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/5-peran-untuk-raul-jika-kembali-ke-real-madrid-1.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">1</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/5-peran-untuk-raul-jika-kembali-ke-real-madrid-2.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">2</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/5-peran-untuk-raul-jika-kembali-ke-real-madrid-3.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">3</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/5-peran-untuk-raul-jika-kembali-ke-real-madrid-4.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">4</a></li><li style="display: inline; list-style: none;"><a href="http://www.bola.net/editorial/5-peran-untuk-raul-jika-kembali-ke-real-madrid-5.html" class="" style="color: rgb(17, 97, 190); text-decoration: none !important; margin: 2px 0px 2px 2px; float: left; font-size: 16px; font-weight: bold; text-align: center; padding: 9px 0px; min-width: 38px; background: rgb(68, 68, 68);">5</a></li></ul><div id="fb-root" class=" fb_reset" style="font-stretch: normal; font-size: 11px; line-height: 1; font-family: ''lucida grande'', tahoma, verdana, arial, sans-serif; color: rgb(0, 0, 0); border: 0px; border-spacing: 0px; cursor: auto; direction: ltr; margin: 0px; overflow: visible; padding: 0px; text-shadow: none; visibility: visible; word-spacing: normal; background: none;"><div style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; color: rgb(51, 51, 51); overflow: hidden; position: absolute; top: -10000px; height: 0px; width: 0px;"><div style="font-stretch: normal; line-height: 1.65em;"><iframe name="fb_xdm_frame_http" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Facebook Cross Domain Communication Frame" aria-hidden="true" tabindex="-1" id="fb_xdm_frame_http" src="http://static.ak.facebook.com/connect/xd_arbiter/TlA_zCeMkxl.js?version=41#channel=ff421943&amp;origin=http%3A%2F%2Fwww.bola.net" style="border-style: none; border-width: initial;"></iframe><iframe name="fb_xdm_frame_https" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Facebook Cross Domain Communication Frame" aria-hidden="true" tabindex="-1" id="fb_xdm_frame_https" src="https://s-static.ak.facebook.com/connect/xd_arbiter/TlA_zCeMkxl.js?version=41#channel=ff421943&amp;origin=http%3A%2F%2Fwww.bola.net" style="border-style: none; border-width: initial;"></iframe></div></div><div style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; color: rgb(51, 51, 51); overflow: hidden; position: absolute; top: -10000px; height: 0px; width: 0px;"><div style="font-stretch: normal; line-height: 1.65em;"></div></div></div><p><b>Bola.net</b>&nbsp;- Salah satu sosok legenda sepakbola dunia,&nbsp;<b>Raul Gonzales</b>resmi memutuskan untuk gantung sepatu pada beberapa hari yang lalu. Sosok yang lekat dengan klub raksasa asal Spanyol,&nbsp;<b>Real Madrid&nbsp;</b>ini mengakhiri karirnya di klub asal MLS&nbsp;<b>New York Cosmos</b>&nbsp;setelah membantu timnya menjuarai Gelar NASL.<br><br>Setelah memutuskan untuk pensiun, Raul akan dihadapkan dengan beberapa pilihan untuk mengisi masa pensiunnya. Pilihan yang paling masuk akal untuk diambil Raul adalah kembali ke klub masa kecilnya, Real Madrid.<br><br>Jika memang nantinya Raul berkenan untuk kembali ke Estadio Santiago Bernabeu, setidaknya ada lima peran yang bisa diambil pemilik nomer tujuh Real Madrid sebelum Ronaldo tersebut. Apa sajakah peran itu?<b>(kpl/dub)</b></p></div></div>', '/uploads/posting/1448012602067_IMG_20151120_104721.jpg', '2015-11-20 16:43:22', '2015-11-20 16:43:22', 33, 10, 5, 1),
(46, NULL, 2, 'bola lagi bola lagi', '<div style="font-stretch: normal; font-size: 12px; line-height: 19.8px; font-family: arial, sans-serif; color: rgb(153, 153, 153); float: left;">18-11-2015 15:33</div><h2 style="font-size: 12px; padding: 0px; margin: 0px; line-height: 18px; font-family: arial, sans-serif; float: left; color: rgb(153, 153, 153);">&nbsp;| Neymar</h2><div class="clear" style="font-stretch: normal; font-size: 12px; line-height: 19.8px; font-family: arial, sans-serif; color: rgb(51, 51, 51); clear: both;"></div><div id="kl-social-share" style="font-stretch: normal; font-size: 12px; line-height: 19.8px; font-family: arial, sans-serif; color: rgb(51, 51, 51);"><div class="kl-share-new" style="font-stretch: normal; line-height: 1.45em; margin: 10px -3px; width: 475px;"><div style="font-stretch: normal; line-height: 1.65em; float: left;"><a class="fb-like" href="http://www.bola.net/editorial/pantaskah-neymar-jadi-ancaman-serius-dominasi-ronaldo-messi.html#" style="color: rgb(51, 51, 51); text-decoration: none; font-family: Arial, Helvetica, sans-serif !important; float: left; width: 80px; margin: 3px; background: rgb(68, 95, 174);"><span class="count-box" style="text-align: center; display: block; padding: 10px 0px; border-width: 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-left-style: solid; border-top-color: rgb(210, 210, 210); border-right-color: rgb(210, 210, 210); border-left-color: rgb(210, 210, 210); position: relative; line-height: 1.45em; font-size: 13px !important; color: rgb(85, 85, 85) !important; background: rgb(226, 235, 242) !important;">417</span><div class="box-title" style="font-stretch: normal; line-height: 1.65em; display: table-cell; vertical-align: middle; height: 30px; width: 80px; padding-left: 15px; font-size: 13px !important; color: rgb(255, 255, 255) !important; background-position: 4px 3px !important;"><iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.bola.net%2Feditorial%2Fpantaskah-neymar-jadi-ancaman-serius-dominasi-ronaldo-messi.html&amp;send=false&amp;layout=button&amp;width=80&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" allowtransparency="true" style="border-style: none; border-width: initial; overflow: hidden; width: 80px; height: 21px;"></iframe></div></a><a href="http://facebook.com/sharer.php?u=http%3A%2F%2Fwww.bola.net%2Feditorial%2Fpantaskah-neymar-jadi-ancaman-serius-dominasi-ronaldo-messi.html" class="fb-share" style="color: rgb(51, 51, 51); text-decoration: none; font-family: Arial, Helvetica, sans-serif !important; float: left; width: 80px; margin: 3px; background: rgb(68, 95, 174);"><span class="count-box" style="text-align: center; display: block; padding: 10px 0px; border-width: 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-left-style: solid; border-top-color: rgb(210, 210, 210); border-right-color: rgb(210, 210, 210); border-left-color: rgb(210, 210, 210); position: relative; line-height: 1.45em; font-size: 13px !important; color: rgb(85, 85, 85) !important; background: rgb(226, 235, 242) !important;">37</span><div class="box-title" style="font-stretch: normal; line-height: 1.65em; display: table-cell; vertical-align: middle; height: 30px; width: 80px; padding-left: 30px; font-size: 13px !important; color: rgb(255, 255, 255) !important; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/channel/entertainment/share/fb-icon-m.png) no-repeat;">Share</div></a><a href="http://twitter.com/share?text=Pantaskah%20Neymar%20Jadi%20%27Ancaman%20Serius%27%20Dominasi%20Ronaldo-Messi%3F%20-%20Bola.net&amp;url=http%3A%2F%2Fwww.bola.net%2Feditorial%2Fpantaskah-neymar-jadi-ancaman-serius-dominasi-ronaldo-messi.html&amp;via=bolanet" class="tweet-share" style="color: rgb(51, 51, 51); text-decoration: none; font-family: Arial, Helvetica, sans-serif !important; float: left; width: 80px; margin: 3px; background: rgb(103, 173, 209);"><span class="count-box" style="text-align: center; display: block; padding: 10px 0px; border-width: 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-left-style: solid; border-top-color: rgb(210, 210, 210); border-right-color: rgb(210, 210, 210); border-left-color: rgb(210, 210, 210); position: relative; line-height: 1.45em; font-size: 13px !important; color: rgb(85, 85, 85) !important; background: rgb(226, 235, 242) !important;">114</span><div class="box-title" style="font-stretch: normal; line-height: 1.65em; display: table-cell; vertical-align: middle; height: 30px; width: 80px; padding-left: 30px; font-size: 13px !important; color: rgb(255, 255, 255) !important; background: url(http://cdn.klimg.com/kapanlagi.com/v5/i/channel/entertainment/share/tw-icon-m.png) no-repeat;">Tweet</div></a></div><br><br></div></div><p><br style="color: rgb(51, 51, 51); font-family: arial, sans-serif; font-size: 12px; line-height: 19.8px;"><br style="color: rgb(51, 51, 51); font-family: arial, sans-serif; font-size: 12px; line-height: 19.8px;"></p><div class="ncont" style="font-stretch: normal; font-size: 14px; line-height: 2em; font-family: arial, helvetica, clean, sans-serif; color: rgb(51, 51, 51);"><div id="editorial_content" style="font-stretch: normal; line-height: 2em;"><div class="news-headline-image news" style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; margin: 0px; background-color: rgb(0, 0, 0);"><img width="468" src="http://cdn.klimg.com/bola.net/library/upload/20/2015/11/neymar_f664fbf.jpg" alt="Pantaskah Neymar Jadi ''Ancaman Serius'' Dominasi Ronaldo-Messi?" style="border: 0px; vertical-align: middle;"><div style="font-stretch: normal; font-size: 11px; line-height: 1.65em; color: rgb(255, 255, 255); padding: 3px 5px;">Neymar, Ronaldo dan Messi. © Bola</div></div><div id="fb-root" class=" fb_reset" style="font-stretch: normal; font-size: 11px; line-height: 1; font-family: ''lucida grande'', tahoma, verdana, arial, sans-serif; color: rgb(0, 0, 0); border: 0px; border-spacing: 0px; cursor: auto; direction: ltr; margin: 0px; overflow: visible; padding: 0px; text-shadow: none; visibility: visible; word-spacing: normal; background: none;"><div style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; color: rgb(51, 51, 51); overflow: hidden; position: absolute; top: -10000px; height: 0px; width: 0px;"><div style="font-stretch: normal; line-height: 1.65em;"><iframe name="fb_xdm_frame_http" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Facebook Cross Domain Communication Frame" aria-hidden="true" tabindex="-1" id="fb_xdm_frame_http" src="http://static.ak.facebook.com/connect/xd_arbiter/TlA_zCeMkxl.js?version=41#channel=f28194de94&amp;origin=http%3A%2F%2Fwww.bola.net" style="border-style: none; border-width: initial;"></iframe><iframe name="fb_xdm_frame_https" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Facebook Cross Domain Communication Frame" aria-hidden="true" tabindex="-1" id="fb_xdm_frame_https" src="https://s-static.ak.facebook.com/connect/xd_arbiter/TlA_zCeMkxl.js?version=41#channel=f28194de94&amp;origin=http%3A%2F%2Fwww.bola.net" style="border-style: none; border-width: initial;"></iframe></div></div><div style="font-stretch: normal; font-size: 12px; line-height: 1.65em; font-family: arial, sans-serif; color: rgb(51, 51, 51); overflow: hidden; position: absolute; top: -10000px; height: 0px; width: 0px;"><div style="font-stretch: normal; line-height: 1.65em;"></div></div></div><p><b>Bola.net</b>&nbsp;- Nama&nbsp;<a href="http://www.bola.net/profile/neymar_da_silva_santos_junior" title="Lihat Biografi Neymar" class="bluelink" style="color: rgb(17, 97, 190); text-decoration: none;"><b>Neymar</b></a>&nbsp;terus saja disebut-sebut sebagai salah satu dari tiga pemain terbaik di dunia saat ini. Namanya masuk bersama bintang-bintang besar seperti&nbsp;<a href="http://www.bola.net/profile/lionel_messi" title="Lihat Biografi Lionel Messi" class="bluelink" style="color: rgb(17, 97, 190); text-decoration: none;"><b>Lionel Messi</b></a>&nbsp;dan&nbsp;<a href="http://www.bola.net/profile/cristiano_ronaldo" title="Lihat Biografi Cristiano Ronaldo" class="bluelink" style="color: rgb(17, 97, 190); text-decoration: none;"><b>Cristiano Ronaldo</b></a>.<br><br>Musim ini, bintang Barcelona itu memang mampu melanjutkan performa luar biasa seperti yang ia miliki musim lalu. Apalagi disaat Messi absen karena cedera selama satu bulan lebih, nama Neymar seakan mampu melanjutkan tongkat estafet ''kepemimpinan'' Messi di lini depan Barcelona.<br><br>Nah, pertanyaan yang sering mengemuka saat ini adalah sudah tepatkah menyebut nama Neymar sebagai ''penantang'' serius atas hegemoni Ronaldo dan Messi dalam beberapa tahun terakhir?<img src="/images/1448016754197_DSC_0006.JPG" alt="sad" width="100" height="100"></p></div></div>', NULL, '2015-11-20 17:52:50', '2015-11-20 17:52:50', 33, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL,
  `site_area` float NOT NULL,
  `width` float NOT NULL,
  `length` float NOT NULL,
  `site_address` varchar(256) NOT NULL,
  `coordinate` text NOT NULL,
  `google_earth_file` text NOT NULL,
  `design_reference_file` text NOT NULL,
  `content` text NOT NULL,
  `created_date` datetime NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` text NOT NULL,
  `fullname` varchar(256) NOT NULL,
  `title` varchar(32) NOT NULL,
  `image` text NOT NULL,
  `facebook` tinytext,
  `google_plus` tinytext,
  `tumblr` tinytext,
  `twitter` tinytext,
  `description` text,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `fullname`, `title`, `image`, `facebook`, `google_plus`, `tumblr`, `twitter`, `description`, `is_active`) VALUES
(1, 'achmad@gmail', '$2a$05$nGjRUCGHzw64kXjzirgd2.0fbg..hqGDEYbHuqwEGs0pzixcHZcUi', 'Achmad Jamalaludin', 'admin', '/uploads/user/1448617274270_7179c7f3b6d1fe28b65573076a74a785_k.jpg', 'https://www.facebook.com/astafista', 'https://www.facebook.com/astafista', 'https://www.facebook.com/astafista', 'https://www.facebook.com/astafista', '<p><strong style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Bola.net</strong><span style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">&nbsp;- Membaca judul di atas mungkin banyak orang bakal mengerutkan alis. Bagaimana mungkin?&nbsp;</span><strong style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Cristiano Ronaldo</strong><span style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">&nbsp;yang selama ini jadi ikon&nbsp;</span><strong style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Real Madrid</strong><span style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">&nbsp;harus absen di pertandingan akbar melawan musuh bebuyutan&nbsp;</span><strong style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Barcelona</strong><span style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">, apalagi ia tidak mengalami masalah terkait kondisi fisiknya.</span><br style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;"><br style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;"><em style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Well</em><span style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">, secara sepintas memang hal tersebut seperti terdengar sulit atau bahkan mustahil dilakukan oleh&nbsp;</span><strong style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Rafael Benitez</strong><span style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">, kecuali ia memang ingin memancing amarah dari fans Madrid dan media-media Spanyol - yang selama ini dikenal luar biasa ''kejam''.</span><br></p><p><span style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;" data-mce-style="color: #333333; font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Namun jika ditelaah secara seksama, ada beberapa alasan yang cukup logis, hingga membuat opsi mencadangkan Ronaldo terasa sebagai pilihan yang tepat bagi Madrid untuk menjinakkan Barcelona di laga akhir pekan ini.</span></p>', 1),
(16, 'jamal@achmad', '$2a$05$bli/.Z/TjVOhdYp7D9p6l.h0uDfY/5lpjlyJm7UiJAcpAAdmEUbYu', 'jamaludin', 'admin', '', '', '', '', '', NULL, 0),
(17, 'jamal@jamal', '$2a$05$9uK5Mi9l7SVZKjFTr0j//uFIxVib9KlgQAqaFL5.X0DWpmMfCiNQO', 'jamal', 'admin', '', '', '', '', '', NULL, 0),
(18, 'jamal@achmad', '$2a$05$9.Zy0uMk6SEsHYG3EAjlPeljobcFtt9WbFl9HMS2VjuFhlwcv.wUO', 'achamd', 'admin', '', '', '', '', '', NULL, 0),
(19, 'a@a', '$2a$05$fIUHKj4chJ/jAA7r3fxmzeSEnD5Dxv30SX5QmKJQYly6EXBigKLRe', 'a', 'admin', '', '', '', '', '', NULL, 0),
(20, 'aba@a', '$2a$05$Jpjjc4Bf06QQwUhkM2bOv.0yEXCRzY78FByeKpdJoxAbt9OGs.MKu', 'aaaa', 'admin', '/public/uploads/user/1445570311495_3zI0AlQ.png', '', '', '', '', NULL, 0),
(21, 'ab@cd', '$2a$05$r0/UQDg/kMFrKBRhCyRRYuHA9UHEK5BYU43j8SubxNWw3Ah90TxU2', 'acak', 'admin', '/uploads/user/1445571080015_CAM00005.jpg', '', '', '', '', NULL, 0),
(22, 'a1@a', '$2a$05$mZcwSZxo465eYbTcvy6tyurTtEWCxAT0TKcJqp/jMRCBdVsBpO5FG', 'amal', 'admin', '/uploads/user/undefined', '', '', '', '', NULL, 0),
(23, 'a2@a', '$2a$05$N/A7g9j67ykQH3AM93oJrOsjknWz/.6zTnH4jAS7bP25yOrl50iEi', 'amal', 'admin', '/uploads/user/1445590618339_CAM00005.jpg', '', '', '', '', NULL, 0),
(24, 'a3@a', '$2a$05$yRKD8ooZfc7DmCOCvTcy.e1yqx1gfDL6TfF/lsUA/p7T/xzJsw/bu', 'aaa', 'admin', '/uploads/user/1445592938611_CAM00031.jpg', '', '', '', '', NULL, 0),
(25, 'a4@a', '$2a$05$5bqL.Im6l5UqfUJmrt1SkuNYW/z3yQYBeH1LpNf4BLrItnlP3zYki', 'aaa', 'admin', '/uploads/user/1445593182694_CAM00003.jpg', '', '', '', '', NULL, 0),
(26, 'student.achmad@gmail.com', '$2a$05$GepqzjdDI32wpN1w5iVDbuyh9UBvEYDYstlGC/IXUHj.FljAO5p9W', 'Achmad Jamal', 'admin', '/uploads/user/1447385634815_CAM00052~2.jpg', '', '', '', '', NULL, 0),
(27, 'student.achmad@gmail.com', '$2a$05$/MBFRmi8IW70V57tVVb2yOCR7jsRM2pEta2sV4Cchxq/vCmU/SwLO', 'amal aja', 'admin', '/uploads/user/undefined', '', '', '', '', NULL, 0),
(28, 'nobita@yahoo.com', '$2a$05$wwifdEeB9H/PduhS3ONyM.vwB2PjW/CrYqCrdJXDObqUBes/ou0.m', 'nobita dan doraemon', 'admin', '/uploads/user/1447659820147_3zI0AlQ.png', '', '', '', '', NULL, 0),
(29, 'fasfsafsaddfsa@asfdasfs', '$2a$05$DN7lbrtoJFkZCVIgU1jCO.q84.tvtUhFf2WRGDT7wbxOXNPnz5m1K', 'dfasdfsafsa', 'admin', '/uploads/user/undefined', '', '', '', '', NULL, 0),
(30, 'nskdgndkngdskl@skgnsdkj', '$2a$05$ExL7r0vWBTgx1DhyYizEGO3BJ3NzKlDCEaqlb2jP20Il/tfsBIkDC', 'sdkngksdlnf', 'admin', '/uploads/user/1447730969583_adidas-manchester-united-15-16-home-kit_(1).jpg', '', '', '', '', '<p>sfsafasfsafsafsafsafnkjsanfkasnkfn,msanfjanfksnmfkanmknfkjdsanfmndfkabfjdnaskfdknsaknfkjnasjkbnfasibfiwnbfjaksnbfkjaskjbfjasbdfbasdsc</p>', 0),
(31, 'abcd@abcd', '$2a$05$fptsu7EMLBCuYjK3AEmeDuf5kSLqk8UNWRoHfvuCO3lpRLMUsZ1yC', 'fassfassafasfas', 'admin', '/uploads/user/1447755305552_7179c7f3b6d1fe28b65573076a74a785_k.jpg', '', '', '', '', '<p style="text-align: center;" data-mce-style="text-align: center;">fsadfkasnf sakjnfjksanfkjsanfmksa fkadsnfaksf akfnnakfna&nbsp;</p><p style="text-align: center;" data-mce-style="text-align: center;">aslknfsakjnf kjsafasf</p>', 0),
(32, 'crash@bandicot', '$2a$05$ILxHEG79fOraad4ybAVLBuygLVQKg8r.1OYxoRO9OA.6K17h6mcKS', 'crash bandicot', 'admin', '/uploads/user/1447899385843_DSC_0003.JPG', '', '', '', '', '<p>Saya adalah salah satu character pada game CTR yang sering digunakan karena kecepatannya.<br>Selain di game CTR saya juga bermain di game crash bandicot yang dimana saya menjadi tokoh utamanya<br></p>', 0),
(33, 'amal@amal', '$2a$05$PcMvHNdQcfUQ3cFXtkp0zeCXkOB62NcI24mPl8kzcfTSqaDQN/B.G', 'amal jamal', 'admin', '/uploads/user/1448004391478_touchscreen_lg_ls_970.jpg', '', '', '', '', '<p><b style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Bola.net</b><span style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">&nbsp;- Membaca judul di atas mungkin banyak orang bakal mengerutkan alis. Bagaimana mungkin?&nbsp;</span><b style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Cristiano Ronaldo</b><span style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">&nbsp;yang selama ini jadi ikon&nbsp;</span><b style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Real Madrid</b><span style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">&nbsp;harus absen di pertandingan akbar melawan musuh bebuyutan&nbsp;</span><b style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Barcelona</b><span style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">, apalagi ia tidak mengalami masalah terkait kondisi fisiknya.</span><br style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;"><br style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;"><i style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Well</i><span style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">, secara sepintas memang hal tersebut seperti terdengar sulit atau bahkan mustahil dilakukan oleh&nbsp;</span><b style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">Rafael Benitez</b><span style="color: rgb(51, 51, 51); font-family: arial, helvetica, clean, sans-serif; font-size: 14px; line-height: 28px;">, kecuali ia memang ingin memancing amarah dari fans Madrid dan media-media Spanyol - yang selama ini dikenal luar biasa ''kejam''.</span><br></p>', 1),
(34, 'achmad.jamal@yahoo.com', '$2a$05$QQMIv7szQtXe8Rn15huqLeE3Io0wbDyvV3./mbpm2qqtTn60Kxwfa', 'jamal', 'admin', '/uploads/user/1448246689533_P1508170402258.jpg', '', '', '', '', '<p>fasdfsafsafsadf sdafadsfsdafas asdf aswaelfjiasnmfa</p>', 1),
(35, 'a@afasd', '$2a$05$qe8CMhcki1Y7O.vAUg45iO./N7C3vFaLYCRLWG0pG65C2l/cjJhpe', 'fsafsa', 'admin', '/uploads/user/1448618985803_DSC_0001.JPG', 'https://www.facebook.com/astafista', 'https://www.facebook.com/astafista', 'https://www.facebook.com/astafista', 'https://www.facebook.com/astafista', '<p>fsafsajkfhjasnfklsadnfkjasnfjkasbfjkasbfkjsabfkjasbfjksa<span id="_mce_caret" data-mce-bogus="1"><strong>? asfsadfsadfsaf</strong></span></p>', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portfolio_id` (`portfolio_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `parrent_id` (`parrent_id`);

--
-- Indexes for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `category_id_2` (`category_id`);

--
-- Indexes for table `portfolio_image`
--
ALTER TABLE `portfolio_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portfolios_id` (`portfolio_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `portfolio_image`
--
ALTER TABLE `portfolio_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parrent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD CONSTRAINT `portfolios_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `portfolio_image`
--
ALTER TABLE `portfolio_image`
  ADD CONSTRAINT `portfolio_image_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
