/*
Navicat MySQL Data Transfer

Source Server         : dai
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : shopping

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-10-24 17:04:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t-user
-- ----------------------------
DROP TABLE IF EXISTS `t-user`;
CREATE TABLE `t-user` (
  `uid` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `iegtime` datetime NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t-user
-- ----------------------------
