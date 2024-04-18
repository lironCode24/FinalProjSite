-- Create Users table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
	fullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    CONSTRAINT unique_username UNIQUE (Username),
    CONSTRAINT unique_email UNIQUE (Email)
);

-- Create TextData table
CREATE TABLE TextData (
    TextID SERIAL PRIMARY KEY,
    RawText TEXT NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Create Predictions table
CREATE TABLE Predictions (
    PredictionID SERIAL PRIMARY KEY,
    TextID INT,
    AccuracyLevel FLOAT NOT NULL,
    PredictionResult VARCHAR(255) NOT NULL,
    PredictionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TextID) REFERENCES TextData(TextID)
);


