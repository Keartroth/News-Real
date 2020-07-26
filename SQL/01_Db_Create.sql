USE [master]
GO

IF db_id('NewsReal') IS NULL
  CREATE DATABASE NewsReal
GO

USE [NewsReal]
GO


DROP TABLE IF EXISTS [ArticleCategory];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [ArticleReferrence];
DROP TABLE IF EXISTS [Article];
DROP TABLE IF EXISTS [UserProfile];
GO 

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY,
  [Email] varchar(255) NOT NULL,
  [FirebaseUserId] varchar(28) NOT NULL,
  [DisplayName] varchar(50) NOT NULL,
  [FirstName] varchar(25) NOT NULL,
  [LastName] varchar(25) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] nvarchar(255)
)
GO

CREATE TABLE [Article] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserProfileId] int NOT NULL,
  [Author] nvarchar(255) NOT NULL,
  [Publisher] nvarchar(255),
  [CurrentsId] nvarchar(255) NOT NULL,
  [Title] varchar(255) NOT NULL,
  [Description] varchar(500) NOT NULL,
  [Url] nvarchar(255) NOT NULL,
  [UserTitle] varchar(50),
  [Content] varchar(1000),
  [CreateDateTime] datetime,
  [Image] nvarchar(max),
  [Language] nvarchar(2),
  [Published] datetime NOT NULL,
  [Ojectivity] float,
  [Sentimentality] float
)
GO

CREATE TABLE [ArticleReferrence] (
  [Id] int PRIMARY KEY IDENTITY,
  [ArticleId] int NOT NULL,
  [ReferenceArticleID] int NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] varchar(15) NOT NULL
)
GO

CREATE TABLE [ArticleCategory] (
  [Id] int PRIMARY KEY IDENTITY,
  [ArticleId] int NOT NULL,
  [CategoryId] int NOT NULL
)
GO

ALTER TABLE [ArticleCategory] ADD FOREIGN KEY ([ArticleId]) REFERENCES [Article] ([Id])
GO

ALTER TABLE [ArticleCategory] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [Article] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [ArticleReferrence] ADD FOREIGN KEY ([ArticleId]) REFERENCES [Article] ([Id])
GO

ALTER TABLE [ArticleReferrence]ADD FOREIGN KEY ([ReferenceArticleID]) REFERENCES [Article]  ([Id])
GO