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

SET IDENTITY_INSERT [Article] ON
INSERT INTO [Article]
  (Id, UserProfileId, Author, Publisher, CurrentsId, Title, Description, Url, UserTitle, Content, CreateDateTime, Image, Language, Published, Objectivity, Sentimentality)
VALUES
(1, 1, 'Jay Cohen', 'Washington Times', '5e440458-9be3-4fef-b6e6-2987a6427f83', 'Cubs’ Ross non-committal when asked about Kimbrel as closer', 'Chicago Cubs manager David Ross is working out how he plans to handle save situations while struggling closer Craig Kimbrel works on his mechanics....', 'https://m.washingtontimes.com/news/2020/aug/1/cubs-ross-non-committal-when-asked-about-kimbrel-a/', 'Why Did We Spend so Much Money on Kimbrel?', 'The Cubs front office has struggled with bullpen acquisitions since Theo came onto the scene. There is no home grown talent outside of Hendricks, and he was acquired via trade while still up and coming in the minors. Kimbrel is one more name on a growing ledger of regrets. Go Cubs Go!', '2020-08-03 11:44:28', 'https://twt-thumbs.washtimes.com/media/image/2020/08/01/pirates_cubs_baseball_94507_c0-173-4141-2587_s1770x1032.jpg?101f51341c38e11cb498ec4535ac756e8e6a99b9', 'en', '2020-08-01 5:27:58', null, null),
(2, 1, 'espn', 'espn', 'edfa40b8-d561-446f-8eab-f15bd1b46728', 'Cubs'' Ross, Kimbrel to have talk on closer role', 'A change could be brewing at the end of games for the first-place Chicago Cubs....', 'https://www.espn.com/mlb/story/_/id/29579518/cubs-david-ross-talk-craig-kimbrel-future-closer-role', 'I Hope He Can Fix His Issues', 'He''s a great player, and he deserves better.', '2020-08-05 13:12:35', 'https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2019%2F0821%2Fr586906_1296x729_16%2D9.jpg', 'en', '2020-08-01 19:49:31', null, null),
(3, 1, 'AVERY OSEN Associated Press', 'stltoday', '4a985adc-3534-45a9-b566-b4f34856bc9b', 'Darvish pitches Cubs past Royals 6-1 for 6th straight win', 'KANSAS CITY, Mo. (AP) — Yu Darvish pitched seven sharp innings and the Chicago Cubs beat the skidding Kansas City Royals 6-1 on Wednesday night for their sixth straight victory....', 'https://www.stltoday.com/sports/baseball/darvish-pitches-cubs-past-royals-6-1-for-6th-straight-win/article_aebd9649-b7de-5365-9ae3-2acd13221edd.html', 'Great News!', 'I love that Darvish is turning it around! Perhaps I''ve been too hard on Theo?', '2020-08-06 11:17:01', 'https://bloximages.newyork1.vip.townnews.com/stltoday.com/content/tncms/assets/v3/editorial/9/77/97731875-47f3-5e02-a00e-6b8649935696/5f2b843c1c117.image.jpg?crop=1763%2C992%2C0%2C91&resize=1120%2C630&order=crop%2Cresize', 'en', '2020-08-05 23:57:45', null, null),
(4, 1, 'Rebecca Alter', 'vulture', '0175df7b-e9aa-4318-ab26-e992e5777625', 'Ren & Stimpy Is Getting a Reboot With a New Creative Team', 'Happy happy, joy joy....', 'https://www.vulture.com/2020/08/ren-and-stimpy-reboot.html', 'Cartoon Cartoon', 'I loved Ren & Stimpy when I was a kid. "What rolls down stairs alone or in pairs and over your neighbor''s dog? What''s great for a snack and fits on your back? It''s Log, Log, Log! It''s Log, it''s Log, it''s big, it''s heavy, it''s wood. It''s Log, Log, it''s better than bad, it''s good! Everyone wants a log! You''re gonna love it, Log! Come on and get your log! Everyone needs a Log!"', '2020-08-05 13:25:17', 'https://pyxis.nymag.com/v1/imgs/7da/d5a/4b2b1b2b102d0907ef5e47a218e21863cf-ren-stimpy.2x.rsocial.w600.jpg', 'en', '2020-08-05 12:21:36', null, null);
SET IDENTITY_INSERT [Article] OFF

SET IDENTITY_INSERT [ArticleCategory] ON
INSERT INTO [ArticleCategory]
  (Id, [ArticleId], [CategoryId])
VALUES
(1, 1, 10),
(2, 2, 10),
(3, 3, 10),
(4, 4, 8),
(5, 4, 31);
SET IDENTITY_INSERT [ArticleCategory] OFF

SET IDENTITY_INSERT [ArticleReference] ON
INSERT INTO [ArticleReference]
  (Id, [ArticleId], [ReferenceArticleId])
VALUES
(1, 1, 2),
(2, 1, 3);
SET IDENTITY_INSERT [ArticleReference] OFF