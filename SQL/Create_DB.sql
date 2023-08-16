USE [master]
GO
IF db_id('PropertyManager') IS NULL
	CREATE DATABASE [PropertyManager]
GO
USE [PropertyManager]
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [Email] nvarchar(255),
  [IsEmployee] bit,
  [IsAdmin] bit,
  [Phone] nvarchar(255),
  [Employment] nvarchar(255),
  [EmergencyContactName] nvarchar(255),
  [EmergencyContactPhone] nvarchar(255),
  [GeneralNotes] nvarchar(255)
);
GO

CREATE TABLE [Property] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [StreetAddress] nvarchar(255),
  [City] nvarchar(255),
  [State] nvarchar(255),
  [Type] nvarchar(255),
  [SizeDescription] nvarchar(255),
  [Rent] int,
  [Vacant] bit,
  [UserProfileId] int
);
GO

CREATE TABLE [MaintenanceHistory] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [Description] nvarchar(255),
  [DateCompleted] datetime,
  [DateRequested] datetime,
  [PropertyId] int,
  [UserProfileId] int
);
GO
