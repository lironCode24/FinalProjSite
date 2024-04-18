INSERT INTO Users (Username, Email, Role, PasswordHash)
VALUES 
    ('liron', 'liron@example.com', 'admin', 'hashed_password_123'),
    ('jane_doe', 'jane@example.com', 'user', 'hashed_password_456'),
    ('alice_smith', 'alice@example.com', 'user', 'hashed_password_789');

INSERT INTO TextData (RawText, UserID)
VALUES
    ('Sample text 1', 1),
    ('Another sample text', 2),
    ('Text data for analysis', 3);

INSERT INTO Predictions (TextID, AccuracyLevel, PredictionResult)
VALUES
    (1, 0.75, 'Positive'),
    (2, 0.85, 'Negative'),
    (3, 0.90, 'Neutral');
