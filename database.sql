USE [master]
GO
/****** Object:  Database [Clio]    Script Date: 5-9-2013 10:21:48 ******/
CREATE DATABASE [Clio]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Clio', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\Clio.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Clio_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\Clio_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO

ALTER DATABASE [Clio] SET COMPATIBILITY_LEVEL = 110
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Clio].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [Clio] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [Clio] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [Clio] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [Clio] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [Clio] SET ARITHABORT OFF 
GO

ALTER DATABASE [Clio] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [Clio] SET AUTO_CREATE_STATISTICS ON 
GO

ALTER DATABASE [Clio] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [Clio] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [Clio] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [Clio] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [Clio] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [Clio] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [Clio] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [Clio] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [Clio] SET  DISABLE_BROKER 
GO

ALTER DATABASE [Clio] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [Clio] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [Clio] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [Clio] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [Clio] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [Clio] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [Clio] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [Clio] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [Clio] SET  MULTI_USER 
GO

ALTER DATABASE [Clio] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [Clio] SET DB_CHAINING OFF 
GO

ALTER DATABASE [Clio] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [Clio] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO

ALTER DATABASE [Clio] SET  READ_WRITE 
GO

/****** Object:  Login [Clio]    Script Date: 5-9-2013 10:19:28 ******/
CREATE LOGIN [Clio] WITH PASSWORD=N'clio', DEFAULT_DATABASE=[Clio], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO
USE [Clio]
GO
/****** Object:  User [Clio]    Script Date: 5-9-2013 10:19:28 ******/
CREATE USER [Clio] FOR LOGIN [Clio] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Clio]
GO
/****** Object:  Table [dbo].[Language]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Languages](
	[Id] [bigint] NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](max) NULL,
 CONSTRAINT [PK_Languages] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Projects](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[Description] [varchar](max) NOT NULL,
	[Customer] [varchar](50) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tags]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tags](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](max) NULL,
 CONSTRAINT [PK_Tags] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Technologies]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Technologies](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Link] [varchar](500) NOT NULL,
	[LanguageId] [bigint] NOT NULL,
	[License] [varchar](50) NULL,
	[Description] [varchar](max) NULL,
 CONSTRAINT [PK_Technologies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TechnologyReviews]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TechnologyReviews](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[TechnologyId] [bigint] NOT NULL,
	[ProjectId] [bigint] NOT NULL,
	[Version] [varchar](50) NOT NULL,
	[Rating] [tinyint] NOT NULL,
	[Created] [datetime] NOT NULL,
	[Text] [varchar](max) NOT NULL,
 CONSTRAINT [PK_TechnologyExperience] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TechnologyTags]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TechnologyTags](
	[TagId] [bigint] NOT NULL,
	[TechnologyId] [bigint] NOT NULL,
 CONSTRAINT [PK_TechnologyTags] PRIMARY KEY CLUSTERED 
(
	[TagId] ASC,
	[TechnologyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ToolReviews]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ToolReviews](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[ToolId] [bigint] NOT NULL,
	[ProjectId] [bigint] NOT NULL,
	[Version] [varchar](50) NOT NULL,
	[Rating] [tinyint] NOT NULL,
	[Created] [datetime] NOT NULL,
	[Text] [varchar](max) NOT NULL,
 CONSTRAINT [PK_ToolExperience] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tools]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tools](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Owner] [varchar](50) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Link] [varchar](500) NOT NULL,
	[License] [varchar](50) NOT NULL,
	[Description] [varchar](max) NULL,
 CONSTRAINT [PK_Tools] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ToolTags]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ToolTags](
	[TagId] [bigint] NOT NULL,
	[ToolId] [bigint] NOT NULL,
 CONSTRAINT [PK_ToolTags] PRIMARY KEY CLUSTERED 
(
	[TagId] ASC,
	[ToolId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[LastActivity] [datetime] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  View [dbo].[Reviews]    Script Date: 5-9-2013 10:19:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Reviews]
AS
SELECT tr.Id, 'Technology' AS Type, UserId, u.Name AS UserName, u.Email AS UserEmail, TechnologyId, 0 AS ToolId, t .Name, ProjectId, p.Name AS ProjectName, Version, Rating, Created, 
                  [Text]
FROM     TechnologyReviews tr INNER JOIN
                  Technologies t ON tr.TechnologyId = t .Id INNER JOIN
                  Users u ON tr.UserId = u.Id INNER JOIN
                  Projects p ON tr.ProjectId = p.Id
UNION
SELECT tr.Id, 'Tool' AS Type, UserId, u.Name AS UserName, u.Email AS UserEmail, 0 AS TechnologyId, ToolId, t .Name, ProjectId, p.Name AS ProjectName, Version, Rating, Created, 
                  [Text]
FROM     ToolReviews tr INNER JOIN
                  Tools t ON tr.ToolId = t .Id INNER JOIN
                  Users u ON tr.UserId = u.Id INNER JOIN
                  Projects p ON tr.ProjectId = p.Id


GO
INSERT [dbo].[Languages] ([Id], [Name], [Description]) VALUES (1, N'C#', N'Also VB and other .Net')
GO
INSERT [dbo].[Languages] ([Id], [Name], [Description]) VALUES (2, N'JavaScript', N'Also CoffeeScript, TypeScript, etc')
GO
INSERT [dbo].[Languages] ([Id], [Name], [Description]) VALUES (3, N'Java', N'Also Grails, Groovy')
GO
INSERT [dbo].[Languages] ([Id], [Name], [Description]) VALUES (4, N'C', N'Also C++')
GO
INSERT [dbo].[Languages] ([Id], [Name], [Description]) VALUES (5, N'CSS', N'Also LESS, SASS, etc')
GO
INSERT [dbo].[Languages] ([Id], [Name], [Description]) VALUES (6, N'Other', N'Other')
GO
SET IDENTITY_INSERT [dbo].[Projects] ON 

GO
INSERT [dbo].[Projects] ([Id], [Name], [StartDate], [Description], [Customer]) VALUES (1, N'Clio', CAST(0x0000A20B016A8C80 AS DateTime), N'Website voor delen van ervaringen van Tools en Technology', N'IHomer')
GO
SET IDENTITY_INSERT [dbo].[Projects] OFF
GO
SET IDENTITY_INSERT [dbo].[Tags] ON 

GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (1, N'REST', N'REST api')
GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (2, N'Template', N'Templating api')
GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (3, N'Date', N'Date/time utilities')
GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (4, N'Typescript', N'written in typescript')
GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (5, N'Windows', N'Works on windows')
GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (6, N'Linux', N'Runs on Linux')
GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (7, N'DOM', N'manupulating the HTML DOM')
GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (8, N'Arrays', N'Array utility functions')
GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (9, N'UI', N'UI widget')
GO
INSERT [dbo].[Tags] ([Id], [Name], [Description]) VALUES (10, N'EDI', N'Integrated development environment')
GO
SET IDENTITY_INSERT [dbo].[Tags] OFF
GO
SET IDENTITY_INSERT [dbo].[Technologies] ON 

GO
INSERT [dbo].[Technologies] ([Id], [Name], [Link], [LanguageId], [License], [Description]) VALUES (1, N'Ractive', N'http://www.ractivejs.org', 2, N'MIT', N'Templating in javascript with databinding')
GO
INSERT [dbo].[Technologies] ([Id], [Name], [Link], [LanguageId], [License], [Description]) VALUES (2, N'Moment', N'http://momentjs.com/', 2, N'MIT', N'A javascript date library for parsing, validating, manipulating, and formatting dates.')
GO
INSERT [dbo].[Technologies] ([Id], [Name], [Link], [LanguageId], [License], [Description]) VALUES (3, N'Servicestack', N'http://servicestack.net/', 1, N'Open Source Own', N'Thoughtfully architected, obscenely fast, thoroughly enjoyable web services for all')
GO
INSERT [dbo].[Technologies] ([Id], [Name], [Link], [LanguageId], [License], [Description]) VALUES (4, N'jQuery', N'http://jquery.com/', 2, N'MIT', N'Cross browser javascript')
GO
INSERT [dbo].[Technologies] ([Id], [Name], [Link], [LanguageId], [License], [Description]) VALUES (5, N'Bootstrap', N'http://getbootstrap.com', 5, N'MIT', N'Sleek, intuitive, and powerful front-end framework for faster and easier web development.')
GO
SET IDENTITY_INSERT [dbo].[Technologies] OFF
GO
SET IDENTITY_INSERT [dbo].[TechnologyReviews] ON 

GO
INSERT [dbo].[TechnologyReviews] ([Id], [UserId], [TechnologyId], [ProjectId], [Version], [Rating], [Created], [Text]) VALUES (1, 1, 1, 1, N'0.3.6', 5, CAST(0x0000A22901070EAA AS DateTime), N'This templating library is still young but has great potential. Documentation and support are great. The whole UI of Clio is build with Ractive templates.')
GO
INSERT [dbo].[TechnologyReviews] ([Id], [UserId], [TechnologyId], [ProjectId], [Version], [Rating], [Created], [Text]) VALUES (2, 1, 3, 1, N'3.9.58', 4, CAST(0x0000A22A00DAD34B AS DateTime), N'Open Source alternative to WCF and WebApi for creating REST api in DotNet. Simple to use, works great, very fast. My default choice for creating REST api.')
GO
SET IDENTITY_INSERT [dbo].[TechnologyReviews] OFF
GO
INSERT [dbo].[TechnologyTags] ([TagId], [TechnologyId]) VALUES (1, 3)
GO
INSERT [dbo].[TechnologyTags] ([TagId], [TechnologyId]) VALUES (1, 4)
GO
INSERT [dbo].[TechnologyTags] ([TagId], [TechnologyId]) VALUES (2, 1)
GO
INSERT [dbo].[TechnologyTags] ([TagId], [TechnologyId]) VALUES (3, 2)
GO
INSERT [dbo].[TechnologyTags] ([TagId], [TechnologyId]) VALUES (5, 3)
GO
INSERT [dbo].[TechnologyTags] ([TagId], [TechnologyId]) VALUES (6, 3)
GO
INSERT [dbo].[TechnologyTags] ([TagId], [TechnologyId]) VALUES (7, 1)
GO
INSERT [dbo].[TechnologyTags] ([TagId], [TechnologyId]) VALUES (7, 4)
GO
INSERT [dbo].[TechnologyTags] ([TagId], [TechnologyId]) VALUES (9, 5)
GO
SET IDENTITY_INSERT [dbo].[Tools] ON 

GO
INSERT [dbo].[Tools] ([Id], [Owner], [Name], [Link], [License], [Description]) VALUES (1, N'Microsoft', N'Visual Studio', N'http://www.microsoft.com/visualstudio', N'615 Euro', N'EDI for .Net software')
GO
SET IDENTITY_INSERT [dbo].[Tools] OFF
GO
INSERT [dbo].[ToolTags] ([TagId], [ToolId]) VALUES (10, 1)
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

GO
INSERT [dbo].[Users] ([Id], [Name], [Email], [LastActivity]) VALUES (1, N'Wim Pool', N'wim.pool@ihomer.nl', NULL)
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UX_Projects]    Script Date: 5-9-2013 10:19:28 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UX_Projects] ON [dbo].[Projects]
(
	[Name] ASC,
	[Customer] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UX_Tags_Name]    Script Date: 5-9-2013 10:19:28 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UX_Tags_Name] ON [dbo].[Tags]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UX_Technologies]    Script Date: 5-9-2013 10:19:28 ******/
CREATE NONCLUSTERED INDEX [UX_Technologies] ON [dbo].[Technologies]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UX_Tools]    Script Date: 5-9-2013 10:19:28 ******/
CREATE NONCLUSTERED INDEX [UX_Tools] ON [dbo].[Tools]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UX_Users]    Script Date: 5-9-2013 10:19:28 ******/
CREATE NONCLUSTERED INDEX [UX_Users] ON [dbo].[Users]
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Technologies]  WITH CHECK ADD  CONSTRAINT [FK_Technologies_Languages] FOREIGN KEY([LanguageId])
REFERENCES [dbo].[Languages] ([Id])
GO
ALTER TABLE [dbo].[Technologies] CHECK CONSTRAINT [FK_Technologies_Languages]
GO
ALTER TABLE [dbo].[TechnologyReviews]  WITH CHECK ADD  CONSTRAINT [FK_TechnologyExperience_Projects] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Projects] ([Id])
GO
ALTER TABLE [dbo].[TechnologyReviews] CHECK CONSTRAINT [FK_TechnologyExperience_Projects]
GO
ALTER TABLE [dbo].[TechnologyReviews]  WITH CHECK ADD  CONSTRAINT [FK_TechnologyExperience_Technologies] FOREIGN KEY([TechnologyId])
REFERENCES [dbo].[Technologies] ([Id])
GO
ALTER TABLE [dbo].[TechnologyReviews] CHECK CONSTRAINT [FK_TechnologyExperience_Technologies]
GO
ALTER TABLE [dbo].[TechnologyReviews]  WITH CHECK ADD  CONSTRAINT [FK_TechnologyExperience_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[TechnologyReviews] CHECK CONSTRAINT [FK_TechnologyExperience_Users]
GO
ALTER TABLE [dbo].[TechnologyTags]  WITH CHECK ADD  CONSTRAINT [FK_TechnologyTags_Tags] FOREIGN KEY([TagId])
REFERENCES [dbo].[Tags] ([Id])
GO
ALTER TABLE [dbo].[TechnologyTags] CHECK CONSTRAINT [FK_TechnologyTags_Tags]
GO
ALTER TABLE [dbo].[TechnologyTags]  WITH CHECK ADD  CONSTRAINT [FK_TechnologyTags_Technologies] FOREIGN KEY([TechnologyId])
REFERENCES [dbo].[Technologies] ([Id])
GO
ALTER TABLE [dbo].[TechnologyTags] CHECK CONSTRAINT [FK_TechnologyTags_Technologies]
GO
ALTER TABLE [dbo].[ToolReviews]  WITH CHECK ADD  CONSTRAINT [FK_ToolExperience_Projects] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Projects] ([Id])
GO
ALTER TABLE [dbo].[ToolReviews] CHECK CONSTRAINT [FK_ToolExperience_Projects]
GO
ALTER TABLE [dbo].[ToolReviews]  WITH CHECK ADD  CONSTRAINT [FK_ToolExperience_Tools] FOREIGN KEY([ToolId])
REFERENCES [dbo].[Tools] ([Id])
GO
ALTER TABLE [dbo].[ToolReviews] CHECK CONSTRAINT [FK_ToolExperience_Tools]
GO
ALTER TABLE [dbo].[ToolReviews]  WITH CHECK ADD  CONSTRAINT [FK_ToolExperience_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[ToolReviews] CHECK CONSTRAINT [FK_ToolExperience_Users]
GO
ALTER TABLE [dbo].[ToolTags]  WITH CHECK ADD  CONSTRAINT [FK_ToolTags_Tags] FOREIGN KEY([TagId])
REFERENCES [dbo].[Tags] ([Id])
GO
ALTER TABLE [dbo].[ToolTags] CHECK CONSTRAINT [FK_ToolTags_Tags]
GO
ALTER TABLE [dbo].[ToolTags]  WITH CHECK ADD  CONSTRAINT [FK_ToolTags_Tools] FOREIGN KEY([ToolId])
REFERENCES [dbo].[Tools] ([Id])
GO
ALTER TABLE [dbo].[ToolTags] CHECK CONSTRAINT [FK_ToolTags_Tools]
GO
