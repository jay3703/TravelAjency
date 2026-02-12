-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2026 at 07:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_agency`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `admin_email` varchar(100) DEFAULT NULL,
  `admin_password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `admin_email`, `admin_password`) VALUES
(1, 'vanavejay123@gmail.com', 'jay123');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `blog_id` int(11) NOT NULL,
  `blog_title` varchar(255) NOT NULL,
  `blog_short_description` text DEFAULT NULL,
  `blog_full_description` longtext DEFAULT NULL,
  `blog_publish_date` date NOT NULL,
  `blog_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`blog_id`, `blog_title`, `blog_short_description`, `blog_full_description`, `blog_publish_date`, `blog_image`) VALUES
(11, 'Goa: The Ultimate Beach & Nightlife Destination', 'Goa is famous for its beautiful beaches, vibrant nightlife, Portuguese heritage, and relaxing holiday vibes.', 'Goa is one of the most popular tourist destinations in India, known for its stunning beaches, lively nightlife, and rich cultural heritage. The golden sandy beaches, palm trees, and soothing sea breeze make it a perfect place to relax and unwind.\r\nPopular beaches like Baga, Calangute, Anjuna, and Vagator attract tourists from all over the world. Adventure lovers can enjoy water sports such as parasailing, scuba diving, jet skiing, and banana boat rides.', '2026-01-15', '1768414979586_gao1.jpg'),
(12, 'Kerala: God’s Own Country', 'Kerala is known for its lush greenery, backwaters, hill stations, Ayurveda, and peaceful natural beauty.', 'Kerala is a breathtaking destination located on the southwestern coast of India. It is famous for its serene backwaters, scenic hill stations, tea plantations, and rich wildlife. A houseboat cruise in Alleppey or Kumarakom offers a unique and unforgettable experience.\r\nMunnar and Wayanad are popular hill stations with cool climates and misty mountains. Kerala is also well-known for its traditional Ayurveda treatments and rejuvenation therapies.', '2026-01-15', '1768415029331_kerala1.jpg'),
(13, 'Kashmir: Paradise on Earth', 'Kashmir is famous for its snow-capped mountains, beautiful valleys, lakes, and breathtaking landscapes.', 'Kashmir is often referred to as “Paradise on Earth” due to its unmatched natural beauty. Surrounded by majestic mountains, lush valleys, and sparkling rivers, Kashmir offers a magical experience in every season.\r\nDal Lake and Nigeen Lake in Srinagar are major attractions, where visitors can enjoy shikara rides and stay in houseboats. Gulmarg is a popular destination for skiing and snow activities, while Pahalgam is perfect for scenic walks and relaxation.', '2026-01-15', '1768415098691_kashmir1.jpg'),
(14, 'Manali: A Perfect Mountain Getaway', 'Manali is a beautiful hill station known for its snow-covered mountains, adventure sports, and peaceful surroundings.', 'Manali is a charming hill station located in Himachal Pradesh and is a favorite destination for honeymooners and adventure seekers. Surrounded by snow-capped peaks, pine forests, and flowing rivers, Manali offers a refreshing escape from city life.\r\nSolang Valley and Rohtang Pass are popular for activities like skiing, paragliding, and snowboarding. Old Manali is known for its cafes, temples, and relaxed vibe.\r\nWhether you seek adventure or a quiet retreat in nature, Manali provides a perfect blend of both.', '2026-01-15', '1768415231914_manali1.jpg'),
(15, 'Rajasthan: The Land of Royals and Heritage', 'Rajasthan is famous for its royal palaces, historic forts, colorful culture, and desert landscapes.', 'Rajasthan is a vibrant state that reflects India’s rich royal history and cultural heritage. Magnificent forts and palaces such as Amer Fort, City Palace, Mehrangarh Fort, and Hawa Mahal attract tourists from around the world.\r\nThe golden sands of the Thar Desert offer exciting camel safaris and desert camping experiences. Cities like Jaipur, Udaipur, Jodhpur, and Jaisalmer showcase traditional music, dance, festivals, and handicrafts.', '2026-01-15', '1768415273618_rajasthan1.jpg'),
(16, 'Maldives: A Tropical Paradise of Luxury', 'The Maldives is known for its crystal-clear waters, luxury resorts, white sandy beaches, and romantic island experiences.', 'The Maldives is a dream destination for travelers seeking luxury, romance, and natural beauty. Located in the Indian Ocean, it consists of stunning coral islands surrounded by turquoise waters and vibrant marine life.\r\nOverwater villas, private beaches, and world-class resorts make the Maldives perfect for honeymooners and luxury travelers. Activities such as snorkeling, scuba diving, dolphin watching, and sunset cruises are extremely popular.', '2026-01-14', '1768415308016_maldives1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `contact_requests`
--

CREATE TABLE `contact_requests` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `travel_date` date DEFAULT NULL,
  `travelers` varchar(20) DEFAULT NULL,
  `budget` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_requests`
--

INSERT INTO `contact_requests` (`id`, `first_name`, `last_name`, `email`, `phone`, `destination`, `travel_date`, `travelers`, `budget`, `message`, `created_at`) VALUES
(1, 'Jayesh', 'Vanave', 'vanavejay124@gmail.com', '08262813633', 'manali', '2026-01-15', '5-8', 'under-20k', 'dfgdf', '2026-01-14 07:57:37'),
(3, 'Nilesh', 'pawar', 'nilesh@gmail.com', '9456295629', 'maldives', '2026-01-16', '3-4', '100k-200k', ' Enjoy serene backwaters, houseboat cruise,\r\n                    lush greenery, and peaceful nature in God’s Own Country – Kerala.', '2026-01-14 18:01:05'),
(4, 'Nilesh', 'pawar', 'nilesh@gmail.com', '9456295629', 'maldives', '2026-01-16', '3-4', '100k-200k', ' Enjoy serene backwaters, houseboat cruise,\r\n                    lush greenery, and peaceful nature in God’s Own Country – Kerala.', '2026-01-14 18:04:29');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `gallery_id` int(11) NOT NULL,
  `image_title` varchar(150) NOT NULL,
  `image_file` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`gallery_id`, `image_title`, `image_file`, `created_at`) VALUES
(3, 'jay', '1768547118431_gallery4.jpg', '2026-01-16 07:05:18'),
(4, 'jay', '1768547128288_gallery4.jpg', '2026-01-16 07:05:28');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `package_id` int(11) NOT NULL,
  `package_title` varchar(255) NOT NULL,
  `short_description` text NOT NULL,
  `total_days` int(11) NOT NULL,
  `total_nights` int(11) NOT NULL,
  `location` varchar(150) NOT NULL,
  `dublicate_price` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `package_image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`package_id`, `package_title`, `short_description`, `total_days`, `total_nights`, `location`, `dublicate_price`, `price`, `package_image`, `status`, `created_at`, `updated_at`) VALUES
(5, 'Manali Adventure Retreat', 'Snow-capped peaks, river rafting, and breathtaking views in beautiful Manali.', 3, 4, ' Manali, Solang Valley', 17000, 15999.00, '1768537127709_manali1.jpg', 1, '2026-01-16 04:18:47', '2026-01-16 04:39:55'),
(6, 'Bali Exotic Escape', 'Immerse yourself in Bali\'s culture, beaches, temples, and tropical paradise.', 4, 5, ' Kuta, Seminyak, Ubud', 29000, 24999.00, '1768537246079_bali1.jpg', 1, '2026-01-16 04:20:46', '2026-01-16 04:40:07'),
(7, 'Kashmir Paradise on Earth', 'Shikara rides, valleys, and snow-covered hills of heavenly Kashmir.', 6, 5, 'Srinagar, Gulmarg, Pahalgam', 25000, 22999.00, '1768537778730_kashmir1.jpg', 1, '2026-01-16 04:29:38', '2026-01-16 04:29:38'),
(8, 'Maldives Luxury Stay', 'Crystal clear waters, luxury villas, and endless blue skies of Maldives.', 4, 3, ' North & South Atolls', 60000, 49000.00, '1768537858367_maldives1.jpg', 1, '2026-01-16 04:30:58', '2026-01-16 04:30:58'),
(9, 'Rajasthan Royal Heritage', 'Explore palaces, forts, and the deserts of vibrant Rajasthan.', 5, 4, ' Jaipur, Jodhpur, Udaipur', 1700, 14999.00, '1768537925695_rajasthan1.jpg', 1, '2026-01-16 04:32:05', '2026-01-16 04:32:05'),
(10, 'Ahilyanagar Heritage & Spiritual Tour', 'Explore the rich history, forts, temples, and spiritual landmarks of Ahilyanagar. A perfect blend of heritage, culture, and devotion in the heart of Maharashtra.', 2, 1, 'Ahilyanagar (Ahmednagar), Maharashtra, India', 5999, 4999.00, '1768538944219_ahilyanagar.jpg', 1, '2026-01-16 04:49:04', '2026-01-16 04:49:04');

-- --------------------------------------------------------

--
-- Table structure for table `travel_categories`
--

CREATE TABLE `travel_categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `travel_categories`
--

INSERT INTO `travel_categories` (`id`, `category_name`, `image`, `description`, `created_at`) VALUES
(2, 'Goa Beach Paradise', '1768411027552_gao1.jpg', ' Relax at pristine beaches, enjoy thrilling water sports,                     beach parties, and vibrant nightlife in Goa.', '2026-01-14 17:17:07'),
(3, 'Kerala Backwaters', '1768411105196_kerala1.jpg', ' Enjoy serene backwaters, houseboat cruise,                     lush greenery, and peaceful nature in God’s Own Country – Kerala.', '2026-01-14 17:18:25'),
(4, 'Dubai Luxury Tour', '1768411910657_dubai1.jpg', ' Experience world-class luxury, desert safari,                     Burj Khalifa, dhow cruise and premium shopping in Dubai.', '2026-01-14 17:31:50');

-- --------------------------------------------------------

--
-- Table structure for table `travel_requests`
--

CREATE TABLE `travel_requests` (
  `travel_id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `travel_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `travel_requests`
--

INSERT INTO `travel_requests` (`travel_id`, `full_name`, `email`, `mobile_number`, `travel_date`) VALUES
(3, 'Jayesh Vanave', 'vanavejay124@gmail.com', '08262813633', '2026-01-23'),
(4, 'jay', 'jay@gmail.com', '34567890987', '2026-01-15'),
(6, 'chetan pawar', 'chetan@gmail.com', '0876543213', '2025-12-12'),
(7, 'gaurav honde', 'gaurav@gmail.com', '9845874658', '2026-01-15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blog_id`);

--
-- Indexes for table `contact_requests`
--
ALTER TABLE `contact_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`gallery_id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `travel_categories`
--
ALTER TABLE `travel_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `travel_requests`
--
ALTER TABLE `travel_requests`
  ADD PRIMARY KEY (`travel_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `contact_requests`
--
ALTER TABLE `contact_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `gallery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `travel_categories`
--
ALTER TABLE `travel_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `travel_requests`
--
ALTER TABLE `travel_requests`
  MODIFY `travel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
