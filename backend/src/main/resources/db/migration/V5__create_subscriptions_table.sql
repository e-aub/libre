CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    subscriber_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscribed_to_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(subscriber_id, subscribed_to_id)
);