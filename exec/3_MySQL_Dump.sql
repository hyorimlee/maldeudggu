CREATE DATABASE  IF NOT EXISTS `maldeutggu` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `maldeutggu`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: j6a203.p.ssafy.io    Database: maldeutggu
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add audio',1,'add_audio'),(2,'Can change audio',1,'change_audio'),(3,'Can delete audio',1,'delete_audio'),(4,'Can view audio',1,'view_audio'),(5,'Can add sentence',2,'add_sentence'),(6,'Can change sentence',2,'change_sentence'),(7,'Can delete sentence',2,'delete_sentence'),(8,'Can view sentence',2,'view_sentence'),(9,'Can add case',3,'add_case'),(10,'Can change case',3,'change_case'),(11,'Can delete case',3,'delete_case'),(12,'Can view case',3,'view_case'),(13,'Can add log entry',4,'add_logentry'),(14,'Can change log entry',4,'change_logentry'),(15,'Can delete log entry',4,'delete_logentry'),(16,'Can view log entry',4,'view_logentry'),(17,'Can add permission',5,'add_permission'),(18,'Can change permission',5,'change_permission'),(19,'Can delete permission',5,'delete_permission'),(20,'Can view permission',5,'view_permission'),(21,'Can add group',6,'add_group'),(22,'Can change group',6,'change_group'),(23,'Can delete group',6,'delete_group'),(24,'Can view group',6,'view_group'),(25,'Can add user',7,'add_user'),(26,'Can change user',7,'change_user'),(27,'Can delete user',7,'delete_user'),(28,'Can view user',7,'view_user'),(29,'Can add content type',8,'add_contenttype'),(30,'Can change content type',8,'change_contenttype'),(31,'Can delete content type',8,'delete_contenttype'),(32,'Can view content type',8,'view_contenttype'),(33,'Can add session',9,'add_session'),(34,'Can change session',9,'change_session'),(35,'Can delete session',9,'delete_session'),(36,'Can view session',9,'view_session'),(37,'Can add speaker',10,'add_speaker'),(38,'Can change speaker',10,'change_speaker'),(39,'Can delete speaker',10,'delete_speaker'),(40,'Can view speaker',10,'view_speaker'),(41,'Can add survey',11,'add_survey'),(42,'Can change survey',11,'change_survey'),(43,'Can delete survey',11,'delete_survey'),(44,'Can view survey',11,'view_survey');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `first_name` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_name` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(254) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dialects_audio`
--

DROP TABLE IF EXISTS `dialects_audio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dialects_audio` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `audio_path` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `case_id` bigint NOT NULL,
  `sentence_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dialects_audio_case_id_5e412869_fk_dialects_case_id` (`case_id`),
  KEY `dialects_audio_sentence_id_6d6615de_fk_dialects_sentence_id` (`sentence_id`),
  CONSTRAINT `dialects_audio_case_id_5e412869_fk_dialects_case_id` FOREIGN KEY (`case_id`) REFERENCES `dialects_case` (`id`),
  CONSTRAINT `dialects_audio_sentence_id_6d6615de_fk_dialects_sentence_id` FOREIGN KEY (`sentence_id`) REFERENCES `dialects_sentence` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialects_audio`
--

LOCK TABLES `dialects_audio` WRITE;
/*!40000 ALTER TABLE `dialects_audio` DISABLE KEYS */;
INSERT INTO `dialects_audio` VALUES (1,'user_1/2022-04-08-1.wav','2022-04-08 01:29:59.533412',1,1),(2,'user_1/2022-04-08-13.wav','2022-04-08 01:30:05.169098',1,13),(3,'user_1/2022-04-08-28.wav','2022-04-08 01:30:11.016547',1,28),(4,'user_1/2022-04-08-24.wav','2022-04-08 01:30:16.196789',1,24),(5,'user_1/2022-04-08-23.wav','2022-04-08 01:30:21.305194',1,23),(6,'user_3/2022-04-08-2.wav','2022-04-08 01:32:31.192149',3,2),(7,'user_3/2022-04-08-19.wav','2022-04-08 01:32:44.342714',3,19),(8,'user_3/2022-04-08-13.wav','2022-04-08 01:32:53.364143',3,13),(9,'user_3/2022-04-08-6.wav','2022-04-08 01:33:01.098408',3,6),(10,'user_3/2022-04-08-17.wav','2022-04-08 01:33:09.423080',3,17),(11,'user_4/2022-04-08-8.wav','2022-04-08 01:37:11.447059',4,8),(12,'user_4/2022-04-08-3.wav','2022-04-08 01:37:21.242911',4,3),(13,'user_4/2022-04-08-9.wav','2022-04-08 01:37:27.153852',4,9),(14,'user_4/2022-04-08-28.wav','2022-04-08 01:37:33.934385',4,28),(15,'user_4/2022-04-08-31.wav','2022-04-08 01:37:46.731664',4,31),(16,'user_5/2022-04-08-23.wav','2022-04-08 02:12:28.097237',5,23),(17,'user_5/2022-04-08-29.wav','2022-04-08 02:12:32.775992',5,29),(18,'user_5/2022-04-08-10.wav','2022-04-08 02:12:37.677498',5,10),(19,'user_5/2022-04-08-28.wav','2022-04-08 02:12:42.970619',5,28),(20,'user_5/2022-04-08-1.wav','2022-04-08 02:12:51.221094',5,1),(21,'user_7/2022-04-08-24.wav','2022-04-08 02:14:01.179882',7,24),(22,'user_7/2022-04-08-18.wav','2022-04-08 02:14:06.841758',7,18),(23,'user_7/2022-04-08-8.wav','2022-04-08 02:14:12.560690',7,8),(24,'user_7/2022-04-08-6.wav','2022-04-08 02:14:17.586759',7,6),(25,'user_7/2022-04-08-23.wav','2022-04-08 02:14:23.158510',7,23),(26,'user_9/2022-04-08-29.wav','2022-04-08 02:16:54.107550',9,29),(27,'user_9/2022-04-08-4.wav','2022-04-08 02:17:03.262466',9,4),(28,'user_9/2022-04-08-22.wav','2022-04-08 02:17:11.378899',9,22),(29,'user_8/2022-04-08-4.wav','2022-04-08 02:17:14.531163',8,4),(30,'user_9/2022-04-08-30.wav','2022-04-08 02:17:19.218115',9,30),(31,'user_9/2022-04-08-17.wav','2022-04-08 02:17:27.219475',9,17),(32,'user_8/2022-04-08-15.wav','2022-04-08 02:17:32.720787',8,15),(33,'user_10/2022-04-08-22.wav','2022-04-08 02:17:42.179714',10,22),(34,'user_10/2022-04-08-30.wav','2022-04-08 02:17:46.937946',10,30),(35,'user_8/2022-04-08-31.wav','2022-04-08 02:17:51.510554',8,31),(36,'user_10/2022-04-08-18.wav','2022-04-08 02:17:53.351499',10,18),(37,'user_10/2022-04-08-16.wav','2022-04-08 02:17:58.965107',10,16),(38,'user_10/2022-04-08-6.wav','2022-04-08 02:18:04.442131',10,6),(39,'user_8/2022-04-08-19.wav','2022-04-08 02:18:16.590432',8,19),(40,'user_8/2022-04-08-26.wav','2022-04-08 02:18:30.729216',8,26),(41,'user_12/2022-04-08-27.wav','2022-04-08 02:18:55.630093',12,27),(42,'user_11/2022-04-08-1.wav','2022-04-08 02:18:57.581574',11,1),(43,'user_11/2022-04-08-19.wav','2022-04-08 02:19:05.327725',11,19),(44,'user_12/2022-04-08-1.wav','2022-04-08 02:19:12.980865',12,1),(45,'user_11/2022-04-08-12.wav','2022-04-08 02:19:14.950018',11,12),(46,'user_12/2022-04-08-24.wav','2022-04-08 02:19:21.503638',12,24),(47,'user_11/2022-04-08-17.wav','2022-04-08 02:19:21.848756',11,17),(48,'user_11/2022-04-08-10.wav','2022-04-08 02:19:30.024990',11,10),(49,'user_12/2022-04-08-23.wav','2022-04-08 02:19:30.404558',12,23),(50,'user_12/2022-04-08-8.wav','2022-04-08 02:19:37.939745',12,8),(51,'user_14/2022-04-08-12.wav','2022-04-08 02:20:59.725483',14,12),(52,'user_14/2022-04-08-19.wav','2022-04-08 02:21:08.437135',14,19),(53,'user_14/2022-04-08-15.wav','2022-04-08 02:21:17.424935',14,15),(54,'user_14/2022-04-08-22.wav','2022-04-08 02:21:28.942145',14,22),(55,'user_14/2022-04-08-30.wav','2022-04-08 02:21:39.711013',14,30);
/*!40000 ALTER TABLE `dialects_audio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dialects_case`
--

DROP TABLE IF EXISTS `dialects_case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dialects_case` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nickname` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `image_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `result` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialects_case`
--

LOCK TABLES `dialects_case` WRITE;
/*!40000 ALTER TABLE `dialects_case` DISABLE KEYS */;
INSERT INTO `dialects_case` VALUES (1,'언호','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/1.png?alt=media&token=b5f46f88-9b11-4ddb-8ccc-e11257c03b63','강원 32	제주 25	충청 15'),(2,'이언호',NULL,NULL),(3,'이언호','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/3.png?alt=media&token=dd1564b9-bfb5-4ce0-b29d-d200ea5853d6','제주 31	강원 28	충청 18'),(4,'이효림','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/4.png?alt=media&token=bd64fe9c-29d7-4769-b370-528790d3a48e','제주 29	강원 26	충청 22'),(5,'213','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/5.png?alt=media&token=437a8d03-8353-4936-b83e-d133a0a0f96b','경상 25	전라 25	경기 23'),(6,'unho',NULL,NULL),(7,'unho','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/7.png?alt=media&token=2e889e22-41e6-4d57-9f7a-bc697b0a0527','경상 25	전라 25	경기 23'),(8,'나영','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/8.png?alt=media&token=bc987f6e-1227-466c-bf1e-b5d176d4e601','경기 26	경상 25	전라 24'),(9,'윤이','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/9.png?alt=media&token=8255a451-4f50-4363-8ccd-83c034bf6387','경기 28	경상 25	전라 23'),(10,'unho','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/10.png?alt=media&token=af3805d7-dc0a-4d94-b07a-70c961716f89','경상 25	전라 25	경기 23'),(11,'ㅎㅎ','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/11.png?alt=media&token=c0d843cd-5d0f-4488-8e02-17746d0f5301','경상 25	전라 25	경기 23'),(12,'니냐노','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/12.png?alt=media&token=c16f2db0-cec3-4b89-84c9-8312750d9308','경기 26	경상 25	전라 24'),(13,'가보좔고',NULL,NULL),(14,'갸보좔거','https://firebasestorage.googleapis.com/v0/b/practice-c18e9.appspot.com/o/14.png?alt=media&token=a072036e-41e5-4f9a-9974-21825fc07c9f','경기 27	경상 25	전라 23');
/*!40000 ALTER TABLE `dialects_case` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dialects_sentence`
--

DROP TABLE IF EXISTS `dialects_sentence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dialects_sentence` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sentence` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialects_sentence`
--

LOCK TABLES `dialects_sentence` WRITE;
/*!40000 ALTER TABLE `dialects_sentence` DISABLE KEYS */;
INSERT INTO `dialects_sentence` VALUES (1,'오늘 저녁에 가족들이랑 외식하기로 했는데 메뉴가 뭘지 너무 궁금해.'),(2,'나는 밤에 일찍 자고 아침에 일찍 일어나는 습관이 있어.'),(3,'밤에 모기가 날아다녀서 잠을 한숨도 못 잤어.'),(4,'내일까지 수학 숙제를 끝내야 하는데 너무 어려워서 걱정이다.'),(5,'오늘은 월급날이니까 고기는 내가 사줄게.'),(6,'선생님, 이거 어떻게 하는 거예요?'),(7,'방금 내 눈앞에서 정말 믿을 수 없는 일이 일어났어.'),(8,'세상에 네가 어떻게 나한테 이럴 수 있어!'),(9,'파티에서 입을 만한 예쁜 옷을 사러 갈 거야.'),(10,'힘든 금요일이 지나고 얼른 주말이 됐으면 좋겠다.'),(11,'이 말이 위로가 될지는 모르겠지만 앞으로는 좋은 일들이 생길거야.'),(12,'배도 고프고 잠도 오는데 얼마나 더 있어야 집에 가서 쉴 수 있지?'),(13,'대체 우리 집에서 무슨 짓을 했길래 온 집안이 난장판인거니!'),(14,'엄마가 집에 돌아오실 때까지 집을 깨끗하게 청소해서 기쁘게 해드려야지!'),(15,'요즘 딸기가 제철인데 가격이 너무 올라서 슬퍼.'),(16,'우리 주말에 호수 근처로 벚꽃 구경하러 갈까?'),(17,'나는 카페에 가면 늘 아이스 아메리카노를 시켜.'),(18,'김밥을 만들려면 어떤 재료가 필요하더라?'),(19,'기분이 울적할 때 난 즐거운 노래를 들으며 마음을 달래.'),(20,'힘들 땐 푹 쉬면서 치유하는 시간을 가지는 게 좋다고 생각해.'),(21,'넌 어릴 적에 무슨 티비 프로그램을 보며 자랐니?'),(22,'비가 주룩주룩 내리는 걸 보니 파전이 먹고 싶군.'),(23,'밖이 시끄러운 걸 보니 오늘 장이 서는 날인가보다.'),(24,'문구점에서 연필을 사고 지갑을 놔두고 와버렸어!'),(25,'오늘 벚꽃이 많이 피었던데 김밥을 싸서 소풍을 갈까?'),(26,'너는 오늘 저녁으로 피자가 좋아, 치킨이 좋아?'),(27,'나는 양념 치킨보다 후라이드 치킨이 좋아'),(28,'이번 휴가 때는 너와 함께 바다에 놀러 가고 싶어.'),(29,'오늘 월급을 받아서 기분이 너무 좋은데 맛있는 것 먹으러 갈까?'),(30,'열심히 공부해서 멋진 개발자가 될 거야.'),(31,'지금 주문이 밀려 있어서 10분 정도 기다리셔야 하는 데 괜찮으세요?');
/*!40000 ALTER TABLE `dialects_sentence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dialects_survey`
--

DROP TABLE IF EXISTS `dialects_survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dialects_survey` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `gender` smallint NOT NULL,
  `age` smallint NOT NULL,
  `born_in` smallint NOT NULL,
  `lived_in` smallint NOT NULL,
  `case_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dialects_survey_case_id_f3896541_fk_dialects_case_id` (`case_id`),
  CONSTRAINT `dialects_survey_case_id_f3896541_fk_dialects_case_id` FOREIGN KEY (`case_id`) REFERENCES `dialects_case` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialects_survey`
--

LOCK TABLES `dialects_survey` WRITE;
/*!40000 ALTER TABLE `dialects_survey` DISABLE KEYS */;
INSERT INTO `dialects_survey` VALUES (1,0,20,1,1,2),(2,0,20,1,1,3),(3,1,20,5,5,8),(4,1,20,5,5,12);
/*!40000 ALTER TABLE `dialects_survey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  `object_repr` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `model` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (4,'admin','logentry'),(6,'auth','group'),(5,'auth','permission'),(7,'auth','user'),(8,'contenttypes','contenttype'),(1,'dialects','audio'),(3,'dialects','case'),(2,'dialects','sentence'),(10,'dialects','speaker'),(11,'dialects','survey'),(9,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-03-28 13:16:55.992766'),(2,'auth','0001_initial','2022-03-28 13:16:56.982325'),(3,'admin','0001_initial','2022-03-28 13:16:57.229156'),(4,'admin','0002_logentry_remove_auto_add','2022-03-28 13:16:57.253525'),(5,'admin','0003_logentry_add_action_flag_choices','2022-03-28 13:16:57.274591'),(6,'contenttypes','0002_remove_content_type_name','2022-03-28 13:16:57.455247'),(7,'auth','0002_alter_permission_name_max_length','2022-03-28 13:16:57.570312'),(8,'auth','0003_alter_user_email_max_length','2022-03-28 13:16:57.680394'),(9,'auth','0004_alter_user_username_opts','2022-03-28 13:16:57.701144'),(10,'auth','0005_alter_user_last_login_null','2022-03-28 13:16:57.793085'),(11,'auth','0006_require_contenttypes_0002','2022-03-28 13:16:57.807856'),(12,'auth','0007_alter_validators_add_error_messages','2022-03-28 13:16:57.828751'),(13,'auth','0008_alter_user_username_max_length','2022-03-28 13:16:57.933132'),(14,'auth','0009_alter_user_last_name_max_length','2022-03-28 13:16:58.037990'),(15,'auth','0010_alter_group_name_max_length','2022-03-28 13:16:58.139423'),(16,'auth','0011_update_proxy_permissions','2022-03-28 13:16:58.170398'),(17,'auth','0012_alter_user_first_name_max_length','2022-03-28 13:16:58.273423'),(18,'dialects','0001_initial','2022-03-28 13:16:58.584101'),(19,'sessions','0001_initial','2022-03-28 13:16:58.670566'),(20,'dialects','0002_speaker','2022-04-04 07:02:44.094160'),(21,'dialects','0002_survey','2022-04-04 08:45:16.336161');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `session_data` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'maldeutggu'
--

--
-- Dumping routines for database 'maldeutggu'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 11:25:18
