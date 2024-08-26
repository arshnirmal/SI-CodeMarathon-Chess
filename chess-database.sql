set search_path to chess;

create table players (
    player_id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    country varchar(50) not null,
    current_world_ranking integer unique not null,
    total_matches_played integer not null default 0
);

create table matches (
	match_id serial primary key,
	player1_id int not null references players(player_id),
	player2_id int not null references players(player_id),
	match_date date not null,
	match_level varchar(20) not null check (match_level in ('international', 'national')),
	winner_id int references players(player_id)
);

create table sponsors (
	sponsor_id serial primary key,
	sponsor_name varchar(100) unique not null,
	industry varchar(50) not null,
	contact_email varchar(100) not null,
	contact_phone varchar(20) not null
);

create table player_sponsors (
	player_id int not null references players(player_id), 
	sponsor_id int not null references sponsors(sponsor_id),
	sponsorship_amount numeric(10, 2) not null,
	contract_start_date date not null,
	contract_end_date date not null,
	primary key (player_id, sponsor_id)
);

insert into players (first_name, last_name, country, current_world_ranking, total_matches_played)
values 
('magnus', 'carlsen', 'norway', 1, 100),
('fabiano', 'caruana', 'usa', 2, 95),
('ding', 'liren', 'china', 3, 90),
('ian', 'nepomniachtchi', 'russia', 4, 85),
('wesley', 'so', 'usa', 5, 80),
('anish', 'giri', 'netherlands', 6, 78),
('hikaru', 'nakamura', 'usa', 7, 75),
('viswanathan', 'anand', 'india', 8, 120),
('teimour', 'radjabov', 'azerbaijan', 9, 70),
('levon', 'aronian', 'armenia', 10, 72);

insert into matches (player1_id, player2_id, match_date, match_level, winner_id)
values 
(1, 2, '2024-08-01', 'international', 1),
(3, 4, '2024-08-02', 'international', 3),
(5, 6, '2024-08-03', 'national', 5),
(7, 8, '2024-08-04', 'international', 8),
(9, 10, '2024-08-05', 'national', 10),
(1, 3, '2024-08-06', 'international', 1),
(2, 4, '2024-08-07', 'national', 2),
(5, 7, '2024-08-08', 'international', 7),
(6, 8, '2024-08-09', 'national', 8),
(9, 1, '2024-08-10', 'international', 1);

insert into sponsors (sponsor_name, industry, contact_email, contact_phone)
values 
('techchess', 'technology', 'contact@techchess.com', '123-456-7890'),
('movemaster', 'gaming', 'info@movemaster.com', '234-567-8901'),
('chessking', 'sports', 'support@chessking.com', '345-678-9012'),
('smartmoves', 'ai', 'hello@smartmoves.ai', '456-789-0123'),
('grandmasterfinance', 'finance', 'contact@grandmasterfinance.com', '567-890-1234');

insert into player_sponsors (player_id, sponsor_id, sponsorship_amount, contract_start_date, contract_end_date)
values 
(1, 1, 500000.00, '2023-01-01', '2025-12-31'),
(2, 2, 300000.00, '2023-06-01', '2024-06-01'),
(3, 3, 400000.00, '2024-01-01', '2025-01-01'),
(4, 4, 350000.00, '2023-03-01', '2024-03-01'),
(5, 5, 450000.00, '2023-05-01', '2024-05-01'),
(6, 1, 250000.00, '2024-02-01', '2025-02-01'),
(7, 2, 200000.00, '2023-08-01', '2024-08-01'),
(8, 3, 600000.00, '2023-07-01', '2025-07-01'),
(9, 4, 150000.00, '2023-09-01', '2024-09-01'),
(10, 5, 300000.00, '2024-04-01', '2025-04-01');

-- 1. List the match details including the player names (both player1 and player2), match date, and match level for all International matches.
select 
    m.match_id,
    p1.first_name || ' ' || p1.last_name as player1_name,
    p2.first_name || ' ' || p2.last_name as player2_name,
    m.match_date,
    m.match_level
from 
    matches m
join 
    players p1 on m.player1_id = p1.player_id
join 
    players p2 on m.player2_id = p2.player_id
where 
    m.match_level = 'international';

-- 2. Extend the contract end date of all sponsors associated with players from the USA by one year.
update player_sponsors ps
set 
    ps.contract_end_date = ps.contract_end_date + interval '1 year'
from 
    players p
where 
    ps.player_id = p.player_id
    and p.country = 'USA';

-- 3.  List all matches played in August 2024, sorted by the match date in ascending order.
select 
    match_id,
    player1_id,
    player2_id,
    match_date,
    match_level,
    winner_id
from 
    matches
where 
    match_date >= '2024-08-01' 
    and match_date <= '2024-08-31'
order by 
    match_date asc;

-- 5.  Show the sponsor names and the total sponsorship amounts they have provided across all players. Sort the result by the total amount in descending order.
select 
    s.sponsor_name,
    sum(ps.sponsorship_amount) as total_sponsorship_amount
from 
    sponsors s
join 
    player_sponsors ps on s.sponsor_id = ps.sponsor_id
group by 
    s.sponsor_name
order by 
    total_sponsorship_amount desc;
