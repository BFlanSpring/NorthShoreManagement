CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE sp500_stocks (
    ticker VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    open DECIMAL(10, 2) NOT NULL,
    high DECIMAL(10, 2) NOT NULL,
    low DECIMAL(10, 2) NOT NULL,
    close DECIMAL(10, 2) NOT NULL,
    adj_close DECIMAL(10, 2) NOT NULL,
    volume BIGINT NOT NULL,
    PRIMARY KEY (ticker, date)
);

CREATE TABLE dow_stocks (
    ticker VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    open DECIMAL(10, 2) NOT NULL,
    high DECIMAL(10, 2) NOT NULL,
    low DECIMAL(10, 2) NOT NULL,
    close DECIMAL(10, 2) NOT NULL,
    adj_close DECIMAL(10, 2) NOT NULL,
    volume BIGINT NOT NULL,
    PRIMARY KEY (ticker, date)
);

CREATE TABLE russell_stocks (
    ticker VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    open DECIMAL(10, 2) NOT NULL,
    high DECIMAL(10, 2) NOT NULL,
    low DECIMAL(10, 2) NOT NULL,
    close DECIMAL(10, 2) NOT NULL,
    adj_close DECIMAL(10, 2) NOT NULL,
    volume BIGINT NOT NULL,
    PRIMARY KEY (ticker, date)
);

CREATE INDEX idx_sp500_stocks_date ON sp500_stocks (date);
CREATE INDEX idx_dow_stocks_date ON dow_stocks (date);
CREATE INDEX idx_russell_stocks_date ON russell_stocks (date);










