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
INSERT INTO `admin_panel_customuser` VALUES (1,'pbkdf2_sha256$260000$NtuijZb43pDn7H2V9GWbue$eXXPYyvTqw/8LaYOsBJJWmZfdOZDSgr0BXTZixFy05w=','2021-08-19 08:36:41.119784',1,'admin','','','admin@yandex.ru',1,1,'2021-08-19 07:40:51.752699',NULL),(2,'pbkdf2_sha256$260000$SNhCuVxesdEO6KX9KqbZZC$CJAtMIUf/XmPqq0m5nzszvSJOIPSF0XKXwcNhQz9ew8=','2021-08-19 08:34:21.336242',0,'belova','Екатерина','Белова','belova@yandex.ru',0,1,'2021-08-19 07:41:47.857471','Дмитриевна');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_panel_logogroups`
--

LOCK TABLES `admin_panel_logogroups` WRITE;
/*!40000 ALTER TABLE `admin_panel_logogroups` DISABLE KEYS */;
INSERT INTO `admin_panel_logogroups` VALUES (2,2,1),(3,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_panel_pupil`
--

LOCK TABLES `admin_panel_pupil` WRITE;
/*!40000 ALTER TABLE `admin_panel_pupil` DISABLE KEYS */;
INSERT INTO `admin_panel_pupil` VALUES (1,'Иванов','Иван','Сергеевич','2021-08-19','2001-09-12','ул.Октябрьская, д.63, кв.10',0,'2021-09-01');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2021-08-19 07:43:59.400466','1','LogoGroups object (1)',1,'[{\"added\": {}}]',11,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2021-08-19 07:40:34.083017'),(2,'contenttypes','0002_remove_content_type_name','2021-08-19 07:40:34.174666'),(3,'auth','0001_initial','2021-08-19 07:40:34.538588'),(4,'auth','0002_alter_permission_name_max_length','2021-08-19 07:40:34.619012'),(5,'auth','0003_alter_user_email_max_length','2021-08-19 07:40:34.631839'),(6,'auth','0004_alter_user_username_opts','2021-08-19 07:40:34.644388'),(7,'auth','0005_alter_user_last_login_null','2021-08-19 07:40:34.656492'),(8,'auth','0006_require_contenttypes_0002','2021-08-19 07:40:34.671428'),(9,'auth','0007_alter_validators_add_error_messages','2021-08-19 07:40:34.690155'),(10,'auth','0008_alter_user_username_max_length','2021-08-19 07:40:34.700569'),(11,'auth','0009_alter_user_last_name_max_length','2021-08-19 07:40:34.713161'),(12,'auth','0010_alter_group_name_max_length','2021-08-19 07:40:34.738828'),(13,'auth','0011_update_proxy_permissions','2021-08-19 07:40:34.752723'),(14,'auth','0012_alter_user_first_name_max_length','2021-08-19 07:40:34.766672'),(15,'admin_panel','0001_initial','2021-08-19 07:40:35.333890'),(16,'admin','0001_initial','2021-08-19 07:40:35.515127'),(17,'admin','0002_logentry_remove_auto_add','2021-08-19 07:40:35.534162'),(18,'admin','0003_logentry_add_action_flag_choices','2021-08-19 07:40:35.549570'),(19,'admin_panel','0002_pupil_date_of_birth','2021-08-19 07:40:35.585814'),(20,'admin_panel','0003_pupil_home_address','2021-08-19 07:40:35.620228'),(21,'admin_panel','0004_auto_20210603_1216','2021-08-19 07:40:35.677613'),(22,'main','0001_initial','2021-08-19 07:40:35.733450'),(23,'main','0002_delete_articulatorymotorskills','2021-08-19 07:40:35.751316'),(24,'main','0003_diagnostics_pupil_id','2021-08-19 07:40:35.815237'),(25,'main','0004_auto_20210528_1642','2021-08-19 07:40:35.898342'),(26,'main','0005_auto_20210528_1653','2021-08-19 07:40:35.925287'),(27,'main','0006_statesoffunctions','2021-08-19 07:40:36.026877'),(28,'main','0007_auto_20210603_1216','2021-08-19 07:40:36.591404'),(29,'main','0008_auto_20210603_1219','2021-08-19 07:40:37.134542'),(30,'main','0009_auto_20210603_1220','2021-08-19 07:40:37.316993'),(31,'main','0010_auto_20210603_1236','2021-08-19 07:40:37.338025'),(32,'main','0011_diagnostics_current_class','2021-08-19 07:40:37.386220'),(33,'main','0012_auto_20210607_1203','2021-08-19 07:40:37.539059'),(34,'main','0013_auto_20210704_2249','2021-08-19 07:40:38.055795'),(35,'main','0014_auto_20210704_2251','2021-08-19 07:40:38.221978'),(36,'main','0015_sensomotorlevel','2021-08-19 07:40:38.408855'),(37,'main','0016_remove_statesoffunctions_additional_information','2021-08-19 07:40:38.501208'),(38,'main','0017_statesoffunctions_additional_information','2021-08-19 07:40:38.563986'),(39,'main','0018_auto_20210813_2214','2021-08-19 07:40:38.630613'),(40,'main','0019_auto_20210813_2215','2021-08-19 07:40:39.401939'),(41,'sessions','0001_initial','2021-08-19 07:40:39.511982');
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
INSERT INTO `django_session` VALUES ('0211hk3qwqvbkk9etbrv0wt2icc2k4zj','.eJxVjDsOwjAQBe_iGllZr_HGlPQ5g-Xf4gCypTipEHeHSCmgfTPzXsL5bS1u63lxcxIXAeL0uwUfH7nuIN19vTUZW12XOchdkQftcmopP6-H-3dQfC_f2ujECOAH5JHIkoIhgbI6MhmNYEbwzPoMVhmLASmohNoExqiQOGbx_gCwYTbn:1mGdXV:MLn07uoXLRMl8kCgTzOfByrsU-PDzvYzU85JZvMHfZY','2021-09-02 08:36:41.126213');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_diagnostics`
--

LOCK TABLES `main_diagnostics` WRITE;
/*!40000 ALTER TABLE `main_diagnostics` DISABLE KEYS */;
INSERT INTO `main_diagnostics` VALUES (1,'2021-08-19',1,2,-1);
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
  `sound_pronunciation` varchar(100) DEFAULT NULL,
  `sound_syllable_structure` varchar(100) DEFAULT NULL,
  `diagnostic_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `main_sensomotorlevel_diagnostic_id_12e98076_fk_main_diag` (`diagnostic_id`),
  CONSTRAINT `main_sensomotorlevel_diagnostic_id_12e98076_fk_main_diag` FOREIGN KEY (`diagnostic_id`) REFERENCES `main_diagnostics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_sensomotorlevel`
--

LOCK TABLES `main_sensomotorlevel` WRITE;
/*!40000 ALTER TABLE `main_sensomotorlevel` DISABLE KEYS */;
INSERT INTO `main_sensomotorlevel` VALUES (1,'-------------',NULL,NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_statesoffunctions`
--

LOCK TABLES `main_statesoffunctions` WRITE;
/*!40000 ALTER TABLE `main_statesoffunctions` DISABLE KEYS */;
INSERT INTO `main_statesoffunctions` VALUES (1,'','','','','','','',1,'');
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

-- Dump completed on 2021-08-19 12:06:41
