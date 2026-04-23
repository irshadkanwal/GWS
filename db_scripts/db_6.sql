ALTER TABLE payment_details
ADD COLUMN connect_account_id VARCHAR(255);

ALTER TABLE payment_details
ADD COLUMN platform_fee DECIMAL(10,2) DEFAULT 0 NOT NULL,
ADD COLUMN recipient_amount DECIMAL(10,2) DEFAULT 0 NOT NULL;


