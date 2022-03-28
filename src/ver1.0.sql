CREATE TABLE `tb_case` (
	`case_seq`	int	NOT NULL,
	`nickname` varchar(15) NOT NULL,
	`image_url`	text NULL,
	`result` varchar(128) NULL,
	`reuse`	boolean	NULL
);

CREATE TABLE `tb_sentence` (
	`sentence_seq`	int	NOT NULL,
	`sentence`	varchar(64)	NOT NULL
);

CREATE TABLE `tb_audio` (
	`audio_seq`	VARCHAR(255) NOT NULL,
	`sentence_seq`	int	NOT NULL,
	`case_seq`	int	NOT NULL,
	`audio_path` varchar(100) NULL,
	`created_at` datetime NOT NULL
);

