--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Checklists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Checklists" (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "isPreMade" boolean DEFAULT false,
    "userId" uuid,
    "tripType" character varying(255),
    destination character varying(255),
    duration integer,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Checklists" OWNER TO postgres;

--
-- Name: checklist_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checklist_items (
    id uuid NOT NULL,
    item character varying(255) NOT NULL,
    checked boolean DEFAULT false,
    "checklistId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.checklist_items OWNER TO postgres;

--
-- Name: checklists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checklists (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "isPreMade" boolean DEFAULT false,
    "userId" uuid,
    "tripType" character varying(255),
    destination character varying(255),
    duration integer,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.checklists OWNER TO postgres;

--
-- Name: trips; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trips (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    name character varying(255) NOT NULL,
    "tripType" character varying(255) NOT NULL,
    destination character varying(255),
    "startDate" date,
    "endDate" date,
    duration integer,
    metadata jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.trips OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    fullname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    preferences jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: Checklists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Checklists" (id, name, "isPreMade", "userId", "tripType", destination, duration, "startDate", "endDate", "createdAt", "updatedAt") FROM stdin;
d2080ac3-1be3-4a1d-8e74-c8011970c5d8	Business Trip to NYC	f	2cbe1157-e1d8-4e5f-8566-8c109fc736b0	Business	New York	3	2025-06-10 01:00:00+01	2025-06-13 01:00:00+01	2025-05-31 19:42:31.95+01	2025-05-31 19:42:31.95+01
b8c60819-735e-4438-81ec-c14aeca0e93e	Business Trip to NYC	f	2cbe1157-e1d8-4e5f-8566-8c109fc736b0	Business	New York	3	2025-06-10 01:00:00+01	2025-06-13 01:00:00+01	2025-05-31 19:55:04.977+01	2025-05-31 19:55:04.977+01
1774f680-3730-43c3-850c-135d0c313383	Business Trip to NYC	f	2cbe1157-e1d8-4e5f-8566-8c109fc736b0	Business	New York	3	2025-06-10 01:00:00+01	2025-06-13 01:00:00+01	2025-05-31 19:55:15.454+01	2025-05-31 19:55:15.454+01
93c2bcb4-d12c-402b-9cb5-2f8e49e5ba83	Business Trip to NYC	f	2cbe1157-e1d8-4e5f-8566-8c109fc736b0	Business	New York	3	2025-06-10 01:00:00+01	2025-06-13 01:00:00+01	2025-05-31 20:12:20.92+01	2025-05-31 20:12:20.92+01
\.


--
-- Data for Name: checklist_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.checklist_items (id, item, checked, "checklistId", "createdAt", "updatedAt") FROM stdin;
22c9175b-8fa5-4b3c-ac62-ddc77675cc24	Laptop	f	b7142c9a-e7b7-4ade-923c-59266fd4eb2f	2025-05-31 21:57:48.222+01	2025-05-31 21:57:48.222+01
caebd821-5f66-486c-aa7a-daf5921194f2	Charger	f	b7142c9a-e7b7-4ade-923c-59266fd4eb2f	2025-05-31 21:57:48.222+01	2025-05-31 21:57:48.222+01
94a0b5b7-aea3-48a8-b639-8679efe18192	Suit	f	b7142c9a-e7b7-4ade-923c-59266fd4eb2f	2025-05-31 21:57:48.222+01	2025-05-31 21:57:48.222+01
\.


--
-- Data for Name: checklists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.checklists (id, name, "isPreMade", "userId", "tripType", destination, duration, "startDate", "endDate", "createdAt", "updatedAt") FROM stdin;
b7142c9a-e7b7-4ade-923c-59266fd4eb2f	Business Trip to NYC	f	09fb365c-2bb3-484d-b1c6-039e63c1a137	Business	New York	3	2025-06-10 01:00:00+01	2025-06-13 01:00:00+01	2025-05-31 21:57:48.17+01	2025-05-31 21:57:48.17+01
\.


--
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trips (id, "userId", name, "tripType", destination, "startDate", "endDate", duration, metadata, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, fullname, email, preferences, "createdAt", "updatedAt") FROM stdin;
09fb365c-2bb3-484d-b1c6-039e63c1a137	Jane Doe	jane@example.com	{"theme": "dark", "language": "en"}	2025-05-31 21:15:03.241+01	2025-05-31 21:15:03.241+01
\.


--
-- Name: Checklists Checklists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Checklists"
    ADD CONSTRAINT "Checklists_pkey" PRIMARY KEY (id);


--
-- Name: checklist_items checklist_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items
    ADD CONSTRAINT checklist_items_pkey PRIMARY KEY (id);


--
-- Name: checklists checklists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklists
    ADD CONSTRAINT checklists_pkey PRIMARY KEY (id);


--
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- Name: users users_email_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key10 UNIQUE (email);


--
-- Name: users users_email_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key11 UNIQUE (email);


--
-- Name: users users_email_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key12 UNIQUE (email);


--
-- Name: users users_email_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key13 UNIQUE (email);


--
-- Name: users users_email_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key14 UNIQUE (email);


--
-- Name: users users_email_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key15 UNIQUE (email);


--
-- Name: users users_email_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key16 UNIQUE (email);


--
-- Name: users users_email_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key17 UNIQUE (email);


--
-- Name: users users_email_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key18 UNIQUE (email);


--
-- Name: users users_email_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key19 UNIQUE (email);


--
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- Name: users users_email_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key20 UNIQUE (email);


--
-- Name: users users_email_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key21 UNIQUE (email);


--
-- Name: users users_email_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key22 UNIQUE (email);


--
-- Name: users users_email_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key23 UNIQUE (email);


--
-- Name: users users_email_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key24 UNIQUE (email);


--
-- Name: users users_email_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key25 UNIQUE (email);


--
-- Name: users users_email_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key26 UNIQUE (email);


--
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- Name: users users_email_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);


--
-- Name: users users_email_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);


--
-- Name: users users_email_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key7 UNIQUE (email);


--
-- Name: users users_email_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key8 UNIQUE (email);


--
-- Name: users users_email_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key9 UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: checklist_items checklist_items_checklistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items
    ADD CONSTRAINT "checklist_items_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES public.checklists(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: checklists checklists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklists
    ADD CONSTRAINT "checklists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: trips trips_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT "trips_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

