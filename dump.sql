-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: sys
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AUTHORS`
--

DROP TABLE IF EXISTS `AUTHORS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AUTHORS` (
  `book_id` int(11) NOT NULL,
  `author_name` varchar(45) DEFAULT NULL,
  KEY `fk_AUTHORS_1_idx` (`book_id`),
  CONSTRAINT `fk_AUTHORS_1` FOREIGN KEY (`book_id`) REFERENCES `BOOKS` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AUTHORS`
--

LOCK TABLES `AUTHORS` WRITE;
/*!40000 ALTER TABLE `AUTHORS` DISABLE KEYS */;
INSERT INTO `AUTHORS` VALUES (37,'Dk'),(37,'Lk'),(38,'Dk'),(38,'Lk'),(39,'Ufjdj');
/*!40000 ALTER TABLE `AUTHORS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BOOKS`
--

DROP TABLE IF EXISTS `BOOKS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BOOKS` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `subject` varchar(45) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `college` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `bookCondition` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOKS`
--

LOCK TABLES `BOOKS` WRITE;
/*!40000 ALTER TABLE `BOOKS` DISABLE KEYS */;
INSERT INTO `BOOKS` VALUES (1,3,'Maths',4,'Engineering Mathematics-4','PES','2019-04-05','good'),(2,2,'Maths',3,'Engineering Mathematics-3','PES','2019-04-15','good'),(3,2,'Physics',2,'Engineering Physics','PES','2019-06-15','bad'),(4,1,'Physics',2,'Engineering Physics','PES','2019-06-15','good'),(5,2,'Chemistry',1,'Engineering Chemistry','BMSCE','2019-01-01','bad'),(6,11,'OOMD',3,'OOMD','PES','2019-02-02','good'),(8,3,'Maths',3,'Bla','PES','2019-01-01','bad'),(11,5,'Physics',3,'Second','PES','2019-10-22','good'),(15,2,'OOMD',5,'OOMD-1','PES','2019-12-12','good'),(37,26,'Maths',1,'TEST3','PES','2019-10-29','good'),(38,26,'Maths',1,'TEST3','PES','2019-10-29','good'),(39,29,'Chemistry',5,'Hshw','PES','2019-10-30','good');
/*!40000 ALTER TABLE `BOOKS` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sys`.`BOOKS_BEFORE_INSERT` BEFORE INSERT ON `BOOKS` FOR EACH ROW
BEGIN
	UPDATE sys.USERS
    SET no_of_lends = no_of_lends + 1
    where usn = new.userid;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sys`.`BOOKS_AFTER_INSERT` AFTER INSERT ON `BOOKS` FOR EACH ROW
BEGIN
	SET SQL_SAFE_UPDATES = 0;
	UPDATE sys.STATS
    SET no_of_lends = no_of_lends + 1;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `HISTORY`
--

DROP TABLE IF EXISTS `HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HISTORY` (
  `book_id` int(11) DEFAULT NULL,
  `borrow_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HISTORY`
--

LOCK TABLES `HISTORY` WRITE;
/*!40000 ALTER TABLE `HISTORY` DISABLE KEYS */;
INSERT INTO `HISTORY` VALUES (32,'2019-10-24'),(31,'2019-10-24'),(25,'2019-10-26'),(26,'2019-10-26'),(27,'2019-10-26'),(28,'2019-10-28'),(29,'2019-10-28'),(32,'2019-10-29'),(31,'2019-10-29'),(30,'2019-10-29'),(33,'2019-10-29'),(34,'2019-10-29'),(35,'2019-10-29'),(36,'2019-10-29'),(39,'2019-10-29'),(40,'2019-10-29'),(40,'2019-10-30'),(41,'2019-10-30');
/*!40000 ALTER TABLE `HISTORY` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sys`.`HISTORY_AFTER_INSERT` AFTER INSERT ON `HISTORY` FOR EACH ROW
BEGIN
	SET SQL_SAFE_UPDATES = 0;
	UPDATE sys.STATS
    SET no_of_borrows = no_of_borrows + 1;
	delete from BOOKS where BOOKS.book_id = new.book_id; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `STATS`
--

DROP TABLE IF EXISTS `STATS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STATS` (
  `no_of_lends` int(11) NOT NULL,
  `no_of_borrows` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STATS`
--

LOCK TABLES `STATS` WRITE;
/*!40000 ALTER TABLE `STATS` DISABLE KEYS */;
INSERT INTO `STATS` VALUES (35,32);
/*!40000 ALTER TABLE `STATS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERS` (
  `usn` int(11) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `college` varchar(45) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `no_of_lends` int(11) DEFAULT '0',
  PRIMARY KEY (`usn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (1,'ak','Akshat','PES',5,0),(2,'pk','Prachi','PES',5,0),(3,'e2bc0b337ab3afce5c6616d001d373a4','Dk','PES',5,0),(4,'e2bc0b337ab3afce5c6616d001d373a4','Akshat','PES',1,14),(5,'e2bc0b337ab3afce5c6616d001d373a4','Pro','PES',1,0),(6,'e2bc0b337ab3afce5c6616d001d373a4','bla','PES',3,0),(16,'e2bc0b337ab3afce5c6616d001d373a4','Akshat','PES',5,2),(17,'e2bc0b337ab3afce5c6616d001d373a4','Ananth','PES',5,0),(26,'e2bc0b337ab3afce5c6616d001d373a4','Kevin','PES',5,2),(29,'9d5fdceb44317eac4c09c9b3c5f57ea1','Atul','PES',5,1);
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;
