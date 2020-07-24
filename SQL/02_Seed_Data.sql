SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [Email], [FirebaseUserId], [DisplayName], [FirstName], [LastName], [CreateDateTime], [ImageLocation])
VALUES
  (1, 'michael@example.comx', '4RJMz8NzaLUbov5klVNHkJo3GgV2', 'keartroth', 'Michael', 'Carroll', '1/10/2018', null),
  (2, 'emclaren1@businessweek.comx', 'r9mo56gh1zTulQ2TilTbVL93U6V2', 'rmorrice1', 'Elizabeth', 'McLaren', '4/30/2020', null),
  (3, 'ltungate2@sourceforge.netx', 'jXC3QfQt1phyo7QXL2gO0MtwXVF2', 'bwillbond2', 'Lem', 'Tungate', '10/22/2018', null),
  (4, 'gpullinger3@opera.comx', 'tFypfuFGnSSOkSvOPAdFyWuv3sf2', 'mmccuish3', 'Georgeta', 'Pullinger', '2/19/2020', null),
  (5, 'delgee4@zimbio.comx', 'fQfhdi8TnfMq0wCn5vtGTUaSOHI2', 'smaber4', 'Darcy', 'Elgee', '4/6/2019', null),
  (6, 'ogiron5@gmpg.orgx', 'ah1KJy4JDXP8PBW9ULTyRxG9uOR2', 'araggett5', 'Ody', 'Giron', '5/7/2019', null),
  (7, 'hbartholat6@blog.comx', '7LSs0f6aZPcSYvTNjMsWmKaS1XZ2', 'eskace6', 'Hill', 'Bartholat', '2/21/2019', null),
  (8, 'theistermann7@nifty.comx', 'MTxfTsjxdePRvbJnIMEknfRpclR2', 'rcline7', 'Thorn', 'Heistermann', '2/5/2020', null),
  (9, 'osharper8@cisco.comx', 'ptyY87THXvNUPKNOx4BLsTkOlTi2', 'staplow8', 'Otha', 'Sharper', '6/19/2020', null),
  (10, 'deckart9@bloomberg.comx', '5ePb8FwJr8bSXQlorAmYyhTzfrF2', 'lpamment9', 'Denis', 'Eckart', '12/10/2019', null),
  (11, 'gcrop0@amazonaws.comx', 'vFfCIB4J1WQfs0pgTUi6TdSDkdl1', 'proles0', 'Gilburt', 'Crop', '10/7/2018', null);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Category] ON
INSERT INTO [Category]
  ([Id], [Name])
VALUES
(1, 'regional'),
(2, 'technology'),
(3, 'lifestyle'),
(4, 'business'),
(5, 'general'),
(6, 'programming'),
(7, 'science'),
(8, 'entertainment'),
(9, 'world'),
(10, 'sports'),
(11, 'finance'),
(12, 'academia'),
(13, 'politics'),
(14, 'health'),
(15, 'opinion'),
(16, 'food'),
(17, 'game'),
(18, 'fashion'),
(19, 'academic'),
(20, 'crap'),
(21, 'travel'),
(22, 'culture'),
(23, 'economy'),
(24, 'environment'),
(25, 'art'),
(26, 'music'),
(27, 'notsure'),
(28, 'CS'),
(29, 'education'),
(30, 'redundant'),
(31, 'television'),
(32, 'commodity'),
(33, 'movie'),
(34, 'entrepreneur'),
(35, 'review'),
(36, 'auto'),
(37, 'energy'),
(38, 'celebrity'),
(39, 'medical'),
(40, 'gadgets'),
(41, 'design'),
(42, 'EE'),
(43, 'security'),
(44, 'mobile'),
(45, 'estate'),
(46, 'funny');
SET IDENTITY_INSERT [Category] OFF