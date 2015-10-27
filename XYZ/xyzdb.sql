-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2015 at 11:21 AM
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
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'house'),
(2, 'office');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` text NOT NULL,
  `birth` datetime NOT NULL,
  `gender` varchar(16) NOT NULL,
  `nationality` varchar(64) NOT NULL,
  `image_id_card` text,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `email`, `birth`, `gender`, `nationality`, `image_id_card`, `is_active`) VALUES
(1, 'suneo', 'suneo@a', '2015-10-08 00:00:00', 'L', 'indonesia', NULL, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `message`, `subject`, `name`, `email`, `date`, `portfolio_id`, `post_id`, `parrent_id`, `is_active`) VALUES
(1, 'afsfsfasfafafasfsafffffff', 'asfsafasfaf', 'asfasfas', 'afsfasfasfasf', '2015-10-01 00:00:00', NULL, 1, NULL, 1),
(2, 'sfsafsfasfsdsafasf', 'sadfsafsafsafcvbcves', 'asfdasfasf', 'asfasfasfasf', '2015-10-02 00:00:00', NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE IF NOT EXISTS `portfolios` (
  `id` int(11) NOT NULL,
  `architect` varchar(256) NOT NULL,
  `status` varchar(32) NOT NULL,
  `area` text NOT NULL,
  `location` text NOT NULL,
  `title` varchar(64) NOT NULL,
  `content` text NOT NULL,
  `project_year` year(4) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `header_image` text,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`id`, `architect`, `status`, `area`, `location`, `title`, `content`, `project_year`, `created_date`, `updated_date`, `header_image`, `is_active`) VALUES
(1, 'aku', 'building was destroy', '10m', 'asfdasfasfsafafs', 'fasfafasfasfafafasfasfafa', 'sfdsadfsfasfsfdsafasklnfkaslnfklsnfklsanfklsanlkfnaflkasnklfnsklnfdklasnklfnsaklnfasklfklkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkllllllllllllllllll', 2015, '2015-10-01 00:00:00', '2015-10-01 00:00:00', 'fnalksfnsaklfnaskfa', 1),
(20, 'afafa', 'aaa', 'aaa', 'afafa', 'afasfasfsa', '<p>afdasa</p>', 2001, '2015-10-21 14:01:31', '2015-10-26 17:00:24', '/uploads/portfolio/1445853623829_CAM00004.jpg', 1),
(22, 'adfaf', 'afasdfsa', 'aaa', 'asf', 'asfas', '<p>sadfdsafsafsdadfsa</p>', 2020, '2015-10-21 14:37:54', '2015-10-21 14:37:54', 'adfafadsfdasnfasklfalsfa', 0),
(23, 'a', 'a', 'a', 'a', 'a', '<p>a</p>', 2001, '2015-10-26 14:03:18', '2015-10-26 14:03:18', '/uploads/portfolio/1445842997063_CAM00031.jpg', 1),
(24, 'a', 'a', 'a', 'a', 'a', '<p>a</p>', 2001, '2015-10-26 14:05:19', '2015-10-26 14:05:19', '/uploads/portfolio/1445843117988_CAM00031.jpg', 1),
(26, 'aa', 'a', 'a', 'a', 'aa', '<p>aa</p>', 2013, '2015-10-26 16:32:56', '2015-10-26 16:32:56', '/uploads/portfolio/1445851974989_CAM00003.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_image`
--

CREATE TABLE IF NOT EXISTS `portfolio_image` (
  `id` int(11) NOT NULL,
  `image` text,
  `portfolio_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `portfolio_image`
--

INSERT INTO `portfolio_image` (`id`, `image`, `portfolio_id`) VALUES
(8, '/uploads/portfolio/1445853624084_CAM00008.jpg', 20),
(9, '/uploads/portfolio/1445853624213_CAM00030.jpg', 20),
(10, '/uploads/portfolio//uploads/portfolio/1445853623829_CAM00004.jpg', 20);

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
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `category_id`, `type`, `title`, `content`, `header_image`, `created_date`, `updated_date`, `user_id`, `is_active`) VALUES
(1, 1, 1, 'aku', '<p>aaaa</p><p><img src="/images/glen.jpg" alt="glen" width="300" height="402" data-mce-selected="1"><br data-mce-bogus="1"></p><div id="mceResizeHandlenw" data-mce-bogus="all" class="mce-resizehandle" unselectable="true" data-mce-style="cursor: nw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 30.5px;" style="cursor: nw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 30.5px;"></div><div id="mceResizeHandlene" data-mce-bogus="all" class="mce-resizehandle" unselectable="true" data-mce-style="cursor: ne-resize; margin: 0px; padding: 0px; left: 303.5px; top: 30.5px;" style="cursor: ne-resize; margin: 0px; padding: 0px; left: 303.5px; top: 30.5px;"></div><div id="mceResizeHandlese" data-mce-bogus="all" class="mce-resizehandle" unselectable="true" data-mce-style="cursor: se-resize; margin: 0px; padding: 0px; left: 303.5px; top: 432.5px;" style="cursor: se-resize; margin: 0px; padding: 0px; left: 303.5px; top: 432.5px;"></div><div id="mceResizeHandlesw" data-mce-bogus="all" class="mce-resizehandle" unselectable="true" data-mce-style="cursor: sw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 432.5px;" style="cursor: sw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 432.5px;"></div>', '/uploads/posting/1445833264725_CAM00031.jpg', '2015-10-16 13:42:14', '2015-10-26 11:21:05', 1, 1),
(2, NULL, 2, 'kkkkkaaaabbb', 'afasfasfafafsafmasklmfasklmfsakl', NULL, '2015-10-08 00:00:00', '2015-10-19 13:41:09', 1, 1),
(3, 1, 1, 'fdasfsafasfasfafasfasfwetrfa', 'gfnjfghjsfgfadgadcvxz', 'asdfasfasfsafsafas', '2015-10-19 08:48:19', '2015-10-19 08:48:19', 1, 0),
(4, 1, 1, 'asfsadfsaf', 'asfsafsafsa', 'asdfasfasfsafsafas', '2015-10-19 08:52:36', '2015-10-19 08:52:36', 1, 1),
(5, 2, 1, 'asfsafasfas', 'asfsafasfas', 'asdfasfasfsafsafas', '2015-10-19 08:54:53', '2015-10-19 08:54:53', 1, 1),
(6, 2, 1, 'kalkasgkl;asfj;klasjfaslk', 'ajbfjkasfasnfkjsa', 'asdfasfasfsafsafas', '2015-10-19 08:55:04', '2015-10-19 08:55:04', 1, 1),
(11, 1, 1, 'fsafddsafasfas', '<p>asfasfasfas<span id="_mce_caret" data-mce-bogus="1"><strong>?asfsafasfasfasfafasf<span id="_mce_caret" data-mce-bogus="1"><em>?asfasfasfasfas</em></span></strong></span></p>', 'asdfasfasfsafsafas', '2015-10-19 16:29:08', '2015-10-19 16:29:08', 1, 1),
(12, 2, 1, 'fasfsa', '<p>asfsaf</p>', 'asdfasfasfsafsafas', '2015-10-21 15:17:05', '2015-10-21 15:17:05', 1, 1),
(13, 1, 1, 'saya saya saya', '<p>klasjfkla;sjmflaksmnfklashfklas</p>', '/uploads/posting/1445831176910_CAM00003.jpg', '2015-10-26 10:46:17', '2015-10-26 10:46:17', 1, 1);

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

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `site_area`, `width`, `length`, `site_address`, `coordinate`, `google_earth_file`, `design_reference_file`, `content`, `created_date`, `client_id`) VALUES
(1, 0, 2, 2, 'fasfsafasfasfasfas', 'fasfasfsafsafasfas', 'asfsafs', 'asfsafasfasfs', 'safsafsaasfasfafaf', '2015-10-22 00:00:00', 1);

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
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `fullname`, `title`, `image`, `is_active`) VALUES
(1, 'achmad@gmail', '$2a$05$9k4qJLJFdZMwIeQaUBxJd.HmyBxJ16yJ5DO8Q6gFli8llpHORXzYS', 'Achmad Jamalaludin', 'admin', '/uploads/user/1445597397869_CAM00005.jpg', 1),
(16, 'jamal@achmad', '$2a$05$bli/.Z/TjVOhdYp7D9p6l.h0uDfY/5lpjlyJm7UiJAcpAAdmEUbYu', 'jamaludin', 'admin', '', 0),
(17, 'jamal@jamal', '$2a$05$9uK5Mi9l7SVZKjFTr0j//uFIxVib9KlgQAqaFL5.X0DWpmMfCiNQO', 'jamal', 'admin', '', 1),
(18, 'jamal@achmad', '$2a$05$9.Zy0uMk6SEsHYG3EAjlPeljobcFtt9WbFl9HMS2VjuFhlwcv.wUO', 'achamd', 'admin', '', 0),
(19, 'a@a', '$2a$05$fIUHKj4chJ/jAA7r3fxmzeSEnD5Dxv30SX5QmKJQYly6EXBigKLRe', 'a', 'admin', '', 0),
(20, 'aba@a', '$2a$05$Jpjjc4Bf06QQwUhkM2bOv.0yEXCRzY78FByeKpdJoxAbt9OGs.MKu', 'aaaa', 'admin', '/public/uploads/user/1445570311495_3zI0AlQ.png', 0),
(21, 'ab@cd', '$2a$05$r0/UQDg/kMFrKBRhCyRRYuHA9UHEK5BYU43j8SubxNWw3Ah90TxU2', 'acak', 'admin', '/uploads/user/1445571080015_CAM00005.jpg', 0),
(22, 'a1@a', '$2a$05$mZcwSZxo465eYbTcvy6tyurTtEWCxAT0TKcJqp/jMRCBdVsBpO5FG', 'amal', 'admin', '/uploads/user/undefined', 0),
(23, 'a2@a', '$2a$05$N/A7g9j67ykQH3AM93oJrOsjknWz/.6zTnH4jAS7bP25yOrl50iEi', 'amal', 'admin', '/uploads/user/1445590618339_CAM00005.jpg', 1),
(24, 'a3@a', '$2a$05$yRKD8ooZfc7DmCOCvTcy.e1yqx1gfDL6TfF/lsUA/p7T/xzJsw/bu', 'aaa', 'admin', '/uploads/user/1445592938611_CAM00031.jpg', 1),
(25, 'a4@a', '$2a$05$5bqL.Im6l5UqfUJmrt1SkuNYW/z3yQYBeH1LpNf4BLrItnlP3zYki', 'aaa', 'admin', '/uploads/user/1445593182694_CAM00003.jpg', 1);

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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `portfolio_image`
--
ALTER TABLE `portfolio_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parrent_id`) REFERENCES `comments` (`id`);

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
