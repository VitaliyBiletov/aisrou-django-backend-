-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: aisrouDB
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_panel_customuser`
--

DROP TABLE IF EXISTS `admin_panel_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_panel_customuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `patronymic` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_panel_customuser`
--

LOCK TABLES `admin_panel_customuser` WRITE;
/*!40000 ALTER TABLE `admin_panel_customuser` DISABLE KEYS */;
INSERT INTO `admin_panel_customuser` VALUES (1,'pbkdf2_sha256$260000$NtuijZb43pDn7H2V9GWbue$eXXPYyvTqw/8LaYOsBJJWmZfdOZDSgr0BXTZixFy05w=','2021-09-08 20:08:31.015754',1,'admin','','','admin@yandex.ru',1,1,'2021-08-19 07:40:51.752699',NULL),(2,'pbkdf2_sha256$260000$SNhCuVxesdEO6KX9KqbZZC$CJAtMIUf/XmPqq0m5nzszvSJOIPSF0XKXwcNhQz9ew8=','2021-09-08 18:33:48.669684',0,'belova','Екатерина','Белова','belova@yandex.ru',0,1,'2021-08-19 07:41:47.857471','Дмитриевна');
/*!40000 ALTER TABLE `admin_panel_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_panel_customuser_groups`
--

DROP TABLE IF EXISTS `admin_panel_customuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_panel_customuser_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customuser_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_panel_customuser_g_customuser_id_group_id_eaf89523_uniq` (`customuser_id`,`group_id`),
  KEY `admin_panel_customuser_groups_group_id_740be9b0_fk_auth_group_id` (`group_id`),
  CONSTRAINT `admin_panel_customus_customuser_id_4bcc4c73_fk_admin_pan` FOREIGN KEY (`customuser_id`) REFERENCES `admin_panel_customuser` (`id`),
  CONSTRAINT `admin_panel_customuser_groups_group_id_740be9b0_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_panel_customuser_groups`
--

LOCK TABLES `admin_panel_customuser_groups` WRITE;
/*!40000 ALTER TABLE `admin_panel_customuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_panel_customuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_panel_customuser_user_permissions`
--

DROP TABLE IF EXISTS `admin_panel_customuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_panel_customuser_user_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customuser_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_panel_customuser_u_customuser_id_permission_6a44efbe_uniq` (`customuser_id`,`permission_id`),
  KEY `admin_panel_customus_permission_id_c7c49e0a_fk_auth_perm` (`permission_id`),
  CONSTRAINT `admin_panel_customus_customuser_id_b3fb6379_fk_admin_pan` FOREIGN KEY (`customuser_id`) REFERENCES `admin_panel_customuser` (`id`),
  CONSTRAINT `admin_panel_customus_permission_id_c7c49e0a_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_panel_customuser_user_permissions`
--

LOCK TABLES `admin_panel_customuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `admin_panel_customuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_panel_customuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_panel_logogroups`
--

DROP TABLE IF EXISTS `admin_panel_logogroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_panel_logogroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custom_user_id` int DEFAULT NULL,
  `pupil_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_panel_logogrou_custom_user_id_129fddc8_fk_admin_pan` (`custom_user_id`),
  KEY `admin_panel_logogroups_pupil_id_967d08a4_fk_admin_panel_pupil_id` (`pupil_id`),
  CONSTRAINT `admin_panel_logogrou_custom_user_id_129fddc8_fk_admin_pan` FOREIGN KEY (`custom_user_id`) REFERENCES `admin_panel_customuser` (`id`),
  CONSTRAINT `admin_panel_logogroups_pupil_id_967d08a4_fk_admin_panel_pupil_id` FOREIGN KEY (`pupil_id`) REFERENCES `admin_panel_pupil` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_panel_logogroups`
--

LOCK TABLES `admin_panel_logogroups` WRITE;
/*!40000 ALTER TABLE `admin_panel_logogroups` DISABLE KEYS */;
INSERT INTO `admin_panel_logogroups` VALUES (2,2,1),(4,2,2);
/*!40000 ALTER TABLE `admin_panel_logogroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_panel_pupil`
--

DROP TABLE IF EXISTS `admin_panel_pupil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_panel_pupil` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `date` date NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `home_address` varchar(100) DEFAULT NULL,
  `class_number` int DEFAULT NULL,
  `enrollment_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_panel_pupil`
--

LOCK TABLES `admin_panel_pupil` WRITE;
/*!40000 ALTER TABLE `admin_panel_pupil` DISABLE KEYS */;
INSERT INTO `admin_panel_pupil` VALUES (1,'Иванов','Иван','Сергеевич','2021-08-19','2001-09-12','ул.Октябрьская, д.63, кв.10',0,'2021-09-01'),(2,'Петров','Петр','Сергеевич','2021-08-25','1991-09-12','ул.Октябрьская, д.63, кв.10',1,'2021-08-25');
/*!40000 ALTER TABLE `admin_panel_pupil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add Диагностика',6,'add_diagnostics'),(22,'Can change Диагностика',6,'change_diagnostics'),(23,'Can delete Диагностика',6,'delete_diagnostics'),(24,'Can view Диагностика',6,'view_diagnostics'),(25,'Can add Состояние функций',7,'add_statesoffunctions'),(26,'Can change Состояние функций',7,'change_statesoffunctions'),(27,'Can delete Состояние функций',7,'delete_statesoffunctions'),(28,'Can view Состояние функций',7,'view_statesoffunctions'),(29,'Can add Сенсо-моторный уровень',8,'add_sensomotorlevel'),(30,'Can change Сенсо-моторный уровень',8,'change_sensomotorlevel'),(31,'Can delete Сенсо-моторный уровень',8,'delete_sensomotorlevel'),(32,'Can view Сенсо-моторный уровень',8,'view_sensomotorlevel'),(33,'Can add user',9,'add_customuser'),(34,'Can change user',9,'change_customuser'),(35,'Can delete user',9,'delete_customuser'),(36,'Can view user',9,'view_customuser'),(37,'Can add Ученик',10,'add_pupil'),(38,'Can change Ученик',10,'change_pupil'),(39,'Can delete Ученик',10,'delete_pupil'),(40,'Can view Ученик',10,'view_pupil'),(41,'Can add Логопедическая группа',11,'add_logogroups'),(42,'Can change Логопедическая группа',11,'change_logogroups'),(43,'Can delete Логопедическая группа',11,'delete_logogroups'),(44,'Can view Логопедическая группа',11,'view_logogroups');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
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
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_admin_panel_customuser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_admin_panel_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `admin_panel_customuser` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2021-08-19 07:43:59.400466','1','LogoGroups object (1)',1,'[{\"added\": {}}]',11,1),(2,'2021-08-23 09:06:30.590105','3','LogoGroups object (3)',3,'',11,1),(3,'2021-08-25 08:53:53.445250','2','Петров Петр',1,'[{\"added\": {}}]',10,1),(4,'2021-08-25 08:53:56.924289','4','LogoGroups object (4)',1,'[{\"added\": {}}]',11,1),(5,'2021-08-26 07:23:08.518857','9','9',3,'',6,1),(6,'2021-08-27 07:05:08.632057','19','SensoMotorLevel object (19)',2,'[{\"changed\": {\"fields\": [\"\\u0424\\u043e\\u043d\\u0435\\u043c\\u0430\\u0442\\u0438\\u0447\\u0435\\u0441\\u043a\\u043e\\u0435 \\u0432\\u043e\\u0441\\u043f\\u0440\\u0438\\u0442\\u044f\\u0442\\u0438\\u0435\"]}}]',8,1),(7,'2021-08-27 07:05:44.034678','18','SensoMotorLevel object (18)',2,'[{\"changed\": {\"fields\": [\"\\u0424\\u043e\\u043d\\u0435\\u043c\\u0430\\u0442\\u0438\\u0447\\u0435\\u0441\\u043a\\u043e\\u0435 \\u0432\\u043e\\u0441\\u043f\\u0440\\u0438\\u0442\\u044f\\u0442\\u0438\\u0435\"]}}]',8,1),(8,'2021-08-27 07:05:55.494915','17','SensoMotorLevel object (17)',2,'[{\"changed\": {\"fields\": [\"\\u0424\\u043e\\u043d\\u0435\\u043c\\u0430\\u0442\\u0438\\u0447\\u0435\\u0441\\u043a\\u043e\\u0435 \\u0432\\u043e\\u0441\\u043f\\u0440\\u0438\\u0442\\u044f\\u0442\\u0438\\u0435\"]}}]',8,1),(9,'2021-08-27 07:05:59.804379','16','SensoMotorLevel object (16)',2,'[{\"changed\": {\"fields\": [\"\\u0424\\u043e\\u043d\\u0435\\u043c\\u0430\\u0442\\u0438\\u0447\\u0435\\u0441\\u043a\\u043e\\u0435 \\u0432\\u043e\\u0441\\u043f\\u0440\\u0438\\u0442\\u044f\\u0442\\u0438\\u0435\"]}}]',8,1),(10,'2021-08-27 07:08:51.040234','19','SensoMotorLevel object (19)',2,'[{\"changed\": {\"fields\": [\"\\u0424\\u043e\\u043d\\u0435\\u043c\\u0430\\u0442\\u0438\\u0447\\u0435\\u0441\\u043a\\u043e\\u0435 \\u0432\\u043e\\u0441\\u043f\\u0440\\u0438\\u0442\\u044f\\u0442\\u0438\\u0435\"]}}]',8,1),(11,'2021-09-06 20:46:15.444469','44','44',3,'',6,1),(12,'2021-09-06 20:46:15.449684','43','43',3,'',6,1),(13,'2021-09-06 20:46:15.454477','42','42',3,'',6,1),(14,'2021-09-06 20:46:15.459325','41','41',3,'',6,1),(15,'2021-09-06 20:46:15.464764','40','40',3,'',6,1),(16,'2021-09-06 20:46:15.469684','39','39',3,'',6,1),(17,'2021-09-06 20:46:15.474268','38','38',3,'',6,1),(18,'2021-09-06 20:46:15.479017','37','37',3,'',6,1),(19,'2021-09-06 20:46:15.486959','36','36',3,'',6,1),(20,'2021-09-06 20:46:15.494014','35','35',3,'',6,1),(21,'2021-09-06 20:46:15.498654','34','34',3,'',6,1),(22,'2021-09-06 20:46:15.503259','33','33',3,'',6,1),(23,'2021-09-06 20:46:15.507710','32','32',3,'',6,1),(24,'2021-09-06 20:46:15.512689','31','31',3,'',6,1),(25,'2021-09-06 20:46:15.517545','30','30',3,'',6,1),(26,'2021-09-06 20:46:15.525007','29','29',3,'',6,1),(27,'2021-09-06 20:46:15.536649','24','24',3,'',6,1),(28,'2021-09-06 20:46:15.547827','23','23',3,'',6,1),(29,'2021-09-06 20:46:15.559632','22','22',3,'',6,1),(30,'2021-09-06 20:46:15.567190','21','21',3,'',6,1),(31,'2021-09-06 20:46:15.574810','20','20',3,'',6,1),(32,'2021-09-06 20:46:15.580964','19','19',3,'',6,1),(33,'2021-09-06 20:46:15.588400','18','18',3,'',6,1),(34,'2021-09-06 20:46:15.595017','17','17',3,'',6,1),(35,'2021-09-06 21:57:47.976727','61','61',3,'',6,1),(36,'2021-09-06 21:57:47.982030','60','60',3,'',6,1),(37,'2021-09-06 21:57:47.987017','59','59',3,'',6,1),(38,'2021-09-06 21:57:47.991716','58','58',3,'',6,1),(39,'2021-09-06 21:57:47.996730','57','57',3,'',6,1),(40,'2021-09-06 21:57:48.001562','56','56',3,'',6,1),(41,'2021-09-06 21:57:48.006436','55','55',3,'',6,1),(42,'2021-09-06 21:57:48.011305','54','54',3,'',6,1),(43,'2021-09-06 21:57:48.015998','53','53',3,'',6,1),(44,'2021-09-06 21:57:48.021121','52','52',3,'',6,1),(45,'2021-09-06 21:57:48.028567','51','51',3,'',6,1),(46,'2021-09-06 21:57:48.033856','50','50',3,'',6,1),(47,'2021-09-06 21:57:48.039790','49','49',3,'',6,1),(48,'2021-09-06 21:57:48.045792','48','48',3,'',6,1),(49,'2021-09-06 21:57:48.053723','47','47',3,'',6,1),(50,'2021-09-06 21:57:48.062204','46','46',3,'',6,1),(51,'2021-09-06 21:57:48.071421','16','16',3,'',6,1),(52,'2021-09-06 22:40:26.329817','68','SensoMotorLevel object (68)',3,'',8,1),(53,'2021-09-06 22:40:26.336469','67','SensoMotorLevel object (67)',3,'',8,1),(54,'2021-09-06 22:40:26.344014','66','SensoMotorLevel object (66)',3,'',8,1),(55,'2021-09-06 22:40:26.348718','65','SensoMotorLevel object (65)',3,'',8,1),(56,'2021-09-06 22:40:26.356479','64','SensoMotorLevel object (64)',3,'',8,1),(57,'2021-09-06 22:40:26.368871','63','SensoMotorLevel object (63)',3,'',8,1),(58,'2021-09-06 22:40:26.377611','62','SensoMotorLevel object (62)',3,'',8,1),(59,'2021-09-06 23:27:50.792554','76','76',3,'',6,1),(60,'2021-09-06 23:27:50.796549','75','75',3,'',6,1),(61,'2021-09-06 23:27:50.801409','74','74',3,'',6,1),(62,'2021-09-06 23:27:50.805320','73','73',3,'',6,1),(63,'2021-09-06 23:27:50.809561','72','72',3,'',6,1),(64,'2021-09-06 23:27:50.822293','71','71',3,'',6,1),(65,'2021-09-06 23:27:50.826368','70','70',3,'',6,1),(66,'2021-09-06 23:27:50.829966','69','69',3,'',6,1),(67,'2021-09-06 23:27:50.835164','68','68',3,'',6,1),(68,'2021-09-06 23:27:50.840188','67','67',3,'',6,1),(69,'2021-09-06 23:27:50.844413','66','66',3,'',6,1),(70,'2021-09-06 23:27:50.848380','65','65',3,'',6,1),(71,'2021-09-06 23:27:50.852391','64','64',3,'',6,1),(72,'2021-09-06 23:27:50.856886','63','63',3,'',6,1),(73,'2021-09-06 23:27:50.862722','62','62',3,'',6,1);
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
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(9,'admin_panel','customuser'),(11,'admin_panel','logogroups'),(10,'admin_panel','pupil'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(6,'main','diagnostics'),(8,'main','sensomotorlevel'),(7,'main','statesoffunctions'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2021-08-19 07:40:34.083017'),(2,'contenttypes','0002_remove_content_type_name','2021-08-19 07:40:34.174666'),(3,'auth','0001_initial','2021-08-19 07:40:34.538588'),(4,'auth','0002_alter_permission_name_max_length','2021-08-19 07:40:34.619012'),(5,'auth','0003_alter_user_email_max_length','2021-08-19 07:40:34.631839'),(6,'auth','0004_alter_user_username_opts','2021-08-19 07:40:34.644388'),(7,'auth','0005_alter_user_last_login_null','2021-08-19 07:40:34.656492'),(8,'auth','0006_require_contenttypes_0002','2021-08-19 07:40:34.671428'),(9,'auth','0007_alter_validators_add_error_messages','2021-08-19 07:40:34.690155'),(10,'auth','0008_alter_user_username_max_length','2021-08-19 07:40:34.700569'),(11,'auth','0009_alter_user_last_name_max_length','2021-08-19 07:40:34.713161'),(12,'auth','0010_alter_group_name_max_length','2021-08-19 07:40:34.738828'),(13,'auth','0011_update_proxy_permissions','2021-08-19 07:40:34.752723'),(14,'auth','0012_alter_user_first_name_max_length','2021-08-19 07:40:34.766672'),(15,'admin_panel','0001_initial','2021-08-19 07:40:35.333890'),(16,'admin','0001_initial','2021-08-19 07:40:35.515127'),(17,'admin','0002_logentry_remove_auto_add','2021-08-19 07:40:35.534162'),(18,'admin','0003_logentry_add_action_flag_choices','2021-08-19 07:40:35.549570'),(19,'admin_panel','0002_pupil_date_of_birth','2021-08-19 07:40:35.585814'),(20,'admin_panel','0003_pupil_home_address','2021-08-19 07:40:35.620228'),(21,'admin_panel','0004_auto_20210603_1216','2021-08-19 07:40:35.677613'),(22,'main','0001_initial','2021-08-19 07:40:35.733450'),(23,'main','0002_delete_articulatorymotorskills','2021-08-19 07:40:35.751316'),(24,'main','0003_diagnostics_pupil_id','2021-08-19 07:40:35.815237'),(25,'main','0004_auto_20210528_1642','2021-08-19 07:40:35.898342'),(26,'main','0005_auto_20210528_1653','2021-08-19 07:40:35.925287'),(27,'main','0006_statesoffunctions','2021-08-19 07:40:36.026877'),(28,'main','0007_auto_20210603_1216','2021-08-19 07:40:36.591404'),(29,'main','0008_auto_20210603_1219','2021-08-19 07:40:37.134542'),(30,'main','0009_auto_20210603_1220','2021-08-19 07:40:37.316993'),(31,'main','0010_auto_20210603_1236','2021-08-19 07:40:37.338025'),(32,'main','0011_diagnostics_current_class','2021-08-19 07:40:37.386220'),(33,'main','0012_auto_20210607_1203','2021-08-19 07:40:37.539059'),(34,'main','0013_auto_20210704_2249','2021-08-19 07:40:38.055795'),(35,'main','0014_auto_20210704_2251','2021-08-19 07:40:38.221978'),(36,'main','0015_sensomotorlevel','2021-08-19 07:40:38.408855'),(37,'main','0016_remove_statesoffunctions_additional_information','2021-08-19 07:40:38.501208'),(38,'main','0017_statesoffunctions_additional_information','2021-08-19 07:40:38.563986'),(39,'main','0018_auto_20210813_2214','2021-08-19 07:40:38.630613'),(40,'main','0019_auto_20210813_2215','2021-08-19 07:40:39.401939'),(41,'sessions','0001_initial','2021-08-19 07:40:39.511982'),(42,'main','0020_alter_sensomotorlevel_phonemic_perception','2021-08-27 06:37:06.514679'),(43,'main','0021_alter_sensomotorlevel_phonemic_perception','2021-08-27 06:38:39.610888'),(44,'main','0022_alter_sensomotorlevel_phonemic_perception','2021-08-27 07:06:06.296789'),(45,'main','0023_alter_sensomotorlevel_phonemic_perception','2021-08-27 07:09:03.052716'),(46,'main','0024_alter_sensomotorlevel_sound_pronunciation','2021-09-06 17:31:20.639532'),(47,'main','0025_alter_sensomotorlevel_phonemic_perception','2021-09-06 17:31:20.651827'),(48,'main','0026_alter_sensomotorlevel_phonemic_perception','2021-09-06 17:31:20.664615'),(49,'main','0027_alter_sensomotorlevel_phonemic_perception','2021-09-06 22:16:28.319775'),(50,'main','0028_sensomotorlevel_articulatory_motor','2021-09-08 20:05:01.204255');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('0211hk3qwqvbkk9etbrv0wt2icc2k4zj','.eJxVjDsOwjAQBe_iGllZr_HGlPQ5g-Xf4gCypTipEHeHSCmgfTPzXsL5bS1u63lxcxIXAeL0uwUfH7nuIN19vTUZW12XOchdkQftcmopP6-H-3dQfC_f2ujECOAH5JHIkoIhgbI6MhmNYEbwzPoMVhmLASmohNoExqiQOGbx_gCwYTbn:1mGdXV:MLn07uoXLRMl8kCgTzOfByrsU-PDzvYzU85JZvMHfZY','2021-09-02 08:36:41.126213'),('0tzcyi62hc6wktxrcz247j2bsybt8r12','.eJxVjk0OwiAQhe_C2hAgUKhL956hGYZpixowhS4a492lpgtdvr8v78UGWOs8rIWWIQZ2Zoqdfj0PeKe0B-EGacocc6pL9Hyv8CMt_JoDPS5H9w8wQ5nbegRjrRcjGafRW5QQtNSWyHQOlZLa2N4HJ0TvmgAtUaPppAuGUItxh9btSY2EC0GlpkOEKeVSI36fK_H-AEcdQyM:1mMxKu:xoTblzS5bMk2W-t9_kJ4p0-KAZOYjC7n-GGdTLKa9F4','2021-09-19 18:57:48.060628'),('37mom5cvppaxi9ww12aa9y828vycmk9d','.eJxVjDsOwjAQBe_iGllZr_HGlPQ5g-Xf4gCypTipEHeHSCmgfTPzXsL5bS1u63lxcxIXAeL0uwUfH7nuIN19vTUZW12XOchdkQftcmopP6-H-3dQfC_f2ujECOAH5JHIkoIhgbI6MhmNYEbwzPoMVhmLASmohNoExqiQOGbx_gCwYTbn:1mJVR7:hBXqvzidRz6ULq_mfypLjuWdRjXk-kwTonHwx9hAqZE','2021-09-10 06:33:57.730834'),('4nbt9neimtwbygzt39iqfz4t0w9klr8k','.eJxVjrEOgzAQQ_8lcxUl6EJCx-79BnS5OyBtlUgEJtR_L6gM7Wj72fKmelyXqV-rzH1idVWNuvx6Eekp-Qj4gXksmkpe5hT1gegzrfpeWF63k_0bmLBOe3tA5300g7gAFD1ZZLDgRVwbqGksON9FDsZ0YRcIloBcawM7ITDDMcoJx1zqkuj71Hfq_QG_Gj5R:1mO3y9:tKfx1uiM1l2wQe3rudZDzgbgs68gulFkHeGPwMiwTOs','2021-09-22 20:14:53.616073'),('5fs58zoltenoefant14c4vf84hkqier8','.eJxVjk0OwiAQhe_C2hCmgYIu3XuGZhimLWrAFLowxrtLTRe6fH9f3ksMuNZ5WAsvQwziJDpx-PU80o3TFoQrpilLyqku0cutIve0yEsOfD_v3T_AjGVu6xGNtV6NbJwmbwkwaNCW2fSOug60sUcfnFJH1wRqIE2mBxcMk1bjBq3PBzcSLYyVmw4Rp5RLjfR9DvD-AEccQyM:1mIpU6:UXGNUzgJ22TMbgDxT4DCRj_8M7Dm49ucF7kk2UW6_9Y','2021-09-08 09:46:14.361835'),('5ka9lm35eplpa2d48cbwy8ecq1z0zf01','.eJxVjk0OwiAQhe_C2jRAoKBL956hGWamLWrAFLowxrtLTRe6fH9f3ksMsNZ5WAsvQyRxElocfr0AeOO0BXSFNOUOc6pLDN1W6fa0dJdMfD_v3T_ADGVu6xGsc0GObL3B4FABGWUcs-09aq2MdcdAXsqjbwKMQoO2V54so5HjBq3PBzcSU6xNUYQp5VIjfn9r-f4AvjhCVQ:1mMyX7:P1wQ-rnvGeQOc7_c7j290NZKogM324zkXJ6lR4Jof6Y','2021-09-19 20:14:29.827383'),('cb9oq9aui1s6s4r7110awbp2ak5ten9d','.eJxVjDsOwjAQBe_iGllZr_HGlPQ5g-Xf4gCypTipEHeHSCmgfTPzXsL5bS1u63lxcxIXAeL0uwUfH7nuIN19vTUZW12XOchdkQftcmopP6-H-3dQfC_f2ujECOAH5JHIkoIhgbI6MhmNYEbwzPoMVhmLASmohNoExqiQOGbx_gCwYTbn:1mJWl2:spq3E0bfDRFUjJIx0IiUf3isec5Ed1NtCnUIPnMZe_Y','2021-09-10 07:58:36.876775'),('fxfnetuqgufh0cxbjw1kxhtkgi87dbs4','.eJxVjk0OwiAQhe_C2hBooKBL956hGWamLWrAFLowxrtLTRe6fH9f3ksMsNZ5WAsvQyRxEp04_HoB8MZpC-gKacoSc6pLDHKryD0t8pKJ7-e9-weYocxtPYJ1LqiRrTcYHGogo41jtr3HrtPGumMgr9TRNwFGo0Hba0-W0ahxg9bngxsJF4bKTVOEKeVSI36fu_cHBFFC-A:1mIT9r:kbHhRXxeoiuvPdlC9tBrfc_6BSyvkZ6brFMSkvSrTfk','2021-09-07 09:55:51.969924'),('h28ah4u12fez9vj8wyw217lq996sj2xe','.eJxVjDsOwjAQBe_iGllZr_HGlPQ5g-Xf4gCypTipEHeHSCmgfTPzXsL5bS1u63lxcxIXAeL0uwUfH7nuIN19vTUZW12XOchdkQftcmopP6-H-3dQfC_f2ujECOAH5JHIkoIhgbI6MhmNYEbwzPoMVhmLASmohNoExqiQOGbx_gCwYTbn:1mO3rz:iyyTfH22VskVHCRzWmJMhawDdenCK7UiMTNVYFUDJhA','2021-09-22 20:08:31.021995'),('i485wga1cqlgtnap6cq4v62kx72sgtm8','.eJxVjk0OwiAQhe_C2hBooFCX7j1DM8xMLWrAFLowxrtLTRe6fH9f3kuMsNZ5XAsvYyRxFJ04_HoB8MZpC-gK6ZIl5lSXGORWkXta5DkT30979w8wQ5nbegLrXFATW28wONRARhvHbHuPXaeNdUMgr9TgmwCj0aDttSfLaNS0QevzwY3EFGtTFOGScqkRv7_18P4AvkdCXQ:1mJX7q:dvzKEt735-SRvAORe7sk0rYh8z2g7v1nv69jOlSGAW4','2021-09-10 08:22:10.427177'),('lxhor2e2kfkgbnrdbtk1l54jsys19zad','.eJxVjDsOwjAQBe_iGllZr_HGlPQ5g-Xf4gCypTipEHeHSCmgfTPzXsL5bS1u63lxcxIXAeL0uwUfH7nuIN19vTUZW12XOchdkQftcmopP6-H-3dQfC_f2ujECOAH5JHIkoIhgbI6MhmNYEbwzPoMVhmLASmohNoExqiQOGbx_gCwYTbn:1mNIXl:S3GZHyTcqmqnL3BkKd5VZRZ2_Wxa94vyL8TZFfalYkc','2021-09-20 17:36:29.160428'),('pz7gs576tvey21asguwi7yszi0sltjum','.eJxVjEsOwjAMRO-SNYqSyG5Sluw5Q-TYLimgVupnVXF3WqkLWM68N7OZTOtS8zrrlHsxVxPM5bcrxC8dDiBPGh6j5XFYpr7YQ7Enne19FH3fTvfvoNJc93VHGGNxnWICLpE9CXiIqtgkDsEDxrZIcq5NeyDwDIyNT4LK4Doxny_i7jei:1mI5ux:lA6Nvxrqcl5q3wT4pB7v_npnt_vBSz5irSHmrGlH8BI','2021-09-06 09:06:55.549598'),('s2x0gskd95ly5jlkk5u7nyydf2hkid1p','.eJxVjk0OwiAQhe_C2hBooKBL956hGWamLWrAFLowxrtLTRe6fH9f3ksMsNZ5WAsvQyRxEp04_HoB8MZpC-gKacoSc6pLDHKryD0t8pKJ7-e9-weYocxtPYJ1LqiRrTcYHGogo41jtr3HrtPGumMgr9TRNwFGo0Hba0-W0ahxg9bngxuJKdamKMKUcqkRv7-1f38AvkVCXA:1mJYLa:UGg0JoEvNOu7alcMXTFfWbZHR-s9HgNIZXDFs7H_U-s','2021-09-10 09:40:26.486344'),('vacoxpm7qoq3dw5ov9lr0l4bo1s4mmsr','.eJxVjDsOwjAQBe_iGllZr_HGlPQ5g-Xf4gCypTipEHeHSCmgfTPzXsL5bS1u63lxcxIXAeL0uwUfH7nuIN19vTUZW12XOchdkQftcmopP6-H-3dQfC_f2ujECOAH5JHIkoIhgbI6MhmNYEbwzPoMVhmLASmohNoExqiQOGbx_gCwYTbn:1mJX3k:ZANGxTi4NhQgWPcDPDUHbzlCT3CeiWODy9FF3MUYvwA','2021-09-10 08:17:56.469341'),('w4jd3eoc7g3one9bvyi7hu0dtliidirv','.eJxVjDsOwjAQBe_iGllZr_HGlPQ5g-Xf4gCypTipEHeHSCmgfTPzXsL5bS1u63lxcxIXAeL0uwUfH7nuIN19vTUZW12XOchdkQftcmopP6-H-3dQfC_f2ujECOAH5JHIkoIhgbI6MhmNYEbwzPoMVhmLASmohNoExqiQOGbx_gCwYTbn:1mJ9iz:2ER1zkO8nFqmYHPD6EFdy42v8zAAEqgMGFdLFLGgg2g','2021-09-09 07:22:57.740368'),('wu7gaxqevk6v95xmv4jl5e493jhauuu8','.eJxVjk0OwiAQhe_C2hBohoIu3XuGZhimLWrAFLowxrtLTRe6fH9f3ksMuNZ5WAsvQwziJDpx-PU80o3TFoQrpilLyqku0cutIve0yEsOfD_v3T_AjGVu6xGNtV6NbByQt6QxgAbLbHpHXafB2KMPTqmjawJBE5DptQuGCdS4QevzwY1EC2PlpkPEKeVSI32fa_f-AEcqQyo:1mJBks:9NfhdXKWXn1zbX3-qLr7unj_LsrXlJnml5dfnKwuWto','2021-09-09 09:33:02.398529'),('ybxpy8emzfayu6zj8pj3zjgyf79ai6w6','.eJxVjk0OwiAQhe_C2hBooFCX7j1DM8xMLWrAFLowxrtLTRe6fH9f3kuMsNZ5XAsvYyRxFJ04_HoB8MZpC-gK6ZIl5lSXGORWkXta5DkT30979w8wQ5nbegLrXFATW28wONRARhvHbHuPXaeNdUMgr9TgmwCj0aDttSfLaNS0QevzwY3EFGtTFOGScqkRv7_18P4AvkdCXQ:1mJX9s:Tmuvl5ApCGxmSL4r_1TRG9wVuNm4ZrPGshQ90ethM8M','2021-09-10 08:24:16.445286');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_diagnostics`
--

DROP TABLE IF EXISTS `main_diagnostics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_diagnostics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_of_creation` date NOT NULL,
  `pupil_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `current_class` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_diagnostics_pupil_id_c241e1a8_fk_admin_panel_pupil_id` (`pupil_id`),
  KEY `main_diagnostics_user_id_0fa994c4_fk_admin_panel_customuser_id` (`user_id`),
  CONSTRAINT `main_diagnostics_pupil_id_c241e1a8_fk_admin_panel_pupil_id` FOREIGN KEY (`pupil_id`) REFERENCES `admin_panel_pupil` (`id`),
  CONSTRAINT `main_diagnostics_user_id_0fa994c4_fk_admin_panel_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `admin_panel_customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_diagnostics`
--

LOCK TABLES `main_diagnostics` WRITE;
/*!40000 ALTER TABLE `main_diagnostics` DISABLE KEYS */;
INSERT INTO `main_diagnostics` VALUES (77,'2021-09-01',1,2,0),(78,'2021-09-08',1,2,0),(79,'2021-09-06',1,2,0);
/*!40000 ALTER TABLE `main_diagnostics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_sensomotorlevel`
--

DROP TABLE IF EXISTS `main_sensomotorlevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_sensomotorlevel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phonemic_perception` varchar(100) DEFAULT NULL,
  `sound_pronunciation` varchar(350) DEFAULT NULL,
  `sound_syllable_structure` varchar(100) DEFAULT NULL,
  `diagnostic_id` int NOT NULL,
  `articulatory_motor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `main_sensomotorlevel_diagnostic_id_12e98076_fk_main_diag` (`diagnostic_id`),
  CONSTRAINT `main_sensomotorlevel_diagnostic_id_12e98076_fk_main_diag` FOREIGN KEY (`diagnostic_id`) REFERENCES `main_diagnostics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_sensomotorlevel`
--

LOCK TABLES `main_sensomotorlevel` WRITE;
/*!40000 ALTER TABLE `main_sensomotorlevel` DISABLE KEYS */;
INSERT INTO `main_sensomotorlevel` VALUES (73,'0:0&1:None&2:None&3:None&4:None&5:None&6:None&7:None&8:None&9:None&10:None&11:None&12:None','0:None&1:None&2:None&3:None&4:None&5:None&6:None&7:None&8:None&9:None&10:None&11:None&12:None&13:None&14:None&15:None&16:None&17:None&18:None&19:None&20:None&21:None&22:None&23:None&24:None&25:None&26:None&27:None&28:None&29:None&30:None&31:None&32:None&33:None&34:None&35:None&36:None&37:None&38:None&39:None&40:None&41:None',NULL,77,NULL),(74,'0:&1:&2:&3:&4:&5:&6:&7:&8:&9:&10:&11:&12:','0:&1:&2:&3:&4:&5:&6:&7:&8:&9:&10:&11:&12:&13:&14:&15:&16:&17:&18:&19:&20:&21:&22:&23:&24:&25:&26:&27:&28:&29:&30:&31:&32:&33:&34:&35:&36:&37:&38:&39:&40:&41:',NULL,78,NULL),(75,'0:&1:&2:&3:&4:&5:&6:&7:&8:&9:&10:&11:&12:','0:3&1:3&2:3&3:3&4:3&5:3&6:3&7:&8:&9:&10:&11:&12:&13:&14:&15:&16:&17:&18:&19:&20:&21:&22:&23:&24:&25:&26:&27:&28:&29:&30:&31:&32:&33:&34:&35:&36:&37:&38:&39:&40:&41:',NULL,79,'0:3&1:3&2:3&3:&4:&5:&6:&7:');
/*!40000 ALTER TABLE `main_sensomotorlevel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_statesoffunctions`
--

DROP TABLE IF EXISTS `main_statesoffunctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_statesoffunctions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hearing` longtext NOT NULL,
  `vision` longtext NOT NULL,
  `breath` longtext NOT NULL,
  `voice` longtext NOT NULL,
  `prosody` longtext NOT NULL,
  `articulation_apparatus` longtext NOT NULL,
  `motor_skills` longtext NOT NULL,
  `diagnostic_id` int NOT NULL,
  `additional_information` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `main_statesoffunctions_diagnostic_id_id_ca0e4525` (`diagnostic_id`),
  CONSTRAINT `main_statesoffunctio_diagnostic_id_3bb18278_fk_main_diag` FOREIGN KEY (`diagnostic_id`) REFERENCES `main_diagnostics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_statesoffunctions`
--

LOCK TABLES `main_statesoffunctions` WRITE;
/*!40000 ALTER TABLE `main_statesoffunctions` DISABLE KEYS */;
INSERT INTO `main_statesoffunctions` VALUES (77,'','','','','','','',77,''),(78,'','','','','','','',78,''),(79,'','','','','','','',79,'');
/*!40000 ALTER TABLE `main_statesoffunctions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-08 23:40:50
