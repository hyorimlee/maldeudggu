CREATE TABLE `tb_audio` (
  `audio_seq` int NOT NULL,
  `sentence_seq` int NOT NULL,
  `case_seq` int NOT NULL,
  `audio_path` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`audio_seq`),
  KEY `sentence_seq_idx` (`sentence_seq`),
  KEY `case_seq_idx` (`case_seq`),
  CONSTRAINT `case_seq` FOREIGN KEY (`case_seq`) REFERENCES `tb_case` (`case_seq`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sentence_seq` FOREIGN KEY (`sentence_seq`) REFERENCES `tb_sentence` (`sentence_seq`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

CREATE TABLE `tb_case` (
  `case_seq` int NOT NULL,
  `nickname` varchar(15) COLLATE utf8_bin NOT NULL,
  `image_url` text COLLATE utf8_bin,
  `result` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `reuse` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`case_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

CREATE TABLE `tb_sentence` (
  `sentence_seq` int NOT NULL,
  `sentence` varchar(64) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`sentence_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
