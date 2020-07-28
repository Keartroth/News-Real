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
(1, 1, 'Kristen Baldwin', 'intel.com', 'f8626669-91de-46b7-90bf-cd943a9e17e1', '''Muppets Now'' is a return to form for Kermit & Co.', 'The Muppets make their streaming debut on Disney+ with ''Muppets Now,'' a funny and fast-paced sketch show....', 'https://ew.com/tv/tv-reviews/muppets-now-review/', 'Vivamus tortor. Duis mattis egestas metus.', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', '2019-11-11 18:31:09', 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=1047&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2020%2F07%2F27%2Fmuppets-now-4.jpg', 'en', '2020-07-27 13:28:35', 0.65, 0.33),
(2, 1, '"Daniel Montgomery', 'unicef.org', 'd2dd5da5-036e-4d2b-9a36-e7ae6ff9dfd8', '‘Marvelous Mrs. Maisel,’ ‘Succession,’ ‘Mrs. America’ and more predicted to rule 2020 Emmy nominations', '"The Marvelous Mrs. Maisel" will rule the 2020 Primetime Emmy nominations, which will be announced on Tuesday morning, July 28. That''s according to the combined predictions of tho…...', 'https://www.goldderby.com/article/2020/emmy-predictions-by-series-marvelous-mrs-maisel-succession/', 'Morbi porttitor lorem id ligula.', 'Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '2019-08-02 01:40:09', 'https://www.goldderby.com/wp-content/uploads/2020/07/marvelous-mrs-maisel-succession-mrs-america.jpg?w=640', 'en', '2020-07-27 18:00:53', 0.13, 0.33),
(3, 1, '@WillHMThorne', 'twitter.com', '8b3994ad-ccd1-43a2-bba1-697c275a94da', 'Anthony Hemingway Inks Overall Deal With 20th Century Fox TV', 'Anthony Hemingway, who is set to direct the upcoming Nat Geo series "Genius: Aretha," has signed an overall deal with 20th Century Fox Television. As part of the new deal, Hemingway wil…...', 'https://variety.com/2020/tv/news/anthony-hemingway-20th-century-fox-tv-overall-deal-1234717349/', 'Nullam molestie nibh in lectus.', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.', '2020-01-28 21:00:27', 'https://pmcvariety.files.wordpress.com/2020/07/ahem-headshot-july-2020-wes-klain-1.jpg?w=1024', 'en', '2020-07-27 17:38:42', 0.62, 0.33),
(4, 1, 'Colin Hickson', 'squidoo.com', '0c90184e-d30e-4614-b455-ef2b0fa884c1', 'Stephen Amell Shows Off Arrow-Branded Hard Cider With New Photo', 'Arrowverse founding father Stephen Amell recently showed off a picture of some Arrow-branded hard cider on his Twitter account....', 'https://www.cbr.com/stephen-amell-arrow-hard-cider/', 'Suspendisse potenti.', 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', '2020-01-13 12:22:01', 'https://static0.cbrimages.com/wordpress/wp-content/uploads/2019/03/arrow-season-1-header.jpg', 'en', '2020-07-27 17:42:01', 0.08, 0.05),
(5, 1, 'THR', 'squidoo.com', 'fa8168f5-e153-44d1-98e3-078d97e3c5a9', 'Royana Black, Actress in ''Brighton Beach Memoirs,'' Dies at 47', 'She also starred in a short-lived 1988 sitcom, ''Raising Miranda.''...', 'https://www.hollywoodreporter.com/news/royana-black-dead-brighton-beach-memoirs-actress-was-47-1304534', 'Sed ante.', 'Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.', '2020-07-18 13:17:36', 'https://cdn1.thr.com/sites/default/files/imagecache/NFE_Landscape/2020/07/royana_black_-_publicity_-_h_2020_.jpg', 'en', '2020-07-27 17:55:35', 0.31, 0.37),
(6, 1, 'Allison Crist', 'yandex.ru', 'b8f49fd6-eab7-49f1-a545-2715ac66131b', 'Below Deck Med Preview: Captain Sandy Loses It Over a Plate of Nachos! - E! Online', 'Captain Sandy Yawn is not happy with the meal Chef Hindrigo "Kiko" Lorran serves guests on the all-new Below Deck Mediterranean. Watch the exclusive clip below!...', 'https://www.eonline.com/news/1173264/below-deck-med-preview-captain-sandy-loses-it-over-a-plate-of-nachos', 'Vestibulum sed magna at nunc commodo placerat.', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.', '2019-11-20 08:10:17', 'https://akns-images.eonline.com/eol_images/Entire_Site/2020327/rs_600x600-200427143604-sandy2.jpg?fit=around|1080:540&output-quality=90&crop=1080:540;center,top', 'en', '2020-07-27 16:00:00', 0.87, 0.66);
SET IDENTITY_INSERT [Article] OFF

SET IDENTITY_INSERT [ArticleCategory] ON
INSERT INTO [ArticleCategory]
  (Id, [ArticleId], [CategoryId])
VALUES
(1, 1, 8),
(2, 2, 31),
(3, 3, 38),
(4, 4, 38),
(5, 5, 38),
(6, 6, 31);
SET IDENTITY_INSERT [ArticleCategory] OFF