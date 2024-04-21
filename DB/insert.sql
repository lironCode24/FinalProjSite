
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
