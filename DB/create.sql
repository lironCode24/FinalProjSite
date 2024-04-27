
-- Create Predictions type table
CREATE TABLE IF NOT EXISTS public.predictiontype (
    predictionid SERIAL PRIMARY KEY,
    predictionname VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.userrole (
    roleid SERIAL PRIMARY KEY,
    rolename VARCHAR(100) NOT NULL
);


-- Create Users table with RoleID as a foreign key referencing userrole
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    ProfileImg VARCHAR(255) NOT NULL DEFAULT './profileIcon1.jpg', -- Default profile image path
    RoleID INT NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    AccessToken VARCHAR(255),
    CONSTRAINT unique_username UNIQUE (Username),
    CONSTRAINT unique_email UNIQUE (Email),
    FOREIGN KEY (RoleID) REFERENCES userrole(RoleID)
);



-- Create TextData table
CREATE TABLE TextData (
    TextID SERIAL PRIMARY KEY,
    RawText TEXT NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create Predictions table with foreign key reference to PredictionType
CREATE TABLE Predictions (
    PredictionID SERIAL PRIMARY KEY,
    TextID INT,
    PredictionTypeID INT,
    PredictionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TextID) REFERENCES TextData(TextID),
    FOREIGN KEY (PredictionTypeID) REFERENCES PredictionType(predictionid)
);
