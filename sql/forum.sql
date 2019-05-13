/*
Navicat MySQL Data Transfer

Source Server         : 腾讯云服务器
Source Server Version : 50725
Source Host           : 111.230.112.121:3306
Source Database       : forum

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-05-13 11:02:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `comment_content` varchar(1000) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `del` tinyint(4) DEFAULT '0',
  `reback_user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for comment_photo
-- ----------------------------
DROP TABLE IF EXISTS `comment_photo`;
CREATE TABLE `comment_photo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment_id` bigint(20) DEFAULT NULL,
  `photo` varchar(1000) DEFAULT NULL,
  `create_time` varchar(1000) DEFAULT NULL,
  `del` tinyint(4) DEFAULT '0',
  `num` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `post_title` varchar(1000) DEFAULT NULL,
  `post_content` varchar(1000) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `del` tinyint(4) DEFAULT '0',
  `comment_num` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for post_photo
-- ----------------------------
DROP TABLE IF EXISTS `post_photo`;
CREATE TABLE `post_photo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) DEFAULT NULL,
  `num` tinyint(4) DEFAULT NULL,
  `photo` varchar(1000) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `del` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(1000) DEFAULT NULL,
  `passwd` varchar(1000) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  `del` tinyint(4) DEFAULT '0',
  `type` tinyint(4) DEFAULT '1' COMMENT '学生1or老师2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- View structure for get_comment
-- ----------------------------
DROP VIEW IF EXISTS `get_comment`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `get_comment` AS select `comment`.`post_id` AS `post_id`,`comment`.`id` AS `id`,`comment`.`user_id` AS `user_id`,`comment`.`comment_content` AS `comment_content`,`comment`.`create_time` AS `create_time`,`comment`.`del` AS `del`,`comment`.`reback_user_id` AS `reback_user_id`,`users`.`avatar` AS `avatar`,`users`.`name` AS `name`,`users`.`type` AS `type` from (`comment` join `users`) where (`comment`.`user_id` = `users`.`id`) order by `comment`.`create_time` desc ;

-- ----------------------------
-- View structure for get_post
-- ----------------------------
DROP VIEW IF EXISTS `get_post`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `get_post` AS select `post`.`id` AS `id`,`post`.`user_id` AS `user_id`,`post`.`post_title` AS `post_title`,`post`.`post_content` AS `post_content`,`post`.`create_time` AS `create_time`,`post`.`del` AS `del`,`post`.`comment_num` AS `comment_num`,`users`.`avatar` AS `avatar`,`users`.`name` AS `name`,`users`.`student_id` AS `student_id`,`users`.`type` AS `type`,`users`.`email` AS `email` from (`post` join `users`) where (`post`.`user_id` = `users`.`id`) ;
