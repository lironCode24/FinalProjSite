-- Create Users table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
	fullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,    
	access_token VARCHAR(255),
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
    PredictionResult VARCHAR(255) NOT NULL,
    PredictionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TextID) REFERENCES TextData(TextID)
);

-- Create Predictions type table
CREATE TABLE IF NOT EXISTS public.predictiontype
(
    predictionid bigint NOT NULL,
    predictionname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "predictionType_pkey" PRIMARY KEY (predictionid)
)

-- Create user role table
CREATE TABLE IF NOT EXISTS public.userrole
(
    roleid bigint NOT NULL,
    rolename character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT userrole_pkey PRIMARY KEY (roleid)
)
