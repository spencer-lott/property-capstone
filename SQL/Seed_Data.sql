
--START OF SEED DATA
ALTER TABLE [MaintenanceHistory] ADD FOREIGN KEY ([PropertyId]) REFERENCES [Property] ([Id]);
GO
ALTER TABLE [MaintenanceHistory] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]);
GO
ALTER TABLE [Property] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]);
GO

--//ADD CASCADE DELETE TO Property to DELETE all the MaintenanceHistory associated with that property
ALTER TABLE[MaintenanceHistory]
DROP CONSTRAINT IF EXISTS[FK_MaintenanceHistory_Property];
ALTER TABLE[MaintenanceHistory]
ADD CONSTRAINT[FK_MaintenanceHistory_Property]
FOREIGN KEY([PropertyId]) REFERENCES[Property] ([Id]) ON DELETE CASCADE;

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (1, 'Admin', 'A.', 'admin@email.com', 1, 1, NULL , NULL, NULL, NULL, NULL);
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (2, 'Employee', '1', 'employee1@email.com', 1, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (3, 'Employee', '2', 'employee2@email.com', 1, 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (4, 'Albert', 'Allen','allen@gmail.com', 0, 0, '3045559898', 'Historian', 'Ginny', '3043043044', 'He always pays rent on time, most of the time early');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (5, 'Beckley', 'Brown','brown@gmail.com', 0, 0, '6544340009', 'Grain Farmer', 'Amelia', '2220906677', 'He is a much older gentleman. He always pays rent in the form of a check which always needs to be picked up');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (6, 'Charles', 'Cooper','tenant3@gmail.com', 0, 0, '5032329909', 'Nurse', 'Sheen', '5039991899', 'She has a bad credit history and has missed rent a few times');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (7, 'Daren', 'Dawson','dawson@gmail.com', 0, 0, '2709858545', 'Fisherman', 'Dave', '2701454245', 'He lives on social security and is a very dependable renter');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (8, 'Earl', 'Edmunds','edmunds@gmail.com', 0, 0, '5024547878', 'Steel Worker', 'Emily', '5024542636', 'He has a hobby fixing cars, and we have allowed him to keep some of his projects around');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (9, 'Felicia', 'Farnsworth','farnsworth@gmail.com', 0, 0, '6068875485', 'Horseback Instructor', 'Donald', '6068783159', 'She was evicted from a different property management company in her past, but she has been good with us.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (10, 'Georgina', 'Greenbriar','greenbriar@gmail.com', 0, 0, '5021236548', 'Hair Sylist', 'Ruprecht', '5024789545', 'Very respectful tenant');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (11, 'Harold', 'Hawes','hawes@gmail.com', 0, 0, '3649875695', 'Disabled', 'Margaret', '3648745621', 'He get money for his disability every month. It is enough to cover rent. We built him a ramp so he could get to his front door easier');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (12, 'Ingrid', 'Iglesias','iglesias@gmail.com', 0, 0, '2193526655', 'Professional Motocross', 'Harlan', '2600021254', 'They have a custom keypad that was put on the garage. The code is 2023.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (13, 'Jacob', 'Johnson','johnson@gmail.com', 0, 0, '5039875412', 'HVAC Installer', 'Emily', '9718875451', 'N/A');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (14, 'Karen', 'Killingsworth','killingsworth@gmail.com', 0, 0, '5032123652', 'Master Gardener', 'Christina', '9714546598', 'She keeps a really beautiful garder. We are really glad she keeps up with it. If she leaves one day we might unfortunately have to change it to shrubs and rocks');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (15, 'Leonardo', 'Lundquist','lundquist@gmail.com', 0, 0, '8329587456', 'Locksmith', 'Ricardo', '9876562351', 'He has helped us a few times with locks.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (16, 'Margaret', 'Mayer','mayer@gmail.com', 0, 0, '8089851235', 'Retired', 'Steve', '8084751545', 'They used to live in Hawaii, but now they have settled here to be close to their grandchildren. They are very dependable.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (17, 'Natalie', 'Norton','norton@gmail.com', 0, 0, '5027654321', 'Graphic Designer', 'David', '5029987654', 'She occasionally works from home and might need to receive packages.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (18, 'Oliver', 'Olsen','olsen@gmail.com', 0, 0, '2702345678', 'Chef', 'Lena', '2708881234', 'He loves to cook and sometimes brings us some delicious treats.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (19, 'Penelope', 'Patterson','patterson@gmail.com', 0, 0, '5029876543', 'Accountant', 'Mark', '5027654321', 'Very organized and detail-oriented tenant.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (20, 'Quincy', 'Quinn','quinn@gmail.com', 0, 0, '6061234567', 'Musician', 'Sophia', '6069876543', 'Plays the piano and occasionally practices during the day.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (21, 'Raphael', 'Reyes','reyes@gmail.com', 0, 0, '5025556789', 'Artist', 'Isabella', '5024445678', 'He sometimes hosts art workshops in his apartment.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (22, 'Samantha', 'Scott','scott@gmail.com', 0, 0, '2707654321', 'Marketing Specialist', 'Alex', '2708765432', 'Very communicative and always responds promptly.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (23, 'Theodore', 'Thompson','thompson@gmail.com', 0, 0, '5024567890', 'Teacher', 'Eleanor', '5029876543', 'Works at the local elementary school.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (24, 'Ursula', 'Upton','upton@gmail.com', 0, 0, '6069876543', 'Architect', 'Vincent', '6061234567', 'She sometimes works late nights to meet project deadlines.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (25, 'Victor', 'Vargas','vargas@gmail.com', 0, 0, '5028765432', 'Mechanic', 'Mariana', '5027654321', 'He occasionally needs space to work on his car repairs.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (26, 'Wendy', 'Wright','wright@gmail.com', 0, 0, '2705556789', 'Writer', 'Benjamin', '2704445678', 'She is currently working on a novel.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (27, 'Xander', 'Xu','xu@gmail.com', 0, 0, '5027654321', 'Software Engineer', 'Olivia', '5028881234', 'He often works from home and is very tech-savvy.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (28, 'Yasmine', 'Yates','yates@gmail.com', 0, 0, '6061234567', 'Fashion Designer', 'Liam', '6069876543', 'She occasionally hosts sewing workshops.');
INSERT INTO [UserProfile]
  ([Id], [FirstName], [LastName], [Email], [IsEmployee], [IsAdmin], [Phone], [Employment], [EmergencyContactName], [EmergencyContactPhone], [GeneralNotes])
VALUES 
  (29, 'Zachary', 'Zimmerman','zimmerman@gmail.com', 0, 0, '2708765432', 'Photographer', 'Ava', '2707654321', 'He sometimes uses his apartment for photoshoots.');
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Property] ON
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (1, '111 Childers Creek', 'Salt Rock', 'WV', 'House', '3bds/2ba', 800, 0, 29)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (2, '222 Country Road', 'Salt Rock', 'WV', 'Mobile Home', '2bds/1ba', 600, 0, 4)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (3, '333 Left Fork of Fudges Creek', 'Milton', 'WV', 'House', '3bds/2ba', 1050, 0, 5)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (4, '123 Bluegrass Lane', 'Lexington', 'KY', 'House', '3bds/2ba', 1200, 0, 6)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (5, '456 Derby Drive', 'Louisville', 'KY', 'House', '4bds/2ba', 1120, 0, 7)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (6, '789 Bourbon Street', 'Bowling Green', 'KY', 'House', '2bds/1ba', 780, 0, 8)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (7, '101 Horseback Road', 'Paducah', 'KY', 'Mobile Home', '2bds/1ba', 650, 0, 9)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (8, '222 Oak Wood Trail', 'Frankfort', 'KY', 'House', '4bds/3ba', 1600, 0, 10)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (9, '1485 Sioux Trail', 'Grayson', 'KY', 'House', '3bds/2ba', 1350, 0, 11)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (10, '1888 Green Leaf Road', 'Poca', 'WV', 'House', '4bds/3ba', 1465, 0, 12)
INSERT INTO [Property] 
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (11, '1408 Main Street', 'Barboursville', 'WV', 'House', '2bds/1ba', 900, 0, 13)


  -------------
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (12, '111 Elmwood Avenue', 'Huntington', 'WV', 'House', '3bds/2ba', 950, 0, 14);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (13, '222 Cedar Lane', 'Barboursville', 'WV', 'Mobile Home', '2bds/1ba', 750, 0, 15);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (14, '333 Maple Street', 'Milton', 'WV', 'House', '3bds/2ba', 1150, 0, 16);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (15, '123 Oakwood Drive', 'Huntington', 'WV', 'House', '3bds/2ba', 1300, 0, 17);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (16, '456 Riverbend Lane', 'Barboursville', 'WV', 'House', '4bds/2ba', 1220, 0, 18);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (17, '789 Meadowview Road', 'Milton', 'WV', 'House', '2bds/1ba', 880, 0, 19);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (18, '101 Forest Trail', 'Huntington', 'WV', 'Mobile Home', '2bds/1ba', 700, 0, 20);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (19, '222 Birchwood Avenue', 'Barboursville', 'WV', 'House', '4bds/3ba', 1800, 0, 21);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (20, '1485 Willow Lane', 'Milton', 'WV', 'House', '3bds/2ba', 1450, 0, 22);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (21, '1888 Oak Street', 'Huntington', 'WV', 'House', '4bds/3ba', 1565, 0, 23);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (22, '1408 Pine Avenue', 'Barboursville', 'WV', 'House', '2bds/1ba', 920, 0, 24);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (23, '808 Maplewood Lane', 'Huntington', 'WV', 'House', '3bds/2ba', 1780, 0, 25);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (24, '712 Willowbrook Drive', 'Milton', 'WV', 'House', '4bds/3ba', 2000, 0, 26);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (25, '123 Birchwood Avenue', 'Barboursville', 'WV', 'House', '3bds/2ba', 1600, 0, 27);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (26, '456 Elm Street', 'Huntington', 'WV', 'Mobile Home', '2bds/1ba', 950, 0, 28);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (27, '8754 Willow Lane', 'Milton', 'WV', 'House', '3bds/2ba', 1550, 1, NULL);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (28, '1001 Pine Avenue', 'Huntington', 'WV', 'House', '3bds/2ba', 1550, 1, NULL);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (29, '2334 Oakwood Drive', 'Barboursville', 'WV', 'House', '4bds/2ba', 1775, 1, NULL);
INSERT INTO [Property]
  ([Id], [StreetAddress], [City], [State], [Type], [SizeDescription], [Rent], [Vacant], [UserProfileId])
VALUES
  (30, '9001 Riverbend Lane', 'Huntington', 'WV', 'House', '2bds/1ba', 1300, 1, NULL);

SET IDENTITY_INSERT [Property] OFF

--------------------------
--------------------------
SET IDENTITY_INSERT [MaintenanceHistory] ON
INSERT INTO [MaintenanceHistory] 
  ([Id], [Description], [DateCompleted], [DateRequested], [PropertyId], [UserProfileId])
VALUES
  (1, 'Replaced the toilet because they got a hairbrush stuck in the trap', '2023-07-25 12:00:00', '2023-07-25 11:30:00', 1, 1);
INSERT INTO [MaintenanceHistory] 
  ([Id], [Description], [DateCompleted], [DateRequested], [PropertyId], [UserProfileId])
VALUES
  (2, 'Repaired the gate for the fence that leads to their backyard', '2023-07-25 12:00:00', '2023-07-25 11:30:00', 2, 2);
INSERT INTO [MaintenanceHistory] 
  ([Id], [Description], [DateCompleted], [DateRequested], [PropertyId], [UserProfileId])
VALUES
  (3, 'Finished new roof installation', '2023-07-25 12:00:00', '2023-07-25 11:30:00', 3, 1);
SET IDENTITY_INSERT [MaintenanceHistory] OFF
